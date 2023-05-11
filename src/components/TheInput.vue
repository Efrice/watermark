<script setup lang="ts">
const { property } = defineProps<{
  property: string
}>()

const { value } = defineModels<{
  value: number | string
}>()
</script>

<template>
  <div pb-1 flex justify-between flex-items-center>
    <label :for="property" pr-3>{{ property }}</label>
    <textarea  
      v-if="property === 'word'"
      :id="property"
      v-model="value"
      px-1.5
      cols="31" 
      rows="2"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none">
    </textarea>
    <input
      v-else
      :id="property"
      v-model="value"
      type="text"
      p="x-0 y-1"
      w-70
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >
  </div>
</template>
