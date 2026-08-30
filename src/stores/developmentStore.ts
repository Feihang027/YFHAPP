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
  deleteDevelopmentBug
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
          [] as DevelopmentBug[]

      }),


      actions: {

        // =========================
        // 加载全部 Development 数据
        // =========================

        async loadDevelopment() {
          this.projects = await getDevelopmentProjects()
          this.features = await getDevelopmentFeatures()
          this.bugs = await getDevelopmentBugs()
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


        async removeBug(
          id: string
        ) {
          await deleteDevelopmentBug(
            id
          )
          await this.loadDevelopment()
        }
      }
    }
  )