import { ScrollRestoration, useParams } from "react-router-dom"
import { getMediaById } from "../../helpers";
import { Details, VideoSection } from "./components";
import { useFetch } from "../../hooks/useFetch";


export const MovieView = () => {

  const { movieId = '' } = useParams() as { movieId: string}; 
  const { data, isLoading } = getMediaById('movie', movieId ); 
  const { data: videoData, isLoading: isLoadingVideos } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`)
  
  return (

    <>
      <Details data = { data } isLoading={ isLoading } movieId={ movieId } mediaTypeApi='movie' videoData = { videoData }/>
      <VideoSection videoData = { videoData } isLoadingVideos = { isLoadingVideos }/>
      
      <ScrollRestoration/>
    </>
  )
}
