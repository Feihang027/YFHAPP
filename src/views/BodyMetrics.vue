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


<el-table
  :data="fitnessStore.bodyMetrics"
  border
>

<el-table-column
  prop="date"
  label="日期"
/>


<el-table-column
  prop="weight"
  label="体重 kg"
/>


<el-table-column
  prop="height"
  label="身高 cm"
/>


<el-table-column
  prop="bodyFat"
  label="体脂率 %"
/>


<el-table-column
  prop="muscle"
  label="肌肉量 kg"
/>


<el-table-column
  prop="chest"
  label="胸围 cm"
/>


<el-table-column
  prop="waist"
  label="腰围 cm"
/>


<el-table-column
  prop="arm"
  label="臂围 cm"
/>


<el-table-column
  prop="leg"
  label="腿围 cm"
/>



<el-table-column label="操作">

<template #default="scope">

<el-button
  type="danger"
  size="small"
  @click="remove(scope.row.id)"
>
删除
</el-button>

</template>

</el-table-column>


</el-table>



<!-- 新增身体数据弹窗 -->

<el-dialog
  v-model="dialogVisible"
  title="新增身体数据"
  width="500px"
>

<el-form>


<!-- 日期 -->

<el-form-item label="日期">

<el-date-picker
  v-model="form.date"
  type="date"
  value-format="YYYY-MM-DD"
/>

</el-form-item>



<!-- 体重 -->

<el-form-item label="体重">

<el-input-number
  v-model="form.weight"
  :min="0"
  :step="0.1"
/>

<span> kg</span>

</el-form-item>



<!-- 身高 -->

<el-form-item label="身高">

<el-input-number
  v-model="form.height"
  :min="0"
  :step="0.1"
/>

<span> cm</span>

</el-form-item>



<!-- 体脂率 -->

<el-form-item label="体脂率">

<el-input-number
  v-model="form.bodyFat"
  :min="0"
  :max="100"
  :step="0.1"
/>

<span> %</span>

</el-form-item>



<!-- 肌肉量 -->

<el-form-item label="肌肉量">

<el-input-number
  v-model="form.muscle"
  :min="0"
  :step="0.1"
/>

<span> kg</span>

</el-form-item>



<!-- 胸围 -->

<el-form-item label="胸围">

<el-input-number
  v-model="form.chest"
  :min="0"
  :step="0.1"
/>

<span> cm</span>

</el-form-item>



<!-- 腰围 -->

<el-form-item label="腰围">

<el-input-number
  v-model="form.waist"
  :min="0"
  :step="0.1"
/>

<span> cm</span>

</el-form-item>



<!-- 臂围 -->

<el-form-item label="臂围">

<el-input-number
  v-model="form.arm"
  :min="0"
  :step="0.1"
/>

<span> cm</span>

</el-form-item>



<!-- 腿围 -->

<el-form-item label="腿围">

<el-input-number
  v-model="form.leg"
  :min="0"
  :step="0.1"
/>

<span> cm</span>

</el-form-item>


</el-form>



<template #footer>

<el-button @click="dialogVisible=false">
取消
</el-button>


<el-button
  type="primary"
  @click="save"
>
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

  date: new Date().toISOString().slice(0,10),

  weight: 0,

  height: 0,

  bodyFat: 0,

  muscle: 0,

  chest: 0,

  waist: 0,

  arm: 0,

  leg: 0

})


onMounted(() => {

  fitnessStore.loadFitness()

})



async function save() {

  const data: any = {

    id: Date.now().toString(),

    date: form.value.date,

    weight: form.value.weight,

    height: form.value.height,

    bodyFat: form.value.bodyFat,

    muscle: form.value.muscle,

    chest: form.value.chest,

    waist: form.value.waist,

    arm: form.value.arm,

    leg: form.value.leg,

    createdAt: new Date().toISOString()

  }


  await fitnessStore.createBodyMetric(data)


  dialogVisible.value = false


  resetForm()


  await fitnessStore.loadFitness()

}



function resetForm() {

  form.value = {

    date: new Date().toISOString().slice(0,10),

    weight: 0,

    height: 0,

    bodyFat: 0,

    muscle: 0,

    chest: 0,

    waist: 0,

    arm: 0,

    leg: 0

  }

}



async function remove(id: string) {
  await fitnessStore.removeBodyMetric(id)

}

</script>