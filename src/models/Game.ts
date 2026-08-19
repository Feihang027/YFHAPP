export interface Game {


  id: string


  name: string


  platform: string



  status:
  | 'want'
  | 'playing'
  | 'paused'
  | 'completed'



  progress: number



  rating: number



  notes?: string



  nextGoal?: string



  playTime: number



  createdAt: string

  updatedAt: string

}