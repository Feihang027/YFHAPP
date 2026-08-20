export interface ConsultingProject {


  // 唯一id
  id: string



  // 客户名称
  clientName: string



  // 咨询项目名称
  projectName: string



  // 项目描述
  description: string



  // 当前状态
  status:
  "planning"
  |
  "in_progress"
  |
  "completed"



  // 沟通记录
  communications: string[]



  // 会议笔记
  meetingNotes: string[]



  // 客户需求
  requirements: string[]



  // 交付物
  deliverables: string[]



  // 截止日期
  deadline?: string



  // 下一次联系时间
  nextContactDate?: string



  // 咨询时长（小时）
  hours: number



  // 收入
  fee: number



  createdAt: string


  updatedAt: string


}