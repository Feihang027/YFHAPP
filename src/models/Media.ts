export interface Media {


  // 唯一id
  id: string

  // 标题 / 选题名称
  title: string

  // 所属平台
  platform:
  | "Bilibili"
  | "Youtube"
  | "抖音"
  | "小红书"
  | "公众号"
  | "其他"

  // 内容形式
  contentType:
  | "图文"
  | "视频"
  | "音频"

  // 制作流程
  status:
  | "idea"
  | "preparing"
  | "creating"
  | "pending_publish"
  | "published"

  // 计划发布日期
  publishDate?: string

  // 文案
  content?: string

  // 素材位置
  materialPath?: string

  // 发布链接
  url?: string

  // 数据表现

  views?: number

  likes?: number

  comments?: number

  // 创建时间

  createdAt: string


  updatedAt: string

}