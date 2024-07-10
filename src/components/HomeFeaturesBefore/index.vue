<script setup>
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

import { data } from '@/data/repos.data.js'

const { lang } = useData()

const features = computed(() => {
  const repos = data.repos || []

  return repos.map(item => ({
    ...item,
    title: item.name,
    details: item.description,
    link: `https://github.com/${item.repo}`,
  }))
})
</script>

<script></script>

<template>
  <div class="via-features">
    <div class="text-center pt-8 pb-8">
      <span
        class="bg-white dark:bg-[#1e1e20] px-2 relative italic relative text-gray-700 dark:text-gray-300"
      >
        {{ lang === 'en' ? "What I've been doing lately" : '最近在做的事' }}
        <div
          class="absolute w-80 h-[0.2px] bg-gray-300 dark:bg-gray-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1"
        />
      </span>
    </div>
    <VPFeatures v-if="features.length" :features="features" />
  </div>
</template>

<style lang="postcss">
.via-features .VPFeatures .details {
  @apply line-clamp-2 h-[60px];
}
</style>
