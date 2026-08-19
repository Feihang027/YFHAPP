import { openDatabase } from "@/database"
import { STORE_NAMES } from "@/database"
import type { Task } from "@/models/Task"


// 添加任务
export async function addTask(task: Task) {

  const db = await openDatabase()


  return new Promise<void>((resolve, reject) => {


    const transaction =
      db.transaction(
        STORE_NAMES.TASKS,
        "readwrite"
      )


    const store =
      transaction.objectStore(
        STORE_NAMES.TASKS
      )


    const request =
      store.add(task)



    request.onsuccess = () => {

      resolve()

    }


    request.onerror = () => {

      reject(request.error)

    }


  })

}



// 获取所有任务
export async function getTasks(): Promise<Task[]> {


  const db = await openDatabase()


  return new Promise((resolve, reject) => {


    const transaction =
      db.transaction(
        STORE_NAMES.TASKS,
        "readonly"
      )


    const store =
      transaction.objectStore(
        STORE_NAMES.TASKS
      )


    const request =
      store.getAll()



    request.onsuccess = () => {

      resolve(request.result)

    }


    request.onerror = () => {

      reject(request.error)

    }


  })

}