export interface Meal {


  id: string


  date: string


  mealType:
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'


  food: string


  calories: number


  protein: number


}