<script setup>
import { computed, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { init } from '@waline/client'
import '@waline/client/waline.css'

const appData = useData()
const lang = computed(() => appData.lang.value)

function placeholder() {
  return lang.value === 'en' ? 'Say something...' : '说点什么...'
}
function initWaline() {
  return init({
    el: '#waline',
    serverURL: 'https://waline-service.netlify.app/.netlify/functions/comment',
    dark: '.dark',
    lang: lang.value,
    locale: {
      placeholder: placeholder(),
    },
  })
}

let waline = null
onMounted(() => {
  waline = initWaline()
})

const route = useRoute()
watch(
  () => route.path,
  () => {
    // console.log('route.path', route.path)
    waline?.update()
  },
  {
    immediate: true,
  },
)

watch(
  () => lang.value,
  (value) => {
    // console.log('appData.lang.value', value)
    waline?.update({
      lang: value,
      locale: {
        placeholder: placeholder(),
      },
    })
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
