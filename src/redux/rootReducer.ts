import { combineReducers } from '@reduxjs/toolkit';
import { toastMessageSlice } from '@/src/redux/toastMessage-store';
import { newsSlice } from './news-store/store';
import { rssNewsSlice } from '@/src/redux/rssNews-store';
import { footballLeaguesSlice } from '@/src/redux/footballLeagues-store';
import { footballLeagueRankingSlice } from '@/src/redux/FootballLeagueRanking-store';
import { religionSlice } from '@/src/redux/religion-store';
import { weatherSlice } from '@/src/redux/weather-store';
import { goldSlice } from '@/src/redux/gold-store';
export const rootReducer = combineReducers({
  toastMessageReducer: toastMessageSlice.reducer,
  news: newsSlice.reducer,
  rssNews: rssNewsSlice.reducer,
  footballLeagues: footballLeaguesSlice.reducer,
  footballLeagueRankings: footballLeagueRankingSlice.reducer,
  religion: religionSlice.reducer,
  weather: weatherSlice.reducer,
  gold: goldSlice.reducer,
});
