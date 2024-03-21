import { useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import { getMediaById } from "../../helpers";
import { useFetch } from "../../hooks/useFetch";
import { Details, Recommended, Similar, VideoSection } from "./components";

export const TvSerieView = () => {

  const { tvId = '' } = useParams() as { tvId: string}; 
  const [ showPopUpVideo , setShowPopUpVideo ] = useState<boolean>( false ); 
  const { data, isLoading } = getMediaById('tv', tvId ); 
  const { data: videoData, isLoading: isLoadingVideos } = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/videos`);
  const { data: similarMedia, isLoading: isLoadingSimilar } = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/similar`);
  const { data: recommendedMedia, isLoading: isLoadingRecommended} = useFetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations`);

  return (
    <>
      <Details 
        data = { data } 
        isLoading={ isLoading } 
        movieId={ tvId } 
        mediaTypeApi='movie' 
        videoData = { videoData }
        showPopUpVideo = { showPopUpVideo }
        setShowPopUpVideo={ setShowPopUpVideo }
      />
      
      <VideoSection 
        videoData = { videoData } 
        isLoadingVideos = { isLoadingVideos }
        showPopUpVideo = { showPopUpVideo }
        setShowPopUpVideo={ setShowPopUpVideo }
      />

      <Similar 
        similarMedia = { similarMedia } 
        isLoadingSimilar = {isLoadingSimilar}
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
