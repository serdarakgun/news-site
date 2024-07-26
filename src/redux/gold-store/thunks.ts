import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

const API_URL = 'https://api.collectapi.com/news/getNews?country=tr&tag=general';

interface GoldItem {
  name: string;
  buying: number;
  buyingstr: string;
  selling: number;
  sellingstr: string;
  time: string;
  date: string;
  datetime: string;
  rate: number;
}

interface GoldResponse {
  success: boolean;
  result: GoldItem[];
}

export const fetchGold = createAsyncThunk<GoldResponse, void, { rejectValue: string }>('fetchGold', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<GoldResponse>('https://api.collectapi.com/economy/goldPrice');
    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue('Hata');
    }
  } catch (error) {
    return rejectWithValue('Hata');
  }
});
