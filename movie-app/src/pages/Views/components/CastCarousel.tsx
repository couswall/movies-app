import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const CastCarousel = () => {
  return (
    <>
      <div className="carousel-wrapper mt-4">
        <Swiper
          loop= { true }
          spaceBetween={10}
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
              slidesPerView: 7
            },
            1200: {
              slidesPerView: 9
            }
          }}              
        >
          {
            Array(10).fill("").map( (arr, index) => (
              <SwiperSlide>
                <div className="cast-container w-100" key={index}>
                <div className="img-cast-container overflow-hidden mx-auto mb-2" style={{ width: '100px', height: '100px', borderRadius:'50%'}}>
                  <div className="img-cast bg-primary w-100 h-100"></div>
                </div>
                <p className='text-white text-center mb-0'>Jason Momoa</p>
                <p className='text-white text-center fw-lighter' style={{fontSize:'14px'}}>Someone cool</p>
              </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}
