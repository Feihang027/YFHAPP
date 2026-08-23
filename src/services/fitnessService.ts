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

  FitnessPlan

} from "@/models/FitnessPlan"



import type {

  FitnessRecord

} from "@/models/FitnessRecord"



import type {

  BodyMetric

} from "@/models/BodyMetric"



// 新增训练计划

export function addFitnessPlan(

  data: FitnessPlan

) {

  return createRecord(

    STORE_NAMES.FITNESS_PLANS,

    data

  )

}


// 获取全部训练计划

export function getFitnessPlans() {

  return getAllRecords<FitnessPlan>(

    STORE_NAMES.FITNESS_PLANS

  )

}


// 修改训练计划

export function updateFitnessPlan(

  data: FitnessPlan

) {

  return updateRecord(

    STORE_NAMES.FITNESS_PLANS,

    data

  )

}


// 删除训练计划

export function deleteFitnessPlan(

  id: string

) {

  return deleteRecord(

    STORE_NAMES.FITNESS_PLANS,

    id

  )

}







/*
==========================
训练记录
==========================
*/


// 新增训练记录

export function addFitnessRecord(

  data: FitnessRecord

) {

  return createRecord(

    STORE_NAMES.FITNESS_RECORDS,

    data

  )

}





// 查询训练记录

export function getFitnessRecords() {

  return getAllRecords<FitnessRecord>(

    STORE_NAMES.FITNESS_RECORDS

  )

}





// 修改训练记录

export function updateFitnessRecord(

  data: FitnessRecord

) {

  return updateRecord(

    STORE_NAMES.FITNESS_RECORDS,

    data

  )

}





// 删除训练记录

export function deleteFitnessRecord(

  id: string

) {

  return deleteRecord(

    STORE_NAMES.FITNESS_RECORDS,

    id

  )

}







/*
==========================
身体数据
==========================
*/


// 新增身体数据

export function addBodyMetric(

  data: BodyMetric

) {

  return createRecord(

    STORE_NAMES.BODY_METRICS,

    data

  )

}





// 查询身体数据

export function getBodyMetrics() {

  return getAllRecords<BodyMetric>(

    STORE_NAMES.BODY_METRICS

  )

}





// 修改身体数据

export function updateBodyMetric(

  data: BodyMetric

) {

  return updateRecord(

    STORE_NAMES.BODY_METRICS,

    data

  )

}

// 删除身体数据

export function deleteBodyMetric(

  id: string

) {

  return deleteRecord(

    STORE_NAMES.BODY_METRICS,

    id

  )

}