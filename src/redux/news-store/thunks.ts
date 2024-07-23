import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

const API_URL = 'https://api.collectapi.com/news/getNews?country=tr&tag=general';
interface NewsItem {
  key: string;
  url: string;
  description: string;
  image: string;
  name: string;
  source: string;
}

interface NewsResponse {
  success: boolean;
  result: NewsItem[];
}

export const fetchNews = createAsyncThunk<NewsResponse, number>('fetchNews', async (pageNumber, { rejectWithValue }) => {
  const response: any = await api.get(`${API_URL}&paging=${pageNumber}`);
  console.log(response);
  if (response?.status === 200) {
    return response?.data;
  } else if (response?.status !== 200) {
    return rejectWithValue('Hata');
  }
});
