<template>

<div>


<h1>
健身计划
</h1>

<el-button type="success"@click="router.push('/fitness-dashboard')">
数据分析
</el-button>

<el-button type="success" @click="router.push('/body-metrics')">
身体数据
</el-button>


<el-button  type="primary" @click="createVisible=true">
新增训练计划
</el-button>

<el-button type="success" @click="router.push('/fitness-history')">
训练历史
</el-button>

<el-button type="warning" @click="router.push('/fitness-templates')">
训练模板
</el-button>

<h2>
训练计划列表
</h2>


<el-button-group>
<el-button @click="statusFilter='all'">
全部
</el-button>

<el-button @click="statusFilter='pending'">
待训练
</el-button>

<el-button @click="statusFilter='completed'">
已完成
</el-button>


</el-button-group>

<el-row :gutter="20">

<el-col :span="8" v-for="plan in filteredPlans" :key="plan.id">



<el-card class="fitness-card">
<div class="card-header">
<h2>
{{plan.name}}
</h2>


<el-tag v-if="plan.status==='completed'"type="success">
已完成
</el-tag>


<el-tag v-else type="warning">
待训练
</el-tag>


</div>


<p>
⏱ 时长：{{plan.duration}} 分钟
</p>

<p>
📅 日期：{{plan.date}}
</p>



<h3>
训练动作
</h3>

<el-table :data="plan.exercises"size="small"
>
<el-table-column prop="name"label="动作"/>

<el-table-column prop="weight"label="重量"/>

<el-table-column prop="sets"label="组数"/>

<el-table-column prop="reps"label="次数"/>

</el-table>



<div style="margin-top:20px">

<div class="actions">


<el-button type="primary" size="small"@click="openEdit(plan)">
编辑
</el-button>

<el-button v-if="plan.status!=='completed'"type="success"size="small"@click="startTraining(plan)">
开始训练
</el-button>

<el-button type="danger"size="small" @click="removePlan(plan.id)">
删除
</el-button>

<el-button type="info" @click="viewDetail(plan)">
查看详情
</el-button>


</div>

</div>


</el-card>


</el-col>


</el-row>

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
useRouter,
useRoute
}
from "vue-router"

import {
onMounted,
ref,
computed
}
from "vue"

import {
useFitnessStore
}
from "@/stores/fitnessStore"

import {
fitnessTemplates
}
from "@/database/fitnessTemplates"



const fitnessStore = useFitnessStore()
const router = useRouter()
const route = useRoute()

const createVisible = ref(false)
const editVisible = ref(false)
const editPlanData = ref<any>({})  
const statusFilter = ref("all")



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

onMounted(()=>{
fitnessStore.loadFitness()
const templateId =route.query.templateId

if(templateId){
const template = fitnessTemplates.find(item=>item.id===templateId)
if(template){
createPlanData.value.name = template.name
createPlanData.value.duration = template.duration
createPlanData.value.exercises = template.exercises.map(item=>({
...item
}))
createVisible.value=true
}
}
})

const filteredPlans = computed(()=>{
if(statusFilter.value==="all"){
return fitnessStore.plans
}
return fitnessStore.plans.filter(
item=>item.status===statusFilter.value
)
})


async function savePlan(){

const plan={

id: Date.now().toString(),

name: createPlanData.value.name,

date:createPlanData.value.date,

duration:createPlanData.value.duration,

status: createPlanData.value.status,

weekday:createPlanData.value.weekday,

exercises:createPlanData.value.exercises.map(item=>({

name:item.name,

weight:item.weight,

sets:item.sets,

reps:item.reps,

restTime:item.restTime

})),

createdAt:new Date().toISOString(),

updatedAt:new Date().toISOString()

}


function resetCreateForm(){
createPlanData.value={
name:"",
date:new Date().toISOString().slice(0,10),
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
}
}

await fitnessStore.createPlan(plan)

createVisible.value=false
resetCreateForm()
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

function viewDetail(plan:any){
router.push({
path:"/fitness-detail",
query:{
id:plan.id
}
})
}


</script>


<style scoped>
.fitness-card{
margin-bottom:20px;

}

.card-header{
display:flex;
justify-content:space-between;
align-items:center;
}

.actions{
margin-top:20px;
display:flex;
gap:10px;
}


</style>