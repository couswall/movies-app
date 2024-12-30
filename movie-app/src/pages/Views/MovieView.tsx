import { ScrollRestoration, useParams } from "react-router-dom"
import { getMediaById } from "../../helpers";
import { Details, Recommended, Similar, VideoSection } from "./components";
import { useFetch } from "../../hooks/";
import { MEDIA_TYPE, MEDIA_TYPES_TITLES } from "../constants/HomePage.constants";

export const MovieView = () => {
  const { movieId = '' } = useParams(); 

  const { data, isLoading } = getMediaById(MEDIA_TYPE.MOVIE, movieId );
  const { data: videoData, isLoading: isLoadingVideos } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
  const { data: similarMedia, isLoading: isLoadingSimilar } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/similar`);
  const { data: recommendedMedia, isLoading: isLoadingRecommended} = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`);

  return (

    <>
      <Details 
        data = { data } 
        isLoading={ isLoading } 
        movieId={ movieId } 
        mediaTypeApi= {MEDIA_TYPE.MOVIE} 
        videoData = { videoData }
      />
      
      <VideoSection 
        videoData = { videoData } 
        isLoadingVideos = { isLoadingVideos }
      />

      <Similar 
        similarMedia = { similarMedia } 
        isLoadingSimilar = {isLoadingSimilar}
        mediaTitle = {MEDIA_TYPES_TITLES.MOVIES}
        mediaTypeApi={MEDIA_TYPE.MOVIE} 
      />
      
      <Recommended 
        recommendedMedia = {recommendedMedia} 
        isLoadingRecommended={isLoadingRecommended}
        mediaTitle = {MEDIA_TYPES_TITLES.MOVIES}
      />

      <ScrollRestoration />
    </>
  )
}
