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
        <section className="container mt-4">
            <h3>Official Videos</h3>
        </section>
    </>
  )
}
