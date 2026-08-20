import {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord
}
  from "@/database"



import type {
  DevelopmentProject
}
  from "@/models/Development"



import {
  STORE_NAMES
}
  from "@/database"




//新增

export function addDevelopment(
  data: DevelopmentProject
) {

  return createRecord(
    STORE_NAMES.PROJECTS,
    data
  )

}



//查询

export function getDevelopments() {

  return getAllRecords<DevelopmentProject>(
    STORE_NAMES.PROJECTS
  )

}



//修改

export function updateDevelopment(
  data: DevelopmentProject
) {

  return updateRecord(
    STORE_NAMES.PROJECTS,
    data
  )

}



//删除

export function deleteDevelopment(
  id: string
) {

  return deleteRecord(
    STORE_NAMES.PROJECTS,
    id
  )

}