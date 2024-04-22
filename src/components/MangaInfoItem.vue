<script setup lang="ts">
import { formatDate } from '~/utils'

const props = defineProps<{
  info: MangaInfo
}>()

const info = computed(() => props.info)
</script>

<template>
  <div>
    <div relative border border-base rounded-2xl flex="~ col justify-center gap-4" p4 pt16>
      <img
        :src="info.icon"
        absolute top-4 left-4 w20
      >
      <div v-if="info.episodes.length > 1" i-ph-heart-duotone absolute top-3 right-4 flex-none hover:cursor-pointer />
      <div font-sans-jp flex="~ col items-center">
        <img
          :src="info.logo"
          w64 object-fill
        >
        <div flex="~ col justify-center items-center gap-1">
          <div w85 font-bold text-center>
            {{ info.title }}
          </div>
          <div op75 text-sm mb2>
            {{ info.author }}
          </div>
          <div font-sans-jp font-bold rounded-2xl text-tiny bg-card w-fit flex="~ items-center gap-2" px3 py1>
            <span text-orange-400>
              {{ info.episodes.length > 1 ? "最新话" : "当前话" }}
            </span>
            <div w1px h12px bg-neutral-900:10 dark:bg-neutral-300:15 />
            <span>{{ info.episodes[0].volume }}</span>
            <span>{{ info.episodes[0].title }}</span>
          </div>
        </div>
      </div>
      <div font-sans-jp text-tiny font-bold flex="~ justify-end gap-2" mt4>
        <span text-red-400>次回更新</span>
        <span>{{ formatDate(info.next_publish_at, 'M月D日') }}</span>
      </div>
    </div>
  </div>
</template>
