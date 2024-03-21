import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import '../../../ui/components/styles';
// import './styles/CastSkeleton.css'

export const CarouselSkeleton = () => {
  return (
    <div className="carousel-wrapper mt-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
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
            Array(6).fill('').map( (_,index) => (
              <SwiperSlide key={ index } >
                <div className="card-movie">
                  <div className="card-img-container position-relative mb-3">
                    <div className="skeleton w-100 h-100" style={{borderRadius:'.75rem'}}></div>
                  </div>
                  <div className="card-movie-info">
                    <div className='skeleton skeleton-text skeleton-subtitle'></div>
                    <div className='skeleton skeleton-text skeleton-30'></div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
  )
}
