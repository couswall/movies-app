import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles';
import { Autoplay } from 'swiper/modules';
import { MovieCard } from '.';
import { Result } from '../../interfaces';


interface CarouselProps {
  moviesArray?: Result[],
  media_type_props?: string; 
}



export const Carousel: React.FC<CarouselProps> = ({ moviesArray = [], media_type_props } ) => {
  
  
  return (
    <>
      <div className="carousel-wrapper mt-4">
        <Swiper
          loop= { true }
          spaceBetween={20}
          slidesPerView={2}
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
              slidesPerView: 5
            },
            1400: {
              slidesPerView: 6
            }
          }}              
        >
          {
            moviesArray.map( (movie: Result ) => (
              <SwiperSlide key={ movie.id } >
                <MovieCard {...movie} media_type_props={media_type_props} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}
