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

        projectCount: 0


      }),

      actions: {


        async loadDashboard() {
          const tasks =
            await getTasks()

          const medias =
            await getMedias()

          const fitness =
            await getFitnessPlans()

          const diets =
            await getDietList()

          const projects =
            await getDevelopments()

          this.taskCount =
            tasks.length


          this.mediaCount =
            medias.length

          this.fitnessCount =
            fitness.length

          this.dietCount =
            diets.length

          this.projectCount =
            projects.length
        }
      }
    })