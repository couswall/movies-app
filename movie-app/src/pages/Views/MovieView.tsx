import { useParams } from "react-router-dom"
import { getMediaById } from "../../helpers";
import { Details } from "./components";


export const MovieView = () => {

  const { movieId = '' } = useParams() as { movieId: string}; 

  const { data, isLoading } = getMediaById('movie', movieId ); 
  
  return (

    <Details data = { data } isLoading={ isLoading } movieId={ movieId }/>
    
  )
}
