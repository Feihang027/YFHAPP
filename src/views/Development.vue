<template>

  <div class="development">

    <!-- =========================
         页面标题
    ========================== -->

    <div class="page-header">

      <h1>
        开发工作
      </h1>

      <div class="header-actions">

        <el-button type="primary" @click="openCreate">
          新增项目
        </el-button>

        <el-button type="primary" @click="openFeatureCreate">
          新增功能
        </el-button>

      </div>

    </div>


    <!-- =========================
         开发项目
    ========================== -->

    <el-card>

      <template #header>

        <div class="card-header">

          <span>
            开发项目
          </span>

          <span>
            共 {{ store.projects.length }} 个项目
          </span>

        </div>

      </template>


      <!-- 没有项目 -->

      <el-empty v-if="store.projects.length === 0" description="暂无开发项目"/>


      <!-- 有项目 -->

      <div v-else class="project-list">

        <el-card v-for="project in store.projects" :key="project.id" class="project-card">

          <!-- 项目名称 + 状态 -->

          <div class="project-header">

            <h2>
              {{ project.name }}
            </h2>

            <el-tag>
              {{ getStatusText(project.status) }}
            </el-tag>

          </div>


          <!-- 项目描述 -->

          <p class="description">
            {{ project.description || "暂无项目描述" }}
          </p>


          <!-- 技术栈 -->

          <p>

            <strong>
              技术栈：
            </strong>

            {{ project.techStack || "暂无" }}

          </p>


          <!-- 开始日期 -->

          <p>

            <strong>
              开始日期：
            </strong>

            {{ project.startDate || "暂无" }}

          </p>


          <!-- Git 地址 -->

          <p v-if="project.gitUrl">

            <strong>
              Git：
            </strong>

            {{ project.gitUrl }}

          </p>


          <!-- 本地路径 -->

          <p v-if="project.localPath">

            <strong>
              本地路径：
            </strong>

            {{ project.localPath }}

          </p>


          <!-- 备注 -->

          <p v-if="project.note">

            <strong>
              备注：
            </strong>

            {{ project.note }}

          </p>


          <!-- 时间 -->

          <div class="project-info">

            <span>
              创建时间：
              {{ formatDate(project.createdAt) }}
            </span>

            <span>
              更新时间：
              {{ formatDate(project.updatedAt) }}
            </span>

          </div>


          <!-- 操作 -->

          <div class="project-action">

            <el-button type="primary" size="small" @click="editProject(project)">
              编辑
            </el-button>


            <el-button type="danger" size="small"@click="removeProject(project.id)">
              删除
            </el-button>

          </div>

        </el-card>

      </div>

    </el-card>


    <!-- =========================
         功能需求
    ========================== -->

    <el-card class="section-card">

      <template #header>

        <div class="card-header">

          <span>
            功能需求
          </span>

          <span>
            共 {{ store.features.length }} 个
          </span>

        </div>

      </template>


      <!-- 没有功能 -->

      <el-empty v-if="store.features.length === 0" description="暂无功能需求"/>


      <!-- 有功能 -->

      <el-table v-else :data="store.features" border>

        <el-table-column prop="name" label="功能名称"/>


        <el-table-column prop="description" label="描述" />


        <el-table-column label="所属项目" >

          <template #default="scope">

            {{ getProjectName(scope.row.projectId) }}

          </template>

        </el-table-column>


        <el-table-column label="优先级">

          <template #default="scope">

            <el-tag :type="getPriorityTagType(scope.row.priority)">
              {{ getPriorityText(scope.row.priority) }}
            </el-tag>

          </template>

        </el-table-column>


        <el-table-column label="状态">
          <template #default="scope">

            <el-tag>
              {{ getFeatureStatusText(scope.row.status) }}
            </el-tag>

          </template>

        </el-table-column>

        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editFeature(scope.row)">
              编辑
            </el-button>
            
            <el-button type="danger"size="small" @click="removeFeature(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-card>


    <!-- =========================
         新增 / 编辑项目弹窗
    ========================== -->

    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑项目' : '新增项目'" width="550px">

      <el-form label-width="90px">

        <!-- 项目名称 -->

        <el-form-item
          label="项目名称"
        >

          <el-input v-model="form.name" placeholder="请输入项目名称" />

        </el-form-item>


        <!-- 项目描述 -->

        <el-form-item label="项目描述">

          <el-input v-model="form.description" type="textarea":rows="3"placeholder="请输入项目描述"/>

        </el-form-item>


        <!-- 技术栈 -->

        <el-form-item label="技术栈">

          <el-input v-model="form.techStack" placeholder="例如：Vue3、TypeScript、IndexedDB"/>

        </el-form-item>


        <!-- 项目状态 -->

        <el-form-item label="项目状态">

          <el-select v-model="form.status" placeholder="请选择项目状态"style="width: 100%">

            <el-option label="规划中" value="planning"/>

            <el-option label="开发中" value="developing" />

            <el-option label="已完成" value="completed"/>

          </el-select>

        </el-form-item>


        <!-- 开始日期 -->

        <el-form-item label="开始日期">

          <el-date-picker
            v-model="form.startDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择开始日期"
            style="width: 100%"
          />

        </el-form-item>


        <!-- Git 地址 -->

        <el-form-item label="Git 地址">

          <el-input
            v-model="form.gitUrl"
            placeholder="例如：https://github.com/xxx/YFHAPP"
          />

        </el-form-item>


        <!-- 本地路径 -->

        <el-form-item label="本地路径">

          <el-input
            v-model="form.localPath"
            placeholder="例如：D:\YFHAPP"
          />

        </el-form-item>


        <!-- 备注 -->

        <el-form-item label="备注">

          <el-input
            v-model="form.note"
            type="textarea"
            :rows="3"
            placeholder="请输入备注"
          />

        </el-form-item>

      </el-form>


      <!-- 项目弹窗底部 -->

      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>


        <el-button type="primary" @click="saveProject">
          保存
        </el-button>

      </template>

    </el-dialog>


    <!-- =========================
         新增功能弹窗
    ========================== -->

    <el-dialog v-model="featureDialogVisible" title="新增功能" width="500px">
      <el-form label-width="80px" >
        <!-- 所属项目 -->
        <el-form-item label="所属项目" >
          <el-select v-model="featureForm.projectId" style="width: 100%" placeholder="请选择所属项目">

            <el-option v-for="project in store.projects"
              :key="project.id"
              :label="project.name"
              :value="project.id"
            />

          </el-select>

        </el-form-item>


        <!-- 功能名称 -->

        <el-form-item label="功能名称">
          <el-input v-model="featureForm.name" placeholder="请输入功能名称"/>
        </el-form-item>


        <!-- 描述 -->

        <el-form-item label="描述" >

          <el-input v-model="featureForm.description" type="textarea"
            :rows="3"
            placeholder="请输入功能描述"
          />

        </el-form-item>


        <!-- 优先级 -->

        <el-form-item label="优先级">

          <el-select v-model="featureForm.priority" style="width: 100%">

            <el-option label="低" value="low" />

            <el-option label="中" value="medium" />

            <el-option label="高" value="high"/>

          </el-select>

        </el-form-item>


        <!-- 状态 -->

        <el-form-item label="状态">
          <el-select v-model="featureForm.status" style="width: 100%">
          <el-option label="待处理" value="todo"/>
          </el-select>
        
        </el-form-item>

      </el-form>


      <!-- 功能弹窗底部 -->

      <template #footer>

        <el-button @click="featureDialogVisible = false">
          取消
        </el-button>


        <el-button type="primary"@click="saveFeature">
          保存
        </el-button>

      </template>

    </el-dialog>

  </div>

