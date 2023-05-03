<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeHeroImage from './components/HomeHeroImage/index.vue'
import HomeFeaturesBefore from './components/HomeFeaturesBefore/index.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HomeHeroImage />
    </template>
    <template #home-features-before>
      <HomeFeaturesBefore />
    </template>
  </Layout>
</template>

<style lang="postcss"></style>
