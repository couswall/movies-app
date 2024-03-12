import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const CastSkeleton = () => {
  return (
    <div className="row">
      <h3>Cast</h3>
      <div className="carousel-wrapper mt-4">
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              breakpoints={{
                575: {
                  slidesPerView: 3
                }, 
                768: {
                  slidesPerView: 4
                },
                991: {
                  slidesPerView: 7
                },
                1200: {
                  slidesPerView: 9
                }
              }}              
            >
            {
                Array(9).fill("").map( ( _, index ) => {
                    return (
                        <SwiperSlide key={ index }>
                        <div className="cast-container-skeleton w-100 col-2">
                            <div 
                                className="img-cast-container overflow-hidden mx-auto mb-2 skeleton" 
                                style={{ width: '100px', height: '100px', borderRadius:'50%'}}
                            >
                                <div className='w-100 h-100'></div>
                            </div>
                            <div className='skeleton-text w-75 mx-auto skeleton mb-2'></div>
                            <div className='skeleton-text w-75 mx-auto  skeleton'></div>
                        </div>
                      </SwiperSlide>
                    )
                })
            }
        </Swiper>

      </div>
    </div>
    
  )
}
