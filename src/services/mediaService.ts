import type { Media } from "@/models/Media"


import {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord
} from "@/database"


import {
  STORE_NAMES
} from "@/database"





// 新增自媒体内容

export function addMedia(
  media: Media
) {

  return createRecord(
    STORE_NAMES.MEDIA,
    media
  )

}

/**
 * 获取全部内容
 */
export function getMedias() {
  return getAllRecords<Media>(STORE_NAMES.MEDIA)
}

/**
 * 更新内容
 */
export function updateMedia(media: Media) {
  return updateRecord(STORE_NAMES.MEDIA, media)
}

/**
 * 删除内容
 */
export function deleteMedia(id: string) {
  return deleteRecord(STORE_NAMES.MEDIA, id)
}