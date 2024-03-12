import { LazyLoadImage } from "react-lazy-load-image-component";
import { Loading } from "../../../ui/components";
import { Genre, MovieDetails } from "../../../interfaces/MovieDetails";
import { useMemo } from "react";
import { CiPlay1 } from "react-icons/ci";

import '../styles/Details.css'; 

interface MediaDetailsProps {
    data: MovieDetails; 
    isLoading: boolean; 
    movieId: string; 
}

export const Details: React.FC<MediaDetailsProps> = ({ data, isLoading, movieId }) => {

    const {
        title, 
        original_title, 
        overview, 
        release_date, 
        runtime, 
        status, 
        tagline, 
        poster_path, 
        vote_average,
        backdrop_path, genres
      } = !!data && data;


    const relaseDate = useMemo( () => {
      const date = new Date( release_date );
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }; 
      return date.toLocaleDateString('en-US', options);
      }, [ movieId, isLoading ])
    
    const runTimeToHours = useMemo ( () => {    
      const hours = Math.floor( runtime / 60 ); 
      const minutes = runtime % 60; 
      return `${hours}h ${minutes}min`
      }, [ movieId, isLoading ])
      
      const realseYear = useMemo( () => {
      const arrayDate = relaseDate.split(",");
      return arrayDate[ arrayDate.length - 1 ]; 

    }, [ movieId, isLoading ]); 

  return (
    <section className="container-fluid p-0 position-relative d-flex justify-content-center align-items-center" 
          style={{ 
            filter: !isLoading ? "none" : "blur(10px)",
            transition: "filter 0.6s",
            height: '90vh'
          }}
    >
              <LazyLoadImage 
                src={ `https://image.tmdb.org/t/p/original/${ backdrop_path }` } 
                effect="blur" 
                width='100%' 
                height='100%'
                style={{
                    objectFit: 'cover', 
                    objectPosition: `center center`,
                }}
                />
      
      <div className="details-section container position-absolute w-100 h-100 mt-5">
          {
            isLoading ? <Loading/>
            :
            <div className="details-wrapper row position-relative gap-4 mb-5">
              <div className="img-container-view col-xs-12 col-md-5 col-lg-4 col-xl-4 p-0 mx-auto overflow-hidden">
                <img 
                  className="img-movie-view"
                  src={`https://image.tmdb.org/t/p/original/${ poster_path }`} 
                  alt={ title || original_title} 
                  loading="lazy"
                />
              </div>

              <div className="col-xs-12 col-md-6 col-lg-7 col-xl-7">
                <h3>{ title || original_title } {`(${realseYear})`}</h3>
                <p className="fw-lighter fst-italic">{tagline}</p>

                <div className="d-flex gap-2 mb-3">

                  {
                    genres.map( ( genre: Genre ) => (
                      <p className="badge bg-secondary" style={{ fontSize: '13px'}} key={ genre.name }>{genre.name}</p>
                    ))
                  }                  
                </div>

                <div className="d-flex gap-2 mb-3 details-buttons">
                  <div className= "circle-details p-3 d-flex justify-content-center align-items-center">
                    <span className='text-white fs-3'>{ (vote_average).toFixed(1) }</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-3 button-trailer-container text-white">
                    <div className= "p-3 play-trailer-button circle-details d-flex justify-content-center align-items-center">
                      <CiPlay1 className="icon"/>
                    </div>
                    <span>Watch trailer</span>
                  </div>
                
                </div>

                <div>
                  <h5>Overview</h5>
                  <p className="overview">{ overview }</p>

                  <div className="d-flex gap-3">
                      <p>Status: <span className="fw-lighter">{ status }</span></p>
                      <p>Release Date: <span className="fw-lighter">{ relaseDate }</span></p>
                      <p>Runtime: <span className="fw-lighter">{ runTimeToHours } </span></p>
                  </div>
                </div>
                <hr />
                
                <p>Director: <span className="fw-lighter">Realsed</span></p>
                <hr />  
              </div>
            </div>    
          }

          <div className="row">
            <h3>Cast</h3>
            <div className="cast-wrapper">

            </div>
          </div>
      </div>
      <div className="overlay-view col-12 position-absolute w-100 h-100"> </div>
    </section>
  )
}
