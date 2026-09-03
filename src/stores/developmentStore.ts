import {
  defineStore
} from "pinia"


import type {
  DevelopmentProject
} from "@/models/DevelopmentProject"


import type {
  DevelopmentFeature
} from "@/models/DevelopmentFeature"


import type {
  DevelopmentBug
} from "@/models/DevelopmentBug"


import type {
  DevelopmentLog
} from "@/models/DevelopmentLog"


import {
  addDevelopmentProject,
  getDevelopmentProjects,
  updateDevelopmentProject,
  deleteDevelopmentProject,

  addDevelopmentFeature,
  getDevelopmentFeatures,
  updateDevelopmentFeature,
  deleteDevelopmentFeature,

  addDevelopmentBug,
  getDevelopmentBugs,
  updateDevelopmentBug,
  deleteDevelopmentBug,

  addDevelopmentLog,
  getDevelopmentLogs,
  deleteDevelopmentLog,

  replaceAllDevelopmentData
} from "@/services/developmentService"

import type {
  DevelopmentExportData
} from "@/services/developmentService"


export const useDevelopmentStore =

  defineStore(

    "development",

    {

      state: () => ({

        // =========================
        // 开发项目
        // =========================

        projects:
          [] as DevelopmentProject[],

        // =========================
        // 功能需求
        // =========================

        features:
          [] as DevelopmentFeature[],

        // =========================
        // Bug
        // =========================

        bugs:
          [] as DevelopmentBug[],

        // =========================
        // 开发日志
        // =========================

        logs:
          [] as DevelopmentLog[]

      }),


      actions: {

        // =========================
        // 加载全部 Development 数据
        // =========================

        async loadDevelopment() {
          this.projects = await getDevelopmentProjects()
          this.features = await getDevelopmentFeatures()
          this.bugs = await getDevelopmentBugs()
          this.logs = await getDevelopmentLogs()
        },


        // =========================
        // Project
        // =========================
        async createProject(
          project: DevelopmentProject
        ) {
          await addDevelopmentProject(
            project
          )
          this.projects.push(
            project
          )
        },


        async updateProject(
          project: DevelopmentProject
        ) {
          await updateDevelopmentProject(
            project
          )
          await this.loadDevelopment()
        },


        async removeProject(
          id: string
        ) {
          await deleteDevelopmentProject(
            id
          )
          await this.loadDevelopment()
        },


        // =========================
        // Feature
        // =========================
        async createFeature(
          feature: DevelopmentFeature
        ) {
          await addDevelopmentFeature(
            feature
          )
          this.features.push(
            feature
          )
        },


        async updateFeature(
          feature: DevelopmentFeature
        ) {
          await updateDevelopmentFeature(
            feature
          )
          await this.loadDevelopment()
        },


        async removeFeature(
          id: string
        ) {
          await deleteDevelopmentFeature(
            id
          )
          await this.loadDevelopment()
        },


        // =========================
        // Bug
        // =========================
        async createBug(
          bug: DevelopmentBug
        ) {
          await addDevelopmentBug(
            bug
          )
          this.bugs.push(
            bug
          )
        },


        async updateBug(
          bug: DevelopmentBug
        ) {
          await updateDevelopmentBug(
            bug
          )
          await this.loadDevelopment()
        },

        async createTestFeature() {

          if (this.projects.length === 0) {
            return
          }

          const feature: DevelopmentFeature = {

            id: Date.now().toString(),

            projectId: this.projects[0].id,

            name: "测试功能",

            description: "测试需求",

            priority: "medium",

            status: "todo",

            createdAt: new Date().toISOString(),

            updatedAt: new Date().toISOString()

          }

          await addDevelopmentFeature(feature)

          await this.loadDevelopment()

        },


        async removeBug(
          id: string
        ) {
          await deleteDevelopmentBug(
            id
          )
          await this.loadDevelopment()
        },


        // =========================
        // Log
        // =========================
        async createLog(
          log: DevelopmentLog
        ) {
          await addDevelopmentLog(log)
          this.logs.push(log)
        },


        async removeLog(
          id: string
        ) {
          await deleteDevelopmentLog(id)
          await this.loadDevelopment()
        },


        // =========================
        // 导出 JSON
        // =========================
        exportData(): DevelopmentExportData {
          return {
            version: 1,
            exportedAt: new Date().toISOString(),
            projects: this.projects,
            features: this.features,
            bugs: this.bugs,
            logs: this.logs
          }
        },


        // =========================
        // 导入 JSON（全量覆盖）
        // =========================
        async importData(
          data: DevelopmentExportData
        ) {
          await replaceAllDevelopmentData(data)
          await this.loadDevelopment()
        }
      }
    }
  )
