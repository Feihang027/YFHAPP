<template>
<div>
<h1>
健身计划
</h1>
<button
@click="addTestPlan"
>
新增训练计划
</button>

<h2>
训练计划列表
</h2>

<div v-for="plan in fitnessStore.plans" :key="plan.id">


<h3>
{{plan.name}}
</h3>
<p>
星期：{{plan.weekday}}
</p>

<div v-for="exercise in plan.exercises" :key="exercise.name">


<p>
动作：{{exercise.name}}
</p>


<p>
重量：{{exercise.weight}} kg
</p>

<p>
组数：{{exercise.sets}} 组

</p>


<p>
次数：{{exercise.reps}} 次
</p>
</div>



<hr>
</div>
</div>
</template>

<script setup lang="ts">


import {

onMounted

} from "vue"



import {

useFitnessStore

} from "@/stores/fitnessStore"

const fitnessStore =

useFitnessStore()

/**
 * 页面打开加载数据
 */

onMounted(()=>{


fitnessStore.loadFitness()


})

/**
 * 测试新增训练计划
 */

async function addTestPlan(){


  await fitnessStore.createPlan({


    id:
    Date.now().toString(),


    weekday:
    1,


    name:
    "胸部训练",


    exercises:[


      {

        name:
        "卧推",

        sets:
        5,

        reps:
        8,

        weight:
        60,

        restTime:
        120

      },


      {

        name:
        "哑铃飞鸟",

        sets:
        4,

        reps:
        12,

        weight:
        20,

        restTime:
        90

      }


    ],


    createdAt:
    new Date().toISOString(),


    updatedAt:
    new Date().toISOString()


  })
  // 新增完成后重新查询
  await fitnessStore.loadFitness()
}
</script>