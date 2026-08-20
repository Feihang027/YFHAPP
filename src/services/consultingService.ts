import {

  createRecord,

  getAllRecords,

  updateRecord,

  deleteRecord

} from "@/database"



import {

  STORE_NAMES

} from "@/database"



import type {

  ConsultingProject

} from "@/models/Consulting"





//新增咨询项目

export function addConsulting(
  data: ConsultingProject
) {


  return createRecord(

    STORE_NAMES.CONSULTING,

    data

  )


}






//查询全部咨询项目

export function getConsultings() {


  return getAllRecords<ConsultingProject>(

    STORE_NAMES.CONSULTING

  )


}






//修改咨询项目

export function updateConsulting(

  data: ConsultingProject

) {


  return updateRecord(

    STORE_NAMES.CONSULTING,

    data

  )


}






//删除咨询项目

export function deleteConsulting(

  id: string

) {


  return deleteRecord(

    STORE_NAMES.CONSULTING,

    id

  )


}