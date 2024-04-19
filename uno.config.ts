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
    'bg-glass': 'bg-white:75 dark:bg-neutral-900:75 backdrop-blur-5',
    'bg-tooltip': 'bg-white:75 dark:bg-neutral-900:75 backdrop-blur-8',

    'color-active': 'color-primary-600 dark:color-primary-400',
    'border-active': 'border-primary-600/25 dark:border-primary-400/25',
    'bg-active': 'bg-primary-400:10',

    'btn-action': 'border border-base rounded-2xl flex gap-2 items-center px2 py1 op75 hover:op100 hover:bg-hover',
    'btn-action-sm': 'btn-action text-sm',
    'btn-action-active': 'color-active border-active! bg-active op100!',

    'bg-card': 'bg-[#f5f5f5] dark:bg-neutral-800',

    'text-tiny': 'text-12px',
    'text-category': 'text-[#3a88b4]',
    'text-tag': 'text-[#3ab483]',
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
        'sans': 'Inter',
        'sans-jp': 'Noto Sans JP',
        'mono': 'Space Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
