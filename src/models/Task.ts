export interface Task {

  id: string


  /**
   * 事项标题
   */
  title: string


  /**
   * 所属日期
   * YYYY-MM-DD
   */
  date: string


  /**
   * 优先级
   * high / medium / low
   */
  priority: 'high' | 'medium' | 'low'


  /**
   * 状态
   */
  status:
  | 'pending'
  | 'completed'
  | 'delayed'
  | 'cancelled'


  /**
   * 预计耗时（分钟）
   */
  estimatedTime: number


  /**
   * 具体时间段
   */
  startTime?: string


  /**
   * 完成时间
   */
  completedAt?: string


  createdAt: string


  updatedAt: string
}