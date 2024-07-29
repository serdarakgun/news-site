import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFilm } from './thunks';

interface FilmItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface FilmResponse {
  success: boolean;
  result: FilmItem[];
}

interface FilmState {
  result: FilmItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FilmState = {
  result: [],
  status: 'idle',
  error: null,
};

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilm.fulfilled, (state, action: PayloadAction<FilmResponse>) => {
        state.status = 'succeeded';
        state.result = action.payload.result;
      })
      .addCase(fetchFilm.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
