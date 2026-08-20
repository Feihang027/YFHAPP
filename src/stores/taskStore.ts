import { defineStore } from "pinia"

import type { Task } from "@/models/Task"

import {
  addTask,
  getTasks
} from "@/services/taskService"



export const useTaskStore = defineStore(
  "task",
  {

    // 数据
    state: () => ({

      tasks: [] as Task[]

    }),
    // 方法
    actions: {


      // 加载任务
      async loadTasks() {

        this.tasks =
          await getTasks()

      },
      // 新增任务
      async createTask(task: Task) {

        await addTask(task)

        this.tasks.push(task)

      }
    }
  }
)