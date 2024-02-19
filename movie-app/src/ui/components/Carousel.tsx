import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles';
import { Autoplay } from 'swiper/modules';


interface CarouselProps {
  moviesArray?: MovieObject[], 
}

interface MovieObject {
    id: number,
    title: string;
    name: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
}


export const Carousel: React.FC<CarouselProps> = ({ moviesArray = [] } ) => {
  
  
  const onFormatDate = ( movieDate: any ) => {

    const date = new Date( movieDate );
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }; 
    
    return date.toLocaleDateString('en-US', options);
  }
  
  
  return (
    <>
      <div className="carousel-wrapper mt-4">
        <Swiper
          loop= { true }
          spaceBetween={20}
          autoplay= {{
            delay: 5000, 
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          breakpoints={{
            575: {
              slidesPerView: 3
            }, 
            768: {
              slidesPerView: 4
            },
            991: {
              slidesPerView: 4
            },
            1200: {
              slidesPerView: 6
            }
          }}              
        >
          {
            moviesArray.map( (movie: MovieObject ) => (
              <SwiperSlide key={ movie.id } >
                <div className="card-movie" >
                <div className="card-img-container position-relative mb-3">
                  <img src={`https://image.tmdb.org/t/p/original/${ movie.poster_path}`} alt={ movie.title || movie.name} loading='lazy'/>  
                  <div className="raiting-circle position-absolute">
                    <span className='fw-bold'>{ (movie.vote_average).toFixed(1) }</span>
                  </div>
                </div>

                <div className="card-movie-info">
                  <p className='movie-title text-white d-inline-block text-truncate text-wrap w-100'>{ movie.title || movie.name}</p>
                  <p className='text-white-50'>{ onFormatDate( movie.release_date || movie.first_air_date ) }</p>
                </div>
              </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}
