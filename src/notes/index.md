---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "viarotel"
  text: ""
  tagline: "我经常忘记一些事，它们琐碎却重要，我想记录它们。"
  image:
    src: /images/avatar.jpg
    alt: viarotel
  actions:
    - theme: brand
      text: 了解我
      link: /personal
    - theme: alt
      text: 与我联系
      link: /contact
---

<script setup>
  import ViaFeatures from '@/components/ViaFeatures/index.vue'
</script>

<ViaFeatures/>