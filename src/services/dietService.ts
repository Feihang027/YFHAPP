import {
  createRecord,
  getAllRecords
} from "@/database/crud"


import {
  STORE_NAMES
} from "@/database"


import type {
  Diet
} from "@/models/Diet"



/**
 * 新增饮食记录
 */
export function addDiet(
  diet: Diet
) {

  return createRecord(
    STORE_NAMES.DIET,
    diet
  )

}



/**
 * 获取全部饮食记录
 */
export function getDietList() {

  return getAllRecords<Diet>(
    STORE_NAMES.DIET
  )

}