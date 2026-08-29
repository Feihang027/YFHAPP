# Fitness 健身管理模块

## 1. 模块介绍

Fitness 模块是 YFHAPP 个人操作系统中的健身管理模块。

该模块用于记录用户日常健身计划、训练执行情况、训练历史以及身体数据变化。

通过该模块，用户可以：

- 创建训练计划
- 管理训练动作
- 执行训练任务
- 保存训练记录
- 查看训练历史
- 管理身体指标
- 分析训练趋势和身体变化


---

# 2. 功能设计

## 2.1 训练计划管理（Fitness Plan）

### 功能说明

用户可以创建、查看、修改、删除训练计划。


### 支持内容

- 训练名称
- 训练日期
- 训练时长
- 训练动作列表
- 当前训练状态


### 状态设计

训练计划状态：


pending


待训练



completed


已完成


### 数据流程


Fitness.vue

↓

fitnessStore

↓

fitnessService

↓

IndexedDB



---

# 2.2 训练执行（Fitness Record）

## 功能说明

用户开始训练计划后，进入训练执行页面。

完成训练后，系统会生成训练记录。


## 执行流程



训练计划

↓

开始训练

↓

训练执行页面

↓

完成训练

↓

生成训练记录



## 保存内容

训练记录包含：


- 训练日期
- 训练名称
- 训练时长
- 完成动作
- 动作重量
- 组数
- 次数
- 备注


---

# 2.3 训练历史


## 功能说明

展示用户历史完成的训练。


## 支持功能


### 查看历史记录

展示：

- 训练名称
- 日期
- 时长
- 动作详情


### 删除训练记录


用户可以删除错误或无效训练记录。


## 排序规则

训练历史按照日期倒序排列：

最新训练显示在顶部。


示例：


2026-08-30 胸部训练

2026-08-28 腿部训练



---

# 2.4 训练详情


## 功能说明

查看单次训练完整信息。


## 页面展示


包含：

- 训练名称
- 日期
- 训练时长
- 完成动作列表


数据来源：



URL参数 id

↓

fitnessStore.records

↓

查询对应训练记录

↓

展示详情



---

# 2.5 身体数据管理（Body Metrics）


## 功能说明

记录用户身体指标变化。


## 支持数据


| 字段    | 说明     |
| ------- | -------- |
| date    | 记录日期 |
| weight  | 体重     |
| height  | 身高     |
| bodyFat | 体脂率   |
| muscle  | 肌肉量   |
| chest   | 胸围     |
| waist   | 腰围     |
| arm     | 臂围     |
| leg     | 腿围     |


## 支持功能


### 新增身体数据


用户可以记录当天身体状态。


### 修改身体数据


支持修改历史记录。


### 删除身体数据


删除错误记录。


---

# 2.6 数据可视化


## 训练趋势图


展示训练次数变化趋势。


技术：


ECharts



数据来源：


FitnessRecord[]




---

## 身体变化趋势


展示体重变化。


例如：


日期 体重

08-28 70kg

08-30 71kg

09-01 70.5kg



通过折线图展示。


技术：


ECharts



---

# 2.7 健身数据分析 Dashboard


## 功能说明

提供健身数据总览。


## 展示内容


### 累计训练次数


计算：


训练记录数量



---

### 累计训练时长


计算：


所有训练duration累加



---

### 训练趋势


展示：


日期

训练次数



---

### 训练统计图表


包含：

- 训练次数柱状图
- 总训练时长柱状图
- 体重变化折线图


---

# 3. 技术架构


## 前端技术



Vue3

TypeScript

Vite

Element Plus

Pinia

Vue Router

ECharts



---

# 数据存储


本项目使用浏览器本地数据库：


IndexedDB



数据不会依赖服务器。


---

# 4. 数据流设计


整体结构：



Vue Component

    |

    ↓

Pinia Store

    |

    ↓

Service Layer

    |

    ↓

IndexedDB



说明：

## Vue Component

负责：

- 页面展示
- 用户交互


---

## Pinia Store

负责：

- 状态管理
- 数据同步


---

## Service Layer

负责：

- 数据操作封装


例如：


addFitnessRecord()

getFitnessRecords()

updateFitnessRecord()

deleteFitnessRecord()



---

## IndexedDB


负责：

- 本地数据持久化


---

# 5. 数据模型


## FitnessPlan


```ts
interface FitnessPlan {

id:string

name:string

date:string

duration:number

status:string

exercises:Exercise[]

}
FitnessRecord
interface FitnessRecord {


id:string

date:string

planName:string

duration:number

exercises:FitnessExerciseRecord[]

note:string

createdAt:string


}
BodyMetric
interface BodyMetric {


id:string

date:string

weight:number

height:number

bodyFat?:number

muscle?:number

chest?:number

waist?:number

arm?:number

leg?:number

createdAt:string


}
6. 文件结构
src

├── views

│
├── Fitness.vue

├── FitnessRecord.vue

├── FitnessHistory.vue

├── FitnessDetail.vue

├── FitnessDashboard.vue

├── BodyMetrics.vue


├── components

│
└── layout

    ├── FitnessTrendChart.vue

    └── BodyTrendChart.vue


├── stores

│
└── fitnessStore.ts


├── services

│
└── fitnessService.ts


├── models

│
├── FitnessPlan.ts

├── FitnessRecord.ts

└── BodyMetric.ts


├── database

│
└── IndexedDB相关代码

7. 已完成功能

目前 Fitness 模块已经实现：

✅ 创建训练计划

✅ 修改训练计划

✅ 删除训练计划

✅ 开始训练

✅ 完成训练

✅ 自动生成训练记录

✅ 查看训练历史

✅ 删除训练记录

✅ 查看训练详情

✅ 身体数据新增

✅ 身体数据修改

✅ 身体数据删除

✅ 身体趋势分析

✅ 健身 Dashboard 数据统计

✅ ECharts 数据可视化

8. 后续优化方向

未来可以增加：

训练模板

例如：

胸部训练模板

腿部训练模板

背部训练模板
AI训练建议

结合 AI：

根据历史训练生成建议
推荐训练计划
分析训练效果
数据同步

未来可以增加：

云端同步
多设备访问
社交功能

例如：

分享训练记录
健身目标管理