<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      YFHAPP
    </div>

    <nav class="sidebar-nav">
      <div
        v-for="item in menuItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
        @click="handleNavigate(item.path)"
      >
        <el-icon>
          <component :is="item.icon" />
        </el-icon>

        <span>{{ item.title }}</span>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import {
  House,
  Calendar,
  VideoCamera,
  Monitor,
  ChatDotRound,
  Trophy,
  Food,
  VideoPlay
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const menuItems = [
  {
    title: '首页',
    path: '/',
    icon: House
  },
  {
    title: '今日计划',
    path: '/tasks',
    icon: Calendar
  },
  {
    title: '自媒体',
    path: '/media',
    icon: VideoCamera
  },
  {
    title: '开发工作',
    path: '/development',
    icon: Monitor
  },
  {
    title: '咨询工作',
    path: '/consulting',
    icon: ChatDotRound
  },
  {
    title: '健身计划',
    path: '/fitness',
    icon: Trophy
  },
  {
    title: '饮食计划',
    path: '/diet',
    icon: Food
  },
  {
    title: '游戏娱乐',
    path: '/games',
    icon: VideoPlay
  }
]

function handleNavigate(path: string) {
  router.push(path)
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
  box-sizing: border-box;
}

.sidebar-logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-nav {
  padding: 12px;
}

.nav-item {
  height: 44px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
}

.nav-item:hover {
  background: #f5f7fa;
}

.nav-item.active {
  background: #ecf5ff;
  color: #409eff;
}
</style>