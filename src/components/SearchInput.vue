<script setup lang="ts">
import { invoke } from '@tauri-apps/api'

const input = ref('')

async function handleSearchManga() {
  const res = await invoke('get_manga_detail', { url: input.value })
  console.log(res)
}
</script>

<template>
  <div relative flex>
    <input
      v-model="input"
      placeholder="Get manga with full url"
      border="~ base rounded-full"
      :class="input ? 'font-mono' : ''"
      w-full bg-transparent px3 py2 pl10 outline-none
      @keydown.enter.prevent="handleSearchManga()"
    >
    <div absolute bottom-0 left-0 top-0 flex="~ items-center justify-center" p4 op50>
      <div i-ph-magnifying-glass-duotone />
    </div>
  </div>
</template>
