export type PxSource =
  | ImageData
  | HTMLImageElement
  | HTMLVideoElement
  | HTMLCanvasElement

export interface PxOptions {
  width: number
  height: number
}

export interface PhantomOptions {
  frame: number
  density: number
}
