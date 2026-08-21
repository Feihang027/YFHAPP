<template>
<div>
<h1>
今日计划
</h1>

<div class="task-stat">

<p>
总任务：{{taskStore.totalCount}}
</p>


<p>
已完成：{{taskStore.completedCount}}
</p>


<p>
完成率：{{taskStore.completionRate}}%
</p>


</div>



<el-button type="primary" @click="addTest">
新建任务
</el-button>



<el-table :data="taskStore.tasks" style="width:100%">

<el-table-column prop="title" label="任务"/>


<el-table-column prop="priority" label="优先级"/>

<el-table-column prop="status" label="状态"/>

<el-table-column label="操作">

<template #default="scope">


<el-button type="success" size="small"
@click="completeTask(scope.row)"
v-if="scope.row.status !== 'completed'">

完成
</el-button>

<el-button type="danger"size="small"
@click="removeTask(scope.row.id)"
>

删除
</el-button>

<el-button type="primary" size="small"
@click="openEdit(scope.row)"
>

编辑
</el-button>


</template>


</el-table-column>



</el-table>

<el-dialog
v-model="editVisible"
title="编辑任务"
width="500px"
>


<el-form>


<el-form-item label="任务名称">

<el-input
v-model="editTaskData.title"
/>

</el-form-item>



<el-form-item label="优先级">


<el-select
v-model="editTaskData.priority"
>


<el-option
label="低"
value="low"
/>


<el-option
label="中"
value="medium"
/>


<el-option
label="高"
value="high"
/>


</el-select>


</el-form-item>



<el-form-item label="预计时间">


<el-input-number
v-model="editTaskData.estimatedTime"
/>


</el-form-item>



</el-form>



<template #footer>


<el-button
@click="editVisible=false"
>

取消

</el-button>



<el-button
type="primary"
@click="saveEdit"
>

保存

</el-button>



</template>


</el-dialog>

</div>


</template>

<script setup lang="ts">


import {onMounted,ref}
from "vue"

import {useTaskStore}
from "@/stores/taskStore"



const taskStore = useTaskStore()

onMounted(()=>{

taskStore.loadTasks()

})

const editVisible = ref(false)



const editTaskData = ref<any>({

id:"",

title:"",

description:"",

date:"",

priority:"low",

status:"pending",

estimatedTime:0,

createdAt:"",

updatedAt:""

})

async function completeTask(task:any){
task.status = "completed"
task.updatedAt =
new Date().toISOString()
await taskStore.editTask(task)
}


async function removeTask(id:string){
await taskStore.removeTask(id)
}

async function openEdit(task:any){
editTaskData.value = {...task}
editVisible.value = true
}


async function saveEdit(){

  const task = {
    ...editTaskData.value
  }
  task.updatedAt =
    new Date().toISOString()
  await taskStore.editTask(task)
  editVisible.value = false

  await taskStore.loadTasks()
}


function addTest(){
taskStore.createTask({

  id:
Date.now().toString(),


title:
"学习Vue3",


description:
"完成Personal OS开发",


date:
new Date()
.toISOString()
.slice(0,10),


priority:
"high",


status:
"pending",


estimatedTime:
60,


createdAt:
new Date()
.toISOString(),


updatedAt:
new Date()
.toISOString()
})


}

</script>