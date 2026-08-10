好的，现在进入 **《Personal OS 第一阶段开发任务拆解 Task Breakdown.md》设计阶段**。

这份文档是从“设计阶段”进入“实际开发阶段”的桥梁。

前面的文档解决：

```
为什么做？
(PRD)

↓

做什么？
(Wireframe)

↓

数据怎么设计？
(Data Model)

↓

技术怎么实现？
(Technical Architecture)
```

而 Task Breakdown 解决：

```
今天具体写什么代码？
先写什么？
每一步怎么验收？
如何让 AI Coding 协助开发？
```

---

# Personal OS 第一阶段开发任务拆解文档

## Task Breakdown.md

版本：

```
v1.0

状态：
开发执行文档

目标：
指导 Personal OS 第一阶段开发
```

---

# 1. 第一阶段开发目标

## Sprint 1目标

完成 Personal OS 的基础运行框架：

最终达到：

> 打开浏览器，可以看到 Personal OS 页面框架，并且具备完整的数据存储能力。

---

## Sprint 1 完成范围

必须完成：

✅ Vue3项目初始化

✅ TypeScript配置

✅ 页面路由

✅ 主布局

✅ Sidebar导航

✅ 基础组件系统

✅ Pinia状态管理

✅ IndexedDB数据库

✅ 基础数据模型

✅ 数据CRUD能力

---

暂不完成：

❌ 首页业务数据

❌ 今日计划功能

❌ 工作模块

❌ 健身模块

❌ 备份恢复

---

# 2. Sprint 1 总体任务流程

```
Task 1
项目初始化

↓

Task 2
基础页面框架

↓

Task 3
路由系统

↓

Task 4
组件系统

↓

Task 5
数据模型

↓

Task 6
IndexedDB

↓

Task 7
Service层

↓

Task 8
Pinia

↓

Task 9
基础测试
```

---

# Task 1：项目初始化

## 目标

创建 Vue3 + TypeScript 项目。

---

## 输入

技术架构：

```
Vue3
Vite
TypeScript
Element Plus
Pinia
Vue Router
```

---

## 操作

创建项目：

```
npm create vite@latest Personal-OS
```

选择：

```
Vue

TypeScript
```

---

安装：

```
npm install
```

---

安装依赖：

```
npm install vue-router pinia element-plus
```

---

安装工具：

```
npm install dayjs uuid zod echarts
```

---

## 输出

项目：

```
Personal-OS
```

可以启动：

```
npm run dev
```

---

## 验收标准

浏览器：

打开：

```
localhost:5173
```

看到：

Vue默认页面。

---

# Task 2：项目目录调整

## 目标

按照 Technical Architecture 创建目录。

---

创建：

```
src

├── views

├── components

├── stores

├── services

├── database

├── models

├── utils
```

---

## 验收标准

目录结构符合：

Technical Architecture.md

---

# Task 3：主页面框架

## 目标

完成应用外壳。

---

创建：

```
layouts

└── MainLayout.vue
```

结构：

```
-----------------

Sidebar

       Header

       Content


-----------------
```

---

创建：

```
components/layout

Sidebar.vue

Header.vue
```

---

## Sidebar菜单

第一版：

```
首页

今日计划

自媒体

开发工作

咨询工作

健身

饮食

游戏娱乐


设置
```

---

## 验收标准

打开应用：

看到完整导航。

点击：

菜单切换正常。

---

# Task 4：Router设计

## 目标

完成页面路由。

---

创建：

```
router/index.ts
```

---

路由：

```typescript
/dashboard

/planner

/creator

/developer

/consulting

/fitness

/nutrition

/entertainment

/settings
```

---

创建临时页面：

例如：

```
Dashboard.vue
Planner.vue
```

内容：

```
页面名称
```

---

## 验收标准

所有菜单：

点击进入对应页面。

---

# Task 5：基础组件系统

## 目标

建立公共组件。

---

创建：

```
components/common
```

---

## BaseCard.vue

用途：

所有模块卡片。

示例：

首页：

```
今日任务Card
```

项目：

```
项目Card
```

---

## ConfirmDialog.vue

用途：

删除确认。

场景：

删除任务。

---

## EmptyState.vue

用途：

