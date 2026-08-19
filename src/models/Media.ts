export interface MediaContent {


  id: string


  /**
   * 标题/选题
   */
  title: string


  /**
   * 平台
   */
  platform: string


  /**
   * 内容形式
   */
  type:
  | 'video'
  | 'article'
  | 'audio'
  | 'image'


  /**
   * 制作流程
   */
  status:
  | 'idea'
  | 'preparing'
  | 'producing'
  | 'pending_publish'
  | 'published'


  /**
   * 计划发布日期
   */
  publishDate?: string


  /**
   * 文案
   */
  content?: string


  /**
   * 素材位置
   */
  materialPath?: string


  /**
   * 发布链接
   */
  url?: string



  /**
   * 数据表现
   */
  views: number

  likes: number

  comments: number


  createdAt: string

  updatedAt: string

}