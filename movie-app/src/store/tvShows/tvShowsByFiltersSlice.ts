import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITvShowsByFiltersState, ITvShowsByFilters } from './interfaces/tvShowsByFilter.interfaces';

const initialState: ITvShowsByFiltersState = {
    tvShowsByFilters: [],
    isLoading: false,
    error: false,
}

export const tvShowsByFiltersSlice = createSlice({
    name: 'tvShowsByFilters',
    initialState,
    reducers: {
        getTvShowsByFiltersStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getTvShowsByFiltersSuccess: (state, {payload}: PayloadAction<ITvShowsByFilters[]>) => {
            state.isLoading = false;
            state.tvShowsByFilters = payload;
            state.error = false;
        },
        getTvShowsByFilterNextPage: (state, {payload}: PayloadAction<ITvShowsByFilters[]>) => {
            state.isLoading = false;
            state.tvShowsByFilters = [
                ...state.tvShowsByFilters,
                ...payload.filter((newTvShow: ITvShowsByFilters) => !state.tvShowsByFilters.some(tvShow => tvShow.id === newTvShow.id))
            ];
            state.error = false;
        },
        getTvShowsByFiltersError: (state) => {
            state.isLoading = false;
            state.error = true;
        }
        
    }
});

export const {getTvShowsByFiltersStart, getTvShowsByFiltersSuccess, getTvShowsByFiltersError, getTvShowsByFilterNextPage} = tvShowsByFiltersSlice.actions;