import {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
  getDatabase
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


import type {
  DevelopmentLog
} from "@/models/DevelopmentLog"


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


// 删除开发项目（同时级联删除它的 features/bugs/logs）

export async function deleteDevelopmentProject(
  id: string
) {

  const db = await getDatabase()

  const tx = db.transaction(
    [
      STORE_NAMES.DEVELOPMENT_PROJECTS,
      STORE_NAMES.DEVELOPMENT_FEATURES,
      STORE_NAMES.DEVELOPMENT_BUGS,
      STORE_NAMES.DEVELOPMENT_LOGS
    ],
    "readwrite"
  )


  // 1. 删除项目本身
  tx.objectStore(
    STORE_NAMES.DEVELOPMENT_PROJECTS
  ).delete(id)


  // 2. 删除它关联的 features（按 projectId 遍历匹配）
  const featureStore =
    tx.objectStore(
      STORE_NAMES.DEVELOPMENT_FEATURES
    )

  await new Promise<void>((resolve, reject) => {
    const req = featureStore.openCursor()
    req.onsuccess = () => {
      const cursor = req.result
      if (!cursor) { resolve(); return }
      if ((cursor.value as DevelopmentFeature).projectId === id) {
        cursor.delete()
      }
      cursor.continue()
    }
    req.onerror = () => reject(req.error)
  })


  // 3. 删除它关联的 bugs
  const bugStore =
    tx.objectStore(
      STORE_NAMES.DEVELOPMENT_BUGS
    )

  await new Promise<void>((resolve, reject) => {
    const req = bugStore.openCursor()
    req.onsuccess = () => {
      const cursor = req.result
      if (!cursor) { resolve(); return }
      if ((cursor.value as DevelopmentBug).projectId === id) {
        cursor.delete()
      }
      cursor.continue()
    }
    req.onerror = () => reject(req.error)
  })


  // 4. 删除它关联的 logs
  const logStore =
    tx.objectStore(
      STORE_NAMES.DEVELOPMENT_LOGS
    )

  await new Promise<void>((resolve, reject) => {
    const req = logStore.openCursor()
    req.onsuccess = () => {
      const cursor = req.result
      if (!cursor) { resolve(); return }
      if ((cursor.value as DevelopmentLog).projectId === id) {
        cursor.delete()
      }
      cursor.continue()
    }
    req.onerror = () => reject(req.error)
  })


  // 等待事务完成
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })

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


/*
================================
Development Log
================================
*/

// 新增日志
export function addDevelopmentLog(
  data: DevelopmentLog
) {
  return createRecord(
    STORE_NAMES.DEVELOPMENT_LOGS,
    data
  )
}


// 获取全部日志
export function getDevelopmentLogs() {
  return getAllRecords<DevelopmentLog>(
    STORE_NAMES.DEVELOPMENT_LOGS
  )
}


// 删除日志
export function deleteDevelopmentLog(
  id: string
) {
  return deleteRecord(
    STORE_NAMES.DEVELOPMENT_LOGS,
    id
  )
}


/*
================================
批量导入（导入 / 导出 JSON）
================================
*/

export interface DevelopmentExportData {
  version: 1
  exportedAt: string
  projects: DevelopmentProject[]
  features: DevelopmentFeature[]
  bugs: DevelopmentBug[]
  logs: DevelopmentLog[]
}


// 全量覆盖写入 4 张表
export async function replaceAllDevelopmentData(
  data: DevelopmentExportData
) {
  const db = await getDatabase()

  const tx = db.transaction(
    [
      STORE_NAMES.DEVELOPMENT_PROJECTS,
      STORE_NAMES.DEVELOPMENT_FEATURES,
      STORE_NAMES.DEVELOPMENT_BUGS,
      STORE_NAMES.DEVELOPMENT_LOGS
    ],
    "readwrite"
  )

  const clearAll = [
    STORE_NAMES.DEVELOPMENT_PROJECTS,
    STORE_NAMES.DEVELOPMENT_FEATURES,
    STORE_NAMES.DEVELOPMENT_BUGS,
    STORE_NAMES.DEVELOPMENT_LOGS
  ].map(name => new Promise<void>((resolve, reject) => {
    const req = tx.objectStore(name).clear()
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  }))

  await Promise.all(clearAll)


  // 按顺序写入，避免外键依赖（虽然这里是文档型，不需要）
  for (const p of data.projects) {
    tx.objectStore(STORE_NAMES.DEVELOPMENT_PROJECTS).put(p)
  }
  for (const f of data.features) {
    tx.objectStore(STORE_NAMES.DEVELOPMENT_FEATURES).put(f)
  }
  for (const b of data.bugs) {
    tx.objectStore(STORE_NAMES.DEVELOPMENT_BUGS).put(b)
  }
  for (const l of data.logs) {
    tx.objectStore(STORE_NAMES.DEVELOPMENT_LOGS).put(l)
  }


  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
