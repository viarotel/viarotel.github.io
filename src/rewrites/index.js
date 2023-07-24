import { URL, fileURLToPath } from 'node:url'

const importComponent = path => fileURLToPath(new URL(path, import.meta.url))

export default {
  './VPHomeHero.vue': importComponent('./components/VPHomeHero/index.vue'),
}
