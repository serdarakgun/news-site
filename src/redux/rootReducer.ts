import { combineReducers } from '@reduxjs/toolkit';
import { toastMessageSlice } from '@/src/redux/toastMessage-store';
import { newsSlice } from './news-store/store';
export const rootReducer = combineReducers({
  toastMessageReducer: toastMessageSlice.reducer,
  news: newsSlice.reducer
});
