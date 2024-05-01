import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewsItem, NewsState } from "../types/types";
import {RootState} from "../app/store";
import {ITEM_URL, NEW_STORIES_URL} from "../shared/constants";

export const fetchNewsIds = createAsyncThunk<number[]>(
    'news/fetchIds',
    async () => {
        const response = await axios.get<number[]>(NEW_STORIES_URL);
        return response.data.slice(0, 100);
    }
);

export const fetchNewsDetails = createAsyncThunk<NewsItem[], number[], { state: RootState }>(
    'news/fetchDetails',
    async (ids, { getState }) => {
        const existingIds = getState().news.news.map(item => item.id);
        const newIds = ids.filter(id => !existingIds.includes(id));
        const requests = newIds.map(id =>
            axios.get<NewsItem>(`${ITEM_URL}${id}.json`)
        );
        const responses = await Promise.all(requests);
        return responses.map(res => res.data);
    }
);

const initialState: NewsState = {
    ids: [],
    news: [],
    status: 'idle',
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsIds.fulfilled, (state, action: PayloadAction<number[]>) => {
                const newIds = action.payload;
                state.news = state.news.filter(newsItem => newIds.includes(newsItem.id));
                state.ids = newIds;
            })
            .addCase(fetchNewsDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsDetails.fulfilled, (state, action: PayloadAction<NewsItem[]>) => {
                action.payload.forEach(newsItem => {
                    if (!state.news.some(existingItem => existingItem.id === newsItem.id)) {
                        state.news.push(newsItem);
                    }
                });
                state.status = 'succeeded';
            })
            .addCase(fetchNewsDetails.rejected, (state) => {
                state.status = 'failed';
            });
    },
});


export default newsSlice.reducer;
