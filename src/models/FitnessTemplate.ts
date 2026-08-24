export interface FitnessTemplate {


  id: string


  name: string


  duration: number


  exercises: FitnessTemplateExercise[]


}


export interface FitnessTemplateExercise {


  name: string


  weight: number


  sets: number


  reps: number


  restTime: number


}