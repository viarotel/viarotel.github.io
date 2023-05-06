<script setup>
import { reactive, ref, computed } from 'vue'
import { useData } from 'vitepress'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import request from '@/utils/request/index.js'

const { lang, theme } = useData()

// console.log('theme.value', theme.value)
const features = computed(() => {
  const repos = theme.value.async.repos || []
  return repos
    .map((item) => ({
      ...item,
      title: item.name,
      details: item.description,
      link: `https://github.com/${item.repo}`,
    }))
    .sort((a, b) => b.stars - a.stars)
})
</script>

<script></script>

<template>
  <div class="via-features">
    <div class="text-center pt-8 pb-8">
      <span
        class="bg-white dark:bg-[#1e1e20] px-2 relative italic relative text-gray-700 dark:text-gray-300"
      >
        {{ lang === "en" ? "What I've been doing lately" : "最近在做的事" }}
        <div
          class="absolute w-80 h-[0.2px] bg-gray-300 dark:bg-gray-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1"
        ></div>
      </span>
    </div>
    <VPFeatures
      v-if="features.length"
      :features="features"
    />
  </div>
</template>

<style lang="postcss">
.via-features .VPFeatures .details {
  @apply line-clamp-2 h-[60px];
}
</style>
