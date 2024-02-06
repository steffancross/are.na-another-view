import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ImageState = {
  data: Array<any>
  setData: (data: Array<any>) => void
}

export const useImageStore = create<ImageState>()(
  devtools((set) => ({
    data: [],
    setData: (data) => set({ data }),
  }))
)
