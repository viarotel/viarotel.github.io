import { ofetch } from 'ofetch'

const baseURL = 'https://ungh.cc'

const includes = [
  'escrcpy',
  'vite-uniapp-template',
  'packages',
  'environments',
  'waline-service',
  'vue-cli-uniapp',
  'vue-apicloud-cli',
  'bing-chat-live-open',
  'blog-demo',
]

async function getRepos() {
  const promises = includes.map(name =>
    ofetch(`${baseURL}/repos/viarotel-org/${name}`, {
      method: 'GET',
    }).catch(e => console.warn(e)),
  )

  const res = await Promise.allSettled(promises)

  const repos = res
    .filter(item => item.status === 'fulfilled')
    .map(item => item.value.repo)
  // console.log('repos', repos)

  return repos
}

export default {
  async load() {
    return {
      repos: await getRepos(),
    }
  },
}
