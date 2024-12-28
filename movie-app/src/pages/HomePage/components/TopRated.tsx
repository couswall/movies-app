import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";
import { Loading } from "../../../ui/components";
import { MEDIA_TYPE, MEDIA_TYPES_TITLES, TOP_RATED_TITLE } from "../../constants/HomePage.constants";

export const TopRated = () => {
    
    const [ typeFilter, setTypeFilter ] = useState(MEDIA_TYPE.MOVIE)
    const url = ` https://api.themoviedb.org/3/${typeFilter}/top_rated`;

    const { data, isLoading } = useFetch( url );
    const { results } = !!data && data; 
  
    return (
    <section className="carousel-section mb-5">
        <div className="container">
          <h3 className="text-white">{TOP_RATED_TITLE}</h3>

          <div className="form-check form-switch d-flex justify-content-end">
            <input 
                className="form-check-input me-2" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={() => ( typeFilter === MEDIA_TYPE.MOVIE ) ? setTypeFilter(MEDIA_TYPE.TV) : setTypeFilter(MEDIA_TYPE.MOVIE) }
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                <span className={`text-secondary ${( typeFilter === MEDIA_TYPE.MOVIE) ? 'text-white' : ''}`}>
                  {MEDIA_TYPES_TITLES.MOVIES}
                </span>{'/'}
                <span className={`text-secondary ${( typeFilter === MEDIA_TYPE.TV) ? 'text-white' : ''}`}>
                {MEDIA_TYPES_TITLES.TV_SERIES}
                </span>
            </label>
          </div>

          {
            (isLoading )
              ? <Loading/>
              : <Carousel moviesArray={ results } media_type_props={ typeFilter }/>
          }

        </div>
      </section>
  )
}
