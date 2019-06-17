import React, { useEffect } from 'react'
import px from '../../../src'

const Image: React.FC = () => {
  const canvas = React.createRef<HTMLCanvasElement>()
  const image = React.createRef<HTMLImageElement>()

  useEffect(() => {
    canvas.current.width = 500
    canvas.current.height = 500
  }, [])

  const handleMethods = ({ target }) => {
    canvas.current
      .getContext('2d')
      .putImageData(px(image.current)[target.name](), 0, 0)
  }
  return (
    <section>
      <h2 className="title">图片效果</h2>
      <div className="showcase">
        <img ref={image} src={require('../assets/images/logo.jpg')} />
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

export default Image
