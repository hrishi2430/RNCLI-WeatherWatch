import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WhetherReport from '../WhetherReport';
import getWeatherImage from '../../../helpers/getWeatherImage';
import { WeatherData } from '../../../store/slices/weatherSlice';

jest.mock('../../../helpers/getWeatherImage');

const mockImage='https://openweathermap.org/img/wn/01d@2x.png';

describe('WhetherReport', () => {
  const weatherData: WeatherData = {
    current_weather: { temperature: 25, weathercode: '1' },
    current_weather_units: { temperature: '°C', windspeed: 'km/h' },
    daily: {
      temperature_2m_max: [30],
      temperature_2m_min: [20],
      time: ['2024-08-30'],
      weathercode: ['1']
    },
  };

  const averageTemp = () => 25;

  it('should render current city, temperature, and average temperature', () => {
    (getWeatherImage as jest.Mock).mockReturnValue(mockImage);

    render(
      <WhetherReport
        currentCity="Pune"
        weatherData={weatherData}
        averageTemp={averageTemp}
      />
    );

    expect(screen.getByText('Pune')).toBeTruthy();
    expect(screen.getByText('25°C')).toBeTruthy();
    expect(screen.getByText('Average Temp: 25°C')).toBeTruthy();
  });

  it('should render daily weather items', () => {
    (getWeatherImage as jest.Mock).mockReturnValue(mockImage);

    render(
      <WhetherReport
        currentCity="Pune"
        weatherData={weatherData}
        averageTemp={averageTemp}
      />
    );

    expect(screen.getByText('2024-08-30')).toBeTruthy();
    expect(screen.getByText('30°C - 20°C')).toBeTruthy();
    const image = screen.getByTestId('header-weather-image');
    expect(image.props.source).toEqual({ uri: mockImage });  });
});
