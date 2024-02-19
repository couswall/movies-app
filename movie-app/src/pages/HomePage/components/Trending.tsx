import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";

export const Trending = () => {

    const [ timeFilter, setTimeFilter ] = useState("day");
    const url: string = `https://api.themoviedb.org/3/trending/all/${timeFilter}`;
    
    const { data } = useFetch( url );
    const { results = [] } = !!data && data; 

  return (
    <section className="carousel-section mb-4">
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
                <span className={( timeFilter === 'day') ? 'text-secondary' : ''}>Day</span>/
                <span className={( timeFilter === 'week') ? 'text-secondary' : ''}>Week</span>
            </label>
          </div>
        
          <Carousel moviesArray={ results }/>  

        </div>
      </section>
  )
}
