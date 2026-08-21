import {
  defineStore
}
  from "pinia"

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask
}
  from "@/services/taskService"



import type {
  Task
}
  from "@/models/Task"



export const useTaskStore =
  defineStore(
    "task",
    {


      state: () => ({ tasks: [] as Task[] }),

      actions: {
        async loadTasks() {
          this.tasks =
            await getTasks()


        },

        async createTask(task: Task) {


          await addTask(task)


          await this.loadTasks()


        },

        async editTask(task: Task) {
          await updateTask(task)
          await this.loadTasks()
        },

        async removeTask(id: string) {
          await deleteTask(id)
          await this.loadTasks()
        }
      }

    })