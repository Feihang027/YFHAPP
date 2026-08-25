<template>

<div class="history">


<h1>
训练历史
</h1>


<div v-if="fitnessStore.records.length">


<el-card v-for="record in fitnessStore.records" :key="record.id"class="record-card">


<h2>
{{record.planName}}
</h2>


<p>
日期：{{record.date}}
</p>


<p>
训练时长：{{record.duration}} 分钟
</p>

<p v-if="record.note">
备注：{{record.note}}
</p>

<h3>
训练动作
</h3>



<el-table :data="record.exercises"size="small">
<el-table-column prop="name" label="动作"/>
<el-table-column prop="weight" label="重量"/>
<el-table-column prop="sets" label="组数"/>
<el-table-column prop="reps" label="次数"/>


</el-table>

<el-button type="danger" size="small" @click="removeRecord(record.id)">
删除记录
</el-button>

</el-card>


</div>



<div v-else>


<el-empty description="暂无训练记录"/>


</div>



</div>

</template>




<script setup lang="ts">


import {
onMounted
}
from "vue"


import {
useFitnessStore
}
from "@/stores/fitnessStore"

import {
deleteFitnessRecord
}
from "@/services/fitnessService"


const fitnessStore =useFitnessStore()



onMounted(()=>{
fitnessStore.loadFitness()
})

async function removeRecord(id:string){

await deleteFitnessRecord(id)

await fitnessStore.loadFitness()

}


</script>


<style scoped>

.history{
padding:20px;
}



.record-card{
margin-bottom:20px;
}



</style>