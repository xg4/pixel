import React, { useEffect, createRef, useState } from 'react'
import './phantom.scss'
import px from '../../../src'
import classNames from 'classnames'

const Item: React.FC<{ active: boolean; imageData: ImageData }> = ({
  // eslint-disable-next-line react/prop-types
  imageData,
  // eslint-disable-next-line react/prop-types
  active
}) => {
  const canvasRef = createRef<HTMLCanvasElement>()
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.getContext('2d').putImageData(imageData, 0, 0)
  }, [])
  return (
    <canvas
      className={classNames('phantom-item', { active })}
      width={imageData.width}
      height={imageData.height}
      ref={canvasRef}
    />
  )
}

const Phantom = () => {
  const image = createRef<HTMLImageElement>()

  const [phantom, setPhantom] = useState([])

  const [active, setActive] = useState(false)

  useEffect(() => {
    setPhantom(px(image.current).phantom())
  }, [])

  const handlePhantom = () => {
    setActive(!active)
  }

  return (
    <section>
      <h2 className="title">消逝效果</h2>
      <div className="showcase">
        <img
          width="200"
          height="200"
          ref={image}
          src={require('../assets/images/box.jpg')}
          alt=""
        />

        <div className="phantom">
          {phantom.map((p, index) => (
            <Item active={active} imageData={p} key={index} />
          ))}
        </div>
      </div>
      <div className="control">
        <button onClick={handlePhantom}>phantom</button>
      </div>
    </section>
  )
}

export default Phantom
