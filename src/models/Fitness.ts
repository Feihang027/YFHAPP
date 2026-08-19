export interface FitnessPlan {


  id: string


  weekday:
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'


  exercises: FitnessExercise[]

}



export interface FitnessExercise {


  name: string


  sets: number


  reps: number


  weight: number


  restTime: number

}

export interface FitnessRecord {


  id: string


  date: string


  exercises: FitnessExercise[]


  bodyWeight?: number


  bodyMeasurements?: {

    chest?: number

    waist?: number

    arm?: number

  }

}