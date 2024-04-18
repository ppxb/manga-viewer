<script setup lang="ts">
import { toggleDark } from '~/composables/dark'

const { lastBuildTime } = __APP_INFO__
</script>

<template>
  <Logo text-3xl font-200 />
  <div v-if="lastBuildTime" flex="~ gap-2 items-center wrap" text-sm font-mono>
    <span op50>Last build at</span>
    <span op75>{{ lastBuildTime }}</span>
  </div>
  <div flex="~ gap-3 items-center wrap" py4>
    <a
      href="#"
      btn-action text-base px3 py1
    >
      <div i-ph-eye-closed-duotone flex-none />
      View
    </a>
    <a
      href="#"
      btn-action text-base px3 py1
    >
      <div i-ph-download-duotone flex-none />
      Download
    </a>
    <a
      href="#"
      btn-action text-base px3 py1
    >
      <div i-ph-files-duotone flex-none />
      Files
    </a>
    <a
      href="#"
      btn-action text-base px3 py1
    >
      <div i-ph-gear-duotone flex-none />
      Settings
    </a>
    <button
      title="Toggle Dark Mode"
      i-ph-sun-dim-duotone dark:i-ph-moon-duotone ml1 text-xl op50 hover:op75
      @click="toggleDark()"
    />
    <a
      href="https://github.com/ppxb" target="_blank"
      i-carbon-logo-github text-lg op50 hover:op75
    />
  </div>
</template>
