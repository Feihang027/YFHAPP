export interface Task {

  id: string


  //任务名称
  title: string

  //任务描述
  description?: string

  //日期

  date: string

  //优先级

  priority:
  "low"
  |
  "medium"
  |
  "high"

  //状态

  status:
  "pending"
  |
  "doing"
  |
  "completed"

  //预计时间

  estimatedTime: number

  createdAt: string
  updatedAt: string


}