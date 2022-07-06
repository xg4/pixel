import { useState } from 'react'
import box from '../assets/images/box.jpg'
import PhantomImage from './PhantomImage'

export default function PhantomContainer() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="p-12">
      <div className="border bg-white/70 border-gray-900 shadow-xl space-y-8 p-10">
        <h2 className="text-gray-700 text-center font-bold text-xl">
          消逝效果
        </h2>
        <div className="flex justify-around">
          <PhantomImage
            className="border shadow-xl"
            width={200}
            height={200}
            src={box}
            visible={visible}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="border border-gray-700 px-2"
            onClick={() => {
              setVisible(!visible)
            }}
          >
            phantom
          </button>
        </div>
      </div>
    </div>
  )
}
