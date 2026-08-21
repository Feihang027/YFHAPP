<template>

<div>


<h1>
今日计划
</h1>


<el-button
type="primary"
@click="addTest"
>
新建任务
</el-button>



<el-table
:data="taskStore.tasks"
style="width:100%"
>

<el-table-column
prop="title"
label="任务"
/>


<el-table-column
prop="priority"
label="优先级"
/>

<el-table-column 
prop="status" 
label="状态" 
/>



<el-table-column
label="操作"
>

<template #default="scope">


<el-button
type="success"
size="small"
@click="completeTask(scope.row)"
v-if="scope.row.status !== 'completed'"
>

完成

</el-button>


</template>


</el-table-column>



</el-table>
</div>


</template>

<script setup lang="ts">


import {
onMounted
}
from "vue"



import {
useTaskStore
}
from "@/stores/taskStore"



const taskStore =
useTaskStore()



onMounted(()=>{

taskStore.loadTasks()

})

async function completeTask(task:any){


task.status = "completed"


task.updatedAt =
new Date().toISOString()


await taskStore.editTask(task)


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