import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMediaSearchResponse, IMediaSearchState } from "./interfaces/mediaSearch.interfaces";

const initialState: IMediaSearchState = {
    data: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
    },
    isLoading: false,
    error: false,
}

export const mediaSearchSlice = createSlice({
    name: 'mediaSearch',
    initialState,
    reducers: {
        getMediaSearchStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getMediaSearchSuccess: (state, {payload}: PayloadAction<IMediaSearchResponse>) => {
            state.isLoading = false;
            state.data = payload;
            state.error = false;
        },
        getMediaNextPage: (state, {payload}: PayloadAction<IMediaSearchResponse>) => {
            state.isLoading = false;
            state.data = {
                ...payload,
                results: [
                    ...state.data.results,
                    ...payload.results.filter(newMedia => !state.data.results.some(media => media.id === newMedia.id))
                ]
            };
            state.error = false;
        },
        getMediaSearchError: (state) => {
            state.isLoading = false;
            state.error = true;
        },

    }
});

export const {getMediaSearchStart, getMediaSearchSuccess, getMediaSearchError, getMediaNextPage} = mediaSearchSlice.actions;