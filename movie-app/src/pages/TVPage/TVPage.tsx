import { useEffect, useState } from "react"
import { useTvShows } from "./hooks/useTvShows";
import { ITvShows } from "../../store/tvShows/interfaces/tvShows.interfaces";
import { Loading, MovieCard } from "../../ui/components";
import { MediaType } from "../../interfaces";

export const TVPage = () => {
  const {getTvShows, tvShows, isLoading} = useTvShows();
  
  const [nextPage, setNextPage] = useState<number>(1);
  const [allTvShows, setAllTvShows] = useState<ITvShows[]>([]);

  useEffect(() => {
    getTvShows(nextPage);
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
  
  return (
   <>
    <section className="tv-page-section mt-5">
      <div className="container">
        <h2 className="mb-3">{'Explore TV Shows'}</h2>

        <div className="mb-4 d-flex gap-3">
          <select
            className="form-select bg-dark text-white w-50"
            aria-label="Default select example"
          >
            <option value="">{'Select Genres'}</option>
          </select>
          <select 
            className="form-select bg-dark text-white w-50" 
            aria-label="Default select example" 
            // onChange={handleChangeSorting}
          >
            <option defaultValue={""} value={''}>{'Sort by'}</option>
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
          {isLoading && <Loading/>}
        </div>
      </div>
    </section>
   </>
  )
}
