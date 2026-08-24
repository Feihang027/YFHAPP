<template>

<div class="fitness-dashboard">


<h1>
健身数据分析
</h1>



<el-card>

<h2>
训练次数统计
</h2>


<div ref="countChart"class="chart"></div>


</el-card>


<el-card>

<h2>
训练总时长统计
</h2>


<div ref="durationChart"class="chart"></div>


</el-card>

<el-card>

<h2>
体重变化
</h2>


<div ref="weightChart"class="chart"></div>


</el-card>

</div>

</template>


<script setup lang="ts">


import {
onMounted,
ref
}
from "vue"


import * as echarts from "echarts"

import {
useFitnessStore
}
from "@/stores/fitnessStore"

const fitnessStore = useFitnessStore()



// 三个图表容器

const countChart = ref()
const durationChart = ref()
const weightChart = ref()



onMounted(async()=>{
await fitnessStore.loadFitness()
initCountChart()
initDurationChart()
initWeightChart()

})



// =====================
// 训练次数
// =====================

function initCountChart(){
const chart = echarts.init(countChart.value)


const countMap:any = {}

fitnessStore.records.forEach(item=>{

if(countMap[item.date]){
countMap[item.date]++

}else{

countMap[item.date]=1

}
})

const dates = Object.keys(countMap)


const counts = Object.values(countMap)


chart.setOption({
title:{
text:"训练次数"
},

tooltip:{},

xAxis:{

type:"category",

data:dates

},

yAxis:{

type:"value"

},

series:[{

type:"bar",

name:"训练次数",

data:counts
}]

})
}


// =====================
// 总训练时间
// =====================
function initDurationChart(){

const chart = echarts.init(durationChart.value)

const total = fitnessStore.records.reduce(
(sum,item)=>{
return sum + item.duration
},0)

chart.setOption({
title:{
text:"总训练时长"
},


xAxis:{
type:"category",

data:[
"分钟"
]
},


yAxis:{
type:"value"
},

series:[{
type:"bar",
data:[
total
]
}]
})
}


// =====================
// 体重变化
// =====================

function initWeightChart(){
const chart = echarts.init(weightChart.value)

const data = fitnessStore.bodyMetrics.map(
item=>{

return [
item.date,
item.weight
]
})

chart.setOption({

title:{
text:"体重变化"
},


xAxis:{
type:"category",

data:data.map(
item=>item[0]
)

},


yAxis:{
type:"value"

},


series:[{

type:"line",

data:data.map(
item=>item[1]
)

}]
})
}

</script>




<style scoped>
.fitness-dashboard{
padding:20px;
}

.chart{
width:100%;
height:300px;
}

.el-card{
margin-bottom:20px;
}


</style>