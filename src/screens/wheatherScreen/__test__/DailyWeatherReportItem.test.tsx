import React from 'react';
import { render } from '@testing-library/react-native';
import { WeatherCode } from '../../../helpers/getWeatherImage';
import DailyWeatherReportItem from '../DailyWhetherReportItem';

jest.mock('../../../helpers/getWeatherImage', () => ({
  __esModule: true,
  default: jest.fn(() => 'https://openweathermap.org/img/wn/01d@2x.png'),
}));

describe('DailyWeatherReportItem', () => {
  it('should render weather item correctly', () => {
    const props = {
      date: '2024-08-30',
      maxTemp: 30,
      minTemp: 20,
      weatherCode: '1' as WeatherCode,
      weatherUnit: '°C',
    };

    const { getByText, getByTestId } = render(<DailyWeatherReportItem {...props} />);

    expect(getByText('2024-08-30')).toBeTruthy();
    expect(getByText('30°C - 20°C')).toBeTruthy();

    const image = getByTestId('weather-image');
    expect(image.props.source).toEqual({ uri: 'https://openweathermap.org/img/wn/01d@2x.png' });
  });
});
