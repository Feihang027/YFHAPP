```vue
<template>

<div class="history">


<h1>
训练历史
</h1>


<div v-if="fitnessStore.records.length">


<el-card v-for="record in sortedRecords" :key="record.id"class="record-card">


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


<el-table :data="record.exercises" size="small">


<el-table-column prop="name"label="动作"/>


<el-table-column prop="weight"label="重量"/>


<el-table-column prop="sets"label="组数"/>


<el-table-column prop="reps"label="次数"/>


</el-table>


<div class="actions">


<el-button type="primary" size="small"@click="viewRecord(record)">
查看详情
</el-button>


<el-button type="danger" size="small"@click="removeRecord(record.id)">
删除记录
</el-button>


</div>


</el-card>


</div>


<div v-else>


<el-empty
description="暂无训练记录"
/>


</div>


</div>

</template>


<script setup lang="ts">


import {
onMounted,
computed
}
from "vue"


import {
useRouter
}
from "vue-router"


import {
useFitnessStore
}
from "@/stores/fitnessStore"


import {
deleteFitnessRecord
}
from "@/services/fitnessService"



const fitnessStore = useFitnessStore()
const router = useRouter()

const sortedRecords = computed(() => {

  return [...fitnessStore.records].sort((a, b) => {

    return b.date.localeCompare(a.date)

  })

})

onMounted(()=>{
fitnessStore.loadFitness()
})



import {
ElMessageBox,
ElMessage
} from "element-plus"



async function removeRecord(id:string){
try{
await ElMessageBox.confirm(
"删除后无法恢复，确认删除？",
"提示",
{
confirmButtonText:"确认",
cancelButtonText:"取消",
type:"warning"
}
)


await deleteFitnessRecord(id)
await fitnessStore.loadFitness()
ElMessage.success(
"删除成功"
)
}catch(e){

}
}



function viewRecord(
record:any
){

router.push({

path:"/fitness-detail",

query:{
id:record.id
}

})

}


</script>


<style scoped>

.history{
padding:20px;
}


.record-card{
margin-bottom:20px;
}


.actions{
margin-top:20px;
display:flex;
gap:10px;
}

</style>
```
