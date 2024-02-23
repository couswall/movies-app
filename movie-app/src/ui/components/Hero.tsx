import { Loading } from ".";
import { useFetch } from "../../hooks/useFetch";

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
                      <h1 className="text-white font-weight-bolder">Welcome</h1>
                      <p className="text-white text-break fs-4">Millions of movies, TV shows and people to discover. Explore Now</p>
                      
                      <form className="mb-4 mt-4 w-60 mx-auto d-flex">
                          <input    
                          type="text" 
                          className="form-control me-2" 
                          placeholder="Search"
                          autoComplete= "off"
                          />
                          <button className="btn btn-outline-secondary text-white">Search</button>
                      </form>
                  </div>
                </div>
              </section>
        }
    </>
  )
}
