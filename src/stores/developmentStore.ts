import {
  defineStore
}
  from "pinia"



import type {
  DevelopmentProject
}
  from "@/models/Development"



import {
  addDevelopment,
  getDevelopments
}
  from "@/services/developmentService"




export const useDevelopmentStore =
  defineStore(
    "development",
    {


      state: () => ({

        projects:
          [] as DevelopmentProject[]


      }),



      actions: {


        async loadProjects() {


          this.projects =
            await getDevelopments()


        },



        async createProject(
          project: DevelopmentProject
        ) {


          await addDevelopment(project)


          this.projects.push(project)


        }


      }
    })