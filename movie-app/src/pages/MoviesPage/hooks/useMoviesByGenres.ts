import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, getMoviesByGenreStart, getMoviesByGenreSuccess, getMoviesByGenreError, getMoviesByGenreNextPage } from '../../../store';
import { urlWeb } from "../../../constants/apiEndpoints";

const TMBD_TOKEN = import.meta.env.VITE_API_KEY; 

export const useMoviesByGenres = () => {
    const {moviesByGenre,isLoading, error} = useSelector((state: RootState) => state.moviesByGenre);    
    const dispatch: AppDispatch = useDispatch();

    const getMoviesByGenre = async(genre: number, page: number) => {
        dispatch(getMoviesByGenreStart());

        try {
            const response = await fetch(
                urlWeb.getMoviesByGenres + `?api_key=${TMBD_TOKEN}&with_genres=${genre}&page=${page}`
            );
            const data = await response.json();

            if (page === 1) {
                dispatch(getMoviesByGenreSuccess(data.results));
            }else{
                dispatch(getMoviesByGenreNextPage(data.results));
            }
        } catch (error) {
            dispatch(getMoviesByGenreError());
        }
    }

    return{
        moviesByGenre,
        isLoading,
        error,

        getMoviesByGenre,
    }
}
