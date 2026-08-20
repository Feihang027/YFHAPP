import { openDatabase } from "./db"



/**
 * 新增数据
 */
export async function createRecord<T>(
  storeName: string,
  data: T
) {

  const db =
    await openDatabase()


  return new Promise<void>((resolve, reject) => {


    const transaction =
      db.transaction(
        storeName,
        "readwrite"
      )


    const store =
      transaction.objectStore(
        storeName
      )


    const request =
      store.add(data)



    request.onsuccess = () => {

      resolve()

    }


    request.onerror = () => {

      reject(request.error)

    }


  })

}




/**
 * 查询全部
 */
export async function getAllRecords<T>(
  storeName: string
): Promise<T[]> {


  const db =
    await openDatabase()


  return new Promise((resolve, reject) => {


    const transaction =
      db.transaction(
        storeName,
        "readonly"
      )


    const store =
      transaction.objectStore(
        storeName
      )


    const request =
      store.getAll()



    request.onsuccess = () => {

      resolve(
        request.result
      )

    }



    request.onerror = () => {

      reject(
        request.error
      )

    }


  })

}

/**
 * 根据id查询单条数据
 */
export async function getRecordById<T>(
  storeName: string,
  id: string
): Promise<T | undefined> {


  const db =
    await openDatabase()

  return new Promise((resolve, reject) => {


    const transaction =
      db.transaction(
        storeName,
        "readonly"
      )


    const store =
      transaction.objectStore(
        storeName
      )


    const request =
      store.get(id)



    request.onsuccess = () => {


      resolve(
        request.result
      )


    }



    request.onerror = () => {


      reject(
        request.error
      )


    }


  })
}

/**
 * 更新数据
 */
export async function updateRecord<T>(
  storeName: string,
  data: T
) {

  const db =
    await openDatabase()



  return new Promise<void>((resolve, reject) => {


    const transaction =
      db.transaction(
        storeName,
        "readwrite"
      )


    const store =
      transaction.objectStore(
        storeName
      )



    const request =
      store.put(data)



    request.onsuccess = () => {


      resolve()


    }



    request.onerror = () => {


      reject(
        request.error
      )


    }


  })
}

/**
 * 删除数据
 */
export async function deleteRecord(
  storeName: string,
  id: string
) {

  const db =
    await openDatabase()



  return new Promise<void>((resolve, reject) => {


    const transaction =
      db.transaction(
        storeName,
        "readwrite"
      )


    const store =
      transaction.objectStore(
        storeName
      )


    const request =
      store.delete(id)



    request.onsuccess = () => {


      resolve()


    }



    request.onerror = () => {


      reject(
        request.error
      )


    }


  })


}