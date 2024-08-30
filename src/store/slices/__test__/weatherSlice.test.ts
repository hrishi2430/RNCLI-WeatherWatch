import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import weatherReducer, { fetchWeather, WeatherState, } from '../weatherSlice';

// Setup the mock for axios
const mock = new MockAdapter(axios);

describe('weatherSlice', () => {
  // Test for the initial state
  it('should return the initial state', () => {
    const store = configureStore({ reducer: { weather: weatherReducer } });
    const state = store.getState().weather as WeatherState;
    expect(state).toEqual({
      weatherData: {
        current_weather: { temperature: 0, weathercode: '0' },
        current_weather_units: { temperature: '', windspeed: '' },
        daily: { temperature_2m_max: [], temperature_2m_min: [], time: [], weathercode: [] },
      },
      status: 'idle',
      error: null,
    });
  });

  // Test the fetchWeather thunk - pending state
  it('should handle fetchWeather.pending', async () => {
    const store = configureStore({ reducer: { weather: weatherReducer } });
    mock.onGet('https://api.open-meteo.com/v1/forecast').reply(200, {
      current_weather: { temperature: 25, weathercode: '1' },
      current_weather_units: { temperature: '°C', windspeed: 'km/h' },
      daily: { temperature_2m_max: [30], temperature_2m_min: [20], time: ['2024-08-30'], weathercode: ['1'] }
    });
    store.dispatch(fetchWeather({ lat: 12.34, lon: 56.78 }));
    const state = store.getState().weather as WeatherState;
    expect(state.status).toBe('loading');
  });

  // Test the fetchWeather thunk - fulfilled state
  it('should handle fetchWeather.fulfilled', async () => {
    const store = configureStore({ reducer: { weather: weatherReducer } });
    mock.onGet('https://api.open-meteo.com/v1/forecast').reply(200, {
      current_weather: { temperature: 25, weathercode: '1' },
      current_weather_units: { temperature: '°C', windspeed: 'km/h' },
      daily: { temperature_2m_max: [30], temperature_2m_min: [20], time: ['2024-08-30'], weathercode: ['1'] }
    });
    await store.dispatch(fetchWeather({ lat: 12.34, lon: 56.78 }) as any);
    const state = store.getState().weather as WeatherState;
    expect(state.status).toBe('succeeded');
    expect(state?.weatherData?.current_weather?.temperature).toBe(25);
    expect(state?.weatherData?.daily?.temperature_2m_max).toHaveLength(1);
  });

  // Test the fetchWeather thunk - rejected state
  it('should handle fetchWeather.rejected', async () => {
    const store = configureStore({ reducer: { weather: weatherReducer } });
    mock.onGet('https://api.open-meteo.com/v1/forecast').reply(500);
    await store.dispatch(fetchWeather({ lat: 12.34, lon: 56.78 }) as any);
    const state = store.getState().weather as WeatherState;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Request failed with status code 500');
  });
});
