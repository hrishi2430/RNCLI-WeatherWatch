// __mocks__/react-redux.ts
import { jest } from '@jest/globals';
import { RootState } from '../src/store/store';
import { TypedUseSelectorHook } from 'react-redux';

// Mock dispatch function
export const useDispatch = jest.fn().mockImplementation(() => jest.fn());

// Mock selector function
export const useSelector: TypedUseSelectorHook<RootState> = jest.fn().mockImplementation((selector) => selector(mockState));

// Mock state
const mockState: RootState = {
  weather: {
    weatherData: {
      current_weather: { temperature: 25, weathercode: '1' },
      current_weather_units: { temperature: '°C', windspeed: 'km/h' },
      daily: {
        temperature_2m_max: [30],
        temperature_2m_min: [20],
        time: ['2024-08-30'],
        weathercode: ['1'],
      },
    },
    status: 'idle',
    error: null,
  },
  geocoding: {
    locationData: { results: [] },
    status: 'idle',
    error: null,
  },
};

