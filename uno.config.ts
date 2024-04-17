import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'color-base': 'color-neutral-500 dark:color-neutral-300',
    'bg-base': 'bg-white dark:bg-neutral-900',
    'border-base': 'border-#aaa3',

    'bg-hover': 'bg-primary-400:5',

    'btn-action': 'border border-base rounded flex gap-2 items-center px2 py1 op75 hover:op100 hover:bg-hover',
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: '#8080F2',
        25: '#FBFBFF',
        50: '#F6F6FE',
        100: '#ECECFD',
        200: '#DEDEFF',
        300: '#CCCCFA',
        400: '#B7B7FF',
        500: '#A0A0F5',
        600: '#8080F2',
        700: '#6358D4',
        800: '#4B32C3',
        900: '#341BAB',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'Space Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
