export default class MicroPixel {
  private frame: number
  private c: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private origin: ImageData
  private queue: ImageData[]

  private get width(): number {
    return this.c.width
  }

  private set width(value) {
    this.c.width = value
  }

  private get height(): number {
    return this.c.height
  }

  private set height(value) {
    this.c.height = value
  }

  public constructor(origin: ImageData) {
    this.frame = 32
    this.c = document.createElement('canvas')
    this.ctx = this.c.getContext('2d') as CanvasRenderingContext2D

    this.origin = origin
    this.width = this.origin.width
    this.height = this.origin.height

    this.queue = Array(this.frame)
      .fill(null)
      .map(() => this.ctx.createImageData(this.origin))
  }

  private clean() {
    return this.ctx.clearRect(0, 0, this.width, this.height)
  }

  // public generateCanvas(target: ImageData): HTMLCanvasElement {
  //   const c = document.createElement('canvas')
  //   c.width = target.width
  //   c.height = target.height
  //   const ctx = c.getContext('2d') as CanvasRenderingContext2D
  //   ctx.putImageData(target, 0, 0)
  //   return c
  // }

  // public generate(): HTMLCanvasElement {
  //   return this.generateCanvas(this.clone())
  // }

  // private cloneCanvas(data: ImageData, index: number): HTMLCanvasElement {
  //   const c = document.createElement('canvas')
  //   c.width = data.width
  //   c.height = data.height
  //   const ctx = c.getContext('2d') as CanvasRenderingContext2D
  //   ctx.putImageData(data, 0, 0)

  //   return c
  // }

  private clone() {
    const cloneData = this.ctx.createImageData(this.origin)

    for (let i = 0; i < this.origin.data.length; i++) {
      cloneData.data[i] = this.origin.data[i]
    }

    return cloneData
  }

  private putReversePixel(target: ImageData, master: ImageData, index: number) {
    const width = master.width * 4
    const min = width * Math.floor(index / width)
    const max = min + width
    for (let offset = 0; offset < 4; offset++) {
      target.data[index + offset] = master.data[max - index + min + offset]
    }
  }

  private fillPixel(target: ImageData, master: ImageData, index: number): void {
    for (let offset = 0; offset < 4; offset++) {
      target.data[index + offset] = master.data[index + offset]
    }
  }

  public reflect() {}

  public reverse() {
    // const width = master.width * 4
    // const min = width * Math.floor(index / width)
    // const max = min + width
    // for (let offset = 0; offset < 4; offset++) {
    //   target.data[index + offset] = master.data[max - index + min + offset]
    // }
  }

  private getIndex(target: ImageData, x: number, y: number) {
    return (y * target.width + x) * 4
  }

  public phantom() {
    const getTarget = (x: number) =>
      this.queue[
        Math.floor((this.frame * (Math.random() + (2 * x) / this.width)) / 3)
      ]

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        for (let n = 0; n < 2; n++) {
          const target = getTarget(x)
          this.fillPixel(target, this.origin, this.getIndex(target, x, y))
        }
      }
    }

    return this.queue
  }

  public invert() {
    const imageData = this.clone()
    for (var i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255 - imageData.data[i]
      imageData.data[i + 1] = 255 - imageData.data[i + 1]
      imageData.data[i + 2] = 255 - imageData.data[i + 2]
    }
    return imageData
  }

  public grayscale() {
    const imageData = this.clone()
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
      imageData.data[i] = avg
      imageData.data[i + 1] = avg
      imageData.data[i + 2] = avg
    }

    return imageData
  }
}
