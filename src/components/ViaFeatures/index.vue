<script setup>
import { reactive, ref, onServerPrefetch } from 'vue'
import { useData } from 'vitepress'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import request from '@/utils/request/index.js'

const { lang } = useData()

const getRepos = async () => {
  const res = {
    repos: [
      {
        id: 298999700,
        name: 'vue-apicloud-cli',
        repo: 'viarotel-org/vue-apicloud-cli',
        description: '基于vue的APICloud脚手架',
        createdAt: '2020-09-27T09:43:14Z',
        updatedAt: '2023-04-20T03:35:10Z',
        pushedAt: '2021-10-26T09:36:06Z',
        stars: 45,
        watchers: 45,
        forks: 1,
      },
      {
        id: 320452403,
        name: 'vue-cli-uniapp',
        repo: 'viarotel-org/vue-cli-uniapp',
        description: '基于vuecli模式的uniapp脚手架集成模板',
        createdAt: '2020-12-11T03:06:10Z',
        updatedAt: '2023-04-20T03:34:40Z',
        pushedAt: '2023-01-06T10:41:46Z',
        stars: 94,
        watchers: 94,
        forks: 10,
      },
      {
        id: 324129436,
        name: 'vue-apicloud-single-cli',
        repo: 'viarotel-org/vue-apicloud-single-cli',
        description: '基于vue的APICloud单页面脚手架',
        createdAt: '2020-12-24T10:26:42Z',
        updatedAt: '2023-04-20T03:44:08Z',
        pushedAt: '2021-01-05T10:42:41Z',
        stars: 1,
        watchers: 1,
        forks: 0,
      },
      {
        id: 329569599,
        name: 'vue-admin-cli',
        repo: 'viarotel-org/vue-admin-cli',
        description: '基于vue3.x的中后台管理系统(elementPlus+tailwindcss)',
        createdAt: '2021-01-14T09:39:13Z',
        updatedAt: '2023-04-20T03:44:34Z',
        pushedAt: '2021-02-20T01:36:43Z',
        stars: 17,
        watchers: 17,
        forks: 2,
      },
      {
        id: 336153352,
        name: 'blog-web',
        repo: 'viarotel-org/blog-web',
        description: '博客前端项目',
        createdAt: '2021-02-05T03:30:42Z',
        updatedAt: '2023-04-20T03:43:45Z',
        pushedAt: '2021-02-20T08:11:20Z',
        stars: 1,
        watchers: 1,
        forks: 0,
      },
      {
        id: 384377047,
        name: 'vue-cli-electron',
        repo: 'viarotel-org/vue-cli-electron',
        description: '基于Vue CLI搭建的Electron脚手架',
        createdAt: '2021-07-09T08:47:01Z',
        updatedAt: '2023-04-20T03:39:45Z',
        pushedAt: '2022-05-25T01:56:36Z',
        stars: 13,
        watchers: 13,
        forks: 1,
      },
      {
        id: 432026047,
        name: 'postcss-uniapp-tailwindcss-compatible',
        repo: 'viarotel-org/postcss-uniapp-tailwindcss-compatible',
        description: '在uniapp中使用tailwindcss兼容postcss7',
        createdAt: '2021-11-26T01:58:55Z',
        updatedAt: '2023-04-20T03:45:03Z',
        pushedAt: '2021-11-26T05:21:17Z',
        stars: 1,
        watchers: 1,
        forks: 0,
      },
      {
        id: 585389337,
        name: 'vite-uniapp-template',
        repo: 'viarotel-org/vite-uniapp-template',
        description: '🚀基于vite驱动的uniapp最佳实践的集成模板',
        createdAt: '2023-01-05T03:29:38Z',
        updatedAt: '2023-04-20T03:32:34Z',
        pushedAt: '2023-04-03T07:01:15Z',
        stars: 28,
        watchers: 28,
        forks: 7,
      },
      {
        id: 601418160,
        name: 'bing-chat-live-open',
        repo: 'viarotel-org/bing-chat-live-open',
        description: '使用 BingChat(基于 OpenGPT4) 进行直播弹幕互动',
        createdAt: '2023-02-14T02:38:30Z',
        updatedAt: '2023-04-20T03:42:36Z',
        pushedAt: '2023-02-17T01:42:20Z',
        stars: 15,
        watchers: 15,
        forks: 2,
      },
    ],
  }
  // const res = await request
  //   .get('/ungh/orgs/viarotel-org/repos')
  //   .catch((e) => console.warn(e))

  // console.log('res', res)

  return res
}

const features = ref([]);

(async () => {
  const res = await getRepos()
  features.value = res.repos
    .map((item) => ({
      ...item,
      title: item.name,
      details: item.description,
      link: `https://github.com/${item.repo}`,
    }))
    .sort((a, b) => b.stars - a.stars)
})()
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
    <!-- v-if="features.length" -->
    <VPFeatures :features="features" />
  </div>
</template>

<style lang="postcss">
.via-features .VPFeatures .details {
  @apply line-clamp-2 h-[60px];
}
</style>
