import { Loading, SearchInput } from ".";
import { useFetch } from "../../hooks/useFetch";
import { HERO } from "./constants";

import './styles';

export const Hero = () => {

  const url: string = `https://api.themoviedb.org/3/movie/now_playing`;
 
  const { data, isLoading } = useFetch( url );
  const { results } = !!data && data; 

  const randomIndex = Math.floor( Math.random() * 20 );
  const backdropPath = results?.[randomIndex]?.backdrop_path;

  return (
    <>  
        {
          ( isLoading )
            ? <Loading/>
            : <section 
                className="hero bg-image text-center" 
                style={{ 
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${ backdropPath })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh'
                }}>


                <div 
                  className="mask h-100 w-100 d-flex flex-column justify-content-center align-items-center" 
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)'}}>

                  <div className="p-3">
                      <h1 className="text-white font-weight-bolder">{HERO.WELCOME}</h1>
                      <p className="text-white text-break fs-4">{HERO.DESCRIPTION}</p>
                      <SearchInput searchInput=""/>
                  </div>
                </div>
              </section>
        }
    </>
  )
}
