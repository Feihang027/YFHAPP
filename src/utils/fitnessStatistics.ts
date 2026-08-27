import type {
  FitnessRecord
} from "@/models/FitnessRecord"


// 总训练次数
export function getTotalTrainingCount(
  records: FitnessRecord[]
) {
  return records.length
}



// 总训练时长
export function getTotalDuration(
  records: FitnessRecord[]
) {
  return records.reduce(
    (sum, item) => {

      return sum + item.duration
    },
    0
  )
}



// 最近训练
export function getRecentRecords(
  records: FitnessRecord[],
  limit: number = 5
) {

  return [...records]
    .sort((a, b) =>
      new Date(b.date).getTime()
      -
      new Date(a.date).getTime()
    )
    .slice(0, limit)
}



// 动作统计
export function getExerciseStatistics(
  records: FitnessRecord[]
) {

  const result: any = {}


  records.forEach(record => {

    record.exercises.forEach(exercise => {
      if (!result[exercise.name]) {
        result[exercise.name] = 0
      }
      result[exercise.name] += exercise.sets
    })
  })
  return result

}