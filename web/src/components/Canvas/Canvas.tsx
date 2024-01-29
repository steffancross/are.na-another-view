import { useRef, useEffect } from 'react'

import { fabric } from 'fabric'

const Canvas = () => {
  const data = [
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg',
  ]

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: height,
      width: width,
    })

    data.map((item) => {
      fabric.Image.fromURL(item, function (oImg) {
        canvas.add(oImg)
      })
    })
  })

  return <canvas width={600} height={600} ref={canvasRef} />
}

export default Canvas
