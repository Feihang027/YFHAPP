import {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
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
  return getAllRecords<Diet>(STORE_NAMES.DIET)
}

/**
 * 更新饮食记录
 */
export function updateDiet(diet: Diet) {
  return updateRecord(STORE_NAMES.DIET, diet)
}

/**
 * 删除饮食记录
 */
export function deleteDiet(id: string) {
  return deleteRecord(STORE_NAMES.DIET, id)
}