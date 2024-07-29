import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  isVideoModalOpen: boolean; 
  videoId: string;
}

const initialState: UiState = {
  isVideoModalOpen: false,
  videoId: '', 
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenVideoModal: ( state ) => {
        state.isVideoModalOpen = true; 
    }, 
    onCloseVideoModal: ( state ) => {
        state.isVideoModalOpen = false; 
    },
    setVideoId: (state, action) => {
        state.videoId = action.payload;
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { onCloseVideoModal, onOpenVideoModal, setVideoId } = uiSlice.actions
