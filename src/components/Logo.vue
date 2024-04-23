<script setup lang="ts">
import { version } from '../../package.json'

withDefaults(defineProps<{
  showVersion?: boolean
}>(), {
  showVersion: true,
})
</script>

<template>
  <div>
    <a
      href="https//github.com/ppxb/manga-viewer"
      font-mono font-bold
      flex="inline gap-2 items-center" mr1
    >
      VISION
    </a>
    <a
      v-if="showVersion"
      href="#"
      op50 font-mono inline-block translate-y--5 ml1 text-0.6em font-200
    >
      v{{ version }}
    </a>
  </div>
</template>
