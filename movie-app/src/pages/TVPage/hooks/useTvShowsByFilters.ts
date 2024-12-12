import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, getTvShowsByFilterNextPage, getTvShowsByFiltersError, getTvShowsByFiltersStart, getTvShowsByFiltersSuccess, RootState } from "../../../store"
import { urlWeb } from "../../../constants/apiEndpoints";
import { ITvShowsByFiltersResponse } from "../../../store/tvShows/interfaces/tvShowsByFilter.interfaces";
import { TV_SHOWS_PAGE } from "../../constants/TvShowsPage.constants";

const TMBD_TOKEN = import.meta.env.VITE_API_KEY;

interface IGetTvShowsByFiltersParams {
    genre: string;
    page: number;
    sortBy: string;
}

export const useTvShowsByFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const {tvShowsByFilters, isLoading, error} = useSelector((state: RootState) => state.tvShowsByFilters);

  const getTvShowsByFilters = async(filters: IGetTvShowsByFiltersParams) => {
    const {page, genre, sortBy} = filters;
    dispatch(getTvShowsByFiltersStart());
    
    let url: string = urlWeb.tvShowsDiscover + `?api_key=${TMBD_TOKEN}` + `&page=${page}`;
    
    if(genre !== TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE){
        url += `&with_genres=${genre}`
    }

    if (sortBy !== TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE) {
        url += `&sort_by=${sortBy}`
    }

    try {
        
        const response = await fetch(url);
        const data: ITvShowsByFiltersResponse = await response.json();

        if (page === 1) {
            dispatch(getTvShowsByFiltersSuccess(data.results));
        }else{
            dispatch(getTvShowsByFilterNextPage(data.results));
        }
    } catch (error) {
        dispatch(getTvShowsByFiltersError());
    }
  }

  return {
    tvShowsByFilters,
    isLoading,
    error,

    getTvShowsByFilters,
}
}
