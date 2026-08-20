<template>


<div>


<h1>
咨询工作
</h1>



<button
@click="addTest"
>
新增咨询项目
</button>




<div
v-for="item in store.projects"
:key="item.id"
>


<h3>

{{item.projectName}}

</h3>


<p>

客户：

{{item.clientName}}

</p>


<p>

状态：

{{item.status}}

</p>


</div>


</div>


</template>





<script setup lang="ts">


import {

onMounted

} from "vue"



import {

useConsultingStore

} from "@/stores/consultingStore"




const store =

useConsultingStore()





onMounted(()=>{


store.loadProjects()


})






function addTest(){



store.createProject({


id:

Date.now().toString(),



clientName:

"测试客户",



projectName:

"AI咨询项目",



description:

"测试咨询项目",



status:

"in_progress",



communications:

[
"第一次沟通"
],



meetingNotes:

[
"讨论需求"
],



requirements:

[
"完成方案设计"
],



deliverables:

[
"咨询报告"
],



deadline:

"2026-09-01",



nextContactDate:

"2026-08-25",



hours:

2,



fee:

1000,



createdAt:

new Date().toISOString(),



updatedAt:

new Date().toISOString()


})


}


</script>