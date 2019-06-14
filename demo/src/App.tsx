import React, { useEffect } from 'react'
import './App.css'
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
  console.log(originData.width, originData.height)
  mp = new MicroPixel(originData)
})

const App: React.FC = () => {
  const showcase = React.createRef<HTMLCanvasElement>()
  let ctx

  useEffect(() => {
    showcase.current.width = 200
    showcase.current.height = 200
    ctx = showcase.current.getContext('2d')
  })

  const handleOrigin = () => {
    ctx.putImageData(mp.origin, 0, 0)
  }

  const handleInvert = () => {
    ctx.putImageData(mp.invert(), 0, 0)
  }

  const handleGrayscale = () => {
    ctx.putImageData(mp.grayscale(), 0, 0)
  }

  const handleBrightness = () => {
    ctx.putImageData(mp.brightness(50), 0, 0)
  }

  const handleContrast = () => {
    ctx.putImageData(mp.contrast(300), 0, 0)
  }

  const handleNostalgia = () => {
    ctx.putImageData(mp.nostalgia(), 0, 0)
  }

  const handleComic = () => {
    ctx.putImageData(mp.comic(), 0, 0)
  }

  const handleCasting = () => {
    ctx.putImageData(mp.casting(), 0, 0)
  }

  const handleShuffle = () => {
    ctx.putImageData(mp.shuffle(), 0, 0)
  }

  const handleMirror = () => {
    ctx.putImageData(mp.mirror(), 0, 0)
  }

  return (
    <div>
      <img className="source" src={require('./assets/images/logo.jpg')} />
      <canvas ref={showcase} />
      <div className="btns">
        <button onClick={handleMirror}>mirror</button>
        <button onClick={handleShuffle}>shuffle</button>
        <button onClick={handleCasting}>casting</button>
        <button onClick={handleComic}>comic</button>
        <button onClick={handleOrigin}>origin</button>
        <button onClick={handleGrayscale}>grayscale</button>
        <button onClick={handleInvert}>invert</button>
        <button onClick={handleBrightness}>brightness</button>
        <button onClick={handleContrast}>contrast</button>
        <button onClick={handleNostalgia}>nostalgia</button>
      </div>
    </div>
  )
}

export default App
