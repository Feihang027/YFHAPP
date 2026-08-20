import { defineStore } from "pinia"


import type { Media } from "@/models/Media"


import {
  addMedia,
  getMedias
} from "@/services/mediaService"



export const useMediaStore = defineStore(
  "media",
  {


    // 当前页面的数据
    state: () => ({

      medias: [] as Media[]

    }),



    actions: {
      /**
       * 加载所有自媒体数据
       */
      async loadMedias() {


        this.medias =
          await getMedias()
      },

      /**
       * 新增自媒体内容
       */
      async createMedia(
        media: Media
      ) {


        await addMedia(media)


        this.medias.push(media)

      }

    }

  }
)