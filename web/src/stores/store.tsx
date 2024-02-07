import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createCanvasSlice, CanvasState } from './canvasSlice'
import { createImageSlice, ImageState } from './imageSlice'
import { createLoadingSlice, LoadingState } from './loadingSlice'

export const useStore = create<ImageState & CanvasState & LoadingState>()(
  devtools((...a) => ({
    ...createImageSlice(...a),
    ...createCanvasSlice(...a),
    ...createLoadingSlice(...a),
  }))
)
