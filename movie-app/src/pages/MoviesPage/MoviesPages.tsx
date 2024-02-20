import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Loading, MovieCard, MovieObject } from "../../ui/components";

export const MoviesPage = () => {

  const [ allMovies, setAllMovies ] = useState<MovieObject[]>([]);
  const [nextPage, setNextPage] = useState(1);
  
  const url: string = `https://api.themoviedb.org/3/movie/popular`;
  const { data, isLoading } = useFetch( url, `&page=${nextPage}` );
  const { results = [] } = !!data && data; 

  const containerRef = useRef(null);

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


  useEffect(() => {
    const onscroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight - 400 <= scrolledTo;
      if (isReachBottom) loadMoreMovies();
    };

    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);


  return (
    <section className="movies-section mt-5" ref= { containerRef }>
      <div className="container">
        <h2 className="mb-3">Explore Movies</h2>

        <div className="mb-4">
          <select className="form-select bg-dark text-white" aria-label="Default select example">
            <option defaultValue={""}>Select Genres</option>
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
                <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-5 animate__animated animate__fadeIn" key={ movie.id }>
                  <MovieCard {...movie}/>
                </div>
              ))
          }
        </div>

          {/* <button className="btn btn-outline-primary" 
            onClick={() => loadMoreMovies()}
          >
            Show More
          </button> */}
      </div>
    </section>
  )
}
