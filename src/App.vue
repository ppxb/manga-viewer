<script setup lang="ts">
import { invoke } from '@tauri-apps/api'

const input = ref('')
const loading = ref(false)
const mangaInfo = ref<MangaInfo>()

async function handleSearchManga() {
  loading.value = true
  try {
    const res = await invoke('get_manga_detail', { url: input.value })
    mangaInfo.value = res as MangaInfo
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div px4 py6 lg:px14 lg:py10>
    <Navbar />
    <div flex="~ col gap-3" py4>
      <div relative flex>
        <input
          v-model="input"
          :disabled="loading"
          :class="input ? 'font-mono' : ''"
          placeholder="Get manga with full url"
          border="~ base rounded-full"
          w-full bg-transparent px3 py2 pl10 outline-none
          @keydown.enter.prevent="handleSearchManga()"
        >
        <div absolute bottom-0 left-0 top-0 flex="~ items-center justify-center" p4 op50>
          <div i-ph-magnifying-glass-duotone />
        </div>
        <div v-if="loading" absolute bottom-0 right-0 top-0 animate-pulse flex="~ items-center justify-center" p4 op50>
          <div i-svg-spinners-90-ring-with-bg flex-none />
        </div>
      </div>
    </div>
    <template v-if="mangaInfo">
      <MangaInfoItem :info="mangaInfo" />
    </template>
  </div>
</template>
