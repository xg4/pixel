import React, { useEffect } from 'react'
import './App.css'
import MicroPixel from '../../src'

const App: React.FC = () => {
  const showcase = React.createRef<HTMLCanvasElement>()
  const image = React.createRef<HTMLImageElement>()

  let mp: MicroPixel, ctx: CanvasRenderingContext2D

  useEffect(() => {
    const canvas = showcase.current
    ctx = canvas.getContext('2d')

    // MicroPixel.createImage(require('./assets/images/logo.jpg')).then(image => {
    //   mp = new MicroPixel(image)
    //   canvas.width = mp.width
    //   canvas.height = mp.height
    // })
    mp = new MicroPixel(image.current)
    canvas.width = mp.width
    canvas.height = mp.height
  }, [])

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
      <h2 className="title">效果</h2>
      <div className="showcase">
        <img ref={image} src={require('./assets/images/logo.jpg')} />
        <canvas ref={showcase} />
      </div>
      <div className="control">
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
