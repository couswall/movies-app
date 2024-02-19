import { useFetch } from "../../../hooks/useFetch";
import { Carousel } from "../../../ui/components/Carousel";

export const Trending = () => {

    const url: string = `https://api.themoviedb.org/3/trending/all/day`;
    const { data } = useFetch( url );
    const { results = [] } = !!data && data; 

  return (
    <section className="carousel-section mb-4">
        <div className="container">
          <h3 className="text-white">Trending</h3>

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Day/Week</label>
          </div>
        
          <Carousel moviesArray={ results }/>  

        </div>
      </section>
  )
}
