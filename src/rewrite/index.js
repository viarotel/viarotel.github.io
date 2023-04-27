import { fileURLToPath, URL } from 'node:url'

const reImport = (path) => fileURLToPath(new URL(path, import.meta.url))

export default {
  './VPHero.vue': reImport('./components/VPHero/index.vue'),
}
