export interface DevelopmentProject {


  id: string


  name: string


  description: string


  status:
  "planning"
  |
  "developing"
  |
  "completed"



  milestones: string[]



  logs: string[]



  nextAction: string



  repository?: string



  createdAt: string


  updatedAt: string

}