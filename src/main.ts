import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'

import App from './App.vue'

import routes from '~pages'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/styles/global.css'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: setupLayouts(routes),
})

function bootstrap() {
  const app = createApp(App)

  app.use(router)
  app.mount('#app')
}

bootstrap()
