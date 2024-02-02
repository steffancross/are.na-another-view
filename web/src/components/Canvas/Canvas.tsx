import { useRef, useEffect } from 'react'

import { fabric } from 'fabric'

import { useImageStore } from 'src/store'

const Canvas = () => {
  const data = useImageStore((state) => state.data)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const placeImages = (canvas: fabric.Canvas, imageArray: any[]) => {
    const staggerDistance = 10
    const amountPerRow = 10
    const initialLeft = 100
    const initialTop = 100

    let currentLeft = initialLeft
    let currentTop = initialTop
    let tallestImgInRow = 0
    let imagesInRow = 0

    canvas.clear()

    imageArray.forEach((item) => {
      // some blocks may not have images, for now just ignoring them
      if (item.image && item.image.thumb && item.image.thumb.url) {
        fabric.Image.fromURL(item.image.thumb.url, function (oImg) {
          // checks if there's X images in row, if there is, starts a new row
          if (imagesInRow === amountPerRow) {
            currentLeft = initialLeft
            currentTop += tallestImgInRow + staggerDistance
            tallestImgInRow = 0
            imagesInRow = 0
          }

          canvas.add(oImg)
          // location to place image
          oImg.set({
            left: currentLeft,
            top: currentTop,
          })
          // makes it so it can only be proportionally scale
          oImg.setControlsVisibility({
            mb: false,
            ml: false,
            mr: false,
            mt: false,
          })

          // moves the placement point for the next image so they don't overlap
          currentLeft += oImg.width + staggerDistance
          tallestImgInRow = Math.max(oImg.height, tallestImgInRow)
          imagesInRow += 1
        })
      }
    })
  }

  useEffect(() => {
    if (data.length === 0) return

    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = new fabric.Canvas(canvasRef.current, {
      height: height,
      width: width,
    })

    placeImages(canvas, data)

    // zooming with mousewheel
    canvas.on('mouse:wheel', function (opt) {
      const delta = opt.e.deltaY
      let zoom = canvas.getZoom()
      zoom *= 0.999 ** delta
      if (zoom > 20) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    })

    // panning holding alt
    canvas.on('mouse:down', function (opt) {
      const evt = opt.e
      if (evt.altKey === true) {
        this.isDragging = true
        this.selection = false
        this.lastPosX = evt.clientX
        this.lastPosY = evt.clientY
      }
    })
    canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        const e = opt.e
        const vpt = this.viewportTransform
        vpt[4] += e.clientX - this.lastPosX
        vpt[5] += e.clientY - this.lastPosY
        this.requestRenderAll()
        this.lastPosX = e.clientX
        this.lastPosY = e.clientY
      }
    })
    canvas.on('mouse:up', function () {
      this.setViewportTransform(this.viewportTransform)
      this.isDragging = false
      this.selection = true
    })

    return () => {
      canvas.dispose()
    }
  }, [data])

  return <canvas ref={canvasRef} />
}

export default Canvas
