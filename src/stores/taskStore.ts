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



export const useTaskStore = defineStore("task",
  {

    state: () => ({
      tasks: [] as Task[]
    }),


    getters: {

      // 总任务数量
      totalCount(state) {
        return state.tasks.length
      },


      // 已完成数量
      completedCount(state) {
        return state.tasks.filter(task => task.status === "completed").length
      },

      // 完成率
      completionRate(state) {
        if (state.tasks.length === 0) {
          return 0
        }


        const completed =
          state.tasks.filter(
            task => task.status === "completed"
          ).length


        return Math.round(
          completed / state.tasks.length * 100
        )
      }
    },



    actions: {
      async loadTasks() {
        this.tasks = await getTasks()
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