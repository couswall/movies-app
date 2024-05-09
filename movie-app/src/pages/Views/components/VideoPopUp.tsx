import ReactPlayer from "react-player"
import '../styles/VideoPopUp.css';
import { useUiStore } from "../../../hooks/useUiStore";

interface VideoPopProps {
    videoId: string | null;   
    setVideoId: React.Dispatch<React.SetStateAction<string | null>>; 
}

export const VideoPopUp: React.FC<VideoPopProps> = ( { videoId, setVideoId } ) => {

    const { closeVideoModal } = useUiStore();

    const onClosePopUp = () => {
        closeVideoModal();
        setVideoId( null ); 
    }


  return (
    <>
        <div 
            className="video-modal position-fixed fixed-top position-absolute w-100 vh-100 d-flex justify-content-center align-items-center" 
            onClick={() => onClosePopUp() }
        >
            <div className="video-wrapper d-flex justify-content-center align-items-center flex-column">
                <button className="btn btn-close-modal text-white ms-auto">CLOSE</button>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${ videoId }`}
                    controls
                    playing = { true }
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    </>
  )
}
