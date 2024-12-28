import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";
import { Loading } from "../../../ui/components";
import { TRENDING } from "../../constants/HomePage.constants";

export const Trending = () => {

    const [ timeFilter, setTimeFilter ] = useState(TRENDING.FILTER_TIME_DAY);
    const url: string = `https://api.themoviedb.org/3/trending/all/${timeFilter}`;
    
    const { data, isLoading } = useFetch( url );
    const { results } = !!data && data; 

  return (
    <section className="carousel-section mb-5">
        <div className="container">
          <h3 className="text-white">{TRENDING.TITLE}</h3>

          <div className="form-check form-switch d-flex justify-content-end">
            <input 
                className="form-check-input me-2" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={() => ( timeFilter === TRENDING.FILTER_TIME_DAY ) ? setTimeFilter(TRENDING.FILTER_TIME_WEEK) : setTimeFilter(TRENDING.FILTER_TIME_DAY) }
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                <span className={`text-secondary ${( timeFilter === TRENDING.FILTER_TIME_DAY) ? 'text-white' : ''}`}>
                  {TRENDING.DAY_TITLE}
                </span>/
                <span className={`text-secondary ${( timeFilter === TRENDING.FILTER_TIME_WEEK) ? 'text-white' : ''}`}>
                  {TRENDING.WEEK_TITLE}
                </span>
            </label>
          </div>

          {
            (isLoading )
              ? <Loading/>
              : <Carousel moviesArray={ results }/>
          }

        </div>
      </section>
  )
}
