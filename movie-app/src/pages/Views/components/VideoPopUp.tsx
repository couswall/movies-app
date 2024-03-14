import ReactPlayer from "react-player"
import '../styles/VideoPopUp.css';

export const VideoPopUp = () => {
  return (
    <>
        <div className="video-modal position-fixed fixed-top position-absolute w-100 vh-100 d-flex justify-content-center align-items-center" 
            style={{ zIndex:'10', backdropFilter:'blur(5px)'}}
        >
            <div className="video-wrapper" style={{ width: '700px', height: '450px'}}>
                <button className="btn-close" type="button" aria-label="Close">CLOSE</button>
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=O-b2VfmmbyA'}
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
