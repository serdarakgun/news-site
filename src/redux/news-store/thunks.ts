import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "6vDtt0ooPL9YwK7K9siJbj:7BXGTrjxuT0N4A7izdyjjm";
const API_URL = "https://api.collectapi.com/news/getNews?country=tr&tag=general";
const pageNumber = 0
interface NewsItem {
    key: string;
    url: string;
    description: string;
    image: string;
    name: string;
    source: string;
  }
  
  interface NewsResponse {
    success: boolean;
    result: NewsItem[];
  }

  export const fetchNews = createAsyncThunk<NewsResponse, number>(
    "fetchNews",
    async (pageNumber, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}&paging=${pageNumber}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `apikey ${API_KEY}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }

            const data: NewsResponse = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
