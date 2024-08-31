import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getMoviesError, getMoviesStart, getMoviesSuccess, RootState } from '../store';

const TMBD_TOKEN = import.meta.env.VITE_API_KEY; 

export const useMovies = () => {
    const { movies, isLoading, error} = useSelector((state: RootState) => state.movies);
    const dispatch: AppDispatch = useDispatch();

    const startGettingMovies = async (page: number) => {
        dispatch(getMoviesStart());
        try {
            const response = await fetch(`
                https://api.themoviedb.org/3/movie/popular?api_key=${TMBD_TOKEN}&page=${page}
            `);
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
