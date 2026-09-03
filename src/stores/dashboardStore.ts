import { defineStore } from "pinia"


import {
  getTasks
} from "@/services/taskService"


import {
  getMedias
} from "@/services/mediaService"


import {
  getFitnessPlans,
  getFitnessRecords,
  getBodyMetrics
} from "@/services/fitnessService"


import {
  getDietList
} from "@/services/dietService"


import {
  getDevelopmentProjects,
  getDevelopmentFeatures,
  getDevelopmentBugs,
  getDevelopmentLogs
} from "@/services/developmentService"


import type {
  DevelopmentLog
} from "@/models/DevelopmentLog"


export const useDashboardStore =

  defineStore(

    "dashboard",

    {

      state: () => ({

        // =====================
        // 总数据统计
        // =====================

        summary: {

          taskCount: 0,

          mediaCount: 0,

          fitnessCount: 0,

          dietCount: 0,

          projectCount: 0

        },


        // =====================
        // 开发模块统计
        // =====================

        devSummary: {

          projectCount: 0,

          ongoingProjectCount: 0,

          featureCount: 0,

          bugCount: 0

        },

        recentDevLogs: [] as DevelopmentLog[],


        // =====================
        // 今日任务
        // =====================

        todayTasks: [] as any[],

        completionRate: 0,

        completedToday: 0,


        // =====================
        // 今日健身
        // =====================

        todayFitnessList: [] as any[],


        // =====================
        // 健身统计
        // =====================

        fitnessSummary: {

          totalRecords: 0,

          totalDuration: 0,

          latestWeight: 0

        },


        // =====================
        // 今日饮食
        // =====================

        todayDiet: null as any,


        // =====================
        // 最近项目
        // =====================

        recentProjects: [] as any[]

      }),


      actions: {

        // =====================
        // 加载 Dashboard 数据
        // =====================

        async loadDashboard() {

          // =====================
          // 获取所有模块数据
          // =====================

          const tasks =
            await getTasks()


          const medias =
            await getMedias()


          const fitness =
            await getFitnessPlans()


          const fitnessRecords =
            await getFitnessRecords()


          const bodyMetrics =
            await getBodyMetrics()


          const diets =
            await getDietList()


          // =====================
          // Development 全部数据
          // =====================

          const projects =
            await getDevelopmentProjects()

          const features =
            await getDevelopmentFeatures()

          const bugs =
            await getDevelopmentBugs()

          const logs =
            await getDevelopmentLogs()


          // =====================
          // 总数量统计
          // =====================

          this.summary.taskCount =
            tasks.length


          this.summary.mediaCount =
            medias.length


          this.summary.fitnessCount =
            fitness.length


          this.summary.dietCount =
            diets.length


          this.summary.projectCount =
            projects.length


          // =====================
          // Development 统计
          // =====================

          this.devSummary.projectCount = projects.length
          this.devSummary.ongoingProjectCount =
            projects.filter(p => p.status === "developing" || p.status === "testing").length
          this.devSummary.featureCount = features.length
          this.devSummary.bugCount = bugs.length

          this.recentDevLogs =
            [...logs]
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(0, 5)


          // =====================
          // 今天日期
          // =====================

          const today =
            new Date()
              .toISOString()
              .slice(0, 10)


          // =====================
          // 今日任务
          // =====================

          this.todayTasks =
            tasks.filter(
              task =>
                task.date === today
            )


          const completed =
            this.todayTasks.filter(
              task =>
                task.status === "completed"
            ).length


          this.completedToday =
            completed


          this.completionRate =
            this.todayTasks.length === 0
              ?
              0
              :
              Math.round(
                completed /
                this.todayTasks.length *
                100
              )


          // =====================
          // 今日训练
          // =====================

          this.todayFitnessList =
            fitness.filter(
              plan =>
                plan.date === today
            )


          // =====================
          // 今日饮食
          // =====================

          this.todayDiet =
            diets.length > 0
              ?
              diets[0]
              :
              null


          // =====================
          // 最近项目
          // =====================

          this.recentProjects =
            projects.slice(0, 3)


          // =====================
          // 健身统计
          // =====================

          this.fitnessSummary.totalRecords =
            fitnessRecords.length


          this.fitnessSummary.totalDuration =
            fitnessRecords.reduce(
              (sum, item) => {

                return sum + item.duration

              },
              0
            )


          // =====================
          // 最新体重
          // =====================

          if (bodyMetrics.length) {

            this.fitnessSummary.latestWeight =

              bodyMetrics[
                bodyMetrics.length - 1
              ].weight
          }
        }
      }
    }
  )
