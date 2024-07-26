import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGold } from './thunks';

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

interface GoldState {
  result: GoldItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pageNumber: number; // Add pageNumber to track current page
}

const initialState: GoldState = {
  result: [],
  status: 'idle',
  error: null,
  pageNumber: 0, // Initial page number
};

export const goldSlice = createSlice({
  name: 'gold',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGold.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGold.fulfilled, (state, action: PayloadAction<GoldResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchGold.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
