import { DB_NAME, DB_VERSION, STORE_NAMES } from "./stores"


let dbInstance: IDBDatabase | null = null


/**
 * 初始化 IndexedDB
 */
export function openDatabase(): Promise<IDBDatabase> {

  return new Promise((resolve, reject) => {


    // 如果已经打开，直接返回
    if (dbInstance) {
      resolve(dbInstance)
      return
    }


    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    )


    /**
     * 第一次创建数据库
     * 或数据库版本升级时执行
     */
    request.onupgradeneeded = (event) => {


      const db = request.result


      // 创建 tasks 表
      if (!db.objectStoreNames.contains(STORE_NAMES.TASKS)) {

        db.createObjectStore(
          STORE_NAMES.TASKS,
          {
            keyPath: "id"
          }
        )

      }



      // 创建 media 表
      if (!db.objectStoreNames.contains(STORE_NAMES.MEDIA)) {

        db.createObjectStore(
          STORE_NAMES.MEDIA,
          {
            keyPath: "id"
          }
        )

      }



      // 创建 projects 表
      if (!db.objectStoreNames.contains(STORE_NAMES.PROJECTS)) {

        db.createObjectStore(
          STORE_NAMES.PROJECTS,
          {
            keyPath: "id"
          }
        )

      }



      // 创建 consulting 表
      if (!db.objectStoreNames.contains(STORE_NAMES.CONSULTING)) {

        db.createObjectStore(
          STORE_NAMES.CONSULTING,
          {
            keyPath: "id"
          }
        )

      }



      // 健身计划
      if (!db.objectStoreNames.contains(STORE_NAMES.FITNESS_PLANS)) {

        db.createObjectStore(
          STORE_NAMES.FITNESS_PLANS,
          {
            keyPath: "id"
          }
        )

      }



      // 健身记录
      if (!db.objectStoreNames.contains(STORE_NAMES.FITNESS_RECORDS)) {

        db.createObjectStore(
          STORE_NAMES.FITNESS_RECORDS,
          {
            keyPath: "id"
          }
        )

      }



      // 饮食
      if (!db.objectStoreNames.contains(STORE_NAMES.DIET)) {

        db.createObjectStore(
          STORE_NAMES.DIET,
          {
            keyPath: "id"
          }
        )

      }



      // 游戏
      if (!db.objectStoreNames.contains(STORE_NAMES.GAMES)) {

        db.createObjectStore(
          STORE_NAMES.GAMES,
          {
            keyPath: "id"
          }
        )

      }



      // 设置
      if (!db.objectStoreNames.contains(STORE_NAMES.SETTINGS)) {

        db.createObjectStore(
          STORE_NAMES.SETTINGS,
          {
            keyPath: "id"
          }
        )

      }


    }



    request.onsuccess = () => {

      dbInstance = request.result

      resolve(dbInstance)

    }



    request.onerror = () => {

      reject(request.error)

    }


  })

}