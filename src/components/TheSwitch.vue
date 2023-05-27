<script setup lang="ts">
const { value } = defineProps<{
  value: boolean
}>()

const emit = defineEmits(['update:value'])

function toggle(){
  emit('update:value', !value )
}
</script>

<template>
  <button class="switch" :class="`${value ? 'light' : ''}`" type="button" role="switch">
    <span class="check" :class="`${value ? 'light' : ''}`" @click="toggle"></span>
  </button>
</template>

<style scoped>
.switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid rgba(60, 60, 67, .29);
  background-color: rgba(75, 85, 99, .5);
}

.switch.light {
  background-color: rgba(15, 118, 110, 1);
}

.switch:hover {
  border-color: #8e8e93;
}

.check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06);
  transition: transform 0.25s;
}

.check.light {
  transform: translate(18px);
}
</style>
