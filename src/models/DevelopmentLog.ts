export interface DevelopmentLog {

  id: string

  // 所属项目
  projectId: string

  // 日志内容
  content: string

  // 日志类型：日常记录 / 遇到的问题 / 解决方案
  type: DevelopmentLogType

  // 创建时间
  createdAt: string

}


export type DevelopmentLogType =
  | "daily"
  | "problem"
  | "solution"
