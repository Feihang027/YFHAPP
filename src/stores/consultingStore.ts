import {

  defineStore

} from "pinia"



import type {

  ConsultingProject

} from "@/models/Consulting"



import {

  addConsulting,

  getConsultings

} from "@/services/consultingService"






export const useConsultingStore =

  defineStore(

    "consulting",

    {


      state: () => ({


        projects:

          [] as ConsultingProject[]


      }),





      actions: {



        //加载数据

        async loadProjects() {


          this.projects =

            await getConsultings()


        },





        //新增项目

        async createProject(

          project: ConsultingProject

        ) {


          await addConsulting(project)



          this.projects.push(project)


        }



      }


    }

  )