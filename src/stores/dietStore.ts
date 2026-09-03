import {
  defineStore
} from "pinia"



import type {
  Diet
} from "@/models/Diet"



import {
  addDiet,
  getDietList,
  updateDiet,
  deleteDiet
} from "@/services/dietService"

export const useDietStore = defineStore("diet", {
  state: () => ({
    diets: [] as Diet[]
  }),

  actions: {
    async loadDiet() {
      this.diets = await getDietList()
    },

    async createDiet(diet: Diet) {
      await addDiet(diet)
      await this.loadDiet()
    },

    async updateDiet(diet: Diet) {
      await updateDiet(diet)
      await this.loadDiet()
    },

    async removeDiet(id: string) {
      await deleteDiet(id)
      await this.loadDiet()
    }
  }
})