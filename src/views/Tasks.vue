<template>
<div>
<h1>
今日计划
</h1>

<div class="filter">
<el-select v-model="taskStore.filterStatus" placeholder="任务状态">

<el-option label="全部" value="all"/>


<el-option label="待完成" value="pending"/>
<el-option label="已完成" value="completed"/>


</el-select>
<el-select v-model="taskStore.filterPriority" placeholder="优先级">
<el-option label="全部" value="all"/>


<el-option label="高" value="high"/>


<el-option label="中" value="medium"/>
<el-option label="低"value="low"/>


</el-select>


<el-select v-model="taskStore.sortType" placeholder="排序">
<el-option label="最新创建"value="created"/>
<el-option label="优先级" value="priority"/>
</el-select>
<el-switch v-model="taskStore.showToday" active-text="今日任务"/>

</div>

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

<el-button type="primary" @click="createVisible=true">
新建任务
</el-button>

<el-table v-if="taskStore.filteredTasks.length > 0" :data="taskStore.filteredTasks" 
style="width:100%" :row-class-name="rowClassName">

<el-table-column label="任务">
<template #default="scope">
<el-button link type="primary" @click="openDetail(scope.row)">

{{scope.row.title}}
</el-button>
</template>
</el-table-column>

<el-table-column label="描述" width="250">
<template #default="scope">


<el-tooltip :content="scope.row.description" placement="top">
<span class="description">
{{scope.row.description}}
</span>


</el-tooltip>
</template>
</el-table-column>


<el-table-column label="优先级">
<template #default="scope">


<el-tag v-if="scope.row.priority==='high'"type="danger">
高
</el-tag>


<el-tag v-else-if="scope.row.priority==='medium'" type="warning">
中
</el-tag>


<el-tag v-else type="success">
低
</el-tag>


</template>


</el-table-column>

<el-table-column label="状态">
<template #default="scope">
<el-tag v-if="scope.row.status==='completed'" type="success">

✔ 已完成

</el-tag>
<el-tag v-else type="info">
进行中
</el-tag>

</template>
</el-table-column>

<el-table-column prop="date" label="截止日期"/>
<el-table-column label="提醒">
  

<template #default="scope">

<span v-if="isOverdue(scope.row)">

⚠️ 已过期

</span>


<span v-else>

正常

</span>


</template>

</el-table-column>

<el-table-column label="操作">

<template #default="scope">


<el-button type="success" size="small"
@click="completeTask(scope.row)"
v-if="scope.row.status !== 'completed'">
完成
</el-button>


<el-button type="danger"size="small"
@click="removeTask(scope.row.id)">

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

<el-empty v-if="taskStore.filteredTasks.length === 0" description="今天还没有任务">
<el-button type="primary" @click="createVisible=true">
新建任务
</el-button>
</el-empty>



<el-dialog v-model="editVisible" title="编辑任务" width="500px">


<el-form>


<el-form-item label="任务名称">

<el-input v-model="editTaskData.title"/>

</el-form-item>



<el-form-item label="优先级">


<el-select v-model="editTaskData.priority">


<el-option label="低" value="low"/>


<el-option label="中"value="medium"/>


<el-option label="高" value="high"/>


</el-select>


</el-form-item>



<el-form-item label="预计时间">


<el-input-number v-model="editTaskData.estimatedTime"/>


</el-form-item>
</el-form>



<template #footer>


<el-button
@click="editVisible=false"
>

取消

</el-button>



<el-button type="primary" @click="saveEdit">
保存
</el-button>



</template>


</el-dialog>

<el-dialog v-model="detailVisible" title="任务详情" width="500px">


<el-descriptions border>
<el-descriptions-item label="任务名称">

{{detailTask.title}}

</el-descriptions-item>
<el-descriptions-item label="描述">

{{detailTask.description}}

</el-descriptions-item>
<el-descriptions-item label="优先级">

{{detailTask.priority}}

</el-descriptions-item>
<el-descriptions-item label="状态">

{{detailTask.status}}

</el-descriptions-item>
<el-descriptions-item label="预计时间">
{{detailTask.estimatedTime}} 分钟

</el-descriptions-item>
<el-descriptions-item label="截止日期">

{{detailTask.date}}

</el-descriptions-item>
<el-descriptions-item label="创建时间">

{{detailTask.createdAt}}

</el-descriptions-item>
</el-descriptions>
</el-dialog>



<!-- 新增任务弹窗 -->

<el-dialog v-model="createVisible" title="新建任务" width="500px">
<el-form>
<el-form-item label="任务名称">
<el-input v-model="createTaskData.title"/>
</el-form-item>



<el-form-item label="描述">

<el-input v-model="createTaskData.description"/>

</el-form-item>



<el-form-item label="优先级">
<el-select v-model="createTaskData.priority">


<el-option label="低" value="low"/>


<el-option label="中"value="medium"/>


<el-option label="高" value="high"/>


</el-select>


</el-form-item>



<el-form-item label="预计时间">

<el-input-number v-model="createTaskData.estimatedTime"/>

</el-form-item>



</el-form>



<template #footer>


<el-button
@click="createVisible=false"
>
取消
</el-button>



<el-button type="primary" @click="saveCreate">
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
const createVisible = ref(false)
const detailVisible = ref(false)


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

const detailTask = ref<any>({})


const createTaskData = ref<any>({

title:"",

description:"",

date:new Date()
.toISOString()
.slice(0,10),

priority:"low",

status:"pending",

estimatedTime:30

})

async function completeTask(task:any){
const updateTask = {
...task,
status:"completed",
updatedAt:new Date().toISOString()
}
await taskStore.editTask(updateTask)
}

function isOverdue(task:any){
const today = new Date().toISOString().slice(0,10)
return (task.date < today&& task.status !== "completed")
}

function rowClassName({row}:any){
if(row.status==="completed"){
return "completed-row"
}
return ""
}


async function removeTask(id:string){
await taskStore.removeTask(id)
}

async function openEdit(task:any){
editTaskData.value = {...task}
editVisible.value = true
}

function openDetail(task:any){
detailTask.value = {...task}
detailVisible.value = true

}


async function saveEdit(){
  const task = {...editTaskData.value}
  task.updatedAt = new Date().toISOString()
  await taskStore.editTask(task)
  editVisible.value = false
  await taskStore.loadTasks()
}


async function saveCreate(){
const task = {

id:
Date.now().toString(),


...createTaskData.value,


createdAt:
new Date().toISOString(),


updatedAt:
new Date().toISOString()

}
await taskStore.createTask(task)

createVisible.value=false
await taskStore.loadTasks()
}

</script>


<style scoped>
.filter{
display:flex;
gap:20px;
margin:20px 0;
}

.description{
display:block;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
}

.completed-row{
opacity:0.6;
transition:all 0.5s;
}

.completed-row td{
text-decoration:line-through;
}

.el-empty{
margin-top:80px;
}

</style>