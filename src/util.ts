import type { Config } from '~/types'

export let imageSource = ''

export function configChange(canvas: Ref<HTMLCanvasElement>, config: Config, img: HTMLImageElement): void {
  canvas.value && generateCanvas(canvas, config, img)
}

export function generateCanvas(canvas: Ref<HTMLCanvasElement>, config: Config, image: HTMLImageElement) {
  const { width, height, word, font, color, rotate, row, col, startX, startY, offsetX, offsetY } = config
  const el = document.getElementById('myImage') as HTMLImageElement
  const context = canvas.value.getContext('2d')!
  canvas.value.width = width === '0' ? image.width : +width
  canvas.value.height = height === '0' ? image.height : +height
  context.drawImage(image, 0, 0, canvas.value.width, canvas.value.height)
  context.fillStyle = 'rgba(255, 255, 255, 0.2)'
  context.fillRect(0, 0, canvas.value.width, canvas.value.height)
  context.rotate(parseInt(rotate) * Math.PI / 180)
  context.fillStyle = color
  context.font = `normal ${font}px Arial`
  Array.from({length: +row}).forEach((_, index)=>{
    Array.from({length: +col}).forEach((_, idx) => {
      if(word.includes('\n')) {
        multipleWords(context, index, idx, word, font, startX, startY, offsetX, offsetY)
      }else {
        context.fillText(word, +startX + index * +offsetX + idx * (word.length * +font + +offsetX), +startY + (index + 1) * (+offsetY))
      }
    })
  })
  imageSource = canvas.value.toDataURL()
  el.src = imageSource
}

function multipleWords(context: CanvasRenderingContext2D, index: number, idx: number, word: string, font: string, startX: string, startY: string, offsetX: string, offsetY: string) {
  const words = word.split("\n")
  const len = words.length, maxLen = Math.max(...words.map(item => item.length))
  for (let i = 0; i < len; i++) {
    const x = +startX + index * + offsetX + idx * (maxLen * +font + +offsetX) + (maxLen - words[i].length) / 2 * +font, 
      y = +startY + (index + 1) * + offsetY + (+font * 1.5) * (i + len + index + 1)
    context.fillText(words[i], x, y)
  }
}

export function downloadImage(url: string, config: Config) {
  const img = new Image()
  img.src = url

  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = +config.width
    canvas.height = +config.height

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0)

    const dataURL = canvas.toDataURL('image/png')
    const blob = dataURLToBlob(dataURL)

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'download'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function dataURLToBlob(dataURL: string) {
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i)
    uInt8Array[i] = raw.charCodeAt(i)

  return new Blob([uInt8Array], { type: contentType })
}