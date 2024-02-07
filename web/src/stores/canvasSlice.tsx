import { StateCreator } from 'zustand'

export interface CanvasState {
  imagesLoaded: boolean
  setImagesLoaded: (loaded: boolean) => void
}

export const createCanvasSlice: StateCreator<CanvasState> = (set) => ({
  imagesLoaded: false,
  setImagesLoaded: (loaded) => set({ imagesLoaded: loaded }),
})
