import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  isVideoModalOpen: boolean; 
}

const initialState: UiState = {
  isVideoModalOpen: false, 
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
    } 
  },
})

// Action creators are generated for each case reducer function
export const { onCloseVideoModal, onOpenVideoModal } = uiSlice.actions
