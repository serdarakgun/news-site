import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReligion } from './thunks';
import { fetchRssNews } from '@/src/redux';

interface ReligionItem {
  saat: string;
  vakit: string;
}

interface ReligionResponse {
  success: boolean;
  result: ReligionItem[];
}

interface ReligionState {
  result: ReligionItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReligionState = {
  result: [],
  status: 'idle',
  error: null,
};

export const religionSlice = createSlice({
  name: 'religion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReligion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReligion.fulfilled, (state, action: PayloadAction<ReligionResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchReligion.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
