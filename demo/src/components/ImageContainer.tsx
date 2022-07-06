import { useEffect, useRef, useState } from 'react'
import px from '../../../src'
import box from '../assets/images/box.jpg'
import { download } from '../helpers'
import Card from './Card'

export default function ImageContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    if (imageRef.current && canvasRef.current) {
      imageRef.current.width = canvasRef.current.width = 300
      imageRef.current.height = canvasRef.current.height = 300
    }
  }, [])

  const handleClick = (method: string) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx && imageRef.current) {
        const p = px(imageRef.current)
        const fn = (p as any)[method].bind(p)
        ctx.putImageData(fn(), 0, 0)
      }
    }
  }

  const handleDataURL = () => {
    if (!canvasRef.current) {
      return
    }
    const url = px(canvasRef.current).toDataURL()
    setImageURL(url)
  }

  const handleBlob = async () => {
    if (!canvasRef.current) {
      return
    }
    const url = await px(canvasRef.current).toBlobURL()
    setImageURL(url)
  }

  const handleDownload = async () => {
    if (!canvasRef.current) {
      return
    }
    const url = await px(canvasRef.current).toBlobURL()
    download(url)
  }

  const buttons = [
    {
      name: '模糊 - blur',
      method: 'blur',
    },
    // {
    //   name: '锐化 - sharpen',
    //   method: 'sharpen',
    // },
    // {
    //   name: '高斯模糊 - gaussianBlur',
    //   method: 'gaussianBlur',
    // },
    {
      name: '浮雕 - relief',
      method: 'relief',
    },
    {
      name: '灰色调 - adjust',
      method: 'adjust',
    },
    {
      name: '镜像 - mirror',
      method: 'mirror',
    },
    {
      name: '乱序 - shuffle',
      method: 'shuffle',
    },
    {
      name: '熔铸 - casting',
      method: 'casting',
    },
    {
      name: '连环画 - comic',
      method: 'comic',
    },
    {
      name: '原始 - origin',
      method: 'origin',
    },
    {
      name: '灰度 - grayscale',
      method: 'grayscale',
    },
    {
      name: '反向颜色 - invert',
      method: 'invert',
    },
    {
      name: '亮度10 - brightness',
      method: 'brightness',
    },
    {
      name: '对比度10 - contrast',
      method: 'contrast',
    },
    {
      name: '怀旧 - nostalgia',
      method: 'nostalgia',
    },
  ]

  return (
    <Card title="图片效果">
      <div className="flex justify-around">
        <img className="border shadow-xl" ref={imageRef} src={box} />
        <canvas className="border shadow-xl" ref={canvasRef} />
      </div>
      <div className="flex flex-wrap gap-4">
        {buttons.map((btn) => (
          <button
            className="border border-gray-700 px-2"
            key={btn.method}
            onClick={() => {
              handleClick(btn.method)
            }}
          >
            {btn.name}
          </button>
        ))}
      </div>
      <h3 className="text-gray-700 text-center font-bold text-xl">图片链接</h3>
      <div className="flex justify-center">
        <img src={imageURL} alt={imageURL} />
      </div>
      <a href={imageURL} target="_blank">
        {imageURL}
      </a>
      <div className="flex flex-wrap gap-4">
        <button className="border border-gray-700 px-2" onClick={handleDataURL}>
          toDataURL
        </button>
        <button className="border border-gray-700 px-2" onClick={handleBlob}>
          toBlobURL
        </button>
        <button
          className="border border-gray-700 px-2"
          onClick={handleDownload}
        >
          下载 - download
        </button>
      </div>
    </Card>
  )
}
