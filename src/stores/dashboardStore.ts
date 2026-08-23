import { defineStore } from "pinia"

import {
  getTasks
} from "@/services/taskService"


import {
  getMedias
} from "@/services/mediaService"


import {
  getFitnessPlans
} from "@/services/fitnessService"


import {
  getDietList
} from "@/services/dietService"

import {
  getDevelopments
} from "@/services/developmentService"



export const useDashboardStore =
  defineStore(
    "dashboard",
    {
      state: () => ({
        taskCount: 0,
        mediaCount: 0,
        fitnessCount: 0,
        dietCount: 0,
        projectCount: 0,
        // 今日任务
        todayTasks: [] as any[],
        // 今日完成率
        completionRate: 0,
        completedToday: 0,
        // 今日健身
        todayFitnessList: [] as any[],
        // 今日饮食
        todayDiet: null as any,
        // 最近项目
        recentProjects: [] as any[]
      }),

      actions: {
        async loadDashboard() {
          const tasks = await getTasks()

          const medias = await getMedias()

          const fitness = await getFitnessPlans()


          const diets = await getDietList()


          const projects = await getDevelopments()


          this.taskCount = tasks.length


          this.mediaCount = medias.length


          this.fitnessCount = fitness.length


          this.dietCount = diets.length


          this.projectCount = projects.length


          const today = new Date().toISOString().slice(0, 10)

          this.todayFitnessList = fitness.filter(plan => plan.date === today)

          this.todayDiet = diets.length > 0 ? diets[0] : null

          this.recentProjects = projects.slice(0, 3)

          // 今日任务
          this.todayTasks = tasks.filter(task => task.date === today)



          // 今日完成率
          const completed = this.todayTasks.filter(task => task.status === "completed").length

          this.completedToday = completed

          this.completionRate = this.todayTasks.length === 0 ? 0 : Math.round(completed / this.todayTasks.length * 100)
        }
      }
    })