<script setup lang="ts">
import { $fetch } from 'ofetch'

import { supportedSites } from '~/constants/sites.constant'

const input = ref('')

async function handleSearchManga() {
  const { hostname, pathname } = new URL(input.value)
  const site = supportedSites.filter(s => s.hostname === hostname)
  if (site.length === 0)
    return
  const res = await $fetch(`${site[0].apiUrl.replace('$', pathname)}`, { parseResponse: JSON.parse })
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
