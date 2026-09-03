<template>

<div class="dashboard">


<h1>
YFHAPP 首页
</h1>


<h2>
今日概览
</h2>



<el-row :gutter="20">


<!-- 今日任务数量 -->

<el-col :span="8">

<el-card>

<h3>
今日任务
</h3>


<div class="number">

{{dashboard.todayTasks.length}}

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

{{dashboard.summary.mediaCount}}

</div>


</el-card>

</el-col>




<!-- 开发模块统计 -->

<el-col :span="6">
<el-card>
<h3>
开发项目
</h3>

<div class="number">

{{dashboard.devSummary.projectCount}}

</div>
</el-card>
</el-col>


<el-col :span="6">
<el-card>
<h3>
进行中项目
</h3>

<div class="number">

{{dashboard.devSummary.ongoingProjectCount}}

</div>
</el-card>
</el-col>


<el-col :span="6">
<el-card>
<h3>
功能需求
</h3>

<div class="number">

{{dashboard.devSummary.featureCount}}

</div>
</el-card>
</el-col>


<el-col :span="6">
<el-card>
<h3>
Bug 数
</h3>

<div class="number">

{{dashboard.devSummary.bugCount}}

</div>
</el-card>
</el-col>


</el-row>



<!-- 今日任务列表 -->
<el-card class="today-card">


<h2>
今日任务
</h2>

<div v-if="dashboard.todayTasks.length">


<el-table :data="dashboard.todayTasks">


<el-table-column prop="title" label="任务"/>


<el-table-column prop="status" label="状态"/>


</el-table>


</div>



<div v-else>
今天暂无任务
</div>



</el-card>


<!-- 今日完成率 -->
<el-card>
<h2>
今日完成率
</h2>

<el-progress type="circle":percentage="dashboard.completionRate"/>
<p>

完成：
{{dashboard.completedToday}}
/
{{dashboard.todayTasks.length}} 个任务

</p>
</el-card>



<!-- 今日训练 -->
<el-card>
<h2>
今日训练
</h2>

<div v-if="dashboard.todayFitnessList.length">


<div v-for="fitness in dashboard.todayFitnessList" :key="fitness.id">


<div class="fitness-item">


<h3>
🏋 {{fitness.name}}
</h3>


<p>
⏱
训练时长：
{{fitness.duration}}
分钟
</p>


<p>

状态：

<el-tag v-if="fitness.status==='completed'" type="success">
已完成
</el-tag>


<el-tag v-else type="warning">
待训练
</el-tag>

</p>


<el-button v-if="fitness.status!=='completed'" type="success" @click="startFitness(fitness)">
开始训练
</el-button>


<el-button v-else disabled>
已完成
</el-button>

</div>


<h4>
训练动作
</h4>


<div v-for="exercise in fitness.exercises":key="exercise.name">
<p>

- {{exercise.name}}

{{exercise.weight}}kg

{{exercise.sets}}组

× {{exercise.reps}}次

</p>

</div>
<hr>
</div>
</div>

<div v-else>
今天没有训练计划
</div>
</el-card>


<el-card>

<h2>
健身概览
</h2>

<p>
累计训练：{{dashboard.fitnessSummary.totalRecords}} 次
</p>


<p>
累计训练时长：{{dashboard.fitnessSummary.totalDuration}} 分钟
</p>


<p>
当前体重：{{dashboard.fitnessSummary.latestWeight}} kg
</p>


</el-card>


<!-- 今日饮食 -->
<el-card>
<h2>
今日饮食
</h2>
<div v-if="dashboard.todayDiet">
{{dashboard.todayDiet.name}}


</div>


<div v-else>
暂无饮食记录
</div>



</el-card>

<!-- ================= -->
<!-- 总数据 -->
<!-- ================= -->


<el-row :gutter="20"class="second-row">

<!-- 健身 -->

<el-col :span="8">

<el-card>


<h3>
健身计划
</h3>


<div class="number">
{{dashboard.summary.fitnessCount}}
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
{{dashboard.summary.dietCount}}
</div>


</el-card>


</el-col>



</el-row>


<!-- 最近开发日志 -->
<el-card>
<h2>
最近开发日志
</h2>

<div v-if="dashboard.recentDevLogs.length">

  <div
    v-for="log in dashboard.recentDevLogs"
    :key="log.id"
    class="recent-log-item"
  >

    <div class="log-header">
      <el-tag :type="getLogTagType(log.type)" size="small">
        {{ getLogTypeText(log.type) }}
      </el-tag>
      <span class="log-time">
        {{ formatDateTime(log.createdAt) }}
      </span>
    </div>

    <p class="log-content">
      {{ log.content }}
    </p>

  </div>

</div>

<div v-else>
暂无开发日志
</div>

</el-card>


<!-- 快捷操作 -->

<h2 class="quick-title">
快捷操作
</h2>

<el-row :gutter="20" class="quick-actions">

<el-col :xs="24":sm="12":md="8">


<el-button type="primary" @click="go('/tasks')">

新建任务

</el-button>


</el-col>


<el-col :xs="24":sm="12":md="8">

<el-button type="success" @click="go('/media')">

发布内容

</el-button>


</el-col>

<el-col :xs="24":sm="12":md="8">


<el-button type="warning" @click="go('/development')">

添加项目

</el-button>


</el-col>


<el-col :xs="24":sm="12":md="8">


<el-button type="danger" @click="go('/fitness')">

记录训练
</el-button>


</el-col>


<el-col  :xs="24" :sm="12":md="8">


<el-button @click="go('/diet')">

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
computed
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

import type {
  DevelopmentLogType
} from "@/models/DevelopmentLog"

const dashboard = useDashboardStore()

const router = useRouter()

function go(path:string){
router.push(path)
}

function startFitness(plan:any){
router.push({
path:"/fitness-record",
query:{
planId:plan.id
}
})
}

function getLogTypeText(type: DevelopmentLogType) {
  switch (type) {
    case "daily": return "日常记录"
    case "problem": return "遇到问题"
    case "solution": return "解决方案"
    default: return type
  }
}

function getLogTagType(type: DevelopmentLogType) {
  switch (type) {
    case "daily": return ""
    case "problem": return "danger"
    case "solution": return "success"
    default: return ""
  }
}

function formatDateTime(value: string) {
  if (!value) return "-"
  return value.replace("T", " ").slice(0, 16)
}


onMounted(async()=>{

await dashboard.loadDashboard()
})

</script>

<style scoped>
.dashboard{
padding:20px;
}

.el-card{
text-align:center;
margin-bottom:20px;
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

.fitness-item{
padding:20px;
border-bottom:1px solid #eee;
}


.fitness-item .el-button{
width:120px;
height:40px;
}

.recent-log-item{
padding: 16px 0;
border-bottom: 1px solid #f0f0f0;
text-align: left;
}

.recent-log-item:last-child{
border-bottom: none;
}

.recent-log-item .log-header{
display: flex;
align-items: center;
gap: 12px;
margin-bottom: 8px;
}

.recent-log-item .log-time{
font-size: 13px;
color: #909399;
}

.recent-log-item .log-content{
margin: 0;
line-height: 1.7;
color: #303133;
white-space: pre-wrap;
}

</style>