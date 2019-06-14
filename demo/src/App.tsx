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
    ctx.putImageData(mp.contrast(50), 0, 0)
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
      <h2 className="title">图片效果</h2>
      <div className="showcase">
        <img ref={image} src={require('./assets/images/logo.jpg')} />
        <canvas ref={showcase} />
      </div>
      <div className="control">
        <button onClick={handleMirror}>镜像 - mirror</button>
        <button onClick={handleShuffle}>乱序 - shuffle</button>
        <button onClick={handleCasting}>熔铸 - casting</button>
        <button onClick={handleComic}>连环画 - comic</button>
        <button onClick={handleOrigin}>原始 - origin</button>
        <button onClick={handleGrayscale}>灰度 - grayscale</button>
        <button onClick={handleInvert}>反向颜色 - invert</button>
        <button onClick={handleBrightness}>亮度50 - brightness</button>
        <button onClick={handleContrast}>对比度50 - contrast</button>
        <button onClick={handleNostalgia}>怀旧 - nostalgia</button>
      </div>
    </div>
  )
}

export default App
