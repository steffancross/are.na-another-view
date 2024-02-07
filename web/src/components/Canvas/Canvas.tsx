import { useRef, useEffect } from 'react'

import { fabric } from 'fabric'

import { useStore } from 'src/stores/store'

const Canvas = () => {
  const data = useStore((state) => state.data)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const setLoadingWheel = useStore((state) => state.setLoadingWheel)
  const setImagesLoaded = useStore((state) => state.setImagesLoaded)
  const showCanvas = useStore((state) => state.imagesLoaded)

  const placeImages = async (canvas: fabric.Canvas, imageArray: any[]) => {
    const staggerDistance = 10
    const amountPerRow = 10
    const initialLeft = 100
    const initialTop = 100

    let currentLeft = initialLeft
    let currentTop = initialTop
    let tallestImgInRow = 0
    let imagesInRow = 0

    canvas.clear()

    await Promise.all(
      imageArray.map((item) => {
        // some blocks may not have images, for now just ignoring them
        if (item.image && item.image.display && item.image.display.url) {
          return new Promise<void>((resolve) => {
            fabric.Image.fromURL(item.image.display.url, function (oImg) {
              // checks if there's X images in row, if there is, starts a new row
              if (imagesInRow === amountPerRow) {
                currentLeft = initialLeft
                currentTop += tallestImgInRow + staggerDistance
                tallestImgInRow = 0
                imagesInRow = 0
              }

              // location to place image
              oImg.set({
                left: currentLeft,
                top: currentTop,
              })

              // makes it so it can only be proportionally scaled
              oImg.setControlsVisibility({
                mb: false,
                ml: false,
                mr: false,
                mt: false,
              })

              canvas.add(oImg)

              // moves the placement point for the next image so they don't overlap
              currentLeft += oImg.width + staggerDistance
              tallestImgInRow = Math.max(oImg.height, tallestImgInRow)
              imagesInRow += 1

              resolve()
            })
          })
        }
      })
    )
  }

  useEffect(() => {
    if (data.length === 0) return

    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = new fabric.Canvas(canvasRef.current, {
      height: height,
      width: width,
    })

    ;(async () => {
      await placeImages(canvas, data)

      canvas.setZoom(1)
      // code from https://stackoverflow.com/questions/63092376/fabric-js-transform-and-zoom-canvas-to-fit-all-objects-in-viewport
      const group = new fabric.Group(canvas.getObjects())

      // find center and pan to it
      const x = group.left + group.width / 2 - canvas.width / 2
      const y = group.top + group.height / 2 - canvas.height / 2
      canvas.absolutePan({ x: x, y: y })

      // decide whether height or width is main scaling
      const heightDist = canvas.getHeight() - group.height
      const widthDist = canvas.getWidth() - group.width
      let groupDimension = 0
      let canvasDimension = 0
      if (heightDist < widthDist) {
        groupDimension = group.height
        canvasDimension = canvas.getHeight()
      } else {
        groupDimension = group.width
        canvasDimension = canvas.getWidth()
      }
      const zoom = (canvasDimension / groupDimension) * 0.7
      canvas.zoomToPoint({ x: canvas.width / 2, y: canvas.height / 2 }, zoom)

      // have to ungroup or all control points will be messed up
      group.ungroupOnCanvas()
      setLoadingWheel(false)
      setImagesLoaded(true)
    })()

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
      if (evt.shiftKey === true) {
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
  }, [data, setImagesLoaded, setLoadingWheel])

  return (
    <div style={{ display: showCanvas ? 'block' : 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas
