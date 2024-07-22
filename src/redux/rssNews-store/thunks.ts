import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '6vDtt0ooPL9YwK7K9siJbj:7BXGTrjxuT0N4A7izdyjjm';

interface RssNewsItem {
  key: string;
  url: string;
  description: string;
  image: string;
  name: string;
  source: string;
}

interface RssNewsResponse {
  success: boolean;
  result: RssNewsItem[];
}

export const fetchRssNews = createAsyncThunk<RssNewsResponse, string, { rejectValue: any }>(
  'fetchRssNews',
  async (rss: string, { rejectWithValue }) => {
    try {
      console.log(encodeURIComponent(rss));
      const response = await fetch(`https://api.collectapi.com/news/getNewsfromRSS?data.rss_url=http%3A%2F%2Fwww.webrazzi.com%2Ffeed%2F`, {
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

      const data: RssNewsResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
