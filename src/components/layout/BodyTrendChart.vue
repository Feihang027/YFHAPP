<template>

<div ref="chartRef" class="chart"></div>

</template>



<script setup lang="ts">


import {
  ref,
  onMounted,
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

let chart:any = null



function renderChart(){
  if(!chartRef.value){
    return
  }



  if(!chart){
    chart = echarts.init(
      chartRef.value
    )
  }



  const data = props.records.map(
    (item:any)=>{
      return [
        item.date,
        item.weight
      ]
    }
  )



  chart.setOption({
    title:{
      text:"体重变化趋势"
    },


    tooltip:{},

    xAxis:{
      type:"category",
      data:data.map(
        item=>item[0]
      )
    },

    yAxis:{
      type:"value"
    },


    series:[
      {
        name:"体重",
        type:"line",
        data:data.map(
          item=>item[1]
        )
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