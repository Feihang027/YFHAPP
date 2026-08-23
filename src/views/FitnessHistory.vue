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

<h3>
训练动作
</h3>



<div v-for="exercise in record.exercises":key="exercise.name">


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


<hr>


</div>



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



const fitnessStore =useFitnessStore()



onMounted(()=>{
fitnessStore.loadFitness()
})


</script>


<style scoped>

.history{
padding:20px;
}



.record-card{
margin-bottom:20px;
}



</style>