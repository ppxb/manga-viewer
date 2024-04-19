<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  info: MangaInfo
}>()

const comic = computed(() => props.info.comic)
const domain = computed(() => props.info.domain)
const nextPublishAt = computed(() => dayjs(comic.value.next_publish_at).format('M月D日'))
</script>

<template>
  <div>
    <div relative border border-base rounded-lg flex="~ col justify-center gap-2" p4 pt12 transition-all hover:cursor-pointer hover:bg-hover>
      <img
        :src="domain.icon"
        absolute top-4 left-4 w20
      >
      <div absolute right-2 top-0 text-right font-mono text-3em op10 pointer-events-none>
        <span mr1>#</span>
        <span font-bold>{{ comic.episodes.length > 1 ? "Col" : comic.episodes[0].sort_volume }}</span>
      </div>
      <div font-sans-jp flex="~ items-center gap-12">
        <img
          :src="comic.logo"
          w64 object-fill mb1
        >
        <div flex="~ col justify-center gap-1">
          <div font-bold>
            {{ comic.title }}
          </div>
          <div op75 text-sm mb2>
            {{ comic.author }}
          </div>
          <div font-bold text-tiny>
            分类
            <span font-sans-jp text-category ml2>
              {{ comic.category }}
            </span>
          </div>
          <div font-bold text-tiny>
            种类
            <span
              v-for="tag in comic.tags" :key="tag"
              font-sans-jp text-tag ml2
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div flex="~ gap-3">
        <div font-sans-jp font-bold rounded-2xl text-tiny bg-card w-fit flex="~ items-center gap-2" px3 py1>
          <span text-orange-400>
            {{ comic.episodes.length > 1 ? "最新话" : "当前话" }}
          </span>
          <div w1px h12px bg-neutral-900:10 dark:bg-neutral-300:15 />
          <span>{{ comic.episodes[0].volume }}</span>
          <span>{{ comic.episodes[0].title }}</span>
        </div>
        <div font-sans-jp font-bold rounded-2xl text-tiny bg-card w-fit flex="~ items-center gap-2" px3 py1>
          <span text-red-400>次回更新日</span>
          <div w1px h12px bg-neutral-900:10 dark:bg-neutral-300:15 />
          <span>{{ nextPublishAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
