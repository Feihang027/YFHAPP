```vue
<template>

<div>

<h1>
训练记录详情
</h1>


<div v-if="record">


<el-card>


<h2>
{{record.planName}}
</h2>


<p>
训练日期：{{record.date}}
</p>


<p>
训练时长：{{record.duration}}分钟
</p>


<h3>
训练动作
</h3>


<el-table :data="record.exercises"size="small">


<el-table-column prop="name"label="动作"/>


<el-table-column prop="weight"label="重量"/>


<el-table-column prop="sets"label="组数"/>


<el-table-column prop="reps" label="次数"/>


</el-table>


<p v-if="record.note">

备注：

{{record.note}}

</p>


</el-card>


</div>


<div v-else>

<el-empty description="训练记录不存在"/>

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
useRoute
}
from "vue-router"


import {
useFitnessStore
}
from "@/stores/fitnessStore"



const route = useRoute()

const fitnessStore = useFitnessStore()

const record = ref<any>(null)



onMounted(async()=>{


await fitnessStore.loadFitness()


const id = route.query.id as string


record.value = fitnessStore.records.find(item => item.id === id)})


</script>


<style scoped>

div{
box-sizing:border-box;
}

</style>
```
