export function download(url: string, name = 'pixel') {
  const a = document.createElement('a')
  a.download = name || ''
  a.href = url
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
