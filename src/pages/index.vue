<script setup lang="ts">
import type { Config, ConfigKey } from '~/types'

const config = reactive<Config>({
  word: '仅用于工作认证',
  width: '0',
  height: '0',
  font: '16',
  color: 'rgba(0, 0, 0, 0.2)',
  rotate: '-15',
  row: '7',
  col: '7',
  startX: '-100',
  startY: '0',
  offsetX: '48',
  offsetY: '48',
})

function update(key: ConfigKey, val: string){
  config[key] = val
}
</script>

<template>
  <div>
    <TheControl
      :config="config"
      @update="update"
    />

    <TheMain 
      :config="config"
    />
  </div>
</template>
