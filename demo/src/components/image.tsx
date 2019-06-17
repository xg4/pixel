import React, { useEffect, useState } from 'react'
import px from '../../../src'

const Image: React.FC = () => {
  const canvas = React.createRef<HTMLCanvasElement>()
  const image = React.createRef<HTMLImageElement>()

  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    image.current.width = canvas.current.width = 300
    image.current.height = canvas.current.height = 300
  }, [])

  const handleMethods = ({ target }) => {
    canvas.current
      .getContext('2d')
      .putImageData(px(image.current)[target.name](), 0, 0)
  }

  const handleDataURL = () => {
    const url = px(canvas.current).toDataURL()
    console.log(url)
    setImageURL(url)
  }

  const handleBlob = () => {
    px(canvas.current)
      .toBlobURL()
      .then(url => {
        console.log(url)
        setImageURL(url)
      })
  }

  const handleDownload = () => {
    px(canvas.current)
      .download({ type: 'image/jpeg' })
      .then(() => {
        console.log('downloaded')
      })
  }

  return (
    <section>
      <h2 className="title">图片效果</h2>
      <div className="showcase">
        <img ref={image} src={require('../assets/images/box.jpg')} />
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
      <h2 className="title">生成图片链接</h2>
      <div className="showcase">
        <img src={imageURL} />
      </div>
      <div className="control">
        <button onClick={handleDataURL}>toDataURL</button>
        <button onClick={handleBlob}>toBlobURL</button>
        <button onClick={handleDownload}>下载 - download</button>
      </div>
    </section>
  )
}

export default Image
