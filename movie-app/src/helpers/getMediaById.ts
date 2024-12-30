import { useFetch } from "../hooks/useFetch";

export const getMediaById = ( mediaType: string, mediaId: string ) => {
    
    const url = `https://api.themoviedb.org/3/${ mediaType }/${mediaId}`; 

    const { data, isLoading, hasError } = useFetch( url );
    
    return {
        data, 
        isLoading,
        hasError,
    }
}
