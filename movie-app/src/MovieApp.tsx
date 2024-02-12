import { useFetch } from "./hooks/useFetch"
import { AppRouter } from "./router/AppRouter"

// interface FetchHook {
//     data: any ,
//     isLoading: boolean, 
// }

export const MovieApp = () => {

    // const apiKey = 'c187980b04a74e018b7ed5238b12bbe8';
    // const { data, isLoading } = useFetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);

    // const { results } = !!data && data;

    // console.log( results );
    
  return (
    <>
        <AppRouter/>
    </>
  )
}
