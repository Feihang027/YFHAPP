import type { Task } from "@/models/Task"


import {
  createRecord,
  getAllRecords,
  deleteRecord,
  updateRecord
} from "@/database"


import {
  STORE_NAMES
} from "@/database"



/**
 * 新增任务
 */
export function addTask(task: Task) {
  return createRecord(STORE_NAMES.TASKS, task)

}

/**
 * 获取所有任务
 */
export function getTasks() {
  return getAllRecords<Task>(STORE_NAMES.TASKS)

}

export function deleteTask(id: string) {
  return deleteRecord("tasks", id)

}

export function updateTask(task: Task) {
  return updateRecord("tasks", task)
}