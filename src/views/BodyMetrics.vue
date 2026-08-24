<template>

<div>

<h1>
身体数据
</h1>


<el-button type="primary" @click="dialogVisible=true">
新增记录
</el-button>


<h2>
历史记录
</h2>


<el-table :data="fitnessStore.bodyMetrics"border>


<el-table-column prop="date" label="日期"/>


<el-table-column prop="weight"label="体重 kg"/>


<el-table-column prop="bodyFat"label="体脂率 %"/>


<el-table-column prop="muscle"label="肌肉量 kg"/>



<el-table-column label="操作">


<template #default="scope">


<el-button type="danger" size="small" @click="remove(scope.row.id)">
删除
</el-button>


</template>


</el-table-column>


</el-table>



<!-- 新增弹窗 -->


<el-dialog v-model="dialogVisible" title="新增身体数据"width="500px">


<el-form>


<el-form-item label="日期">

<el-date-picker v-model="form.date"type="date" value-format="YYYY-MM-DD"/>

</el-form-item>



<el-form-item label="体重">

<el-input-number v-model="form.weight"/>

</el-form-item>



<el-form-item label="体脂率">

<el-input-number v-model="form.bodyFat"/>

</el-form-item>



<el-form-item label="肌肉量">

<el-input-number v-model="form.muscle"/>

</el-form-item>


</el-form>



<template #footer>


<el-button @click="dialogVisible=false">
取消
</el-button>


<el-button type="primary" @click="save">
保存
</el-button>

</template>

</el-dialog>

</div>


</template>



<script setup lang="ts">


import {
ref,
onMounted
}
from "vue"



import {
useFitnessStore
}
from "@/stores/fitnessStore"

const fitnessStore = useFitnessStore()

const dialogVisible = ref(false)

const form = ref({


date:new Date().toISOString().slice(0,10),


weight:0,


bodyFat:0,


muscle:0


})

onMounted(()=>{


fitnessStore.loadFitness()


})




async function save(){
const data:any={


id:Date.now().toString(),


date:form.value.date,


weight:form.value.weight,


bodyFat:form.value.bodyFat,


muscle:form.value.muscle,


createdAt:new Date().toISOString()

}

await fitnessStore.createBodyMetric(data)
dialogVisible.value=false
await fitnessStore.loadFitness()


}


async function remove(id:string){
await fitnessStore.removeBodyMetric(id)


}



</script>