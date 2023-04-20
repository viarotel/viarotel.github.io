<script setup>
import { reactive } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { sample } from 'lodash-es'

const { Layout } = DefaultTheme

const { lang } = useData()

const lotties = import.meta.globEager('./notes/public/lotties/*.json')
// console.log('lotties', lotties)

const sampleLottie = sample(lotties).default
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <div class="h-full flex items-center justify-center">
        <ClientOnly>
          <lottie-player
            autoplay
            loop
            class="translate-x-2 max-w-48 sm:max-w-72"
            :src="sampleLottie"
          >
          </lottie-player>
        </ClientOnly>
      </div>
    </template>
  </Layout>
</template>
