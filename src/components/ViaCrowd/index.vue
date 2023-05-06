<script setup>
// import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import crowd from './core/crowd.js'

onMounted(() => {
  crowd.init()
})
</script>

<template>
  <canvas
    id="canvas"
    title="Inspired by realrz.com"
    v-bind="$attrs"
    class="w-full h-120"
  ></canvas>
</template>
