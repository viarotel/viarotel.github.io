<script setup>
import { reactive, ref } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { sample } from 'lodash-es'

const { Layout } = DefaultTheme

const { lang } = useData()

// 仅在浏览器端加载 lottie-player
const showLottie = ref(false)
if (!import.meta.env.SSR) {
  import('@lottiefiles/lottie-player')
    .then(() => {
      showLottie.value = true
    })
    .catch((e) => console.log(e))
}

const lotties = import.meta.globEager('./notes/public/lotties/*.json')
// console.log('lotties', lotties)

const sampleLottie = sample(lotties).default
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <div class="h-full flex items-center justify-center">
        <lottie-player
          v-if="showLottie"
          autoplay
          loop
          class="translate-x-2 max-w-48 sm:max-w-72"
          :src="sampleLottie"
        >
        </lottie-player>
      </div>
    </template>
  </Layout>
</template>
