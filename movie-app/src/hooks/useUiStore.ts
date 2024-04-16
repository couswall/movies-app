import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState, onCloseVideoModal, onOpenVideoModal } from "../store";

export const useUiStore = () => {
  
    const { isVideoModalOpen } = useSelector( (state: RootState ) => state.ui );
    const dispatch = useDispatch<AppDispatch>();

    const openVideoModal = () => {
        dispatch( onOpenVideoModal() )
    }

    const closeVideoModal = () => {
        dispatch(onCloseVideoModal());
    }


    return{
        // Atributes
        isVideoModalOpen,

        //Methods
        closeVideoModal, 
        openVideoModal,
    }
}
