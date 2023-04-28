<script setup>
import { reactive, ref, computed } from 'vue'

import { useData } from 'vitepress'

import { sample } from 'lodash-es'

import ViaLottiePlayer from '@/components/ViaLottiePlayer/index.vue'

const { lang } = useData()

const lotties = import.meta.globEager('@/assets/lotties/*.json')
const entriesLotties = Object.entries(lotties)
// console.log('lotties', lotties)

const currentLottie = ref(sample(entriesLotties))
const currentLottieJSON = computed(
  () => currentLottie.value?.[1]?.default || null,
)
const currentLottiePath = computed(() => currentLottie.value?.[0] || '')

const lottiePlayer = ref(null)
const loadNextLottie = () => {
  const filterLotties = entriesLotties.filter(
    (item) => item[0] !== currentLottiePath.value,
  )
  currentLottie.value = sample(filterLotties)

  // console.log('lottiePlayer', lottiePlayer)
  if (lottiePlayer.value) {
    lottiePlayer.value.load(currentLottieJSON.value)
  }
}
</script>

<template>
  <div
    class="h-full flex items-center justify-center cursor-pointer min-h-80"
    :title="
      lang === 'en'
        ? 'Click to switch to other o animation'
        : '点击切换其他动画'
    "
    @click="loadNextLottie"
  >
    <ViaLottiePlayer
      class="translate-x-2 max-w-48 sm:max-w-72"
      loop
      autoplay
      :el="(value) => (lottiePlayer = value)"
      :src="currentLottieJSON"
    >
    </ViaLottiePlayer>
  </div>
</template>

<style></style>
