<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { init } from '@waline/client'
import '@waline/client/waline.css'

function initWaline() {
  return init({
    el: '#waline',
    serverURL: 'https://waline-service.netlify.app/.netlify/functions/comment',
  })
}

let waline = null
onMounted(() => {
  waline = initWaline()
})

const route = useRoute()
watch(
  () => route.path,
  (value) => {
    console.log('route.path', value)
    waline?.update()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div id="waline" class="-mx-2 pt-16"></div>
</template>

<style lang="postcss"></style>
