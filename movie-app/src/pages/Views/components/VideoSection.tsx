import { MediaVideos } from "../../../interfaces"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';


interface VideoSectionProps{
    videoData: MediaVideos, 
    isLoadingVideos: boolean; 
}

export const VideoSection: React.FC<VideoSectionProps> = ({videoData, isLoadingVideos}) => {
  
    return (
    <>
        <section className="video-section container mt-4 mb-4">
            <h3 className="mb-3">Official Videos</h3>

            <div className="carousel-video-wrapper">
            <Swiper
                loop= { true }
                slidesPerView={4}
                spaceBetween={20}
                autoplay= {{
                  delay: 5000, 
                  disableOnInteraction: false
                }}
                modules={[Autoplay]}
                breakpoints={{
                  300:{
                    slidesPerView: 2
                  }, 
                  575: {
                    slidesPerView: 2
                  }, 
                  768: {
                    slidesPerView: 3
                  },
                  991: {
                    slidesPerView: 4
                  },
                  1200: {
                    slidesPerView: 4
                  }
                }}              
              >

                {
                    (Array(9).fill('')).map( (card, index) => (
                        <SwiperSlide key={ index }>
                            <div style={{ width:'100%', height:'145px'}}>
                                <div className="w-100 h-100 bg-primary"></div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>
        </section>
    </>
  )
}