</template>


<script setup lang="ts">

import {
  onMounted,
  ref
} from "vue"


import {
  useDevelopmentStore
} from "@/stores/developmentStore"


import type {
  DevelopmentProject
} from "@/models/DevelopmentProject"


import type {
  DevelopmentProjectStatus
} from "@/models/DevelopmentProject"


import type {
  DevelopmentFeature
} from "@/models/DevelopmentFeature"

import type {
  DevelopmentFeatureStatus
} from "@/models/DevelopmentFeature"


const store = useDevelopmentStore()


// ==================================================
// 项目弹窗
// ==================================================

const dialogVisible = ref(false)

const editingId = ref<string | null>(null)


// ==================================================
// 功能弹窗
// ==================================================

const featureDialogVisible = ref(false)

const editingFeatureId = ref<string | null>(null)


// ==================================================
// 项目表单
// ==================================================

interface ProjectForm {

  name: string

  description: string

  techStack: string

  status: DevelopmentProjectStatus

  startDate: string

  gitUrl: string

  localPath: string

  note: string

}


const form = ref<ProjectForm>({

  name: "",

  description: "",

  techStack: "",

  status: "planning" as DevelopmentProjectStatus,

  startDate:
    new Date()
      .toISOString()
      .slice(0, 10),

  gitUrl: "",

  localPath: "",

  note: ""

})


