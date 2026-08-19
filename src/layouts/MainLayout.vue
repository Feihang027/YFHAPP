<template>
  <div class="app-layout">
    <Sidebar />

    <div class="main-area">
      <Header />

      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/layout/Header.vue'
import Sidebar from '../components/layout/Sidebar.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.main-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>