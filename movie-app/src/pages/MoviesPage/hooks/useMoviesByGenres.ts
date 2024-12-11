import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, getMoviesByGenreStart, getMoviesByGenreSuccess, getMoviesByGenreError, getMoviesByGenreNextPage } from '../../../store';
import { urlWeb } from "../../../constants/apiEndpoints";
import { MOVIES_PAGE } from "../../constants/MoviesPage.constants";

const TMBD_TOKEN = import.meta.env.VITE_API_KEY;

interface IGetMoviesByFilterParams {
    genre: number | string;
    page: number;
    sortBy: string;
}

export const useMoviesByGenres = () => {
    const {moviesByGenre,isLoading, error} = useSelector((state: RootState) => state.moviesByGenre);    
    const dispatch: AppDispatch = useDispatch();

    const getMoviesByGenre = async(filters: IGetMoviesByFilterParams) => {
        const {genre, page, sortBy} = filters;
        dispatch(getMoviesByGenreStart());

        let filterQueriesUrl = '';

        if (genre !== MOVIES_PAGE.DEFAULT_SELECT_VALUE) {
            filterQueriesUrl += `&with_genres=${genre}`;
        }
        
        if (sortBy !== MOVIES_PAGE.DEFAULT_SELECT_VALUE) {
            filterQueriesUrl += `&sort_by=${sortBy}`;
        }

        try {
            const response = await fetch(
                urlWeb.getMoviesByGenres + `?api_key=${TMBD_TOKEN}&page=${page}${filterQueriesUrl}`
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
    };

    

    return{
        moviesByGenre,
        isLoading,
        error,

        getMoviesByGenre,
    }
}
