import getWeatherImage, { WeatherCode } from '../getWeatherImage';

test.each([
  { weatherCode: '0', image: 'https://openweathermap.org/img/wn/01d@2x.png' },
  { weatherCode: '1', image: 'https://openweathermap.org/img/wn/01d@2x.png' },
  { weatherCode: '2', image: 'https://openweathermap.org/img/wn/02d@2x.png' },
  { weatherCode: '3', image: 'https://openweathermap.org/img/wn/03d@2x.png' },
  { weatherCode: '45', image: 'https://openweathermap.org/img/wn/50d@2x.png' },
  { weatherCode: '48', image: 'https://openweathermap.org/img/wn/50d@2x.png' },
  { weatherCode: '51', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '53', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '55', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '56', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '57', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '61', image: 'https://openweathermap.org/img/wn/10d@2x.png' },
  { weatherCode: '63', image: 'https://openweathermap.org/img/wn/10d@2x.png' },
  { weatherCode: '65', image: 'https://openweathermap.org/img/wn/10d@2x.png' },
  { weatherCode: '66', image: 'https://openweathermap.org/img/wn/10d@2x.png' },
  { weatherCode: '67', image: 'https://openweathermap.org/img/wn/10d@2x.png' },
  { weatherCode: '71', image: 'https://openweathermap.org/img/wn/13d@2x.png' },
  { weatherCode: '73', image: 'https://openweathermap.org/img/wn/13d@2x.png' },
  { weatherCode: '75', image: 'https://openweathermap.org/img/wn/13d@2x.png' },
  { weatherCode: '77', image: 'https://openweathermap.org/img/wn/13d@2x.png' },
  { weatherCode: '80', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '81', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '82', image: 'https://openweathermap.org/img/wn/09d@2x.png' },
  { weatherCode: '85', image: 'https://openweathermap.org/img/wn/13d@2x.png' },
  { weatherCode: '86', image: 'https://openweathermap.org/img/wn/13d@2x.png' },
  { weatherCode: '95', image: 'https://openweathermap.org/img/wn/11d@2x.png' },
  { weatherCode: '96', image: 'https://openweathermap.org/img/wn/11d@2x.png' },
  { weatherCode: '99', image: 'https://openweathermap.org/img/wn/11d@2x.png' },
])(
  'should render the correct image for weather code: $weatherCode',
  ({weatherCode, image}) => {
    expect(getWeatherImage(weatherCode as WeatherCode)).toEqual(image);
  },
);
// Test cases for invalid weather codes
test.each([
  {weatherCode: '100', expectedImage: 'https://openweathermap.org/img/wn/01d@2x.png'},
  {weatherCode: 'abc', expectedImage: 'https://openweathermap.org/img/wn/01d@2x.png'},
  {weatherCode: '999', expectedImage: 'https://openweathermap.org/img/wn/01d@2x.png'},
])(
  'should return the default image for unknown weather code: $weatherCode',
  ({weatherCode, expectedImage}) => {
    expect(getWeatherImage(weatherCode as WeatherCode)).toEqual(expectedImage);
  },
);