无数据页面。

例如：

```
暂无任务
```

---

## SearchBox.vue

预留全局搜索。

---

## 验收标准

组件：

可以被多个页面复用。

---

# Task 6：数据模型定义

## 目标

TypeScript定义所有实体。

---

目录：

```
models
```

---

创建：

```
base.ts

task.ts

note.ts

project.ts

creator.ts

fitness.ts

nutrition.ts

game.ts
```

---

例如：

Task：

```typescript
interface Task {

id:string

title:string

date:string

priority:string

status:string

createdAt:string

updatedAt:string

deleted:boolean

}
```

---

## 验收标准

所有业务数据：

有对应TypeScript类型。

---

# Task 7：IndexedDB数据库

## 目标

实现本地数据保存。

---

目录：

```
database
```

---

创建：

```
indexedDB.ts
```

---

数据库：

```
PersonalOS_DB
```

---

数据表：

第一阶段创建：

```
tasks

notes

settings
```

其他模块：

后续添加。

---

封装：

```typescript
add()

update()

delete()

get()

getAll()
```

---

## 验收标准

浏览器：

刷新页面。

数据仍存在。

---

# Task 8：Service层

## 目标

隔离业务逻辑。

---

目录：

```
services
```

---

创建：

```
taskService.ts

noteService.ts

settingService.ts
```

---

示例：

创建任务：

流程：

```
页面

↓

Store

↓

taskService

↓

IndexedDB
```

---

## 验收标准

页面：

不能直接调用IndexedDB。

---

# Task 9：Pinia状态管理

## 目标

建立应用状态。

---

目录：

```
stores
```

---

创建：

```
task.ts

note.ts

setting.ts

app.ts
```

---

Task Store：

```typescript
state:

tasks


actions:

loadTasks()

addTask()

updateTask()

deleteTask()
```

---

## 验收标准

页面：

通过Store获取数据。

---

# Task 10：基础数据测试

## 目标

验证架构。

---

测试流程：

## 创建任务

页面：

输入：

```
学习Vue3
```

保存。

---

检查：

IndexedDB：

存在。

---

刷新页面。

检查：

任务仍存在。

---

删除。

检查：

deleted=true。

---

# Sprint 1 最终目录状态

完成后：

```
src

├── views

│   ├── dashboard

│   ├── planner

│
├── components

│   ├── layout

│   └── common

│
├── stores

│
├── services

│
├── database

│
├── models

│
└── utils

```

---

# Sprint 1 Git提交计划

建议：

不要一次提交全部。

---

Commit 1

```
init project with Vue3 TS
```

---

Commit 2

```
add application layout and router
```

---

Commit 3

```
add common components
```

---

Commit 4

```
add data models
```

---

Commit 5

```
implement IndexedDB layer
```

---

Commit 6

```
implement store and service layer
```

---

Commit 7

```
complete sprint1 foundation
```

---

# AI Coding 使用规范

每次让 AI 只处理一个 Task。

---

## 示例 Prompt

### Task 1

```
请根据 Personal OS Technical Architecture.md，
创建 Vue3 + TypeScript + Vite 项目。

要求：
1. 使用严格TS模式
2. 不创建业务页面
3. 保留后续目录扩展空间
4. 输出完整安装步骤
```

---

### Task 7

```
请根据 Data Model.md，
实现 Personal OS IndexedDB 数据层。

要求：

1. 数据库名称 PersonalOS_DB
2. 支持tasks表
3. 封装CRUD方法
4. 不允许页面直接调用IndexedDB
5. 使用TypeScript
```

---

# Sprint 1 验收标准

完成后：

打开应用：

看到：

```
Personal OS

首页

今日计划

自媒体

开发工作
...

设置
```

点击：

页面正常切换。

数据：

可以：

```
新增

保存

刷新

读取

删除
```

代码结构：

符合：

```
Technical Architecture.md
```

---

# Sprint 1 完成后的下一阶段

进入：

# Sprint 2：核心业务闭环开发

目标：

完成 Personal OS 第一个真正可用版本：

```
Dashboard 首页

+

今日计划

+

全局搜索

+

数据联动
```

这一步完成后，Personal OS 才真正从“框架”变成“产品”。
