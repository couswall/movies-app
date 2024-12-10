import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoviesByGenresState, ResultMoviesByGenre } from "./interfaces/moviesByGenre.interface";

const initialState: MoviesByGenresState = {
    moviesByGenre: [],
    isLoading: false,
    error: false,
};

export const moviesByGenreSlice = createSlice({
    name: 'moviesByGenre',
    initialState,
    reducers:{
        getMoviesByGenreStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getMoviesByGenreSuccess: (state, {payload}: PayloadAction<ResultMoviesByGenre[]>) => {
            state.isLoading = false;
            state.moviesByGenre = payload;
            state.error = false;
        },
        getMoviesByGenreNextPage: (state, {payload}: PayloadAction<ResultMoviesByGenre[]>) => {
            state.isLoading = false;
            state.moviesByGenre = [
                ...state.moviesByGenre,
                ...payload.filter((newMovie: ResultMoviesByGenre) => !state.moviesByGenre.some(movie => movie.id === newMovie.id))
            ];
            state.error = false;
        },       
        getMoviesByGenreError: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    }
});

export const {getMoviesByGenreStart, getMoviesByGenreSuccess, getMoviesByGenreError, getMoviesByGenreNextPage} = moviesByGenreSlice.actions;