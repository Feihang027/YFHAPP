export interface FitnessPlan {
  // 唯一id
  id: string

  // 星期
  weekday: number

  date: string

  duration: number

  // 训练名称
  name: string

  status: string

  // 动作列表
  exercises: FitnessExercise[]

  createdAt: string

  updatedAt: string
}


export interface FitnessExercise {
  // 动作名称
  name: string

  // 组数
  sets: number

  // 次数
  reps: number

  // 重量 kg
  weight: number

  // 休息时间 秒
  restTime: number
}