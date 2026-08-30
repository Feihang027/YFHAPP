export interface DevelopmentFeature {

  id: string

  // 所属项目
  projectId: string

  // Feature名称
  name: string

  // Feature描述
  description: string

  // 优先级
  priority: DevelopmentFeaturePriority

  // 状态
  status: DevelopmentFeatureStatus

  // 创建时间
  createdAt: string

  // 更新时间
  updatedAt: string

}


export type DevelopmentFeaturePriority =
  | "low"
  | "medium"
  | "high"


export type DevelopmentFeatureStatus =
  | "todo"
  | "developing"
  | "testing"
  | "completed"