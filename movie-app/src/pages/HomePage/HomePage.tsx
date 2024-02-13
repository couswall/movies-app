import { useFetch } from "../../hooks/useFetch"



export const HomePage = () => {

  const apiKey: string = 'c187980b04a74e018b7ed5238b12bbe8';
  const url: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${ apiKey }&page=1`;
 
  const { data, isLoading } = useFetch( url );

  const randomIndex = Math.floor( Math.random() * 20 );

  
  
  return (
    <>
          { isLoading && 
              <div className="container vh-100 w-100 d-flex justify-content-center align-items-center ">
                <div className="spinner-border text-light " role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
              </div>
          }

          {
            data && 
            
            <section 
              className="hero bg-image text-center" 
              style={{ 
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.results[randomIndex].backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                height: '70vh'
              }}>


            <div className="mask h-100 w-100 d-flex flex-column justify-content-center align-items-center " style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>

              <div className="p-3">
                <h1 className="text-white font-weight-bolder">Welcome</h1>
                <h5 className="text-white text-break">Millions of movies, TV shows and people to discover. Explore Now</h5>
                
                <form className="mb-4 mt-4 w-60 mx-auto d-flex">
                    <input    
                      type="text" 
                      className="form-control" 
                      placeholder="Search"
                      autoComplete= "off"
                    />
                    <button className="btn btn-secondary">Search</button>
                </form>
              </div>
            
            </div>
            </section>
          }

    </>
  )
}
