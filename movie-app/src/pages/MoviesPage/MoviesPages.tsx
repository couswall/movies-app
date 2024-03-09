import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Loading, MovieCard, MovieObject } from "../../ui/components";

interface Genres {
  id: number;
  name: string;
}

// const TMBD_TOKEN = import.meta.env.VITE_API_KEY;

export const MoviesPage = () => {

  const [ allMovies, setAllMovies ] = useState<MovieObject[]>([]);
  const [nextPage, setNextPage] = useState(1);

  const url: string = `https://api.themoviedb.org/3/movie/popular`;
  const genresUrl: string = 'https://api.themoviedb.org/3/genre/movie/list';
  const { data, isLoading } = useFetch( url, `&page=${nextPage}` );
  const { results } = !!data && data;

  const { data: genresData } = useFetch( genresUrl );
  const { genres } = !!genresData && genresData;
  const [currentGenre, setCurrentGenre] = useState("restart");


  useEffect(() => {
    if( isLoading ) return;
    setAllMovies(( prevMovies: MovieObject[] ) => {
      //Existing IDs of movies
      const existingIds = new Set(prevMovies.map((movie: MovieObject) => movie.id));
      //Filter of array to include the movies that they are not in the prevMovies
      const newMovies = results.filter((movie: MovieObject) => !existingIds.has(movie.id));

      const updatedMovies = currentGenre === 'restart'
        ? [...prevMovies, ...newMovies]
        : [ ...prevMovies, ...newMovies.filter( ( movie: MovieObject ) => ( movie.genre_ids )?.includes( parseInt( currentGenre ) ) ) ];

      return updatedMovies;
    });


  },[data, nextPage, currentGenre]);

  //Load More Movies
  const loadMoreMovies = () => {
    setNextPage( prevPage => prevPage + 1 );
  };


  //Scroll Function to load more movies
  useEffect(() => {
    const onScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight - 200 <= scrolledTo;
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
    const { value } = target;

    if ( value === 'restart') {
      setNextPage(1);

    }else{
      setNextPage(1);
      setCurrentGenre(value)
      const filterByGenre = results.filter( ( movie: MovieObject) => (movie.genre_ids)?.includes( parseInt( value ) ) );
      setAllMovies( filterByGenre );
    }
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

            {
              ( isLoading ) && <Loading/>
            }
            {
              ( !!data ) &&  allMovies.map( (movie: MovieObject ) => (
                <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-5 animate__animated animate__fadeIn" key={ movie.id }>
                  <MovieCard {...movie} media_type_props = 'movie' />
                </div>
              ))
            }
        </div>
          <button className="btn btn-outline-primary" onClick={() => loadMoreMovies()}>Load More</button>
      </div>
    </section>
  )
}
