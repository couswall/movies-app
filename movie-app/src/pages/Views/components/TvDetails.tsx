import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"

import NoPhoto from '/assets/no-poster.png'; 
import { TvSerieIndividual } from "../../../interfaces"
import { DetailsSkeleton } from "../skeletons"
import { Genre } from "../../../interfaces/TvSeriesDetails";

interface TvDetailsProps {
    data: TvSerieIndividual,
    isLoading: boolean, 
    movieId: string,
}

export const TvDetails: React.FC<TvDetailsProps> = ({data, isLoading, movieId} ) => {

    const { name, backdrop_path, poster_path, first_air_date, genres, tagline } = !!data && data; 

    const posterUrl = poster_path ? 'https://image.tmdb.org/t/p/original/' + poster_path : NoPhoto;

    const realseYear = useMemo( () => {
        if(data){
            const arrayDate = first_air_date.split("-");
            return arrayDate[0]; 
        }
        return ''
    }, [ movieId, isLoading ]); 

  return (
    <>
        {
            (isLoading) 
                ? <DetailsSkeleton/>
                : 
                  <section className="container-fluid p-0 position-relative d-flex justify-content-center align-items-center">
                    <div className="col-12 position-absolute w-100 h-100 animate__animated animate__fadeIn animate__faster">
                        <div className="overlay-view position-absolute w-100 h-100"></div>
                            <LazyLoadImage 
                                src={ `https://image.tmdb.org/t/p/original/${ backdrop_path }` }
                                effect="blur" 
                                width='100%' 
                                height='100%'
                                className="animate__animated animate__fadeIn animate__faster"
                                style={{
                                    objectFit: 'cover', 
                                    objectPosition: `center center`,
                                }}
                                alt={ name }
                                />
                    </div>

                    <div className="details-section container  w-100 h-100 mt-5">
                        <div className="details-wrapper row position-relative gap-4 mb-5 animate__animated animate__fadeIn">
                            <div className="img-container-view col-xs-12 col-md-5 col-lg-4 col-xl-3 p-0 mx-auto overflow-hidden">
                                <img 
                                  className="img-movie-view"
                                  src={posterUrl} 
                                  alt={ name } 
                                  loading="lazy"
                                />
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-7 col-xl-8">
                                <h3>{ name } {`(${realseYear})`}</h3>
                                <p className="fw-lighter fst-italic">{tagline}</p>
                                <div className="d-flex gap-2 mb-3">

                                    {
                                        genres.map( ( genre: Genre ) => (
                                        <p className="badge bg-secondary" style={{ fontSize: '13px'}} key={ genre.name }>{genre.name}</p>
                                        ))
                                    }                  
                                </div>
                            </div>
                        </div>
                    </div>
                  </section>  
        }
    </>
  )
}
