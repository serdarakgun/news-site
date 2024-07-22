import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRssNews } from './thunks';

interface RssNewsItem {
  key: string;
  url: string;
  description: string;
  image: string;
  name: string;
  source: string;
}

interface RssNewsResponse {
  success: boolean;
  result: RssNewsItem[];
}

interface RssNewsState {
  result: RssNewsItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pageNumber: number; // Add pageNumber to track current page
}

const initialState: RssNewsState = {
  result: [],
  status: 'idle',
  error: null,
  pageNumber: 0, // Initial page number
};

export const rssNewsSlice = createSlice({
  name: 'rssNews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRssNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRssNews.fulfilled, (state, action: PayloadAction<RssNewsResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchRssNews.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
