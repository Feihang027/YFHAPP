export interface DevelopmentProject {


  id: string


  name: string


  description?: string



  stage:
  | 'planning'
  | 'developing'
  | 'testing'
  | 'completed'



  repository?: string


  localPath?: string



  /**
   * 技术笔记
   */
  notes?: string



  /**
   * 下一步行动
   */
  nextAction?: string



  createdAt: string

  updatedAt: string

}