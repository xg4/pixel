import Pixel from '../pixel'

export const isPixel = (x: any): x is Pixel => x instanceof Pixel

export const isImage = (x: any): x is HTMLImageElement => x instanceof Image

export const isImageData = (x: any): x is ImageData => x instanceof ImageData

export const isCanvas = (x: any): x is HTMLCanvasElement =>
  x instanceof HTMLCanvasElement

export const isVideo = (x: any): x is HTMLVideoElement =>
  x instanceof HTMLVideoElement
