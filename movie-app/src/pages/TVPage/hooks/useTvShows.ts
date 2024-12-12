import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, getTvShowsError, getTvShowsStart, getTvShowsSuccess, RootState } from "../../../store"
import { urlWeb } from "../../../constants/apiEndpoints";

const TMBD_TOKEN = import.meta.env.VITE_API_KEY;

export const useTvShows = () => {
  const dispatch: AppDispatch = useDispatch();
  const {tvShows, error, isLoading} = useSelector((state: RootState) => state.tvShows);

  const getTvShows = async (page: number) => {
    dispatch(getTvShowsStart());
    const url: string = `${urlWeb.tvShowsDiscover}?api_key=${TMBD_TOKEN}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch(getTvShowsSuccess(data));
    } catch (error) {
        dispatch(getTvShowsError());
    }
  };

  return {
    tvShows,
    isLoading,
    error,

    getTvShows,
  }
}
