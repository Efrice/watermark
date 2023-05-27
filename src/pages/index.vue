<script setup lang="ts">
import type { ConfigKey } from '~/types'
import { WATERMWRK_KEY, defaultConfig } from '~/const'

const storageConfig = localStorage.getItem(WATERMWRK_KEY)
const userConfig = storageConfig && JSON.parse(storageConfig)

const config = reactive(userConfig || defaultConfig)

const stringKeys = ['words', 'color', 'rotate', 'startX', 'startY']
function update(key: ConfigKey, val: string | number | boolean){
  if(key === 'saveConfig') 
    config[key] = Boolean(val)
  else if(stringKeys.includes(key)) 
    config[key] = val
  else 
    config[key] = +val

  if(key === 'saveConfig' && val === false) 
    localStorage.setItem(WATERMWRK_KEY, '')
  else 
    config['saveConfig'] && localStorage.setItem(WATERMWRK_KEY, JSON.stringify(config))
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
