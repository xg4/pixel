import { useState } from 'react'
import box from '../assets/images/box.jpg'
import Card from './Card'
import PhantomImage from './PhantomImage'

export default function PhantomContainer() {
  const [visible, setVisible] = useState(false)
  return (
    <Card title="消逝效果">
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
    </Card>
  )
}