// ==================================================
// 功能表单
// ==================================================

interface FeatureForm {

  projectId: string

  name: string

  description: string

  priority: "low" | "medium" | "high"

  status: DevelopmentFeatureStatus

}


const featureForm = ref<FeatureForm>({

  projectId: "",

  name: "",

  description: "",

  priority: "medium",

  status: "todo"

})


// ==================================================
// 页面加载
// ==================================================

onMounted(async () => {

  await store.loadDevelopment()

})


// ==================================================
// 新增项目
// ==================================================

function openCreate() {

  editingId.value = null

  form.value = {

    name: "",

    description: "",

    techStack: "",

    status:
      "planning" as DevelopmentProjectStatus,

    startDate:
      new Date()
        .toISOString()
        .slice(0, 10),

    gitUrl: "",

    localPath: "",

    note: ""

  }

  dialogVisible.value = true

}


// ==================================================
// 编辑项目
// ==================================================

function editProject(
  project: DevelopmentProject
) {

  editingId.value = project.id

  form.value = {

    name:
      project.name,

    description:
      project.description,

    techStack:
      project.techStack,

    status:
      project.status,

    startDate:
      project.startDate,

    gitUrl:
      project.gitUrl || "",

    localPath:
      project.localPath || "",

    note:
      project.note || ""

  }

  dialogVisible.value = true

}


// ==================================================
// 保存项目
// ==================================================

async function saveProject() {

  // 项目名称不能为空

  if (!form.value.name.trim()) {

    return

  }


  // ================================================
  // 编辑项目
  // ================================================

  if (editingId.value) {

    const oldProject =
      store.projects.find(
        item =>
          item.id === editingId.value
      )


    if (!oldProject) {

      return

    }


    const project:
      DevelopmentProject = {

      id:
        oldProject.id,

      name:
        form.value.name,

      description:
        form.value.description,

      techStack:
        form.value.techStack,

      status:
        form.value.status,

      startDate:
        form.value.startDate,

      gitUrl:
        form.value.gitUrl || undefined,

      localPath:
        form.value.localPath || undefined,

      note:
        form.value.note || undefined,

      createdAt:
        oldProject.createdAt,

      updatedAt:
        new Date().toISOString()

    }


    await store.updateProject(
      project
    )

  }


  // ================================================
  // 新增项目
  // ================================================

  else {

    const now =
      new Date().toISOString()


    const project:
      DevelopmentProject = {

      id:
        Date.now().toString(),

      name:
        form.value.name,

      description:
        form.value.description,

      techStack:
        form.value.techStack,

      status:
        form.value.status,

      startDate:
        form.value.startDate,

      gitUrl:
        form.value.gitUrl || undefined,

      localPath:
        form.value.localPath || undefined,

      note:
        form.value.note || undefined,

      createdAt:
        now,

      updatedAt:
        now

    }


    await store.createProject(
      project
    )

  }


  // 关闭弹窗

  dialogVisible.value = false

  editingId.value = null

}


