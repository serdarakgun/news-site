import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

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

export const fetchWeather = createAsyncThunk<WeatherResponse, string, { rejectValue: any }>(
  'fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${city}`);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      const data: WeatherResponse = response.data;
      return data;
    } catch (error) {
      return rejectWithValue('hata');
    }
  }
);
