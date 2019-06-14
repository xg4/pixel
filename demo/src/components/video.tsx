import React, { useEffect } from 'react'
import MicroPixel from '../../../src'
import raf from 'raf'

const Video: React.FC = () => {
  const video = React.createRef<HTMLVideoElement>()
  const canvas = React.createRef<HTMLCanvasElement>()

  let type = 'grayscale'
  useEffect(() => {
    const v = video.current
    const c = canvas.current
    const ctx = c.getContext('2d')
    v.width = c.width = 500
    v.height = c.height = 300
    let timer = null

    const loop = () => {
      ctx.drawImage(v, 0, 0, c.width, c.height)
      const data = ctx.getImageData(0, 0, c.width, c.height)
      const imageData = new MicroPixel(data)[type]()
      ctx.putImageData(imageData, 0, 0)
      timer = raf(loop)
      console.log(1)
    }
    v.addEventListener('play', () => {
      loop()
    })

    v.addEventListener('pause', () => {
      raf.cancel(timer)
    })
  }, [])

  const handleInvert = () => {
    type = 'invert'
  }

  const handleGrayscale = () => {
    type = 'grayscale'
  }

  const handleBrightness = () => {
    type = 'brightness'
  }

  const handleContrast = () => {
    type = 'contrast'
  }

  const handleNostalgia = () => {
    type = 'nostalgia'
  }

  const handleComic = () => {
    type = 'comic'
  }

  const handleCasting = () => {
    type = 'casting'
  }

  const handleShuffle = () => {
    type = 'shuffle'
  }

  const handleMirror = () => {
    type = 'mirror'
  }
  return (
    <section>
      <h2 className="title">视频效果</h2>
      <div className="showcase">
        <video ref={video} controls>
          <source
            src={require('../assets/video/flower.webm')}
            type="video/webm"
          />
          <source
            src={require('../assets/video/flower.mp4')}
            type="video/mp4"
          />
          Sorry, your browser doesnt support embedded videos.
        </video>
        <canvas ref={canvas} />
      </div>
      <div className="control">
        <button onClick={handleMirror}>镜像 - mirror</button>
        <button onClick={handleShuffle}>乱序 - shuffle</button>
        <button onClick={handleCasting}>熔铸 - casting</button>
        <button onClick={handleComic}>连环画 - comic</button>
        <button onClick={handleGrayscale}>灰度 - grayscale</button>
        <button onClick={handleInvert}>反向颜色 - invert</button>
        <button onClick={handleBrightness}>亮度50 - brightness</button>
        <button onClick={handleContrast}>对比度50 - contrast</button>
        <button onClick={handleNostalgia}>怀旧 - nostalgia</button>
      </div>
    </section>
  )
}

export default Video
