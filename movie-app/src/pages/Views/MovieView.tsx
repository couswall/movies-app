import { ScrollRestoration, useParams } from "react-router-dom"
import { getMediaById } from "../../helpers";
import { Details, Recommended, Similar, VideoSection } from "./components";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";


export const MovieView = () => {

  const { movieId = '' } = useParams() as { movieId: string}; 
  const [ showPopUpVideo , setShowPopUpVideo ] = useState<boolean>( false ); 
  const { data, isLoading } = getMediaById('movie', movieId ); 
  const { data: videoData, isLoading: isLoadingVideos } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
  const { data: similarMedia, isLoading: isLoadingSimilar } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/similar`);
  const { data: recommendedMedia, isLoading: isLoadingRecommended} = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`);

  return (

    <>
      <Details 
        data = { data } 
        isLoading={ isLoading } 
        movieId={ movieId } 
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
        mediaTitle = 'Movies'
      />
      
      <Recommended 
        recommendedMedia = {recommendedMedia} 
        isLoadingRecommended={isLoadingRecommended}
        mediaTitle = 'Movies'
      />

      <ScrollRestoration />
    </>
  )
}
