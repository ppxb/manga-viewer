<script setup lang="ts">
import { invoke } from '@tauri-apps/api'

import { formatDate } from '~/utils'

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
  <div h-full flex="~ gap-4" py4>
    <div w110 flex="~ col gap-3">
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
      <template v-if="mangaInfo">
        <MangaInfoItem :info="mangaInfo" />
      </template>
    </div>
    <div v-if="mangaInfo" font-sans-jp border border-base rounded-2xl of-y-scroll flex="~ col auto gap-1" p4>
      <div font-bold rounded-2xl text-tiny text-tag bg-card w-fit px3 py1>
        {{ mangaInfo!.episodes.length > 1 ? "合集" : "单话" }}
      </div>
      <div font-bold text-2xl>
        {{ mangaInfo?.title }}
      </div>
      <div op50 text-tiny mb1>
        {{ mangaInfo?.caption }}
      </div>
      <div flex="~ col gap-1" mb2>
        <div font-bold text-tiny>
          分类
          <span text-category ml2>
            {{ mangaInfo?.category }}
          </span>
        </div>
        <div font-bold text-tiny>
          种类
          <span
            v-for="tag in mangaInfo?.tags" :key="tag"
            text-tag ml2
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div text-tiny mb2 v-html="mangaInfo.outline" />
      <div flex="~ col gap-2">
        <div flex="~ col">
          <div font-mono font-bold>
            Episodes
          </div>
          <div op75 font-sans-jp text-tiny>
            共 {{ mangaInfo.episodes.length }} 话
          </div>
        </div>
        <div
          v-for="episode in mangaInfo.episodes"
          :key="episode.title"
          relative border border-base rounded-2xl
          flex="~ items-center gap-4" p2
          transition-all hover:cursor-pointer hover:bg-hover
        >
          <div absolute right-2 top-2 text-right font-sans-jp text-tiny op25 pointer-events-none>
            <span mr1># {{ episode.status === "private" ? "不公开" : "公开" }}</span>
          </div>
          <img h18 rounded-xl object-cover :src="episode.list_image_url" :alt="episode.title">
          <div flex="~ col gap-0.5">
            <div op75 font-mono text-tiny>
              {{ formatDate(episode.publish_start) }} UP
            </div>
            <div font-sans-jp text-sm font-bold>
              {{ episode.title }}
            </div>
            <div font-sans-jp text-tiny>
              {{ episode.volume }}
            </div>
          </div>
          <div
            v-if="episode.status === 'public'"
            mlauto
          >
            <div i-ph-cloud-arrow-down-duotone flex-none />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
