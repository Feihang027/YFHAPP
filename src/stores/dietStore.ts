import {
  defineStore
} from "pinia"



import type {
  Diet
} from "@/models/Diet"



import {
  addDiet,
  getDietList
} from "@/services/dietService"



export const useDietStore =
  defineStore(
    "diet",
    {


      state: () => ({

        diets: [] as Diet[]

      }),



      actions: {



        async loadDiet() {

          this.diets =
            await getDietList()

        },




        async createDiet(
          diet: Diet
        ) {

          await addDiet(
            diet
          )


        }


      }


    })