import { useFetch } from "../../hooks/useFetch"
import { MovieCard, MovieObject } from "../../ui/components";

export const MoviesPage = () => {

  const url: string = `https://api.themoviedb.org/3/movie/popular`;
  const { data } = useFetch( url );
  const { results = [] } = !!data && data; 


  console.log(results)
  return (
    <section className="movies-section mt-5">
      <div className="container">
        <h2 className="mb-5">Explore Movies</h2>

        <div className="row mb-4">
          {
            data && 
              results.map( (movie: MovieObject ) => ( 
                <div className="col-3">
                  <MovieCard {...movie}/>
                </div>
              ))
          }
        </div>

      </div>
    </section>
  )
}
