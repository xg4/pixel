export const loadImage = (url: string): Promise<Event> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = url
  })
