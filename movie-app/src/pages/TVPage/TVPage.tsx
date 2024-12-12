import { useEffect, useState } from "react"
import { useTvShows } from "./hooks/useTvShows";
import { ITvShows } from "../../store/tvShows/interfaces/tvShows.interfaces";
import { Loading, MovieCard } from "../../ui/components";
import { MediaType } from "../../interfaces";
import { useFetch } from "../../hooks";
import { urlWeb } from "../../constants/apiEndpoints";
import { Genres, ICurrentFilters } from "../interfaces/MoviesPage.interfaces";
import { sortTvShowsOptions, TV_SHOWS_PAGE } from "../constants/TvShowsPage.constants";
import { useTvShowsByFilters } from "./hooks/useTvShowsByFilters";

export const TVPage = () => {
  const {getTvShows, tvShows, isLoading} = useTvShows();
  const {data: tvGenresData} = useFetch(urlWeb.tvShowsGenres);
  const {getTvShowsByFilters, tvShowsByFilters, isLoading: tvShowsByFiltersLoading} = useTvShowsByFilters();
  
  const [nextPage, setNextPage] = useState<number>(1);
  const [allTvShows, setAllTvShows] = useState<ITvShows[]>([]);
  const [currentFilters, setCurrentFilters] = useState<ICurrentFilters>({
    currentGenre: TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE,
    currentSorting: TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE,
  });

  const {genres = []} = !!tvGenresData && tvGenresData;

  const handleChangeGenres = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = target;
    setCurrentFilters({...currentFilters, currentGenre: value});
    setNextPage(1);
    const filters = {
      genre: value,
      page: 1,
      sortBy: currentFilters.currentSorting
    }
    getTvShowsByFilters(filters);
  };

  const handleChangeSorting = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = target;
    setCurrentFilters({...currentFilters, currentSorting: value});
    setNextPage(1);
    const filters = {
      genre: currentFilters.currentGenre,
      page: 1,
      sortBy: value,
    };
    getTvShowsByFilters(filters);
  };

  useEffect(() => {
    if (currentFilters.currentGenre === TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE && currentFilters.currentSorting === TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE) {
      getTvShows(nextPage);
    }else{
      const filters = {
        genre: currentFilters.currentGenre,
        page: nextPage,
        sortBy: currentFilters.currentSorting,
      };
      getTvShowsByFilters(filters);
    }
  }, [nextPage]); 

  useEffect(() => {
    setAllTvShows(tvShows);
  }, [tvShows]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight - 180 <= scrolledTo;
      if (isReachBottom) {
        setNextPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (tvShowsByFilters.length > 0) {
      setAllTvShows(tvShowsByFilters);
    }
  }, [tvShowsByFilters]);
  
  return (
   <>
    <section className="tv-page-section mt-5">
      <div className="container">
        <h2 className="mb-3">{TV_SHOWS_PAGE.TITLE}</h2>

        <div className="mb-4 d-flex gap-3">
          <select
            className="form-select bg-dark text-white w-50"
            aria-label="Default select example"
            onChange={handleChangeGenres}
          >
            <option value={TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE}>
              {TV_SHOWS_PAGE.SELECT_GENRES}
            </option>
            {genres && genres.map((genre: Genres) => (
              <option value={genre.id} key={genre.id}>{genre.name}</option>
            ))}
          </select>
          <select 
            className="form-select bg-dark text-white w-50" 
            aria-label="Default select example" 
            onChange={handleChangeSorting}
          >
            <option defaultValue={""} value={TV_SHOWS_PAGE.GENRES_DEFAULT_VALUE}>{TV_SHOWS_PAGE.SORT_BY}</option>
            {sortTvShowsOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          {tvShows.length > 0 && allTvShows.map(tvShow => (
            <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-5 animate__animated animate__fadeIn animate__slower" key={ tvShow.id }>
              <MovieCard
                id={tvShow.id}
                title={tvShow.name}
                name={tvShow.original_name}
                poster_path={tvShow.poster_path}
                vote_average={tvShow.vote_average}
                first_air_date={tvShow.first_air_date}
                media_type={MediaType.Tv}
              />
            </div>
          ))}
          {(isLoading || tvShowsByFiltersLoading) && <Loading/>}
        </div>
      </div>
    </section>
   </>
  )
}
