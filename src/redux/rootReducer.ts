import { combineReducers } from '@reduxjs/toolkit';
import { toastMessageSlice } from '@/src/redux/toastMessage-store';
import { newsSlice } from './news-store/store';
import { rssNewsSlice } from '@/src/redux/rssNews-store';
import { footballLeaguesSlice } from '@/src/redux/footballLeagues-store';
import { footballLeagueRankingSlice } from '@/src/redux/FootballLeagueRanking-store';
export const rootReducer = combineReducers({
  toastMessageReducer: toastMessageSlice.reducer,
  news: newsSlice.reducer,
  rssNews: rssNewsSlice.reducer,
  footballLeagues: footballLeaguesSlice.reducer,
  footballLeagueRankings: footballLeagueRankingSlice.reducer,
});
