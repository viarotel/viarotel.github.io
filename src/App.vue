<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout></Layout>
</template>
<style lang="postcss">
.VPNavBarTitle .VPImage.logo {
  @apply !rounded;
}
</style>
