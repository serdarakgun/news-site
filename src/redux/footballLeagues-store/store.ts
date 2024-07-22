import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFootballLeagues } from './thunks';

interface LeagueItem {
  key: string;
  league: string;
}

interface LeagueResponse {
  success: boolean;
  result: LeagueItem[];
}

interface LeagueState {
  result: LeagueItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeagueState = {
  result: [],
  status: 'idle',
  error: null,
  // Initial page number
};

export const footballLeaguesSlice = createSlice({
  name: 'footballLeagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFootballLeagues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFootballLeagues.fulfilled, (state, action: PayloadAction<LeagueResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchFootballLeagues.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
