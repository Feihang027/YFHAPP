import { defineStore } from "pinia"


import type { Media } from "@/models/Media"


import {
  addMedia,
  getMedias,
  updateMedia,
  deleteMedia
} from "@/services/mediaService"

export const useMediaStore = defineStore("media", {
  state: () => ({
    medias: [] as Media[]
  }),

  actions: {
    async loadMedias() {
      this.medias = await getMedias()
    },

    async createMedia(media: Media) {
      await addMedia(media)
      await this.loadMedias()
    },

    async updateMedia(media: Media) {
      await updateMedia(media)
      await this.loadMedias()
    },

    async removeMedia(id: string) {
      await deleteMedia(id)
      await this.loadMedias()
    }
  }
})