import {
  openDatabase
}
  from "@/database/db"


const STORE_NAME = "fitnessRecords"



export async function addFitnessRecord(
  record: any
) {

  const db = await openDatabase()


  return new Promise((resolve, reject) => {


    const tx = db.transaction(
      STORE_NAME,
      "readwrite"
    )


    const store = tx.objectStore(
      STORE_NAME
    )
    store.add(record)



    tx.oncomplete = () => {
      resolve(record)

    }

    tx.onerror = () => {
      reject(tx.error)
    }
  })
}




export async function getFitnessRecords() {

  const db = await openDatabase()

  return new Promise<any[]>((resolve, reject) => {


    const tx = db.transaction(
      STORE_NAME,
      "readonly"
    )


    const store = tx.objectStore(
      STORE_NAME
    )


    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result)

    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}


export async function deleteFitnessRecord(
  id: string
) {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(
      STORE_NAME,
      "readwrite"
    )


    const store = tx.objectStore(
      STORE_NAME
    )


    store.delete(id)



    tx.oncomplete = () => {
      resolve(true)
    }

    tx.onerror = () => {
      reject(tx.error)
    }
  })
}