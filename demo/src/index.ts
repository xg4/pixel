import MicroPixel from '../../src'

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = reject
    image.src = url
  })

const c = document.createElement('canvas')
c.width = 200
c.height = 200
const { width, height } = c
const ctx = c.getContext('2d')

loadImage(require('./assets/images/image.jpg')).then(image => {
  ctx.drawImage(image, 0, 0, width, height)
  const originData = ctx.getImageData(0, 0, width, height)
  const mp = new MicroPixel(originData)
  mp.phantom()
})