// ==================================================
// 删除项目
// ==================================================

async function removeProject(
  id: string
) {

  await store.removeProject(
    id
  )

}


// ==================================================
// 新增功能
// ==================================================

function openFeatureCreate() {

  editingFeatureId.value = null


  featureForm.value = {

    projectId:
      store.projects.length > 0
        ? store.projects[0].id
        : "",

    name: "",

    description: "",

    priority: "medium",

    status: "todo"

  }


  featureDialogVisible.value = true

}


// ==================================================
// 保存功能
// ==================================================

async function saveFeature() {

  // ================================================
  // 1. 必须有项目
  // ================================================

  if (!store.projects.length) {

    return

  }


  // ================================================
  // 2. 功能名称不能为空
  // ================================================

  if (!featureForm.value.name.trim()) {

    return

  }


  // ================================================
  // 3. 创建功能对象
  // ================================================

  const now =
    new Date().toISOString()


  const feature:
    DevelopmentFeature = {

    id:
      Date.now().toString(),

    projectId:
      featureForm.value.projectId,

    name:
      featureForm.value.name,

    description:
      featureForm.value.description,

    priority:
      featureForm.value.priority,

    status:
      featureForm.value.status,

    createdAt:
      now,

    updatedAt:
      now

  }


  // ================================================
  // 4. 保存到 IndexedDB
  // ================================================

  await store.createFeature(
    feature
  )


  // ================================================
  // 5. 关闭弹窗
  // ================================================

  featureDialogVisible.value = false

  editingFeatureId.value = null

}


// ==================================================
// 根据项目 ID 获取项目名称
// ==================================================

function getProjectName(
  projectId: string
) {

  const project =
    store.projects.find(
      item =>
        item.id === projectId
    )


  if (!project) {

    return "未知项目"

  }


  return project.name

}


// ==================================================
// 项目状态文字
// ==================================================

function getStatusText(
  status: DevelopmentProjectStatus
) {

  switch (status) {

    case "planning":

      return "规划中"


    case "developing":

      return "开发中"


    case "completed":

      return "已完成"


    default:

      return status

  }

}


// ==================================================
// 功能优先级文字
// ==================================================

function getPriorityText(
  priority: "low" | "medium" | "high"
) {

  switch (priority) {

    case "low":

      return "低"


    case "medium":

      return "中"


    case "high":

      return "高"


    default:

      return priority

  }

}


// ==================================================
// 功能优先级标签
// ==================================================

function getPriorityTagType(
  priority: "low" | "medium" | "high"
) {

  switch (priority) {

    case "low":

      return "info"


    case "medium":

      return ""


    case "high":

      return "danger"


    default:

      return ""

  }

}


// ==================================================
// 功能状态文字
// ==================================================

function getFeatureStatusText(
  status: "todo" | "doing" | "done"
) {

  switch (status) {

    case "todo":

      return "待处理"


    case "doing":

      return "进行中"


    case "done":

      return "已完成"


    default:

      return status

  }

}


// ==================================================
// 时间格式化
// ==================================================

function formatDate(
  value: string
) {

  if (!value) {

    return "-"

  }


  return value
    .replace("T", " ")
    .slice(0, 16)

}

</script>


<style scoped>

.development {

  padding: 20px;

}


.page-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

}


.page-header h1 {

  margin: 0;

}


.header-actions {

  display: flex;

  gap: 10px;

}


.card-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

}


.section-card {

  margin-top: 20px;

}


.project-list {

  display: flex;

  flex-direction: column;

  gap: 20px;

}


.project-card {

  margin-bottom: 0;

}


.project-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

}


.project-header h2 {

  margin: 0;

}


.description {

  margin-top: 15px;

  color: #666;

}


.project-info {

  display: flex;

  flex-direction: column;

  gap: 5px;

  margin-top: 15px;

  font-size: 13px;

  color: #999;

}


.project-action {

  margin-top: 20px;

  display: flex;

  gap: 10px;

}

</style>