<script setup lang="ts">

</script>

<template>
  <div h-full flex="~ col items-center justify-center gap-1">
    <Logo text-3xl :show-version="false" />
    <div op75 text-sm>
      请使用阿里云盘扫码登录
    </div>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: login
</route>
