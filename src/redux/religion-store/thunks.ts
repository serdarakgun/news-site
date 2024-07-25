import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

interface ReligionItem {
  saat: string;
  vakit: string;
}

interface ReligionResponse {
  success: boolean;
  result: ReligionItem[];
}

export const fetchReligion = createAsyncThunk<ReligionResponse, string, { rejectValue: any }>(
  'fetchReligion',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`https://api.collectapi.com/pray/all?data.city=${city}`);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      const data: ReligionResponse = response.data;
      return data;
    } catch (error) {
      return rejectWithValue('hata');
    }
  }
);
