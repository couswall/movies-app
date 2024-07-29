import { ScrollRestoration, useParams } from "react-router-dom"
import { getMediaById } from "../../helpers";
import { Details, Recommended, Similar, VideoSection } from "./components";
import { useFetch, useUiStore } from "../../hooks/";

export const MovieView = () => {

  const { movieId = '' } = useParams() as { movieId: string}; 
  const { isVideoModalOpen, openVideoModal } = useUiStore();


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
        isVideoModalOpen = { isVideoModalOpen }
        openVideoModal = {openVideoModal}
      />
      
      <VideoSection 
        videoData = { videoData } 
        isLoadingVideos = { isLoadingVideos }
        isVideoModalOpen = { isVideoModalOpen }
        openVideoModal = {openVideoModal}
      />

      <Similar 
        similarMedia = { similarMedia } 
        isLoadingSimilar = {isLoadingSimilar}
        mediaTitle = 'Movies'
        mediaTypeApi='movie' 
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
