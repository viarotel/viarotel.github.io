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
      await import('@lottiefiles/lottie-player')

      renderLottie.value = true
    }
    catch (error) {
      console.warn('error')
    }
  })()
}
</script>

<template>
  <lottie-player v-if="renderLottie" v-bind="$attrs" :ref="props.el" />
</template>
