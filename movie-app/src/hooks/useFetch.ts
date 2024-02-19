import { useEffect, useState } from "react";

interface FetchResult {
    data: any, 
    isLoading: boolean, 
    hasError: null | string | Error, 
}

const TMBD_TOKEN = import.meta.env.VITE_API_KEY; 

export const useFetch = ( url: string ): FetchResult => {

    const [ isState, setIsState ] = useState <FetchResult>({
        data: null,
        isLoading: true,
        hasError: null,
    });
  
    const getFetch = async () =>{
        
        setIsState({
            ...isState,
            isLoading: true
        });
        
        try {
            const resp = await fetch( url + `?api_key=${TMBD_TOKEN}` );
            const data = await resp.json();
            
            // console.log(data);
            setIsState({
                data, 
                isLoading: false,
                hasError: null,
            });
            
        } catch (error) {
           
            setIsState({
                ...isState,
                hasError: error instanceof Error ? error.message : String(error)
            })
        }
        

    }

    useEffect(()=> {
     
        getFetch();
    
    }, [ url ]);

    return{
        data: isState.data,
        isLoading: isState.isLoading,
        hasError: isState.hasError,
    };
}