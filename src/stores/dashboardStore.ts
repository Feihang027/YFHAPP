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
  getDevelopments
} from "@/services/developmentService"




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



          const projects =
            await getDevelopments()





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
              task => task.date === today
            )




          const completed =
            this.todayTasks.filter(
              task => task.status === "completed"
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
              plan => plan.date === today
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






          if (bodyMetrics.length) {


            this.fitnessSummary.latestWeight =

              bodyMetrics[
                bodyMetrics.length - 1
              ]
                .weight


          }



        }



      }



    }

  )