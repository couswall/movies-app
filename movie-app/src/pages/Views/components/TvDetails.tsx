import { useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"

import NoPhoto from '/assets/no-poster.png'; 
import { MediaVideos, TvSerieIndividual } from "../../../interfaces"
import { DetailsSkeleton } from "../skeletons"
import { Genre } from "../../../interfaces/TvSeriesDetails";
import { CiPlay1 } from "react-icons/ci";
import { useFetch } from "../../../hooks/useFetch";

interface TvDetailsProps {
    data: TvSerieIndividual,
    isLoading: boolean, 
    movieId: string,
    mediaTypeApi: string,
    videoData: MediaVideos
    showPopUpVideo: boolean, 
    setShowPopUpVideo: React.Dispatch<React.SetStateAction<boolean>>,
}

export const TvDetails: React.FC<TvDetailsProps> = ({data, isLoading, movieId, videoData, showPopUpVideo, setShowPopUpVideo, mediaTypeApi} ) => {

    const { results = [] } = !!videoData && videoData; 
    const { data: crewData, isLoading: isCastLoading } = useFetch(`https://api.themoviedb.org/3/${mediaTypeApi}/${movieId}/credits`); 
    console.log( crewData )
    const { 
        name, 
        backdrop_path, 
        poster_path, 
        first_air_date, 
        genres, 
        tagline, 
        vote_average, 
        overview,
        status, 
        episode_run_time
     } = !!data && data; 
    
     const [ videoId, setVideoId ] = useState<string | null>('');

    const posterUrl = poster_path ? 'https://image.tmdb.org/t/p/original/' + poster_path : NoPhoto;
    const trailer = results.filter( video => video.type === 'Trailer'); 
    
    const realseYear = useMemo( () => {
        if(data){
            const arrayDate = first_air_date.split("-");
            return arrayDate[0]; 
        }
        return ''
    }, [ movieId, isLoading ]); 

    const relaseDate = useMemo( () => {
        const date = new Date( first_air_date );
        const options: Intl.DateTimeFormatOptions = { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }; 
        return date.toLocaleDateString('en-US', options);
    }, [ movieId, isLoading ]);

    const runTime = useMemo ( () => {

        if ( !isLoading ) {
            if( !episode_run_time[0] ){
                return 'Unknown';
            }else{
                return `${episode_run_time[0]}m / episode`;
            } 
        }


    }, [ movieId, isLoading ]); 

    const onWatchTrailer = () => {
        setShowPopUpVideo( true ); 
        setVideoId( trailer[0].key );
    }

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

                                <div className="d-flex gap-2 mb-3 details-buttons">
                                    <div className= "circle-details p-3 d-flex justify-content-center align-items-center">
                                        <span className='text-white fs-3'>{ (vote_average).toFixed(1) }</span>
                                    </div>
                                    <div 
                                        className="d-flex justify-content-center align-items-center gap-3 button-trailer-container text-white"
                                        onClick={ () => onWatchTrailer() }
                                    >
                                        <div 
                                        className= "p-3 play-trailer-button circle-details d-flex justify-content-center align-items-center">
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
                                        <p>Runtime: <span className="fw-lighter">{ runTime } </span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </section>  
        }
    </>
  )
}
