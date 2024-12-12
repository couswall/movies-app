import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITvShowsState, ITvShows, TvShowsResponse } from "./interfaces/tvShows.interfaces";

const initialState: ITvShowsState = {
    tvResponse: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
    },
    tvShows: [],
    isLoading: false,
    error: false,
}

export const tvShowsSlice = createSlice({
    name: 'tvShows',
    initialState,
    reducers: {
        getTvShowsStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getTvShowsSuccess: (state, {payload}: PayloadAction<TvShowsResponse>) => {
            state.isLoading = false;
            state.tvShows = [
                ...state.tvShows,
                ...payload.results.filter(
                    (newTvShow: ITvShows) => !state.tvShows.some(tvShow => tvShow.id === newTvShow.id)
                )
            ];
            state.error = false;
        },
        getTvShowsError: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const {getTvShowsStart, getTvShowsSuccess, getTvShowsError} = tvShowsSlice.actions;