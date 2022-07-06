import raf from 'raf'
import { useEffect, useRef } from 'react'
import px from '../../../src'
import flower from '../assets/videos/flower.webm'
import Card from './Card'

export default function VideoContainer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const type = useRef('origin')
  const timer = useRef<number>()

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.width = canvasRef.current.width = 450
      videoRef.current.height = canvasRef.current.height = 250
    }
  }, [])

  const loop = () => {
    if (!canvasRef.current || !videoRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) {
      return
    }
    const p = px(videoRef.current)
    const fn = (p as any)[type.current].bind(p)
    ctx.putImageData(fn(), 0, 0)
    timer.current = raf(loop)
  }

  const handleCancel = () => {
    timer.current && raf.cancel(timer.current)
  }

  const handleClick = (method: string) => {
    type.current = method
    if (videoRef.current) {
      videoRef.current.play()
    }
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
    <Card title="视频效果">
      <div className="flex justify-around">
        <video
          className="border shadow-xl"
          onPlay={loop}
          onPause={handleCancel}
          ref={videoRef}
          controls
        >
          <source src={flower} type="video/webm" />
          <p>请使用最新版chrome浏览器</p>
          <p>use chrome, please</p>
        </video>
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
    </Card>
  )
}
