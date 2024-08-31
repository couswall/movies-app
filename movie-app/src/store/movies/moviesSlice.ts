import { createSlice } from "@reduxjs/toolkit";
import { MovieObjectResponse } from '../../interfaces/MovieObject';

interface MoviesState {
    movies: MovieObjectResponse[],
    isLoading: boolean,
    error: boolean,
    page: number,
}

const initialState: MoviesState = {
    movies: [],
    isLoading: false,
    error: false,
    page: 1,
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getMoviesStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getMoviesSuccess: (state, {payload}) => {
            state.movies = payload;
            state.isLoading = false;
            state.error = false;
        },
        getMoviesError: (state) => {
            state.error = true;
        },
    },
});

export const {getMoviesStart, getMoviesSuccess, getMoviesError} = moviesSlice.actions;