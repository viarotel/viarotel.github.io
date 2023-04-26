<script setup>
import { ref } from 'vue'
// import { useData } from 'vitepress'
const props = defineProps({
  el: {
    type: Function,
    default: () => {},
  },
})

// 仅在浏览器端加载 lottie-player
const renderLottie = ref(false)
if (!import.meta.env.SSR) {
  import('@lottiefiles/lottie-player')
    .then(() => {
      renderLottie.value = true
    })
    .catch((e) => console.error(e))
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
