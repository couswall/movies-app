import { useEffect, useState } from "react";

interface FetchResult {
    data: any, 
    isLoading: boolean, 
    hasError: null | string, 
}


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
        
        
        const resp = await fetch(url);
        const data = await resp.json();
        // console.log(data);

        setIsState({
            data, 
            isLoading: false,
            hasError: null,
        });
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