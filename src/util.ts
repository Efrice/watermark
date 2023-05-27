import type { Config, imgData } from '~/types'
import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { saveAs } from 'file-saver'

export function generateCanvas(config: Config, image: HTMLImageElement | HTMLCanvasElement, loadInit: boolean) {
  const { width, height, words, compression } = config
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = loadInit ? image.width : width
  canvas.height = loadInit ? image.height : height
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  if(words.trim().length > 0) addWaterMark(config, context)
  return {
    src: canvas.toDataURL('image/jpeg', compression),
    newCanvas: canvas
  }
}

function addWaterMark(config: Config, context: CanvasRenderingContext2D) {
  const { width, height, words, fontSize, color, rotate, row, col, startX, startY, offsetX, offsetY } = config
  context.fillStyle = 'rgba(255, 255, 255, 0.2)'
  context.fillRect(0, 0, width, height)
  context.rotate(parseInt(rotate) * Math.PI / 180)
  context.fillStyle = color
  context.font = `normal ${fontSize}px Arial`
  Array.from({length: row}).forEach((_, index)=>{
    Array.from({length: col}).forEach((_, idx) => {
      if(words.includes('\n')) {
        multipleWords(context, index, idx, words, fontSize, startX, startY, offsetX, offsetY)
      }else {
        const x = +startX + idx * (words.length * fontSize + offsetX)
        const y = +startY + index * (offsetY + fontSize)
        context.fillText(words, x, y)
      }
    })
  })
}

function multipleWords(context: CanvasRenderingContext2D, index: number, idx: number, words: string, fontSize: number, startX: string, startY: string, offsetX: number, offsetY: number) {
  const wordsArr = words.split("\n")
  const len = wordsArr.length, maxLen = Math.max(...wordsArr.map(item => item.length))
  for (let i = 0; i < len; i++) {
    const x = +startX + idx * (maxLen * fontSize + offsetX) + (maxLen - wordsArr[i].length) / 2 * fontSize 
    const y = +startY + index * offsetY + fontSize * 1.3 * (i + len * index)
    context.fillText(wordsArr[i], x, y)
  }
}

export function downloadImage(url: string, config: Config, name: string) {
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
    link.download = name 
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

function dataURLToBlob(dataURL: string) {
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i)
    uInt8Array[i] = raw.charCodeAt(i)

  return new Blob([uInt8Array], { type: contentType })
}

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

const imgData: imgData[] = []
export async function loadPdf(url: string, config: Config, wrap: Ref<HTMLElement>, loading: Ref<boolean>, loadInit: boolean) {
  const loadingTask = pdf.getDocument({
    url,
    disableRange: true
  });

  imgData.length = 0

  loadingTask.promise.then((pdfDoc) => {
    if(wrap.value) wrap.value.innerHTML = ''
    const totalPages = pdfDoc.numPages;
    for (let i = 1; i <= totalPages; i++) {
      pdfDoc.getPage(i).then((page) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const viewport = page.getViewport({ scale: 1 });

        canvas.width = viewport.width
        canvas.height = viewport.height

        config.width = canvas.width
        config.height = canvas.height

        const renderContext = {
          canvasContext: ctx,
          viewport,
        }

        const renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
          const { newCanvas, src } = generateCanvas(config, canvas, loadInit)
          wrap.value.appendChild(newCanvas)
          imgData.push({src, width: canvas.width, height: canvas.height})
          if(imgData.length === totalPages){
            loading.value = false
          }
        })
      })
    }
  })
}

export function img2Pdf(name: string, loading: Ref<boolean>) {
  const options = {
    autoFirstPage: false,
    compress: false
  }

  const doc = new PDFDocument(options)
  const stream = doc.pipe(blobStream())

  for (let i = 0; i < imgData.length; i++) {
    const {src, width, height} = imgData[i]
    doc.addPage({
      size: [width, height],
    });
    doc.image(src, 0, 0)
  }

  doc.end()

  stream.on("finish", function () {
    var output_blob = stream.toBlob("application/pdf")
    saveAs(output_blob, name)
    loading.value = false
  });
}
