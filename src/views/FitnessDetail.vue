<template>

<div>


<h1>
训练计划详情
</h1>


<div v-if="plan">


<el-card>


<h2>
{{plan.name}}
</h2>


<p>
日期：
{{plan.date}}
</p>


<p>
训练时长：
{{plan.duration}}
分钟
</p>


<p>
状态：
{{plan.status}}
</p>



<h3>
训练动作
</h3>


<el-table :data="plan.exercises">
<el-table-column prop="name" label="动作"/>
<el-table-column prop="weight" label="重量"/>
<el-table-column prop="sets" label="组数"/>
<el-table-column prop="reps"label="次数"/>


</el-table>


<br>
<el-button type="success" v-if="plan.status!=='completed'" @click="startTraining">
开始训练
</el-button>



</el-card>


</div>


<div v-else>

计划不存在

</div>


</div>

</template>


<script setup lang="ts">


import {
ref,
onMounted
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



onMounted(async()=>{
await fitnessStore.loadFitness()


const id = route.query.id


plan.value = fitnessStore.plans.find(item=>item.id===id)

})



function startTraining(){

router.push({

path:"/fitness-record",

query:{
planId:plan.value.id
}
})
}


</script>