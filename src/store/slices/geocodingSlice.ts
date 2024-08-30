import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface GeocodingState {
  locationData: GeocodingData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface GeocodingData {
  results: GeocodingResult[];
}

export interface GeocodingResult {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

const initialState: GeocodingState = {
  locationData: { results: [] },
  status: 'idle',
  error: null,
};

export const fetchGeocoding = createAsyncThunk<GeocodingData, string, {}>(
  'geocoding/fetchGeocoding',
  async (locationName: string) => {
    const response = await axios.get<GeocodingData>(
      `https://geocoding-api.open-meteo.com/v1/search`,
      {
        params: {
          name: locationName,
        },
      }
    );
    return response.data;
  }
);

const geocodingSlice = createSlice({
  name: 'geocoding',
  initialState,
  reducers: {
    resetState: (state) => {
      state.locationData = initialState.locationData;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeocoding.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGeocoding.fulfilled, (state, action: PayloadAction<GeocodingData>) => {
        state.status = 'succeeded';
        state.locationData = action.payload;
      })
      .addCase(fetchGeocoding.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch location data';
      });
  },
});

export const { resetState } = geocodingSlice.actions;
export default geocodingSlice.reducer;
