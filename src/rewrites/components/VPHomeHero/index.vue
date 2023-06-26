<script setup>
import VPHero from 'vitepress/dist/client/theme-default/components/VPHero.vue'
import { useData } from 'vitepress'

import { appName, appInfo } from '@/configs/index.js'

const { frontmatter: fm } = useData()
</script>

<template>
  <VPHero
    v-if="fm.hero"
    class="VPHomeHero"
    :name="fm.hero.name || appName"
    :text="fm.hero.text"
    :tagline="fm.hero.tagline || appInfo[0]"
    :image="{
      ...(fm.hero?.image || {}),
      alt: fm.hero?.image?.alt || appName,
    }"
    :actions="fm.hero.actions"
  >
    <template #home-hero-info><slot name="home-hero-info" /></template>
    <template #home-hero-image><slot name="home-hero-image" /></template>
  </VPHero>
</template>
