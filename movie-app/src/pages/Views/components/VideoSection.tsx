import { MediaVideos, ResultVideos } from "../../../interfaces"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { FaRegCirclePlay } from "react-icons/fa6";
import { VideoPopUp } from ".";
import { useState } from "react";


interface VideoSectionProps{
    videoData: MediaVideos, 
    isLoadingVideos: boolean; 
    showPopUpVideo?: boolean;  
    setShowPopUpVideo: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const VideoSection: React.FC<VideoSectionProps> = ({videoData, isLoadingVideos, showPopUpVideo, setShowPopUpVideo}) => {
  
    const { results } = !!videoData && videoData; 
    const [ videoId, setVideoId ] = useState<string | null>('');
     
    const onHandleVideo = ( videoKey: string ) => {
      setShowPopUpVideo( true ); 
      setVideoId( videoKey );
    }

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
                  isLoadingVideos 
                    ?
                    Array(9).fill('').map( ( _, index ) => (
                      <SwiperSlide key={ index }>
                          <div style={{ width:'100%', height:'145px'}}>
                              <div className="w-100 h-100 skeleton"></div>
                          </div>
                      </SwiperSlide>
                    ))
                    :
                    results.map( ( clip: ResultVideos ) => (
                    <SwiperSlide key={ clip.key }>
                        <div 
                          className="d-flex justify-content-center align-items-center position-relative" 
                          style={{ width:'100%', height:'180px'}}
                          onClick={ () => onHandleVideo( clip.key ) }
                        >
                            
                            <div className="image-video-wrapper position-absolute w-100 h-100">
                              <div className="w-100 h-100 position-absolute" style={{backgroundColor:'rgba(0,0,0,0.6)'}}></div>
                              <img src={`https://img.youtube.com/vi/${clip.key}/hqdefault.jpg`} alt={clip.name} className="w-100 h-100"/>
                            </div>

                            <FaRegCirclePlay className="text-white" style={{fontSize:'40px', zIndex:'2'}}/>
                        </div>
                    </SwiperSlide>
                    ))
                 
                    
                }
                </Swiper>
            </div>
        </section>

        {
          showPopUpVideo 
            && <VideoPopUp 
                setShowPopUpVideo = { setShowPopUpVideo }
                videoId = { videoId }
                setVideoId = { setVideoId } 
              />
        }

    </>
  )
}
