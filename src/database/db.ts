import {
  DB_NAME,
  DB_VERSION,
  STORE_NAMES
} from "./stores"


let dbInstance: null | IDBDatabase = null

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {


    if (dbInstance) {
      resolve(dbInstance as IDBDatabase)
      return

    }


    const request =
      indexedDB.open(
        DB_NAME,
        DB_VERSION
      )



    request.onupgradeneeded = () => {
      const db = request.result


      Object.values(STORE_NAMES).forEach(storeName => {
        if (
          !db.objectStoreNames.contains(storeName)
        ) {

          db.createObjectStore(
            storeName,
            {
              keyPath: "id"
            }
          )
        }
      })
    }

    request.onsuccess = () => {
      dbInstance = request.result
      resolve(dbInstance as IDBDatabase)
    }



    request.onerror = () => {
      reject(request.error)
    }
  })
}