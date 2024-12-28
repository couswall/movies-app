import { ScrollRestoration, useParams } from "react-router-dom";
import { getMediaById } from "../../helpers";
import { useFetch } from "../../hooks/useFetch";
import { Recommended, Similar, TvDetails, VideoSection } from "./components";
import { MEDIA_TYPE, MEDIA_TYPES_TITLES } from "../constants/HomePage.constants";

export const TvSerieView = () => {

  const { tvId = '' } = useParams(); 
  const { data, isLoading } = getMediaById(MEDIA_TYPE.TV, tvId ); 
  const { data: videoData, isLoading: isLoadingVideos } = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/videos`);
  const { data: similarMedia, isLoading: isLoadingSimilar } = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/similar`);
  const { data: recommendedMedia, isLoading: isLoadingRecommended} = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations`);

  return (
    <>
      <TvDetails
        data={ data }
        isLoading={ isLoading }
        videoData = { videoData }
        mediaTypeApi={MEDIA_TYPE.TV}
        tvId={ tvId } 
      />
      
      <VideoSection 
        videoData = { videoData } 
        isLoadingVideos = { isLoadingVideos }
      />

      <Similar 
        similarMedia = { similarMedia } 
        isLoadingSimilar = {isLoadingSimilar}
        mediaTypeApi={MEDIA_TYPE.TV}
        mediaTitle = {MEDIA_TYPES_TITLES.SHOWS}
      />
      
      <Recommended 
        recommendedMedia = {recommendedMedia} 
        isLoadingRecommended={isLoadingRecommended}
        mediaTitle = {MEDIA_TYPES_TITLES.SHOWS}
      />

      <ScrollRestoration />
    </>
  )
}
