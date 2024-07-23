import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

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

export const fetchFootballLeagueRanking = createAsyncThunk<LeagueRankingResponse, string, { rejectValue: any }>(
  'footballLeagueRanking',
  async (league: string, { rejectWithValue }) => {
    try {
      const response: any = await api.get(API_URL + league);
      const data: LeagueRankingResponse = await response.json();

      if (response?.statusCode === 200) {
        return data;
      } else {
        return rejectWithValue(error);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
