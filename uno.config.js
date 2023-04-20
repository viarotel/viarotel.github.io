import { defineConfig, presetWind } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

const primary = {
  DEFAULT: '#0464bb',
}

const windPresetConfig = presetWind()
// console.log(windPresetConfig.theme?.fontSize)
export default defineConfig({
  presets: [windPresetConfig],
  safelist: ['hover:opacity-100', 'opacity-70', 'duration-500'],
  theme: {
    colors: {
      // @ts-ignore
      gray: windPresetConfig.theme.colors.neutral,
      primary,
    },
  },
  transformers: [transformerDirectives()],
  shortcuts: {
    'container-fixed': 'w-screen-2xl mx-auto',
    'position-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'position-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'position-y-center': 'absolute top-1/2 transform -translate-y-1/2',
    'inset-fix-0': 'top-0 bottom-0 left-0 right-0',
  },
})
