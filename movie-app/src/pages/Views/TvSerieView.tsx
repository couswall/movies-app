import { ScrollRestoration, useParams } from "react-router-dom";
import { getMediaById } from "../../helpers";
import { useFetch } from "../../hooks/useFetch";
import { Recommended, Similar, TvDetails, VideoSection } from "./components";

export const TvSerieView = () => {

  const { tvId = '' } = useParams() as { tvId: string}; 
  const { data, isLoading } = getMediaById('tv', tvId ); 
  const { data: videoData, isLoading: isLoadingVideos } = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/videos`);
  const { data: similarMedia, isLoading: isLoadingSimilar } = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/similar`);
  const { data: recommendedMedia, isLoading: isLoadingRecommended} = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations`);

  return (
    <>
      <TvDetails
        data={ data }
        isLoading={ isLoading }
        videoData = { videoData }
        mediaTypeApi='tv'
        tvId={ tvId } 
      />
      
      <VideoSection 
        videoData = { videoData } 
        isLoadingVideos = { isLoadingVideos }
      />

      <Similar 
        similarMedia = { similarMedia } 
        isLoadingSimilar = {isLoadingSimilar}
        mediaTypeApi='tv'
        mediaTitle = 'Shows'
      />
      
      <Recommended 
        recommendedMedia = {recommendedMedia} 
        isLoadingRecommended={isLoadingRecommended}
        mediaTitle = 'Shows'
      />

      <ScrollRestoration />
    </>
  )
}
