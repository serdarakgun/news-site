import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

const API_URL = 'https://api.collectapi.com/football/league?data.league=';

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

export const fetchFootballLeagueRanking = createAsyncThunk<
  LeagueRankingResponse,
  string,
  { rejectValue: string } // Define rejectValue as string for error messages
>(
  'footballLeagueRanking/fetch', // Changed to follow convention of 'namespace/action'
  async (league: string, { rejectWithValue }) => {
    try {
      const response: any = await api.get(`${API_URL}${league}`);

      if (response.ok) {
        // Use response.ok for status code checks
        const data: LeagueRankingResponse = await response.json();
        return data;
      } else {
        // Handle the case when response is not successful
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);
