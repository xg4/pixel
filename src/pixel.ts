import { isCanvas, isImage, isImageData, isVideo, shuffle } from './helpers'
import { PhantomOptions, PxOptions, PxSource } from './types'
export default class Pixel {
  private $c: HTMLCanvasElement
  private $ctx: CanvasRenderingContext2D
  private $source: ImageData

  get width() {
    return this.$c.width
  }

  get height() {
    return this.$c.height
  }

  constructor(data: PxSource, options: Partial<PxOptions> = {}) {
    this.$c = document.createElement('canvas')
    this.$ctx = this.$c.getContext('2d') as CanvasRenderingContext2D
    this.$c.width = options.width || data.width
    this.$c.height = options.height || data.height
    this.$source = this.parse(data)
  }

  private parse(data: PxSource) {
    if (isCanvas(data)) {
      const ctx = data.getContext('2d')
      if (!ctx) {
        throw new Error('canvas not support 2d context')
      }
      return ctx.getImageData(0, 0, data.width, data.height)
    }

    this.clean()
    if (isImageData(data)) {
      this.$ctx.putImageData(data, 0, 0)
    }
    if (isImage(data) || isVideo(data)) {
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

  clone(options?: Partial<PxOptions>) {
    return new Pixel(this.$source, options)
  }

  private cloneImageData() {
    const clone = this.$ctx.createImageData(this.$source)
    clone.data.set(this.$source.data)
    return clone
  }

  private putImageData() {
    this.clean()
    this.$ctx.putImageData(this.$source, 0, 0)
  }

  private toBlob(type?: string, quality?: any): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.putImageData()
      this.$c.toBlob(resolve, type, quality)
    })
  }

  toDataURL(type?: string, quality?: any) {
    this.putImageData()
    return this.$c.toDataURL(type, quality)
  }

  async toBlobURL(type?: string, quality?: any) {
    const blob = await this.toBlob(type, quality)
    if (!blob) {
      throw new Error('canvas toBlob error, blob is null')
    }
    return URL.createObjectURL(blob)
  }

  /**
   * @description 切换抗锯齿
   */
  toggleSmoothing() {
    this.$ctx.imageSmoothingEnabled = !this.$ctx.imageSmoothingEnabled
  }

  /**
   * @description phantom
   * @param options
   */
  phantom(options: Partial<PhantomOptions> = {}) {
    const { frame = 32, density = 2 } = options
    const arr: ImageData[] = []
    for (let i = 0; i < frame; i++) {
      arr.push(this.$ctx.createImageData(this.$source))
    }

    const getTarget = (x: number) =>
      arr[Math.floor((frame * (Math.random() + (2 * x) / this.width)) / 3)]

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const target = getTarget(x)
        const index = this.getPixelIndex(x, y, target.width)
        for (let n = 0; n < density; n++) {
          for (let offset = 0; offset < 4; offset++) {
            target.data[index + offset] = this.$source.data[index + offset]
          }
        }
      }
    }

    return arr
  }

  origin() {
    return this.$source
  }

  /**
   * @description 随机 乱序 打散
   */
  shuffle() {
    const { data } = this.$source
    shuffle(data)
    return this.$source
  }

  /**
   * 浮雕
   */
  relief() {
    const clone = this.cloneImageData()
    const width = clone.width
    const height = clone.height
    const { data } = this.$source
    for (let x = 1; x < width - 1; x++) {
      for (let y = 1; y < height - 1; y++) {
        const index = this.getPixelIndex(x, y, width)
        const prev = this.getPixelIndex(x - 1, y, width)
        const next = this.getPixelIndex(x + 1, y, width)
        data[index] = clone.data[next] - clone.data[prev] + 128
        data[index + 1] = clone.data[next + 1] - clone.data[prev + 1] + 128
        data[index + 2] = clone.data[next + 2] - clone.data[prev + 2] + 128
      }
    }
    return this.$source
  }

  /**
   * @description 模糊
   */
  blur() {
    const clone = this.cloneImageData()
    const width = clone.width
    const height = clone.height
    const { data } = this.$source

    let mixRed = 0.0
    let mixGreen = 0.0
    let mixBlue = 0.0
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = this.getPixelIndex(x, y, width)
        for (let col = -2; col <= 2; col++) {
          let colOffset = col + x
          if (colOffset < 0 || colOffset >= width) {
            colOffset = 0
          }
          for (let row = -2; row <= 2; row++) {
            let rowOffset = row + y
            if (rowOffset < 0 || rowOffset >= height) {
              rowOffset = 0
            }

            const index2 = this.getPixelIndex(colOffset, rowOffset, width)
            mixRed += clone.data[index2]
            mixGreen += clone.data[index2 + 1]
            mixBlue += clone.data[index2 + 2]
          }
        }

        data[index] = mixRed / 25.0
        data[index + 1] = mixGreen / 25.0
        data[index + 2] = mixBlue / 25.0

        mixRed = 0.0
        mixGreen = 0.0
        mixBlue = 0.0
      }
    }
    return this.$source
  }

  /**
   * @description 镜像
   */
  mirror() {
    const clone = this.cloneImageData()
    const width = clone.width
    const height = clone.height
    const { data } = this.$source
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = this.getPixelIndex(x, y, width)
        const mIndex = (width - 1 - x + y * width) * 4

        data[mIndex] = clone.data[index]
        data[mIndex + 1] = clone.data[index + 1]
        data[mIndex + 2] = clone.data[index + 2]
        data[mIndex + 3] = clone.data[index + 3]
      }
    }
    return this.$source
  }

  /**
   * @description 熔铸效果
   */
  casting() {
    const { data } = this.$source
    for (let i = 0; i < data.length - 4; i += 4) {
      data[i] = (data[i] * 128) / (data[i + 1] + data[i + 2] + 1)
      data[i + 1] = (data[i + 1] * 128) / (data[i] + data[i + 2] + 1)
      data[i + 2] = (data[i + 2] * 128) / (data[i] + data[i + 1] + 1)
    }
    return this.$source
  }

  /**
   * @description 连环画效果
   *              与图像灰度化后的效果相似，它们都是灰度图，
   *              但连环画增大了图像的对比度，使整体明暗效果更强
   */
  comic() {
    const { data } = this.$source
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
    return this.$source
  }

  /**
   * @description 灰色调 adjust color values and make it more darker and gray
   */
  adjust() {
    const { data } = this.$source
    for (let i = 0; i < data.length - 4; i += 4) {
      data[i] = 0.272 * data[i] + 0.534 * data[i + 1] + 0.131 * data[i + 2]
      data[i + 1] = 0.349 * data[i] + 0.686 * data[i + 1] + 0.168 * data[i + 2]
      data[i + 2] = 0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2]
    }
    return this.$source
  }

  /**
   * @description 怀旧效果
   */
  nostalgia() {
    const { data } = this.$source
    for (let i = 0; i < data.length - 4; i += 4) {
      const dr = 0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2]
      const dg = 0.349 * data[i] + 0.686 * data[i + 1] + 0.168 * data[i + 2]
      const db = 0.272 * data[i] + 0.534 * data[i + 1] + 0.131 * data[i + 2]

      const scale = Math.random() * 0.5 + 0.5

      data[i] = scale * dr + (1 - scale) * data[i]
      data[i + 1] = scale * dg + (1 - scale) * data[i + 1]
      data[i + 2] = scale * db + (1 - scale) * data[i + 2]
    }
    return this.$source
  }

  /**
   * @description 亮度
   * @param value -100~100
   */
  brightness(value = 10) {
    const { data } = this.$source
    for (var i = 0; i < data.length; i += 4) {
      data[i] += 255 * (value / 100)
      data[i + 1] += 255 * (value / 100)
      data[i + 2] += 255 * (value / 100)
    }
    return this.$source
  }

  /**
   * @description 对比度
   * @param value
   */
  contrast(value = 10) {
    const { data } = this.$source
    const factor = (259.0 * (value + 255.0)) / (255.0 * (259.0 - value))
    for (var i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128.0) + 128.0

      data[i + 1] = factor * (data[i + 1] - 128.0) + 128.0

      data[i + 2] = factor * (data[i + 2] - 128.0) + 128.0
    }
    return this.$source
  }

  /**
   * @description 反向颜色
   */
  invert() {
    const { data } = this.$source
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
    return this.$source
  }

  /**
   * @description 灰度 黑白照
   */
  grayscale() {
    const { data } = this.$source
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg
      data[i + 1] = avg
      data[i + 2] = avg
    }
    return this.$source
  }
}
