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
      tasks: [] as Task[],
      // 状态筛选
      filterStatus: "all",

      // 优先级筛选
      filterPriority: "all",

      // 排序方式
      sortType: "created",

      showToday: false
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
      },

      filteredTasks(state) {
        let result = [...state.tasks]

        // 状态筛选
        if (state.filterStatus !== "all") {
          result =
            result.filter(
              task =>
                task.status === state.filterStatus
            )

        }

        // 优先级筛选

        if (state.filterPriority !== "all") {
          result =
            result.filter(
              task =>
                task.priority === state.filterPriority
            )
        }

        // 今日任务过滤
        if (state.showToday) {
          const today = new Date().toISOString().slice(0, 10)
          result = result.filter(task => task.date === today)
        }

        // 排序
        if (state.sortType === "priority") {
          const level: any = {
            high: 3,
            medium: 2,
            low: 1
          }

          result.sort(
            (a, b) =>
              level[b.priority]
              -
              level[a.priority]
          )
        }

        if (state.sortType === "created") {
          result.sort(
            (a, b) =>
              new Date(b.createdAt).getTime()
              -
              new Date(a.createdAt).getTime()
          )
        }
        return result
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
      },

      setFilterStatus(status: string) {

        this.filterStatus = status

      },


      setFilterPriority(priority: string) {

        this.filterPriority = priority

      }
    }
  })