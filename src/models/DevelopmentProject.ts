export interface DevelopmentProject {

  id: string

  // 项目名称
  name: string

  // 项目描述
  description: string

  // 技术栈
  techStack: string

  // 项目状态
  status: DevelopmentProjectStatus

  // 开始日期
  startDate: string

  // Git仓库地址
  gitUrl?: string

  // 本地项目路径
  localPath?: string

  // 项目备注
  note?: string

  // 下一步行动
  nextAction?: string

  // 创建时间
  createdAt: string

  // 更新时间
  updatedAt: string

}


export type DevelopmentProjectStatus =
  | "planning"
  | "developing"
  | "testing"
  | "completed"
  | "archived"