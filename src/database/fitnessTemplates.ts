import type {
  FitnessTemplate
}
  from "@/models/FitnessTemplate"



export const fitnessTemplates: FitnessTemplate[] = [



  {
    id: "chest",

    name: "胸部训练",

    duration: 60,

    exercises: [

      {
        name: "卧推",
        weight: 60,
        sets: 5,
        reps: 8,
        restTime: 60
      },

      {
        name: "上斜哑铃卧推",
        weight: 20,
        sets: 4,
        reps: 10,
        restTime: 60
      }

    ]

  },



  {
    id: "leg",

    name: "腿部训练",

    duration: 60,

    exercises: [

      {
        name: "深蹲",
        weight: 80,
        sets: 5,
        reps: 8,
        restTime: 90
      },

      {
        name: "腿举",
        weight: 100,
        sets: 4,
        reps: 10,
        restTime: 90
      }

    ]

  },



  {
    id: "back",

    name: "背部训练",

    duration: 60,

    exercises: [

      {
        name: "硬拉",
        weight: 80,
        sets: 5,
        reps: 5,
        restTime: 120
      },

      {
        name: "引体向上",
        weight: 0,
        sets: 4,
        reps: 10,
        restTime: 60
      }

    ]

  }


]