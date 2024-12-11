import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Loading, MovieCard} from "../../ui/components";
import { useMovies } from "../../hooks";
import { MovieObjectResponse } from "../../interfaces/MovieObject";
import { MediaType } from "../../interfaces";
import { urlWeb } from "../../constants/apiEndpoints";
import { useMoviesByGenres } from './hooks/useMoviesByGenres';
import { ResultMoviesByGenre } from "../../store/movies/interfaces/moviesByGenre.interface";
import { MOVIES_PAGE, sortMoviesOptions } from "../constants/MoviesPage.constants";
import {ICurrentFilters, Genres} from '../interfaces/MoviesPage.interfaces';

export const MoviesPage = () => {
  const { startGettingMovies, movies, isLoading } = useMovies();
  const {getMoviesByGenre, moviesByGenre} = useMoviesByGenres();
  
  const [ allMovies, setAllMovies ] = useState<MovieObjectResponse[] | ResultMoviesByGenre[]>([]);
  const { data: genresData } = useFetch(urlWeb.movieGenres);
  const [nextPage, setNextPage] = useState(1);
  const { genres = [] } = !!genresData && genresData;
  const [currentFilters, setCurrentFilters] = useState<ICurrentFilters>({
    currentGenre: MOVIES_PAGE.DEFAULT_SELECT_VALUE,
    currentSorting: MOVIES_PAGE.DEFAULT_SELECT_VALUE,
  });

  useEffect(() => {
    if (currentFilters.currentGenre === MOVIES_PAGE.DEFAULT_SELECT_VALUE && currentFilters.currentSorting === MOVIES_PAGE.DEFAULT_SELECT_VALUE) {
      startGettingMovies(nextPage);
    }else{
      const filters = {
        genre: currentFilters.currentGenre === MOVIES_PAGE.DEFAULT_SELECT_VALUE 
            ? MOVIES_PAGE.DEFAULT_SELECT_VALUE 
            : Number(currentFilters.currentGenre),
        page: nextPage,
        sortBy: currentFilters.currentSorting,
      };
      getMoviesByGenre(filters);
    }
  }, [nextPage]);

  useEffect(() => {
    setAllMovies(movies);
  }, [movies]);

  useEffect(() => {
    if(moviesByGenre.length > 0){
      setAllMovies(moviesByGenre);
    }
  }, [moviesByGenre])


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

  const onHandleGenre = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    setNextPage(1);
    setCurrentFilters({...currentFilters, currentGenre: value});
    const filters = {
      genre: value === MOVIES_PAGE.DEFAULT_SELECT_VALUE 
          ? MOVIES_PAGE.DEFAULT_SELECT_VALUE 
          : Number(value),
      page: 1,
      sortBy: currentFilters.currentSorting,
    }
    getMoviesByGenre(filters);
  };

  const handleChangeSorting = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = target;
    setNextPage(1);
    setCurrentFilters({...currentFilters, currentSorting: value});
    const filters = {
      genre: currentFilters.currentGenre === MOVIES_PAGE.DEFAULT_SELECT_VALUE 
          ? MOVIES_PAGE.DEFAULT_SELECT_VALUE 
          : Number(currentFilters.currentGenre),
      page: 1,
      sortBy: value,
    }
    getMoviesByGenre(filters);
  };

  
  return (
    <section className="movies-section mt-5">
      <div className="container">
        <h2 className="mb-3">{MOVIES_PAGE.TITLE}</h2>

        <div className="mb-4 d-flex gap-3">
          <select
            className="form-select bg-dark text-white w-50"
            aria-label="Default select example"
            onChange={ onHandleGenre }
          >
            <option defaultValue={""} value={MOVIES_PAGE.DEFAULT_SELECT_VALUE}>
              {MOVIES_PAGE.SELECT_GENRES}
            </option>
            {
              genres && genres.map( ( genre: Genres ) => (
                <option key={genre.name} value={ genre.id }>{genre.name}</option>
              ))
            }
          </select>
          <select className="form-select bg-dark text-white w-50" aria-label="Default select example" onChange={handleChangeSorting}>
            <option defaultValue={""} value={MOVIES_PAGE.DEFAULT_SELECT_VALUE}>{MOVIES_PAGE.SORT_BY}</option>
            {sortMoviesOptions.map((item, index) => (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            ))}
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
