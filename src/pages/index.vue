<script setup lang="ts">
import type { Config, ConfigKey } from '~/types'

const config = reactive<Config>({
  width: '0',
  height: '0',
  font: '16',
  color: 'rgba(0, 0, 0, 0.2)',
  degree: '-15',
  row: '7',
  col: '3',
  startX: '-100',
  startY: '-40',
  offsetX: '16',
  offsetY: '48',
  word: '仅用于认证',
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
