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
  DevelopmentProject
} from "@/models/DevelopmentProject"


import type {
  DevelopmentFeature
} from "@/models/DevelopmentFeature"


import type {
  DevelopmentBug
} from "@/models/DevelopmentBug"


/*
================================
Development Project
================================
*/


// 新增开发项目

export function addDevelopmentProject(
  data: DevelopmentProject
) {

  return createRecord(
    STORE_NAMES.DEVELOPMENT_PROJECTS,
    data
  )

}


// 获取全部开发项目

export function getDevelopmentProjects() {

  return getAllRecords<DevelopmentProject>(
    STORE_NAMES.DEVELOPMENT_PROJECTS
  )

}


// 修改开发项目

export function updateDevelopmentProject(
  data: DevelopmentProject
) {

  return updateRecord(
    STORE_NAMES.DEVELOPMENT_PROJECTS,
    data
  )

}


// 删除开发项目

export function deleteDevelopmentProject(
  id: string
) {

  return deleteRecord(
    STORE_NAMES.DEVELOPMENT_PROJECTS,
    id
  )

}


/*
================================
Development Feature
================================
*/


// 新增 Feature
export function addDevelopmentFeature(
  data: DevelopmentFeature
) {

  return createRecord(
    STORE_NAMES.DEVELOPMENT_FEATURES,
    data
  )

}


// 获取全部 Feature
export function getDevelopmentFeatures() {

  return getAllRecords<DevelopmentFeature>(
    STORE_NAMES.DEVELOPMENT_FEATURES
  )

}


// 修改 Feature

export function updateDevelopmentFeature(
  data: DevelopmentFeature
) {

  return updateRecord(
    STORE_NAMES.DEVELOPMENT_FEATURES,
    data
  )

}


// 删除 Feature

export function deleteDevelopmentFeature(
  id: string
) {

  return deleteRecord(
    STORE_NAMES.DEVELOPMENT_FEATURES,
    id
  )

}


/*
================================
Development Bug
================================
*/

export function addDevelopmentBug(
  data: DevelopmentBug
) {

  return createRecord(
    STORE_NAMES.DEVELOPMENT_BUGS,
    data
  )

}


// 获取全部 Bug

export function getDevelopmentBugs() {

  return getAllRecords<DevelopmentBug>(
    STORE_NAMES.DEVELOPMENT_BUGS
  )

}


// 修改 Bug

export function updateDevelopmentBug(
  data: DevelopmentBug
) {

  return updateRecord(
    STORE_NAMES.DEVELOPMENT_BUGS,
    data
  )

}


// 删除 Bug

export function deleteDevelopmentBug(
  id: string
) {

  return deleteRecord(
    STORE_NAMES.DEVELOPMENT_BUGS,
    id
  )

}