import Pixel, { PxOptions } from './pixel'

const isPixel = (x: any): x is Pixel => x instanceof Pixel

const px = (x: any, o: Partial<PxOptions> = {}) => {
  if (isPixel(x)) {
    return x.clone()
  }
  return new Pixel(x, o)
}

export default px
