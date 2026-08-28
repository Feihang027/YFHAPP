<template>

<div class="record-page">

<h1>
训练执行
</h1>

<div v-if="plan">


<el-card>


<h2>
{{plan.name}}
</h2>


<p>
训练日期：{{plan.date}}
</p>


<p>
训练时长：{{plan.duration}} 分钟
</p>

<h3>
训练动作
</h3>

<div v-for="exercise in plan.exercises":key="exercise.name"class="exercise">


<el-card>


<h4>
{{exercise.name}}
</h4>


<p>
重量：{{exercise.weight}} kg
</p>


<p>
组数：{{exercise.sets}} 组
</p>


<p>
次数：{{exercise.reps}} 次
</p>


<p>
休息：{{exercise.restTime}} 秒
</p>


</el-card>


</div>

<el-form-item label="训练备注">
<el-input v-model="note"type="textarea":rows="3"placeholder="记录一下本次训练的状态、感受等"/>
</el-form-item>

<el-button type="success"size="large"@click="finishTraining">
完成训练
</el-button>


</el-card>

</div>

<div v-else>
正在加载训练计划...
</div>

</div>

</template>

<script setup lang="ts">


import {
onMounted,
ref
}
from "vue"



import {
useRoute,
useRouter
}
from "vue-router"



import {
useFitnessStore
}
from "@/stores/fitnessStore"



const route = useRoute()


const router = useRouter()

const fitnessStore = useFitnessStore()



const plan = ref<any>(null)
  
const note = ref("")


onMounted(async()=>{
const planId =route.query.planId as string
await fitnessStore.loadFitness()
plan.value = fitnessStore.plans.find(item =>item.id === planId)

// 如果已经完成，禁止再次训练
if(plan.value && plan.value.status==="completed"){
alert("该训练已经完成")
router.push("/fitness")
}
})


async function finishTraining(){
const record = {
id: Date.now().toString(),
date:new Date().toISOString().slice(0,10),

planName:plan.value.name,

duration:plan.value.duration,

exercises:plan.value.exercises.map(
(exercise:any)=>({
name:exercise.name,
sets:exercise.sets,
reps:exercise.reps,
note:note.value,
weight:exercise.weight
})
),
note: note.value,

createdAt:new Date().toISOString()}

console.log(
"生成训练记录",
record
)

await fitnessStore.createRecord(record)

// 修改训练计划状态
const updatePlan = JSON.parse(
  JSON.stringify(plan.value)
)
updatePlan.status = "completed"
updatePlan.updatedAt =
new Date().toISOString()

await fitnessStore.updatePlan(
  updatePlan
)


alert("训练完成，已保存")
router.push("/fitness")

}

</script>



<style scoped>


.record-page{
padding:20px;
}


.exercise{
margin-top:20px;
}


</style>