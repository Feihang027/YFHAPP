<template>

<div>


<h1>
健身计划
</h1>


<el-button  type="primary" @click="createVisible=true">
新增训练计划
</el-button>

<h2>
训练计划列表
</h2>

<div v-for="plan in fitnessStore.plans" 
:key="plan.id"
>


<h3>
{{plan.name}}
</h3>


<p>
星期：{{plan.weekday}}
</p>


<p>
日期：{{plan.date}}
</p>

<p>
训练时长：{{plan.duration}} 分钟
</p>

<p>
状态：{{plan.status}}
</p>

<h4>
训练动作
</h4>

<div v-for="exercise in plan.exercises"
:key="exercise.name">

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


<p>
休息：{{exercise.restTime}} 秒
</p>


<hr>


</div>

<el-button type="primary" size="small" @click="openEdit(plan)">
编辑计划
</el-button>

<el-button v-if="plan.status !== 'completed'"type="success" @click="startTraining(plan)">
开始训练
</el-button>

<el-tag v-else type="success">
已完成
</el-tag>

<!-- 删除计划按钮 -->

<el-button type="danger"size="small" @click="removePlan(plan.id)">
删除计划
</el-button>

<hr>

</div>

<!-- 编辑训练计划弹窗 -->

<el-dialog v-model="editVisible" title="编辑训练计划" width="500px">


<el-form>


<el-form-item label="训练名称">

<el-input v-model="editPlanData.name"/>

</el-form-item>



<el-form-item label="训练日期">

<el-date-picker v-model="editPlanData.date" type="date" value-format="YYYY-MM-DD"/>

</el-form-item>



<el-form-item label="训练时长">

<el-input-number v-model="editPlanData.duration"/>

</el-form-item>



<el-form-item label="动作名称">

<el-input v-model="editPlanData.exercises[0].name"/>

</el-form-item>



<el-form-item label="重量">

<el-input-number v-model="editPlanData.exercises[0].weight"/>

</el-form-item>



</el-form>



<template #footer>


<el-button @click="editVisible=false">
取消
</el-button>



<el-button type="primary" @click="saveEdit">
保存
</el-button>
</template>
</el-dialog>

<!-- 新建训练计划弹窗 -->

<el-dialog v-model="createVisible" title="新建训练计划" width="500px">


<el-form>


<el-form-item label="训练名称">

<el-input v-model="createPlanData.name"/>

</el-form-item>



<el-form-item label="训练日期">

<el-date-picker v-model="createPlanData.date" type="date" value-format="YYYY-MM-DD"/>

</el-form-item>



<el-form-item label="训练时长">

<el-input-number v-model="createPlanData.duration"/>

</el-form-item>



<el-form-item label="动作名称">

<el-input v-model="createPlanData.exercises[0].name"/>

</el-form-item>



<el-form-item label="重量">

<el-input-number v-model="createPlanData.exercises[0].weight"/>

</el-form-item>



<el-form-item label="组数">

<el-input-number v-model="createPlanData.exercises[0].sets"/>

</el-form-item>



<el-form-item label="次数">

<el-input-number v-model="createPlanData.exercises[0].reps"/>

</el-form-item>



</el-form>



<template #footer>


<el-button @click="createVisible=false">
取消
</el-button>



<el-button type="primary" @click="savePlan">
保存
</el-button>



</template>


</el-dialog>


</div>

</template>

<script setup lang="ts">
import {
useRouter
}
from "vue-router"

import {
onMounted,
ref
}
from "vue"


import {
useFitnessStore
}
from "@/stores/fitnessStore"



const fitnessStore = useFitnessStore()
const router = useRouter()

const createVisible = ref(false)
const editVisible = ref(false)
const editPlanData = ref<any>({})

onMounted(()=>{
fitnessStore.loadFitness()
})

const createPlanData = ref({

name:"",

date: new Date().toISOString().slice(0,10),


duration:60,


status:"pending",


weekday:1,


exercises:[

{

name:"",

weight:0,

sets:0,

reps:0,

restTime:60

}
]

})


async function savePlan(){

const plan={

id: Date.now().toString(),

name: createPlanData.value.name,

date:createPlanData.value.date,

duration:createPlanData.value.duration,

status: createPlanData.value.status,

weekday:createPlanData.value.weekday,

exercises:[

{

name:createPlanData.value.exercises[0].name,

weight:createPlanData.value.exercises[0].weight,

sets:createPlanData.value.exercises[0].sets,

reps:createPlanData.value.exercises[0].reps,

restTime: createPlanData.value.exercises[0].restTime
}
],

createdAt:new Date().toISOString(),

updatedAt:new Date().toISOString()

}

await fitnessStore.createPlan(plan)

createVisible.value=false
await fitnessStore.loadFitness()
}


async function removePlan(id:string){
await fitnessStore.removePlan(id)
}

function openEdit(plan:any){
 editPlanData.value =
 {
   ...plan,
   exercises:[
     {
       ...plan.exercises[0]
     }
   ]

 }
 editVisible.value=true
}


async function saveEdit(){
const plan = {

  id: editPlanData.value.id,

  name: editPlanData.value.name,

  date: editPlanData.value.date,

  duration: editPlanData.value.duration,

  status: editPlanData.value.status,

  weekday: editPlanData.value.weekday,


  exercises:[
    {
      name:editPlanData.value.exercises[0].name,

      weight: editPlanData.value.exercises[0].weight,

      sets: editPlanData.value.exercises[0].sets,

      reps: editPlanData.value.exercises[0].reps,

      restTime: editPlanData.value.exercises[0].restTime
    }
  ],


  createdAt: editPlanData.value.createdAt,

  updatedAt: new Date().toISOString()

}


console.log("准备更新的数据",plan)
await fitnessStore.updatePlan(plan)


editVisible.value=false

}

function startTraining(plan:any){

router.push({

path:"/fitness-record",

query:{
planId:plan.id
}
})
}


</script>