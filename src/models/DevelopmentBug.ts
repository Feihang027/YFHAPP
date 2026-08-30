export interface DevelopmentBug {

  id: string

  // 所属项目
  projectId: string

  // Bug标题
  title: string

  // Bug描述
  description: string

  // 优先级
  priority: DevelopmentBugPriority

  // Bug状态
  status: DevelopmentBugStatus

  // 创建时间
  createdAt: string

  // 更新时间
  updatedAt: string

}


export type DevelopmentBugPriority =
  | "low"
  | "medium"
  | "high"
  | "critical"


export type DevelopmentBugStatus =
  | "open"
  | "processing"
  | "resolved"
  | "closed"