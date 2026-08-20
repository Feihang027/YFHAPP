<template>

<div>

<h1>
今日计划
</h1>


<button @click="test">

新增测试任务

</button>


<div
v-for="task in taskStore.tasks"
:key="task.id"
>

{{task.title}}

</div>


</div>

</template>



<script setup lang="ts">

import { onMounted } from "vue"

import { useTaskStore } from "@/stores/taskStore"



const taskStore =
    useTaskStore()



onMounted(()=>{

    taskStore.loadTasks()

})



function test(){


taskStore.createTask({

id:Date.now().toString(),

title:"Pinia测试任务",

date:"2026-08-19",

priority:"high",

status:"pending",

estimatedTime:30,

createdAt:new Date().toISOString(),

updatedAt:new Date().toISOString()


})


}


</script>