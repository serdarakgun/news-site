import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

interface ExchangeItem {
  name: string;
  code: string;
  buying: number;
  buyingstr: string;
  selling: number;
  sellingstr: string;
  time: string;
  date: string;
  datetime: string;
  rate: number;
  calculated: number;
}

interface ExchangeResponse {
  success: boolean;
  result: ExchangeItem[];
}

export const fetchExchange = createAsyncThunk<ExchangeResponse, void, { rejectValue: string }>('fetchGold', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<ExchangeResponse>('https://api.collectapi.com/economy/allCurrency');
    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue('Hata');
    }
  } catch (error) {
    return rejectWithValue('Hata');
  }
});
