import { fileURLToPath, URL } from 'node:url'

const importComponent = (path) => fileURLToPath(new URL(path, import.meta.url))

export default {
  // './VPHero.vue': importComponent('./components/VPHero/index.vue'),
}
