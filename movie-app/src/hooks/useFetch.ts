import { useEffect, useState } from "react";

interface FetchResult {
    data: any, 
    isLoading: boolean, 
    hasError: null | string | Error, 
}

const TMBD_TOKEN = import.meta.env.VITE_API_KEY; 

export const useFetch = ( url: string, page: string = ''): FetchResult => {

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
            const resp = await fetch( url + `?api_key=${TMBD_TOKEN}` + page );
            const data = await resp.json();            

            if(data.success === false) throw new Error(data.status_message);

            setIsState({
                data, 
                isLoading: false,
                hasError: null,
            });
        } catch (error) {
            setIsState({
                ...isState,
                isLoading: false,
                hasError: error instanceof Error ? error.message : String(error)
            })
        }
        

    }

    useEffect(()=> {
        getFetch();
    }, [ url, page ]);

    return{
        data: isState.data,
        isLoading: isState.isLoading,
        hasError: isState.hasError,
    };
}