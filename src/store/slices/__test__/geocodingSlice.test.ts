import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import geocodingReducer, { fetchGeocoding, resetState, GeocodingState } from '../geocodingSlice';

// Setup the mock for axios
const mock = new MockAdapter(axios);

describe('geocodingSlice', () => {
  // Test for the initial state
  it('should return the initial state', () => {
    const store = configureStore({ reducer: { geocoding: geocodingReducer } });
    const state = store.getState().geocoding as GeocodingState;
    expect(state).toEqual({
      locationData: { results: [] },
      status: 'idle',
      error: null,
    });
  });

  // Test the resetState reducer
  it('should handle resetState', () => {
    const store = configureStore({ reducer: { geocoding: geocodingReducer } });
    store.dispatch(fetchGeocoding('Pune')); // Simulate some changes in state
    store.dispatch(resetState());
    const state = store.getState().geocoding as GeocodingState;
    expect(state).toEqual({
      locationData: { results: [] },
      status: 'idle',
      error: null,
    });
  });

  // Test the fetchGeocoding thunk - pending state
  it('should handle fetchGeocoding.pending', async () => {
    const store = configureStore({ reducer: { geocoding: geocodingReducer } });
    mock.onGet('https://geocoding-api.open-meteo.com/v1/search').reply(200, {
      results: [{ id: 1, name: 'Pune', country: 'IN', latitude: 18.5204, longitude: 73.8567 }]
    });
    store.dispatch(fetchGeocoding('Pune'));
    const state = store.getState().geocoding as GeocodingState;
    expect(state.status).toBe('loading');
  });

  // Test the fetchGeocoding thunk - fulfilled state
  it('should handle fetchGeocoding.fulfilled', async () => {
    const store = configureStore({ reducer: { geocoding: geocodingReducer } });
    mock.onGet('https://geocoding-api.open-meteo.com/v1/search').reply(200, {
      results: [{ id: 1, name: 'Pune', country: 'IN', latitude: 18.5204, longitude: 73.8567 }]
    });
    await store.dispatch(fetchGeocoding('Pune') as any);
    const state = store.getState().geocoding as GeocodingState;
    expect(state.status).toBe('succeeded');
    expect(state.locationData.results).toHaveLength(1);
    expect(state.locationData.results[0].name).toBe('Pune');
  });

  // Test the fetchGeocoding thunk - rejected state
  it('should handle fetchGeocoding.rejected', async () => {
    const store = configureStore({ reducer: { geocoding: geocodingReducer } });
    mock.onGet('https://geocoding-api.open-meteo.com/v1/search').reply(500);
    await store.dispatch(fetchGeocoding('Pune') as any);
    const state = store.getState().geocoding as GeocodingState;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Request failed with status code 500');
  });
});
