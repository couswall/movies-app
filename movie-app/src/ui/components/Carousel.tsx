import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles';
import { Autoplay } from 'swiper/modules';
import { MovieCard } from '.';


interface CarouselProps {
  moviesArray?: MovieObject[], 
}

export interface MovieObject {
    id: number,
    title: string;
    name: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
}


export const Carousel: React.FC<CarouselProps> = ({ moviesArray = [] } ) => {
  
  
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
                <MovieCard {...movie}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}
