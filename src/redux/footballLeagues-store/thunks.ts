import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

const API_URL = 'https://api.collectapi.com/football/leaguesList';

interface LeagueItem {
  key: string;
  league: string;
}

interface LeagueResponse {
  success: boolean;
  result: LeagueItem[];
}

export const fetchFootballLeagues = createAsyncThunk<LeagueResponse, void, { rejectValue: any }>(
  'footballLeagues',
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await api.get(API_URL);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data: LeagueResponse = await response.json();

      // Take only the first 11 items from the result array
      const filteredData: LeagueResponse = {
        ...data,
        result: data.result.slice(0, 12),
      };

      return filteredData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
