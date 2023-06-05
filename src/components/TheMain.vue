<script setup lang="ts">
import type { Config, HTMLInputEvent } from '~/types'
import { generateCanvas, downloadImage, loadPdf, img2Pdf } from '~/util';

const { config } = defineProps<{
  config: Config
}>()


watch(config, configChange)

function configChange() {
  loadInit = false
  if(img)
    preview.value.src = generateCanvas(config, img, loadInit ).src
  if(pdfUrl.value)
    loadPdf(pdfUrl.value, config, wrap, loading, loadInit)
}

let loadInit = false
let type = ''
let name = ''
function load(e: Event) {
  loadInit = true
  reLoad()
  const files = (e as HTMLInputEvent).target.files
  if (files && files.length > 0) {
    const file = files[0]
    type = file.type
    name = file.name
    if(type.startsWith("image/")) 
      resolveImage(file)
    if(type === "application/pdf") {
      loading.value = true
      resolvePDF(file)
    }
  }
}

function reLoad(){
  if(img) img = null
  if(url.value) url.value = ''
  if(pdfUrl.value) pdfUrl.value = ''
  if(wrap.value) wrap.value.innerHTML = ''
}

let img: HTMLImageElement | null
const canvas = ref()
const preview = ref()
const url = ref('')
function resolveImage(file: Blob){
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    const image = new Image()
    image.src = reader.result as string
    img = image
    image.onload = () => {
      config.width = image.width
      config.height = image.height
      preview.value.src = generateCanvas(config, image, loadInit).src
    }
  }
  reader.onloadend = () => {
    url.value = reader.result as string
  }
}

const pdfUrl = ref('')
const loading = ref(false)
const wrap = ref() as Ref<HTMLElement>
function resolvePDF(file: Blob){
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    pdfUrl.value = reader.result as string
    loadPdf(pdfUrl.value, config , wrap, loading, loadInit)
  }
}

function download() {
  if(url.value === '' && pdfUrl.value === '') return
  
  if(type.startsWith("image/") && img) {
    const src = generateCanvas(config, img, loadInit).src
    downloadImage(src, config, name)
  }
  if(type === "application/pdf") {
    img2Pdf(name, loading)
  }
}
</script>

<template>
  <div pl-100>
    <div relative h-10>
      <input id="load" absolute left-0 m-3 w-16 opacity-0 type="file" accept="image/*, application/pdf" @change="load">
      <label absolute left-0 for="load">
        <span
          class="m-3 text-sm btn"
        >
          Load
        </span>
      </label>
      <button
        absolute left-25
        class="m-3 text-sm btn"
        :disabled="url === '' && pdfUrl === ''"
        @click="download"
      >
        Download
      </button>
    </div>

    <div m-3 w-fit border-1 border-rd p-3 mr-5>
      <div v-if="url">
        <img ref="preview" :src="url" :style="`width: ${config.width}px;height: ${config.height}px;max-width: unset;`">
        <canvas ref="canvas"  display-none></canvas>
      </div>
      <div v-else-if="pdfUrl">
        <div ref="wrap"></div>
      </div>
      <div v-else w-200 h-168 flex justify-center flex-items-center>
        <label for="load"  border-1 border-dashed>
          <span icon-btn text-10 display-block i-carbon:task-add/>
        </label>
      </div>
      </div>
    <div v-show="loading" position='fixed' left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-teal-100 >
      <span class="loading btn" i-carbon-3rd-party-connected text-4xl></span>
    </div>
  </div>
</template>
