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
      .map(_ => this.ctx.createImageData(this.origin))
  }

  public generateCanvas(target: ImageData): HTMLCanvasElement {
    const c = document.createElement('canvas')
    c.width = target.width
    c.height = target.height
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    ctx.putImageData(target, 0, 0)
    return c
  }

  public generate(): HTMLCanvasElement {
    return this.generateCanvas(this.clone(this.origin))
  }

  public phantom(): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        for (let n = 0; n < 2; n++) {
          const target = this.getTarget(x)
          // const target = this.queue[0]
          this.putPixel(target, this.origin, this.getPixelIndex(target, x, y))
        }
      }
    }

    const div = document.createElement('div')

    this.queue.map(this.cloneCanvas.bind(this)).forEach(c => div.appendChild(c))

    document.body.appendChild(div)
  }

  private cloneCanvas(data: ImageData, index: number): HTMLCanvasElement {
    const c = document.createElement('canvas')
    c.width = data.width
    c.height = data.height
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    ctx.putImageData(data, 0, 0)

    return c
  }

  private clone(target: ImageData): ImageData {
    const cloneData = this.ctx.createImageData(target)
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.putPixel(cloneData, target, this.getPixelIndex(target, x, y))
      }
    }
    return cloneData
  }

  private getTarget(x: number): ImageData {
    return this.queue[
      Math.floor((this.frame * (Math.random() + (2 * x) / this.width)) / 3)
    ]
  }

  private getPixelIndex(target: ImageData, x: number, y: number): number {
    return (y * target.width + x) * 4
  }

  private putPixel(target: ImageData, master: ImageData, index: number): void {
    for (let offset = 0; offset < 4; offset++) {
      target.data[index + offset] = master.data[index + offset]
    }
  }

  private putReversePixel(
    target: ImageData,
    master: ImageData,
    index: number
  ): void {
    const width = master.width * 4
    const min = width * Math.floor(index / width)
    const max = min + width
    for (let offset = 0; offset < 4; offset++) {
      target.data[index + offset] = master.data[max - index + min + offset]
    }
  }
}
