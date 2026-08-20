export interface FitnessRecord {


  id: string



  // 日期

  date: string



  // 做的训练名称

  planName: string



  // 实际动作

  exercises: FitnessExerciseRecord[]



  // 总训练时间

  duration: number



  note: string



  createdAt: string



}





export interface FitnessExerciseRecord {


  name: string


  sets: number


  reps: number


  weight: number


}