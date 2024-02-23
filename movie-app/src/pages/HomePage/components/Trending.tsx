import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";
import { Loading } from "../../../ui/components";

export const Trending = () => {

    const [ timeFilter, setTimeFilter ] = useState("day");
    const url: string = `https://api.themoviedb.org/3/trending/all/${timeFilter}`;
    
    const { data, isLoading } = useFetch( url );
    const { results } = !!data && data; 

  return (
    <section className="carousel-section mb-5">
        <div className="container">
          <h3 className="text-white">Trending</h3>

          <div className="form-check form-switch d-flex justify-content-end">
            <input 
                className="form-check-input me-2" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={() => ( timeFilter === 'day' ) ? setTimeFilter('week') : setTimeFilter('day') }
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                <span className={`text-secondary ${( timeFilter === 'day') ? 'text-white' : ''}`}>Day</span>/
                <span className={`text-secondary ${( timeFilter === 'week') ? 'text-white' : ''}`}>Week</span>
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
