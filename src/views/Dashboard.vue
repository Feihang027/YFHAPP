<template>

<div class="dashboard">


<h1>
YFHAPP 首页
</h1>


<h2>
今日概览
</h2>



<el-row :gutter="20">


<!-- 今日任务 -->

<el-col :span="8">

<el-card>

<h3>
今日任务
</h3>


<div class="number">
{{dashboard.taskCount}}
</div>


</el-card>

</el-col>




<!-- 自媒体 -->

<el-col :span="8">

<el-card>


<h3>
自媒体内容
</h3>


<div class="number">
{{dashboard.mediaCount}}
</div>


</el-card>

</el-col>

<!-- 开发项目 -->

<el-col :span="8">


<el-card>


<h3>
开发项目
</h3>


<div class="number">
{{dashboard.projectCount}}
</div>


</el-card>


</el-col>



</el-row>

<el-row 
:gutter="20"
class="second-row"
>

<!-- 健身 -->

<el-col :span="8">


<el-card>


<h3>
健身计划
</h3>


<div class="number">

{{dashboard.fitnessCount}}

</div>


</el-card>


</el-col>

<!-- 饮食 -->


<el-col :span="8">


<el-card>


<h3>
饮食记录
</h3>


<div class="number">

{{dashboard.dietCount}}

</div>


</el-card>

</el-col>

</el-row>

<!-- 快捷操作 -->

<h2 class="quick-title">
快捷操作
</h2>


<el-row 
:gutter="20"
class="quick-actions"
>


<el-col 
:xs="24"
:sm="12"
:md="8"
>


<el-button
type="primary"
@click="go('/tasks')"
>
新建任务
</el-button>


</el-col>

<el-col 
:xs="24"
:sm="12"
:md="8"
>


<el-button
type="success"
@click="go('/media')"
>
发布内容
</el-button>


</el-col>

<el-col 
:xs="24"
:sm="12"
:md="8"
>


<el-button
type="warning"
@click="go('/development')"
>
添加项目
</el-button>


</el-col>


<el-col 
:xs="24"
:sm="12"
:md="8"
>


<el-button
type="danger"
@click="go('/fitness')"
>
记录训练
</el-button>


</el-col>

<el-col 
:xs="24"
:sm="12"
:md="8"
>


<el-button
@click="go('/diet')"
>
添加饮食
</el-button>


</el-col>


</el-row>
</div>


</template>


<script setup lang="ts">


import {
onMounted
}
from "vue"

import {
useRouter
}
from "vue-router"

import {
useDashboardStore
}
from "@/stores/dashboardStore"



const dashboard =
useDashboardStore()

const router =
useRouter()

function go(path:string){

router.push(path)

}

onMounted(()=>{


dashboard.loadDashboard()


})


</script>

<style scoped>


.dashboard{

padding:20px;

}



.el-card{

text-align:center;

height:150px;

}



.number{

font-size:40px;

font-weight:bold;

margin-top:20px;

}



.second-row{

margin-top:20px;

}

.quick-title{

margin-top:40px;

}


.el-button{

width:100%;

height:50px;

font-size:16px;

}


</style>