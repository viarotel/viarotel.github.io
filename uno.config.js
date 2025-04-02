import presetWind from '@unocss/preset-wind'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'

const presets = [
  presetWind(),
]

export default defineConfig({
  presets,
  transformers: [transformerDirectives()],
  safelist: ['hover:opacity-100', 'opacity-70', 'duration-500'],
  theme: {
    colors: {},
  },
  shortcuts: {
    'inset-0': 'top-0 bottom-0 left-0 right-0',
    'inset-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
  },
})
