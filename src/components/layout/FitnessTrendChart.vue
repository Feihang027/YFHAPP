<template>

<div ref="chartRef" class="chart">

</div>

</template>


<script setup lang="ts">

import {
onMounted,
ref,
watch
}
from "vue"


import * as echarts from "echarts"



const props = defineProps({
records:{
type:Array,
default:()=>[]
}

})


const chartRef = ref()

let chart:any=null



function renderChart(){
if(!chartRef.value){
return
}


if(!chart){
chart = echarts.init(
chartRef.value
)
}

const dates = props.records.map((item:any)=>item.date)
const durations = props.records.map((item:any)=>item.duration)



chart.setOption({
xAxis:{
type:"category",
data:dates
},
yAxis:{
type:"value"
},


series:[
{
data:durations,
type:"line",
smooth:true
}
]
})
}



onMounted(()=>{
renderChart()
})



watch(
()=>props.records,

()=>{

renderChart()

},

{
deep:true
}

)


</script>



<style scoped>
.chart{
width:100%;
height:300px;

}


</style>