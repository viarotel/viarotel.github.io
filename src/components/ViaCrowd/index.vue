<script setup>
import crowd from './core/crowd.js'

onMounted(() => {
  crowd.config({ el: '#crowd' }).init()
})
</script>

<template>
  <canvas
    id="crowd"
    title="Inspired by realrz.com"
    v-bind="$attrs"
    class="w-full h-120"
  />
</template>
