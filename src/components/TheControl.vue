<script setup lang="ts">
import type { Config } from '~/types';

const { config } = defineProps<{
  config: Config
}>()
</script>

<template>
  <div float-left w-100 mt="52px" pt-2 border-1 border-rd>
    <div i-material-symbols-add-photo-alternate-rounded inline-block text-3xl />
    <p>
        Watermark
    </p>
    <p>
      <em text-sm op75>Add watermark to image</em>
    </p>

    <div py-2 />
    
    <div px-5>
      <TheInput v-for="(val, key) in config" :property="key" :value="val" @update:value="(val: string) => $emit('update', key, val)"/>
    </div>
    
    <div py-4 />
    <p>
      <em text-sm op75>No sever, so safe</em>
    </p>
    <TheFooter />
  </div>
</template>