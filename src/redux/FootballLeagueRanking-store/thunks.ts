import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '6vDtt0ooPL9YwK7K9siJbj:7BXGTrjxuT0N4A7izdyjjm';
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
      const response = await fetch(API_URL + league, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `apikey ${API_KEY}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data: LeagueRankingResponse = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
