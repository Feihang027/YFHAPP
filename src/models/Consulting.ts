export interface ConsultingProject {


  id: string


  client: string


  name: string



  status:
  | 'planning'
  | 'working'
  | 'completed'



  requirements?: string


  communicationRecords?: string



  deliverables?: string



  deadline?: string



  nextContactTime?: string



  hours?: number



  fee?: number



  createdAt: string

  updatedAt: string

}