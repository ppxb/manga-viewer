import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dayjs from 'dayjs'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

const r = (dir: string) => resolve(__dirname, '.', dir)

const alias: Record<string, string> = {
  '~': r('src'),
}

const __APP_INFO__ = {
  lastBuildTime: dayjs().format('YYYY/MM/DD HH:mm'),
}

export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    UnoCSS(),
  ],
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  resolve: {
    alias,
  },
})
