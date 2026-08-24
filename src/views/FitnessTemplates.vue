<template>


<div>


<h1>
训练计划模板
</h1>



<el-row :gutter="20">
<el-col :span="8" v-for="item in templates":key="item.id">
<el-card>


<h2>
{{item.name}}
</h2>


<p>
训练时间：{{item.duration}}分钟
</p>


<h3>
动作
</h3>


<div v-for="exercise in item.exercises" :key="exercise.name">


<p>

{{exercise.name}}

{{exercise.weight}}kg

{{exercise.sets}}组

×{{exercise.reps}}

</p>


</div>



<el-button type="success" @click="createFromTemplate(item)">
使用模板
</el-button>



</el-card>



</el-col>


</el-row>


</div>


</template>


<script setup lang="ts">


import {
fitnessTemplates
}
from "@/database/fitnessTemplates"



import {
useRouter
}
from "vue-router"



import type {
FitnessTemplate
}
from "@/models/FitnessTemplate"



const router=useRouter()
const templates = fitnessTemplates


function createFromTemplate(
template:FitnessTemplate
){
router.push({
path:"/fitness-plan",
query:{
templateId:template.id
}
})
}



</script>