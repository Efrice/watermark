<script setup lang="ts">
import type { ConfigKey } from '~/types'
import { tooltips } from '~/const'

const { property } = defineProps<{
  property: ConfigKey
}>()

const { value } = defineModels<{
  value: string | number | boolean
}>()
</script>

<template>
  <div pb-1 flex justify-between flex-items-center>
    <label :for="property">
      {{ property }} 
      <span i-carbon-help inline-block text-sm float-right mt1 ml1 :title="tooltips[property]"></span>
    </label>
    <div v-if="property === 'saveConfig'">
      <TheSwitch :value="value" @update:value="(val: boolean) => $emit('update:value', val)"/>
    </div>
    <div v-else-if="property === 'words' && typeof value === 'string'">
      <textarea  
        :id="property"
        v-model="value"
        px-1.5
        cols="25" 
        rows="2"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none">
      </textarea>
    </div>
    <div v-else-if="property === 'compression'" pt3>
      <input 
        w-58
        class="range"
        title="Lower the Value, Better the Compression" 
        type="range" min="0" max="1" 
        v-model="value" 
        step="0.1"/>
      <p py-2>{{ value }} </p>
    </div>
    <div v-else>
      <input
        :id="property"
        v-model="value"
        type="text"
        p="x-0 y-1"
        w-58
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </div>
  </div>
</template>
