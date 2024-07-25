import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeather } from './thunks';
import { fetchRssNews } from '@/src/redux';

interface WeatherItem {
  date: string;
  day: string;
  icon: string;
  description: string;
  status: string;
  degree: string;
  min: string;
  max: string;
  night: string;
  humidity: string;
}

interface WeatherResponse {
  success: boolean;
  result: WeatherItem[];
}

interface WeatherState {
  result: WeatherItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  result: [],
  status: 'idle',
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchWeather.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
