import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/util/api';

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

export const fetchFilm = createAsyncThunk<FilmResponse, { film: string; year: string }, { rejectValue: any }>(
  'fetchFilm',
  async ({ film, year }, { rejectWithValue }) => {
    try {
      const response = await api.get(`https://api.collectapi.com/imdb/imdbSearchByName?query=${film}&year=${year}&type=movie`);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      const data: FilmResponse = response.data;
      return data;
    } catch (error) {
      return rejectWithValue('hata');
    }
  }
);
