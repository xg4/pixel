import React from 'react'
import MicroPixel from '../../src'
import { loadImage } from './util'

let mp: MicroPixel

loadImage(require('./assets/images/logo.jpg')).then(evt => {
  console.log(evt.target instanceof Image)
  const image = evt.target as HTMLImageElement
  const c = document.createElement('canvas')
  c.width = 200
  c.height = 200
  const { width, height } = c
  const ctx = c.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)
  const originData = ctx.getImageData(0, 0, width, height)
  mp = new MicroPixel(originData)
})

const App: React.FC = () => {
  const can = React.createRef<HTMLCanvasElement>()

  const handleOrigin = () => {
    can.current.getContext('2d').putImageData(mp.origin, 0, 0)
  }

  const handleInvert = () => {
    can.current.getContext('2d').putImageData(mp.invert(), 0, 0)
  }

  const handleGrayscale = () => {
    can.current.getContext('2d').putImageData(mp.grayscale(), 0, 0)
  }

  return (
    <div>
      <canvas ref={can} />

      <button onClick={handleOrigin}>origin</button>
      <button onClick={handleGrayscale}>grayscale</button>
      <button onClick={handleInvert}>invert</button>
    </div>
  )
}

export default App
