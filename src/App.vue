<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeFeaturesBefore from './components/HomeFeaturesBefore/index.vue'
import HomeHeroImage from './components/HomeHeroImage/index.vue'
import WalineComment from './components/WalineComment/index.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout class="">
    <template #home-hero-image>
      <HomeHeroImage />
    </template>
    <template #home-features-before>
      <HomeFeaturesBefore />
    </template>
    <template #doc-after>
      <WalineComment />
    </template>
  </Layout>
</template>

<style lang="postcss"></style>
