import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";
import { Loading } from "../../../ui/components";

export const TopRated = () => {
    
    const [ typeFilter, setTypeFilter ] = useState("movie")
    const url = ` https://api.themoviedb.org/3/${typeFilter}/top_rated`;

    const { data, isLoading } = useFetch( url );
    const { results } = !!data && data; 
  
    return (
    <section className="carousel-section mb-5">
        <div className="container">
          <h3 className="text-white">Top Rated</h3>

          <div className="form-check form-switch d-flex justify-content-end">
            <input 
                className="form-check-input me-2" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={() => ( typeFilter === 'movie' ) ? setTypeFilter('tv') : setTypeFilter('movie') }
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                <span className={`text-secondary ${( typeFilter === 'movie') ? 'text-white' : ''}`}>Movies</span>/
                <span className={`text-secondary ${( typeFilter === 'tv') ? 'text-white' : ''}`}>TV Series</span>
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
