import { useState } from "react"
import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";

export const Popular = () => {
    
    const [ typeFilter, setTypeFilter ] = useState("movie")
    const url = ` https://api.themoviedb.org/3/${typeFilter}/popular`;

    const { data } = useFetch( url );
    const { results = [] } = !!data && data; 

    return (
    <section className="carousel-section mb-5">
        <div className="container">
          <h3 className="text-white">Popular</h3>

          <div className="form-check form-switch d-flex justify-content-end">
            <input 
                className="form-check-input me-2" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={() => ( typeFilter === 'movie' ) ? setTypeFilter('tv') : setTypeFilter('movie') }
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                <span className={( typeFilter === 'movie') ? 'text-secondary' : ''}>Movies</span>/
                <span className={( typeFilter === 'tv') ? 'text-secondary' : ''}>TV Series</span>
            </label>
          </div>
        
          <Carousel moviesArray={ results }/>  

        </div>
      </section>
  )
}
