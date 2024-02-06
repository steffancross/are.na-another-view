import { StateCreator } from 'zustand'

export interface ImageState {
  data: Array<any>
  setData: (data: Array<any>) => void
}

export const useImageStore: StateCreator<ImageState> = (set) => ({
  data: [],
  setData: (data) => set({ data }),
})
