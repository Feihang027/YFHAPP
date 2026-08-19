<template>
  <header class="app-header">
    <div class="app-title">
      YFHAPP
    </div>

    <div class="app-header-right">
      <span>{{ currentDate }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

const currentDate = computed(() => {
  return dayjs().format('YYYY-MM-DD')
})
</script>

<style scoped>
.app-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.app-title {
  font-size: 20px;
  font-weight: 600;
}

.app-header-right {
  color: #6b7280;
  font-size: 14px;
}
</style>