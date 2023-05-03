<script setup>
// import { useData } from 'vitepress'

import { ref } from 'vue'

const props = defineProps({
  el: {
    type: Function,
    default: () => {},
  },
})

const renderLottie = ref(false)

if (!import.meta.env.SSR) {
  (async () => {
    try {
      const { default: loadJS } = await import('load-js/src/load-js')

      await loadJS({
        type: 'module',
        async: true,
        url: 'https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@1.7.1/dist/lottie-player.esm.js',
        // url: 'https://cdn.bootcdn.net/ajax/libs/lottie-player/1.7.1/lottie-player.esm.js',
      })

      renderLottie.value = true
    } catch (error) {
      console.warn('error')
    }
  })()
}
</script>

<template>
  <lottie-player
    v-if="renderLottie"
    v-bind="$attrs"
    :ref="props.el"
  >
  </lottie-player>
</template>
