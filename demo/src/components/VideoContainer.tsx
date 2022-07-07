import raf from 'raf'
import { useEffect, useRef } from 'react'
import px from '../../../src'
import flower from '../assets/videos/flower.webm'
import Card from './Card'
import { buttons } from './ImageContainer'

export default function VideoContainer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const type = useRef('blur')
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
    const nPx = (p as any)[type.current]()
    ctx.putImageData(nPx.source, 0, 0)
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

  return (
    <Card title="视频效果">
      <div className="flex justify-around items-center">
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
        <span>===&gt;</span>
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
