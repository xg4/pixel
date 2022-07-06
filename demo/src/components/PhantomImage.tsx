import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ImgHTMLAttributes,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import px from '../../../src'

export interface PhantomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  frame?: number
  visible: boolean
}

const PhantomImage = forwardRef(
  (
    { frame = 32, visible, onLoad, ...restProps }: PhantomImageProps,
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    const [phantoms, setPhantoms] = useState<ImageData[]>([])

    const handleLoad: ReactEventHandler<HTMLImageElement> = (evt) => {
      const phantoms = px(evt.currentTarget).phantom({ frame })
      setPhantoms(phantoms)
      onLoad && onLoad(evt)
    }

    const baseStyle: CSSProperties = {
      position: 'absolute',
      left: 0,
      top: 0,
      transition: 'transform 2s ease-out, opacity 2s ease-out',
      opacity: 1,
      transform: 'rotate(0deg) translate(0px, 0px) rotate(0deg)',
      transitionDelay: '0s',
    }

    return (
      <div
        className={restProps.className}
        style={{ ...restProps.style, position: 'relative' }}
      >
        <img
          {...restProps}
          style={{ ...restProps.style, visibility: 'hidden' }}
          onLoad={handleLoad}
          ref={ref}
        />
        {phantoms.map((p, i) => {
          const style: CSSProperties = visible
            ? {
                ...baseStyle,
                transitionDelay: `${(1.35 / frame) * (i + 1)}s`,
                transform: `rotate(${
                  15 * (Math.random() - 0.5)
                }deg) translate(${60 * (Math.random() - 1)}px, ${
                  30 * (Math.random() - 1)
                }px)`,
                opacity: 0,
              }
            : baseStyle
          return <Item style={style} imageData={p} key={i} />
        })}
      </div>
    )
  }
)

function Item({
  imageData,
  style,
}: {
  imageData: ImageData
  style?: CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx && ctx.putImageData(imageData, 0, 0)
    }
  }, [])
  return (
    <canvas
      style={style}
      width={imageData.width}
      height={imageData.height}
      ref={canvasRef}
    />
  )
}

export default PhantomImage
