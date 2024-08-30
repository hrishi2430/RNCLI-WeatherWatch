import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherCode } from '../../helpers/getWeatherImage';

export interface WeatherState {
  weatherData: WeatherData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: WeatherCode;
  };
  current_weather_units: {
    temperature: string;
    windspeed: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: WeatherCode[];
  };
}

const initialState: WeatherState = {
  weatherData: null,
  status: 'idle',
  error: null,
};

export const fetchWeather = createAsyncThunk<WeatherData, { lat: number; lon: number }, {}>(
  'weather/fetchWeather',
  async ({ lat, lon }) => {
    const response = await axios.get<WeatherData>(
      `https://api.open-meteo.com/v1/forecast`,
      {
        params: {
          latitude: lat,
          longitude: lon,
          daily: ['temperature_2m_max', 'temperature_2m_min', 'weathercode'],
          current_weather: true,
          timezone: 'auto',
        },
      }
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer;
