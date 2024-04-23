import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dayjs from 'dayjs'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
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
  resolve: {
    alias,
  },
  plugins: [
    Vue(),
    Layouts(),
    Pages({
      importMode: 'sync',
    }),
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
  clearScreen: false,
  envPrefix: ['VITE_', 'TAURI_'],
  server: {
    port: 4399,
    strictPort: true,
  },
  build: {
    outDir: './dist',
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari15',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    emptyOutDir: true,
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
})
