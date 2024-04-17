<script setup lang="ts">
import { version } from '../../package.json'
import { toggleDark } from '~/composables/dark'

withDefaults(defineProps<{
  showVersion?: boolean
}>(), {
  showVersion: true,
})
</script>

<template>
  <div flex="~ col items-center justify-center" h-full>
    <div flex="~ items-center justify-center" text-3xl>
      <a
        href="https//github.com/ppxb/vitez"
        flex="inline gap-2 items-center" mr1
      >
        Vue3 TypeScript Template
      </a>
      <a
        v-if="showVersion"
        href="#"
        op50 font-mono inline-block translate-y--5 ml1 text-0.6em font-200
      >
        v{{ version }}
      </a>
    </div>
    <div flex="~ gap-3 items-center wrap" py4>
      <button
        title="Toggle Dark Mode"
        i-ph-sun-dim-duotone dark:i-ph-moon-duotone ml1 text-xl op50 hover:op75
        @click="toggleDark()"
      />
      <a
        href="https://github/com/ppxb"
        i-carbon-logo-github text-xl op50 hover:op75
      />
    </div>
  </div>
</template>
