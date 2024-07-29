import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchExchange } from './thunks';

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

interface ExchangeState {
  result: ExchangeItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExchangeState = {
  result: [],
  status: 'idle',
  error: null,
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchange.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchange.fulfilled, (state, action: PayloadAction<ExchangeResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchExchange.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
