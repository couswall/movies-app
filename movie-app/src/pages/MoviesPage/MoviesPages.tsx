import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Loading, MovieCard, MovieObject } from "../../ui/components";

export const MoviesPage = () => {

  const [ allMovies, setAllMovies ] = useState<MovieObject[]>([]);
  const [nextPage, setNextPage] = useState(1);
  
  const url: string = `https://api.themoviedb.org/3/movie/popular`;
  const { data, isLoading } = useFetch( url, `&page=${nextPage}` );
  const { results = [] } = !!data && data; 

  useEffect(() => {
    setAllMovies(( prevMovies: MovieObject[] ) => {
      //Existing IDs of movies
      const existingIds = new Set(prevMovies.map((movie: MovieObject) => movie.id));

      //Filter of array to include the movies that they are not in the prevMovies
      const newMovies = results.filter((movie: MovieObject) => !existingIds.has(movie.id));
      
      return [...prevMovies, ...newMovies];
    });
  },[data, nextPage]);



  const loadMoreMovies = () => {
    setNextPage((prevPage) => prevPage + 1);
  };
  
  return (
    <section className="movies-section mt-5">
      <div className="container">
        <h2 className="mb-3">Explore Movies</h2>

        <div className=" mb-4">
        <select className="form-select" aria-label="Default select example">
          <option selected>Select Genres</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        </div>

        <div className="row">
          {
            isLoading && <Loading/>
          }

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
