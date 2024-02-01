import { useRef, useEffect } from 'react'

import { fabric } from 'fabric'

import { useImageStore } from 'src/store'

const Canvas = () => {
  const data = useImageStore((state) => state.data)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const placeImages = (canvas: fabric.Canvas, data: any[]) => {
    canvas.clear()

    data.forEach((item, index) => {
      fabric.Image.fromURL(item.image.thumb.url, function (oImg) {
        const left = index * 10
        canvas.add(oImg)
        oImg.set({ left: 100 + left, top: 100 })
        canvas.renderAll()
      })
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
    // canvas.clear()

    // data.forEach((item, index) => {
    //   fabric.Image.fromURL(item.image.thumb.url, function (oImg) {
    //     const left = index * 10
    //     canvas.add(oImg)
    //     oImg.set({ left: 100 + left, top: 100 })
    //     canvas.renderAll()
    //   })
    // })

    // Zooming with mousewheel
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

    // Panning holding alt
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
