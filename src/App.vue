<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeHeroImage from './components/HomeHeroImage/index.vue'
import ViaFeatures from './components/ViaFeatures/index.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HomeHeroImage />
    </template>
    <template #home-features-before>
      <ViaFeatures />
    </template>
  </Layout>
</template>

<style lang="postcss"></style>
