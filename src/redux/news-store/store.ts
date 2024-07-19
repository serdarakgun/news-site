import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNews } from "./thunks";

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

interface NewsState {
    result: NewsItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    pageNumber: number; // Add pageNumber to track current page
}

const initialState: NewsState = {
    result: [],
    status: "idle",
    error: null,
    pageNumber: 0, // Initial page number
};

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
                state.status = "succeeded";
                state.result = action.payload.result;
            })
            .addCase(fetchNews.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

