<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { lang } = useData()

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-features-before>
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
    </template>
  </Layout>
</template>
