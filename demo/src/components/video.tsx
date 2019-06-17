import React, { useEffect } from 'react'
import px from '../../../src'
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
      const imageData = px(v)[type]()
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

  const handleMethods = ({ target }) => {
    type = target.name
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
          <p>请使用最新版chrome浏览器</p>
          <p>use chrome, please</p>
        </video>
        <canvas ref={canvas} />
      </div>
      <div className="control">
        <button onClick={handleMethods} name="blur">
          模糊 - blur
        </button>
        <button onClick={handleMethods} name="relief">
          浮雕 - relief
        </button>
        <button onClick={handleMethods} name="adjust">
          灰色调 - adjust
        </button>
        <button onClick={handleMethods} name="mirror">
          镜像 - mirror
        </button>
        <button onClick={handleMethods} name="shuffle">
          乱序 - shuffle
        </button>
        <button onClick={handleMethods} name="casting">
          熔铸 - casting
        </button>
        <button onClick={handleMethods} name="comic">
          连环画 - comic
        </button>
        <button onClick={handleMethods} name="origin">
          原始 - origin
        </button>
        <button onClick={handleMethods} name="grayscale">
          灰度 - grayscale
        </button>
        <button onClick={handleMethods} name="invert">
          反向颜色 - invert
        </button>
        <button onClick={handleMethods} name="brightness">
          亮度10 - brightness
        </button>
        <button onClick={handleMethods} name="contrast">
          对比度10 - contrast
        </button>
        <button onClick={handleMethods} name="nostalgia">
          怀旧 - nostalgia
        </button>
      </div>
    </section>
  )
}

export default Video
