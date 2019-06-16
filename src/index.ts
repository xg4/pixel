import { isImage, isImageData, isCanvas, shuffle } from './utils'

export default class Pixel {
  public static createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        resolve(image)
      }
      image.onerror = reject
      image.src = url
    })
  }

  private $c: HTMLCanvasElement
  private $ctx: CanvasRenderingContext2D
  private $source: ImageData

  public get width() {
    return this.$c.width
  }

  public get height() {
    return this.$c.height
  }

  public get origin() {
    return this.$source
  }

  public constructor(data: HTMLImageElement | ImageData | HTMLCanvasElement) {
    this.$c = document.createElement('canvas')
    this.$ctx = this.$c.getContext('2d') as CanvasRenderingContext2D

    if (isImage(data) || isImageData(data) || isCanvas(data)) {
      const { width, height } = data
      this.$c.width = width
      this.$c.height = height
      this.$source = this.createImageData(data)
    } else {
      throw new TypeError(`${data} is not a HTMLImageElement or ImageData`)
    }
  }

  private createImageData(
    data: HTMLImageElement | ImageData | HTMLCanvasElement
  ) {
    if (isImageData(data)) {
      return this.clone(data)
    }

    if (isCanvas(data)) {
      const ctx = data.getContext('2d') as CanvasRenderingContext2D
      return ctx.getImageData(0, 0, data.width, data.height)
    }

    this.clean()
    if (isImage(data)) {
      this.$ctx.drawImage(data, 0, 0, this.width, this.height)
    }
    return this.$ctx.getImageData(0, 0, this.width, this.height)
  }

  private clean() {
    return this.$ctx.clearRect(0, 0, this.width, this.height)
  }

  private getPixelIndex(x: number, y: number, width: number) {
    return (y * width + x) * 4
  }

  // private getColorIndices(x: number, y: number, width: number) {
  //   const red = this.getPixelIndex(x, y, width)
  //   return [red, red + 1, red + 2, red + 3]
  // }

  private clone(data?: ImageData) {
    const target = data || this.origin
    const cloneData = this.$ctx.createImageData(target)

    for (let i = 0; i < target.data.length; i++) {
      cloneData.data[i] = target.data[i]
    }

    return cloneData
  }

  private mirrorPixel(target: ImageData, index: number) {
    const width = this.$source.width * 4
    const min = width * Math.floor(index / width)
    const max = min + width
    for (let offset = 0; offset < 4; offset++) {
      target.data[index + offset] = this.$source.data[
        max - index + min + offset
      ]
    }
  }

  private fillPixel(target: ImageData, index: number) {
    for (let offset = 0; offset < 4; offset++) {
      target.data[index + offset] = this.$source.data[index + offset]
    }
  }

  private putImageData() {
    this.clean()
    this.$ctx.putImageData(this.$source, this.width, this.height)
  }

  public toDataURL(type?: string, quality?: any) {
    this.putImageData()
    return this.$c.toDataURL(type, quality)
  }

  public toBlob(type?: string, quality?: any): Promise<Blob | null> {
    return new Promise(resolve => {
      this.putImageData()
      this.$c.toBlob(resolve, type, quality)
    })
  }

  public async download(name: string = '') {
    const blob = await this.toBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = name
    a.href = url
    a.style.display = 'none'
    document.body.append(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  /**
   * @description 切换抗锯齿
   */
  public toggleSmoothing() {
    this.$ctx.imageSmoothingEnabled = !this.$ctx.imageSmoothingEnabled
  }

  /**
   * @description 镜像
   */
  public mirror() {
    const imageData = this.clone()
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.mirrorPixel(imageData, this.getPixelIndex(x, y, imageData.width))
      }
    }
    return imageData
  }

  public phantom() {
    const frame = 32
    const queue = Array(frame)
      .fill(null)
      .map(() => this.$ctx.createImageData(this.$source))
    const getTarget = (x: number) =>
      queue[Math.floor((frame * (Math.random() + (2 * x) / this.width)) / 3)]

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        for (let n = 0; n < 2; n++) {
          const target = getTarget(x)
          const index = this.getPixelIndex(x, y, target.width)
          this.fillPixel(target, index)
        }
      }
    }

    return queue
  }

  /**
   * @description 随机 乱序 打散
   */
  public shuffle() {
    const imageData = this.clone()
    const { data } = imageData
    shuffle(data)
    return imageData
  }

  /**
   * @description 熔铸效果
   */
  public casting() {
    const imageData = this.clone()
    const { data } = imageData
    for (let i = 0; i < data.length - 4; i += 4) {
      data[i] = (data[i] * 128) / (data[i + 1] + data[i + 2] + 1)
      data[i + 1] = (data[i + 1] * 128) / (data[i] + data[i + 2] + 1)
      data[i + 2] = (data[i + 2] * 128) / (data[i] + data[i + 1] + 1)
    }
    return imageData
  }

  /**
   * @description 连环画效果
   *              与图像灰度化后的效果相似，它们都是灰度图，
   *              但连环画增大了图像的对比度，使整体明暗效果更强
   */
  public comic() {
    const imageData = this.clone()
    const { data } = imageData
    for (let i = 0; i < data.length - 4; i += 4) {
      data[i] =
        (Math.abs(data[i + 1] - data[i + 2] + data[i + 1] + data[i]) *
          data[i]) /
        256
      data[i + 1] =
        (Math.abs(data[i + 2] - data[i + 1] + data[i + 2] + data[i]) *
          data[i]) /
        256
      data[i + 2] =
        (Math.abs(data[i + 2] - data[i + 1] + data[i + 2] + data[i]) *
          data[i + 1]) /
        256
    }
    return imageData
  }

  /**
   * @description 怀旧效果
   */
  public nostalgia() {
    const imageData = this.clone()
    const { data } = imageData
    for (let i = 0; i < data.length - 4; i += 4) {
      const dr = 0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2]
      const dg = 0.349 * data[i] + 0.686 * data[i + 1] + 0.168 * data[i + 2]
      const db = 0.272 * data[i] + 0.534 * data[i + 1] + 0.131 * data[i + 2]

      const scale = Math.random() * 0.5 + 0.5

      data[i] = scale * dr + (1 - scale) * data[i]
      data[i + 1] = scale * dg + (1 - scale) * data[i + 1]
      data[i + 2] = scale * db + (1 - scale) * data[i + 2]
    }
    return imageData
  }

  /**
   * @description 亮度
   * @param brightness -100~100
   */
  public brightness(brightness = 0) {
    const imageData = this.clone()
    const { data } = imageData
    for (var i = 0; i < data.length; i += 4) {
      data[i] += 255 * (brightness / 100)
      data[i + 1] += 255 * (brightness / 100)
      data[i + 2] += 255 * (brightness / 100)
    }
    return imageData
  }

  /**
   * @description 对比度
   * @param contrast
   */
  public contrast(contrast = 0) {
    const imageData = this.clone()
    const { data } = imageData
    const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast))
    for (var i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128.0) + 128.0

      data[i + 1] = factor * (data[i + 1] - 128.0) + 128.0

      data[i + 2] = factor * (data[i + 2] - 128.0) + 128.0
    }
    return imageData
  }

  /**
   * @description 反向颜色
   */
  public invert() {
    const imageData = this.clone()
    const { data } = imageData
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
    return imageData
  }

  /**
   * @description 灰度 黑白照
   */
  public grayscale() {
    const imageData = this.clone()
    const { data } = imageData
    for (let i = 0; i < data.length; i += 4) {
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = gray
      data[i + 1] = gray
      data[i + 2] = gray
    }
    return imageData
  }
}
