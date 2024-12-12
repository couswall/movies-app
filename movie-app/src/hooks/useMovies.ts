import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getMoviesError, getMoviesStart, getMoviesSuccess, RootState } from '../store';
import { urlWeb } from '../constants/apiEndpoints';

const TMBD_TOKEN = import.meta.env.VITE_API_KEY; 

export const useMovies = () => {
    const { movies, isLoading, error} = useSelector((state: RootState) => state.movies);
    const dispatch: AppDispatch = useDispatch();

    const startGettingMovies = async (page: number) => {
        dispatch(getMoviesStart());
        const url: string = `${urlWeb.moviesPage}?api_key=${TMBD_TOKEN}&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch(getMoviesSuccess(data.results));
        } catch (error) {
            dispatch(getMoviesError());
        }
    };

    return{
        movies,
        isLoading,
        error,

        startGettingMovies,
    }
}
