import { MediaVideos, ResultVideos } from "../../../interfaces"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { FaRegCirclePlay } from "react-icons/fa6";
import { VideoPopUp } from ".";
import { VideoSectionSkeleton } from "../skeletons";
import { LazyLoadImage } from "react-lazy-load-image-component";

import '../styles/VideoSection.css'
import { useUiStore } from "../../../hooks";


interface VideoSectionProps{
    videoData: MediaVideos, 
    isLoadingVideos: boolean; 
}

export const VideoSection: React.FC<VideoSectionProps> = ({videoData, isLoadingVideos}) => {
  
    const { results } = !!videoData && videoData; 
    const {handleSetVideoId, openVideoModal, isVideoModalOpen} = useUiStore();
     
    const onHandleVideo = ( videoKey: string ) => {
      openVideoModal(); 
      handleSetVideoId(videoKey);
    }

    return (
    <>
        
      {
        ( results?.length > 0 ) && 
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
                  ( isLoadingVideos )

                    ? Array(9).fill('').map( ( _, index ) => (
                        <SwiperSlide key={ index }>
                            <VideoSectionSkeleton/>
                        </SwiperSlide>
                      ))
                    : results.map( ( clip: ResultVideos ) => (
                        <SwiperSlide key={ clip.key }>
                            <div 
                              className="video-container d-flex justify-content-center align-items-center position-relative" 
                              onClick={ () => onHandleVideo( clip.key ) }
                            >
                                <div className="image-video-wrapper position-absolute w-100 h-100">
                                  <div className="overlay w-100 h-100 position-absolute"></div>
                                  <LazyLoadImage 
                                    src={`https://img.youtube.com/vi/${clip.key}/hqdefault.jpg`} 
                                    alt={clip.name}
                                    effect="blur" 
                                    width='100%' 
                                    height='100%'
                                  />
                                </div>
                                <FaRegCirclePlay className="icon"/>
                            </div>
                        </SwiperSlide>
                      ))   
                }
                </Swiper>
            </div>
        </section>
      }

        {isVideoModalOpen && <VideoPopUp/>}

    </>
  )
}
