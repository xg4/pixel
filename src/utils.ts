export const isSrc = (url: any): url is string =>
  /^(((blob:)?https?:)?\/\/|data:image|\/)/.test(url)

export const isImage = (x: any): x is HTMLImageElement => x instanceof Image

export const isImageData = (x: any): x is ImageData => x instanceof ImageData

export const isCanvas = (x: any): x is HTMLCanvasElement =>
  x instanceof HTMLCanvasElement

export const isVideo = (x: any): x is HTMLVideoElement =>
  x instanceof HTMLVideoElement

export function shuffle(arr: Uint8ClampedArray) {
  let length = arr.length
  while (length > 1) {
    let index = Math.floor(Math.random() * length--)
    ;[arr[length], arr[index]] = [arr[index], arr[length]]
  }
  return arr
}
