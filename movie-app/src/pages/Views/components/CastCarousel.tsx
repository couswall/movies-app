import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useFetch } from '../../../hooks/useFetch';

import NoPhoto from '../../../../public/assets/avatar.png'; 


export const CastCarousel = ({movieId}) => {
  const { data, isLoading } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`); 

  const { cast = [] } = !!data && data; 
  
  const castArray = cast.filter( person => person.known_for_department === 'Acting'); 

  console.log( castArray )
  
  console.log( castArray )
  
  return (
    <>
      <div className="carousel-wrapper mt-4">
        <Swiper
          loop= { true }
          slidesPerView={3}
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
            castArray.map( (person, index) => {

              const profilePhoto = person.profile_path ? 'https://image.tmdb.org/t/p/w185/' + person.profile_path : NoPhoto;

              return (
                <SwiperSlide>
                  <div className="cast-container" key={person.id}>
                  <div className="img-cast-container overflow-hidden mx-auto mb-2" style={{ width: '100px', height: '100px', borderRadius:'50%'}}>
                    <img 
                      src={ profilePhoto }
                      loading='lazy'
                      className='w-100 h-100'
                      style={{objectFit:'cover'}}
                    />
                  </div>
                  <p className='text-white text-center mb-0' style={{fontSize:'.875rem'}}>{ person.name }</p>
                  <p className='text-white text-center fw-lighter' style={{fontSize:'.75rem'}}>{ person.character }</p>
                </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </>
  )
}
