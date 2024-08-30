import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import WeatherScreen from '..';
import { fetchWeather } from '../../../store/slices/weatherSlice';
import { fetchGeocoding } from '../../../store/slices/geocodingSlice';
import '@testing-library/jest-native/extend-expect';


// Mocks for fetchWeather and fetchGeocoding
jest.mock('../../../store/slices/weatherSlice', () => ({
  fetchWeather: jest.fn(),
}));

jest.mock('../../../store/slices/geocodingSlice', () => ({
  fetchGeocoding: jest.fn(),
}));

const mockFetchWeather = fetchWeather as jest.MockedFunction<typeof fetchWeather>;
const mockFetchGeocoding = fetchGeocoding as jest.MockedFunction<typeof fetchGeocoding>;

describe('WeatherScreen', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display weather data', async () => {
    mockFetchWeather.mockReturnValueOnce({
      type: 'weather/fetchWeather/fulfilled',
      payload: {
        current_weather: { temperature: 25, weathercode: '1' },
        current_weather_units: { temperature: '°C', windspeed: 'km/h' },
        daily: { temperature_2m_max: [30], temperature_2m_min: [20], time: ['2024-08-30'], weathercode: ['1'] },
      },
    });

    render(<WeatherScreen />);

    await waitFor(() => {
      expect(screen.getByText('Pune')).toBeTruthy();
      expect(screen.getByText('25°C')).toBeTruthy();
    });
  });

  it('should open and close the modal', async () => {
    mockFetchGeocoding.mockReturnValueOnce({
      type: 'geocoding/fetchGeocoding/fulfilled',
      payload: {
        results: [{ id: 1, name: 'Pune', country: 'IN', latitude: 18.5204, longitude: 73.8567 }],
      },
    });
  
    render(<WeatherScreen />);
  
    const searchIcon = screen.getByTestId('header-search-icon');
    fireEvent.press(searchIcon);
  
    expect(await screen.findByTestId('search-input')).toBeTruthy();
  
    const closeModalButton = await screen.findByTestId('close-modal-button');
    fireEvent.press(closeModalButton);
  
    expect(screen.queryByTestId('search-input')).toBeNull();
  });
  
  
});
