import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import Dashboard from '../views/Dashboard.vue'
import Tasks from '../views/Tasks.vue'
import Media from '../views/Media.vue'
import Development from '../views/Development.vue'
import Consulting from '../views/Consulting.vue'
import Fitness from '../views/Fitness.vue'
import FitnessRecord from '../views/FitnessRecord.vue'
import Diet from '../views/Diet.vue'
import Games from '../views/Games.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: MainLayout,

      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'tasks',
          component: Tasks
        },
        {
          path: 'media',
          component: Media
        },
        {
          path: 'development',
          component: Development
        },
        {
          path: 'consulting',
          component: Consulting
        },
        {
          path: 'fitness',
          component: Fitness
        },
        {
          path: 'fitness-record',
          component: FitnessRecord
        },
        {
          path: 'diet',
          component: Diet
        },
        {
          path: 'games',
          component: Games
        },

      ]
    }
  ]
})

export default router