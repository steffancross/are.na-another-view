import { StateCreator } from 'zustand'

export interface LoadingState {
  loadingWheel: boolean
  setLoadingWheel: (loaded: boolean) => void
}

export const createLoadingSlice: StateCreator<LoadingState> = (set) => ({
  loadingWheel: false,
  setLoadingWheel: (loaded) => set({ loadingWheel: loaded }),
})
