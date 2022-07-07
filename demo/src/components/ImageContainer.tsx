import { ChangeEventHandler, useRef, useState } from 'react'
import px, { Pixel } from '../../../src'
import box from '../assets/images/box.jpg'
import { download } from '../helpers'
import Card from './Card'

export const buttons = [
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
] as const

export default function ImageContainer() {
  const imageRef = useRef<HTMLImageElement>(null)
  const [currentUrl, setCurrentUrl] = useState('')
  const nPx = useRef<Pixel>()

  const handleClick = async (method: string) => {
    if (imageRef.current) {
      const p = px(imageRef.current)
      nPx.current = (p as any)[method]()
      setCurrentUrl(await (nPx.current as any)[dataType]())
    }
  }

  const handleDownload = async () => {
    if (nPx.current) {
      const url = await nPx.current.toBlobURL()
      download(url)
    }
  }

  const [dataType, setDataType] = useState('toDataURL')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target
    setDataType(value)
  }

  return (
    <Card title="图片效果">
      <div className="space-x-4">
        <span>导出数据类型：</span>
        <label className="cursor-pointer">
          <input
            type={'radio'}
            name="dataType"
            value="toDataURL"
            onChange={handleChange}
            className="mr-2"
            checked={dataType === 'toDataURL'}
          />
          toDataURL
        </label>
        <label className="cursor-pointer">
          <input
            type={'radio'}
            name="dataType"
            value="toBlobURL"
            className="mr-2"
            onChange={handleChange}
            checked={dataType === 'toBlobURL'}
          />
          toBlobURL
        </label>
      </div>

      <div className="flex justify-around items-center">
        <img
          width={300}
          height={300}
          className="border shadow-xl"
          ref={imageRef}
          src={box}
        />
        <span>===&gt;</span>
        <a href={currentUrl} target="_blank">
          <img
            width={300}
            height={300}
            className="border shadow-xl"
            src={currentUrl}
            title={currentUrl}
          />
        </a>
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

      <button className="border border-gray-700 px-2" onClick={handleDownload}>
        下载 - download
      </button>
    </Card>
  )
}
