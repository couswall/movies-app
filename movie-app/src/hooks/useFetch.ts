import { useEffect, useState } from "react";

export const useFetch = ( url: string ) => {

    const [ isState, setIsState ] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    })
  
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
            hasError:null
        });
    }

    useEffect(()=> {
     
        getFetch();
    
    }, [url]);

    return{
        data: isState.data,
        isLoading: isState.isLoading,
        hasError: isState.hasError,
    };
}