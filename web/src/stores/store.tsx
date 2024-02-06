import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { useImageStore } from './imageSlice'
import { ImageState } from './imageSlice'

export const useStore = create<ImageState>()(
  devtools((...a) => ({
    ...useImageStore(...a),
  }))
)
