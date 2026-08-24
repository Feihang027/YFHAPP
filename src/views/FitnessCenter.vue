<template>

<div class="fitness-center">


<h1>
健身中心
</h1>


<el-row :gutter="20">


<el-col :span="6">


<el-card @click="go('/fitness-plan')"class="menu-card">


<h2>
🏋️
</h2>

<p>
训练计划
</p>


</el-card>


</el-col>



<el-col :span="6">
<el-card @click="go('/fitness-history')"class="menu-card">


<h2>
📖
</h2>

<p>
训练历史
</p>


</el-card>


</el-col>




<el-col :span="6">


<el-card @click="go('/body-metrics')"class="menu-card">


<h2>
⚖️
</h2>

<p>
身体数据
</p>


</el-card>


</el-col>




<el-col :span="6">


<el-card @click="go('/fitness-dashboard')" class="menu-card">


<h2>
📊
</h2>

<p>
数据分析
</p>


</el-card>


</el-col>



</el-row>


</div>


</template>



<script setup lang="ts">


import {
useRouter
} from "vue-router"



const router = useRouter()



function go(path:string){

router.push(path)

}


</script>



<style scoped>


.fitness-center{

padding:20px;

}



.menu-card{

cursor:pointer;

text-align:center;

height:150px;

display:flex;

justify-content:center;

align-items:center;

}

</style>