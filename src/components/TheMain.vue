<script setup lang="ts">
import type { Config, HTMLInputEvent } from '~/types'
import { imageSource, generateCanvas, configChange, downloadImage } from '~/util';

const { config } = defineProps<{
  config: Config
}>()

let img: HTMLImageElement
const canvas = ref()
const imgSrc = ref()

watchEffect(() => {
  configChange(canvas, config, img)
})

function load(e: Event) {
  const files = (e as HTMLInputEvent).target.files
  if (files && files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const image = new Image()
      image.src = reader.result as string
      img = image
      image.onload = () => {
        config.width = `${image.width}`
        config.height = `${image.height}`
        generateCanvas(canvas, config, image)
      }
    }
    reader.onloadend = () => {
      imgSrc.value = reader.result as string
    }
  }
}

function download() {
  if(imageSource === '') return
  downloadImage(imageSource, config)
}
</script>

<template>
  <div pl-100>
    <div relative h-10>
      <input id="load" absolute left-0 m-3 w-26 opacity-0 type="file" accept="image/*" @change="load">
      <label absolute left-0 for="load">
        <span
          class="m-3 text-sm btn"
        >
          Load Image
        </span>
      </label>
      <button
        absolute left-35
        class="m-3 text-sm btn"
        @click="download"
      >
        Download Image
      </button>
    </div>

    <div m-3 w-fit border-1 border-rd p-3 mr-5>
      <div v-if="imgSrc" >
        <img id="myImage" :src="imgSrc" :style="`width: ${config.width}px;height: ${config.height}px;max-width: unset;`">
        <canvas ref="canvas"  display-none></canvas>
      </div>
      <div v-else w-200 h-168 flex justify-center flex-items-center>
        <label for="load"  border-1 border-dashed>
          <span icon-btn text-10 display-block i-material-symbols-add-photo-alternate-rounded/>
        </label>
      </div>
    </div>
  </div>
</template>
