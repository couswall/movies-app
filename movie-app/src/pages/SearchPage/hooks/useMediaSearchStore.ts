import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, getMediaNextPage, getMediaSearchError, getMediaSearchStart, getMediaSearchSuccess, RootState } from "../../../store"
import { urlWeb } from "../../../constants/apiEndpoints";

const TMBD_TOKEN = import.meta.env.VITE_API_KEY;

export const useMediaSearchStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const {data, isLoading, error} = useSelector((state: RootState) => state.mediaSearch);

  const getMediaSearch = async (searchingText: string, page: number) => {
    dispatch(getMediaSearchStart());
    const url: string = `${urlWeb.mediaSearch}?api_key=${TMBD_TOKEN}&query=${searchingText}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            dispatch(getMediaSearchSuccess(data));
        } else {
            dispatch(getMediaNextPage(data));
        }
    } catch (error) {
        dispatch(getMediaSearchError());
    }
  };
  

  return {
    data,
    isLoading,
    error,

    getMediaSearch,
  }

}
