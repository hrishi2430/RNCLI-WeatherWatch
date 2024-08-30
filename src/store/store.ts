import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import geocodingReducer from './slices/geocodingSlice';


export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    geocoding: geocodingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
