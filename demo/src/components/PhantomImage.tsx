import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ImgHTMLAttributes,
  ReactEventHandler,
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
    const [urls, setUrls] = useState<string[]>([])

    const handleLoad: ReactEventHandler<HTMLImageElement> = async (evt) => {
      const phantoms = px(evt.currentTarget).phantom({ frame })
      const urls = await Promise.all(phantoms.map((p) => p.toBlobURL()))
      setUrls(urls)
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
        {urls.map((url, i) => {
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
          return <img src={url} style={style} alt="" key={url} />
        })}
      </div>
    )
  }
)

export default PhantomImage
