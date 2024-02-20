import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { MovieCard, MovieObject } from "../../ui/components";

export const MoviesPage = () => {

  const [ allMovies, setAllMovies ] = useState<MovieObject[]>([]);
  const [nextPage, setNextPage] = useState(1);
  
  const url: string = `https://api.themoviedb.org/3/movie/popular`;
  const { data } = useFetch( url, `&page=${nextPage}` );
  const { results = [] } = !!data && data; 


  useEffect(() => {
    setAllMovies(( prevMovies: MovieObject[] ) => {
      const existingIds = new Set(prevMovies.map((movie: MovieObject) => movie.id));
      const newMovies = results.filter((movie: MovieObject) => !existingIds.has(movie.id));
      return [...prevMovies, ...newMovies];
    });
  },[data, results ]);


  const loadMoreMovies = () => {
    setNextPage((prevPage) => prevPage + 1);
  };
  
  return (
    <section className="movies-section mt-5">
      <div className="container">
        <h2 className="mb-5">Explore Movies</h2>

        <div className="row">
          {
            data && 
              allMovies.map( (movie: MovieObject ) => ( 
                <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-5" key={ movie.id }>
                  <MovieCard {...movie}/>
                </div>
              ))
          }
        </div>

          <button className="btn btn-outline-primary" 
            onClick={() => loadMoreMovies()}
          >
            Show More
          </button>
      </div>
    </section>
  )
}
