import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFootballLeagueRanking } from './thunks';

interface LeagueRankingItem {
  rank: string;
  lose: string;
  win: string;
  play: string;
  point: string;
  team: string;
}

interface LeagueRankingResponse {
  success: boolean;
  result: LeagueRankingItem[];
}

interface LeagueRankingState {
  result: LeagueRankingItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeagueRankingState = {
  result: [],
  status: 'idle',
  error: null,
  // Initial page number
};

export const footballLeagueRankingSlice = createSlice({
  name: 'footballLeagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFootballLeagueRanking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFootballLeagueRanking.fulfilled, (state, action: PayloadAction<LeagueRankingResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchFootballLeagueRanking.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
