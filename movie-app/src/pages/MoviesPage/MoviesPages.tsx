import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Loading, MovieCard} from "../../ui/components";
import { useMovies } from "../../hooks";
import { MovieObjectResponse } from "../../interfaces/MovieObject";
import { MediaType } from "../../interfaces";

interface Genres {
  id: number;
  name: string;
}

export const MoviesPage = () => {

  const { startGettingMovies, movies, isLoading } = useMovies();
  const [ allMovies, setAllMovies ] = useState<MovieObjectResponse[]>([]);
  const [nextPage, setNextPage] = useState(1);

  const genresUrl: string = 'https://api.themoviedb.org/3/genre/movie/list';

  const { data: genresData } = useFetch( genresUrl );
  const { genres } = !!genresData && genresData;
  const [currentGenre, setCurrentGenre] = useState("restart");

  useEffect(() => {
    startGettingMovies(nextPage);
  }, [nextPage]);

  useEffect(() => {
    setAllMovies(movies);
  }, [movies]);

  //Load More Movies
  const loadMoreMovies = () => {
    setNextPage( prevPage => prevPage + 1 );
  };


  //Scroll Function to load more movies
  useEffect(() => {
    const onScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight - 180 <= scrolledTo;
      if ( isReachBottom ){
        loadMoreMovies();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Select onChange function
  const onHandleGenre = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    // const { value } = target;

    // if ( value === 'restart') {
    //   setNextPage(1);

    // }else{
    //   setNextPage(1);
    //   setCurrentGenre(value)
    //   const filterByGenre = results.filter( ( movie: MovieObject) => (movie.genre_ids)?.includes( parseInt( value ) ) );
    //   setAllMovies( filterByGenre );
    // }
  }

  return (
    <section className="movies-section mt-5">
      <div className="container">
        <h2 className="mb-3">Explore Movies</h2>

        <div className="mb-4 d-flex gap-3">
          <select
            className="form-select bg-dark text-white w-50"
            aria-label="Default select example"
            onChange={ onHandleGenre }
          >
            <option defaultValue={""} value={'restart'}>Select Genres</option>
            {
              genres && genres.map( ( genre: Genres ) => (
                <option key={genre.name} value={ genre.id }>{genre.name}</option>
              ))
            }
          </select>
          <select className="form-select bg-dark text-white w-50" aria-label="Default select example">
            <option defaultValue={""} value={""}>Select Genres</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div className="row">
            {movies.length > 0 && allMovies.map( movie => (
                  <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-5 animate__animated animate__fadeIn animate__slower" key={ movie.id }>
                    <MovieCard 
                      id={movie.id}
                      title={movie.title}
                      name={movie.original_title}
                      poster_path={movie.poster_path}
                      vote_average={movie.vote_average}
                      release_date={movie.release_date}
                      media_type={MediaType.Movie}
                    />
                  </div>))}
            {isLoading && <Loading/>}
        </div> 
      </div>
    </section>
  )
}
