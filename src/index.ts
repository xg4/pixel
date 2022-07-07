import { isPixel } from './helpers'
import Pixel from './pixel'
import { PxOptions, PxSource } from './types'

const px = (source: PxSource, options?: Partial<PxOptions>) => {
  if (isPixel(source)) {
    return source.clone()
  }
  return new Pixel(source, options)
}

export { Pixel }

export default px
