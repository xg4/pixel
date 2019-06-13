export function shuffle(arr: Uint8ClampedArray) {
  let length = arr.length
  while (length > 1) {
    let index = Math.floor(Math.random() * length--)
    ;[arr[length], arr[index]] = [arr[index], arr[length]]
  }
  return arr
}
