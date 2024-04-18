<script setup lang="ts">
const props = defineProps<{
  info: MangaInfo
}>()

const domain = ref(props.info.domain)
const comic = ref(props.info.comic)
</script>

<template>
  <div>
    <div relative border border-base rounded-lg p4 pt12 w400px flex="~ col items-center justify-center gap-2" transition-all hover:cursor-pointer hover:bg-hover>
      <img
        :src="domain.icon"
        absolute top-4 left-4 w20
      >
      <img
        :src="comic.logo"
        w50 object-fill mb1
      >
      <div font-sans-jp>
        <span mr3 font-bold>{{ comic.episodes[0].volume }}</span>{{ comic.episodes[0].title }}
      </div>
      <div op50 text-sm mb2>
        {{ comic.author }}
      </div>
      <div font-bold rounded-lg px2 py1 flex="~ gap-3" class="text-12px bg-[#f5f5f5] dark:bg-neutral-800 ">
        <div>
          Catgory <span font-sans-jp ml2 class="text-[#3a88b4]">{{ comic.category }}</span>
        </div>
        <div>
          Tags <span
            v-for="tag in comic.tags" :key="tag"
            class="text-[#3ab483]"
            font-sans-jp ml2
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
