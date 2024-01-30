import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ImageStore = {
  data: Array<any>
  setData: (data: Array<any>) => void
}

export const useImageStore = create<ImageStore>()(
  devtools((set) => ({
    data: [],
    setData: (data) => set({ data }),
  }))
)
