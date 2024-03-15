import { ScrollRestoration, useParams } from "react-router-dom"
import { getMediaById } from "../../helpers";
import { Details } from "./components";
import { useFetch } from "../../hooks/useFetch";


export const MovieView = () => {

  const { movieId = '' } = useParams() as { movieId: string}; 
  const { data, isLoading } = getMediaById('movie', movieId ); 
  const { data: videoData } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`)
  
  return (

    <>
      <Details data = { data } isLoading={ isLoading } movieId={ movieId } mediaTypeApi='movie' videoData = { videoData }/>
    
      
      <ScrollRestoration/>
    </>
  )
}
