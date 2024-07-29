import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState, onCloseVideoModal, onOpenVideoModal, setVideoId } from "../store";

export const useUiStore = () => {
  
    const { isVideoModalOpen, videoId } = useSelector( (state: RootState ) => state.ui );
    const dispatch = useDispatch<AppDispatch>();

    const openVideoModal = () => {
        dispatch( onOpenVideoModal() )
    };

    const closeVideoModal = () => {
        dispatch(onCloseVideoModal());
    };

    const handleSetVideoId = (id: string) => {
        dispatch(setVideoId(id));
    }


    return{
        // Atributes
        isVideoModalOpen,
        videoId,

        //Methods
        closeVideoModal, 
        openVideoModal,
        handleSetVideoId,
    }
}
