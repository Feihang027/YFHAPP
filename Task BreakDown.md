# Task Breakdown
版本：v1.0
状态：开发执行文档

## 目标
指导 Personal OS 第一阶段开发

## 1. 第一阶段开发目标
### Sprint 1目标
完成 Personal OS 的基础运行框架：

最终达到：打开浏览器，可以看到 Personal OS 页面框架，并且具备完整的数据存储能力。

#### Sprint 1 完成范围
**必须完成：**
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

**暂不完成：**
❌ 首页业务数据
❌ 今日计划功能
❌ 工作模块
❌ 健身模块
❌ 备份恢复

## 2. Sprint 1 总体任务流程
Task 1 项目初始化
↓
Task 2 基础页面框架
↓
Task 3 路由系统
↓
Task 4 组件系统
↓
Task 5 数据模型
↓
Task 6 IndexedDB
↓
Task 7 Service层
↓
Task 8 Pinia
↓
Task 9 基础测试

---

## Task 1：项目初始化
**目标**
创建 Vue3 + TypeScript 项目。

**输入 技术架构：**
- Vue3
- Vite
- TypeScript
- Element Plus
- Pinia
- Vue Router

**操作**
创建项目：
```bash
npm create vite@latest Personal-OS
选择：
Vue
TypeScript
安装：
bash
npm install
安装依赖：
bash
npm install vue-router pinia element-plus
安装工具：
bash
npm install dayjs uuid zod echarts
输出
项目：Personal‑OS
启动命令：
bash
npm run dev
验收标准
浏览器访问 localhost:5173，看到 Vue 默认页面。
Task 2：项目目录调整
目标
按照 Technical Architecture 创建目录。
创建目录结构：
plaintext
src
├── views
├── components
├── stores
├── services
├── database
├── models
├── utils
验收标准
目录结构符合 Technical Architecture.md 规范。
Task 3：主页面框架
目标
完成应用外壳。
创建：layouts/MainLayout.vue
布局结构：
plaintext
-----------------
Sidebar
       Header
       Content
-----------------
创建组件：
components/layout/Sidebar.vue
components/layout/Header.vue
Sidebar 菜单（第一版）
首页
今日计划
自媒体
开发工作
咨询工作
健身
饮食
游戏娱乐
设置
验收标准
打开应用可看到完整导航；点击菜单切换正常。
Task 4：Router 设计
目标
完成页面路由。
创建文件：router/index.ts
路由列表：
/dashboard
/planner
/creator
/developer
/consulting
/fitness
/nutrition
/entertainment
/settings
创建临时页面组件，例如：
Dashboard.vue
Planner.vue
页面内容仅展示页面名称。
验收标准
所有菜单点击可跳转至对应页面。
Task 5：基础组件系统
目标
建立公共组件。
目录：components/common
组件清单：
BaseCard.vue
用途：所有模块卡片；示例：首页今日任务 Card、项目 Card
ConfirmDialog.vue
用途：删除确认；场景：删除任务
EmptyState.vue
用途：无数据占位页面；示例：暂无任务
SearchBox.vue
用途：预留全局搜索
验收标准
组件支持多页面复用。
Task 6：数据模型定义
目标
TypeScript 定义所有实体。
目录：models
创建文件：
base.ts
task.ts
note.ts
project.ts
creator.ts
fitness.ts
nutrition.ts
game.ts
示例 Task 类型：
typescript
运行
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
验收标准
全部业务数据拥有对应 TypeScript 类型定义。
Task 7：IndexedDB 数据库
目标
实现本地数据保存。
目录：database
创建文件：indexedDB.ts
数据库名称：PersonalOS_DB
第一阶段数据表：
tasks
notes
settings
其他模块数据表后续迭代添加
封装基础方法：
add()
update()
delete()
get()
getAll()
验收标准
浏览器刷新页面，数据仍然保留。
Task 8：Service 层
目标
隔离业务逻辑。
目录：services
创建文件：
taskService.ts
noteService.ts
settingService.ts
调用流程：
plaintext
页面
↓
Store
↓
taskService
↓
IndexedDB
验收标准
页面禁止直接调用 IndexedDB 原生接口，全部走 service 层。
Task 9：Pinia 状态管理
目标
建立应用状态。
目录：stores
创建 store：
task.ts
note.ts
setting.ts
app.ts
Task Store 示例：
typescript
运行
{
  state: {
    tasks
  },
  actions: {
    loadTasks()
    addTask()
    updateTask()
    deleteTask()
  }
}
验收标准
页面全部通过 Store 获取操作数据。
Task 10：基础数据测试
目标
验证整体架构。
测试流程：
创建任务，输入标题：学习 Vue3，执行保存
检查浏览器 IndexedDB，数据已入库
刷新页面，任务依然存在
执行删除操作
校验数据 deleted=true
Sprint 1 最终目录状态
plaintext
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
Sprint 1 Git 提交计划
不一次性提交全部代码，拆分多次 commit
Commit 1：init project with Vue3 TS
Commit 2：add application layout and router
Commit 3：add common components
Commit 4：add data models
Commit 5：implement IndexedDB layer
Commit 6：implement store and service layer
Commit 7：complete sprint1 foundation
AI Coding 使用规范
每次让 AI 只处理一个 Task。
plaintext

---

# 关键Markdown语法说明（以后自己写文档避免错乱）
1. **代码块必须前后加三个反引号**
bash
npm xxx
