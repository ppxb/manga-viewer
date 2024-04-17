import { createApp } from 'vue'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/styles/global.css'

function bootstrap() {
  const app = createApp(App)

  app.mount('#app')
}

bootstrap()
