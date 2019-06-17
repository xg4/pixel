import Pixel from './pixel'

const isPixel = (x: any): x is Pixel => x instanceof Pixel

const px = (x: any) => {
  if (isPixel(x)) {
    return x.clone()
  }
  return new Pixel(x)
}

export default px
