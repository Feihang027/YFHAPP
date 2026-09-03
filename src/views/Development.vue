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

        <el-button @click="handleExport">
          导出 JSON
        </el-button>

        <el-button @click="triggerImportInput">
          导入 JSON
        </el-button>

        <el-button type="primary" @click="openCreate">
          新增项目
        </el-button>

        <el-button type="primary" @click="openFeatureCreate">
          新增功能
        </el-button>

        <el-button type="primary" @click="openBugCreate">
          新增 Bug
        </el-button>

      </div>

      <input
        ref="importInputRef"
        type="file"
        accept="application/json"
        style="display:none"
        @change="handleImportFile"
      />

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

            <el-tag :type="getProjectStatusTagType(project.status)">
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


          <!-- 下一步行动 -->

          <p v-if="project.nextAction">

            <strong>
              下一步行动：
            </strong>

            {{ project.nextAction }}

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

            <el-button type="primary" size="small" @click="goDetail(project.id)">
              查看详情
            </el-button>

            <el-button type="primary" size="small" @click="editProject(project)">
              编辑
            </el-button>


            <el-button type="danger" size="small" @click="removeProject(project.id)">
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

            <el-tag :type="getFeatureStatusTagType(scope.row.status)">
              {{ getFeatureStatusText(scope.row.status) }}
            </el-tag>

          </template>

        </el-table-column>

        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editFeature(scope.row)">
              编辑
            </el-button>
            
            <el-button type="danger" size="small" @click="removeFeature(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-card>


    <!-- =========================
         Bug 管理
    ========================== -->

    <el-card class="section-card">

      <template #header>

        <div class="card-header">

          <span>
            Bug 管理
          </span>

          <span>
            共 {{ store.bugs.length }} 个
          </span>

        </div>

      </template>


      <!-- 没有 Bug -->

      <el-empty v-if="store.bugs.length === 0" description="暂无 Bug 记录"/>


      <!-- 有 Bug -->

      <el-table v-else :data="store.bugs" border>

        <el-table-column prop="title" label="Bug 标题"/>


        <el-table-column prop="description" label="描述" />


        <el-table-column label="所属项目">

          <template #default="scope">

            {{ getProjectName(scope.row.projectId) }}

          </template>

        </el-table-column>


        <el-table-column label="优先级">

          <template #default="scope">

            <el-tag :type="getBugPriorityTagType(scope.row.priority)">
              {{ getBugPriorityText(scope.row.priority) }}
            </el-tag>

          </template>

        </el-table-column>


        <el-table-column label="状态">
          <template #default="scope">

            <el-tag :type="getBugStatusTagType(scope.row.status)">
              {{ getBugStatusText(scope.row.status) }}
            </el-tag>

          </template>

        </el-table-column>

        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editBug(scope.row)">
              编辑
            </el-button>
            
            <el-button type="danger" size="small" @click="removeBug(scope.row.id)">
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

          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入项目描述"/>

        </el-form-item>


        <!-- 技术栈 -->

        <el-form-item label="技术栈">

          <el-input v-model="form.techStack" placeholder="例如：Vue3、TypeScript、IndexedDB"/>

        </el-form-item>


        <!-- 项目状态 -->

        <el-form-item label="项目状态">

          <el-select v-model="form.status" placeholder="请选择项目状态" style="width: 100%">

            <el-option label="规划中" value="planning"/>

            <el-option label="开发中" value="developing" />

            <el-option label="测试中" value="testing" />

            <el-option label="已完成" value="completed"/>

            <el-option label="已归档" value="archived"/>

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


        <!-- 下一步行动 -->

        <el-form-item label="下一步行动">

          <el-input
            v-model="form.nextAction"
            type="textarea"
            :rows="3"
            placeholder="例如：完成登录模块、修复首页加载慢等"
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
         新增 / 编辑功能弹窗
    ========================== -->

    <el-dialog v-model="featureDialogVisible" :title="editingFeatureId ? '编辑功能' : '新增功能'" width="500px">
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
            <el-option label="开发中" value="developing"/>
            <el-option label="测试中" value="testing"/>
            <el-option label="已完成" value="completed"/>
          </el-select>
        
        </el-form-item>

      </el-form>


      <!-- 功能弹窗底部 -->

      <template #footer>

        <el-button @click="featureDialogVisible = false">
          取消
        </el-button>


        <el-button type="primary" @click="saveFeature">
          保存
        </el-button>

      </template>

    </el-dialog>


    <!-- =========================
         新增 / 编辑 Bug 弹窗
    ========================== -->

    <el-dialog v-model="bugDialogVisible" :title="editingBugId ? '编辑 Bug' : '新增 Bug'" width="500px">
      <el-form label-width="80px">
        <!-- 所属项目 -->
        <el-form-item label="所属项目">
          <el-select v-model="bugForm.projectId" style="width: 100%" placeholder="请选择所属项目">

            <el-option v-for="project in store.projects"
              :key="project.id"
              :label="project.name"
              :value="project.id"
            />

          </el-select>

        </el-form-item>


        <!-- Bug 标题 -->

        <el-form-item label="Bug 标题">
          <el-input v-model="bugForm.title" placeholder="请输入 Bug 标题"/>
        </el-form-item>


        <!-- 描述 -->

        <el-form-item label="描述">

          <el-input v-model="bugForm.description" type="textarea"
            :rows="3"
            placeholder="请输入 Bug 描述、复现步骤等"
          />

        </el-form-item>


        <!-- 优先级 -->

        <el-form-item label="优先级">

          <el-select v-model="bugForm.priority" style="width: 100%">

            <el-option label="低" value="low" />

            <el-option label="中" value="medium" />

            <el-option label="高" value="high"/>

            <el-option label="严重" value="critical"/>

          </el-select>

        </el-form-item>


        <!-- 状态 -->

        <el-form-item label="状态">
          <el-select v-model="bugForm.status" style="width: 100%">
            <el-option label="未处理" value="open"/>
            <el-option label="处理中" value="processing"/>
            <el-option label="已解决" value="resolved"/>
            <el-option label="已关闭" value="closed"/>
          </el-select>
        
        </el-form-item>

      </el-form>


      <!-- Bug 弹窗底部 -->

      <template #footer>

        <el-button @click="bugDialogVisible = false">
          取消
        </el-button>


        <el-button type="primary" @click="saveBug">
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


import { useRouter } from "vue-router"


import {
  ElMessage,
  ElMessageBox
} from "element-plus"


import {
  useDevelopmentStore
} from "@/stores/developmentStore"

import type {
  DevelopmentExportData
} from "@/services/developmentService"


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
  DevelopmentFeatureStatus,
  DevelopmentFeaturePriority
} from "@/models/DevelopmentFeature"


import type {
  DevelopmentBug
} from "@/models/DevelopmentBug"


import type {
  DevelopmentBugStatus,
  DevelopmentBugPriority
} from "@/models/DevelopmentBug"


const store = useDevelopmentStore()
const router = useRouter()
const importInputRef = ref<HTMLInputElement | null>(null)


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
// Bug 弹窗
// ==================================================

const bugDialogVisible = ref(false)

const editingBugId = ref<string | null>(null)


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

  nextAction: string

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

  note: "",

  nextAction: ""

})


// ==================================================
// 功能表单
// ==================================================

interface FeatureForm {

  projectId: string

  name: string

  description: string

  priority: DevelopmentFeaturePriority

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
// Bug 表单
// ==================================================

interface BugForm {

  projectId: string

  title: string

  description: string

  priority: DevelopmentBugPriority

  status: DevelopmentBugStatus

}


const bugForm = ref<BugForm>({

  projectId: "",

  title: "",

  description: "",

  priority: "medium",

  status: "open"

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

    note: "",

    nextAction: ""

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
      project.note || "",

    nextAction:
      project.nextAction || ""

  }

  dialogVisible.value = true

}


// ==================================================
// 保存项目
// ==================================================

async function saveProject() {

  // 项目名称不能为空

  if (!form.value.name.trim()) {

    ElMessage.error("请输入项目名称")

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

      ElMessage.error("未找到要编辑的项目")

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

      nextAction:
        form.value.nextAction || undefined,

      createdAt:
        oldProject.createdAt,

      updatedAt:
        new Date().toISOString()

    }


    await store.updateProject(
      project
    )

    ElMessage.success("项目更新成功")

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

      nextAction:
        form.value.nextAction || undefined,

      createdAt:
        now,

      updatedAt:
        now

    }


    await store.createProject(
      project
    )

    ElMessage.success("项目创建成功")

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

  try {

    await ElMessageBox.confirm(
      "确认删除该开发项目？删除后无法恢复。",
      "删除确认",
      {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }
    )

    await store.removeProject(
      id
    )

    ElMessage.success("项目删除成功")

  } catch {
    // 用户取消
  }

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
// 编辑功能
// ==================================================

function editFeature(
  feature: DevelopmentFeature
) {

  editingFeatureId.value = feature.id

  featureForm.value = {

    projectId: feature.projectId,

    name: feature.name,

    description: feature.description,

    priority: feature.priority,

    status: feature.status

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

    ElMessage.error("请先创建开发项目")

    return

  }


  // ================================================
  // 2. 必须选择项目
  // ================================================

  if (!featureForm.value.projectId) {

    ElMessage.error("请选择所属项目")

    return

  }


  // ================================================
  // 3. 功能名称不能为空
  // ================================================

  if (!featureForm.value.name.trim()) {

    ElMessage.error("请输入功能名称")

    return

  }


  // ================================================
  // 4. 编辑功能
  // ================================================

  if (editingFeatureId.value) {

    const oldFeature =
      store.features.find(
        item =>
          item.id === editingFeatureId.value
      )


    if (!oldFeature) {

      ElMessage.error("未找到要编辑的功能")

      return

    }


    const feature:
      DevelopmentFeature = {

      id:
        oldFeature.id,

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
        oldFeature.createdAt,

      updatedAt:
        new Date().toISOString()

    }


    await store.updateFeature(
      feature
    )

    ElMessage.success("功能更新成功")

  }


  // ================================================
  // 5. 新增功能
  // ================================================

  else {

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
    // 保存到 IndexedDB
    // ================================================

    await store.createFeature(
      feature
    )

    ElMessage.success("功能创建成功")

  }


  // ================================================
  // 关闭弹窗
  // ================================================

  featureDialogVisible.value = false

  editingFeatureId.value = null

}


// ==================================================
// 删除功能
// ==================================================

async function removeFeature(
  id: string
) {

  try {

    await ElMessageBox.confirm(
      "确认删除该功能需求？删除后无法恢复。",
      "删除确认",
      {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }
    )

    await store.removeFeature(
      id
    )

    ElMessage.success("功能删除成功")

  } catch {
    // 用户取消
  }

}


// ==================================================
// 新增 Bug
// ==================================================

function openBugCreate() {

  editingBugId.value = null


  bugForm.value = {

    projectId:
      store.projects.length > 0
        ? store.projects[0].id
        : "",

    title: "",

    description: "",

    priority: "medium",

    status: "open"

  }


  bugDialogVisible.value = true

}


// ==================================================
// 编辑 Bug
// ==================================================

function editBug(
  bug: DevelopmentBug
) {

  editingBugId.value = bug.id

  bugForm.value = {

    projectId: bug.projectId,

    title: bug.title,

    description: bug.description,

    priority: bug.priority,

    status: bug.status

  }

  bugDialogVisible.value = true

}


// ==================================================
// 保存 Bug
// ==================================================

async function saveBug() {

  // 1. 必须有项目

  if (!store.projects.length) {

    ElMessage.error("请先创建开发项目")

    return

  }


  // 2. 必须选择项目

  if (!bugForm.value.projectId) {

    ElMessage.error("请选择所属项目")

    return

  }


  // 3. Bug 标题不能为空

  if (!bugForm.value.title.trim()) {

    ElMessage.error("请输入 Bug 标题")

    return

  }


  // ================================================
  // 编辑 Bug
  // ================================================

  if (editingBugId.value) {

    const oldBug =
      store.bugs.find(
        item =>
          item.id === editingBugId.value
      )


    if (!oldBug) {

      ElMessage.error("未找到要编辑的 Bug")

      return

    }


    const bug:
      DevelopmentBug = {

      id:
        oldBug.id,

      projectId:
        bugForm.value.projectId,

      title:
        bugForm.value.title,

      description:
        bugForm.value.description,

      priority:
        bugForm.value.priority,

      status:
        bugForm.value.status,

      createdAt:
        oldBug.createdAt,

      updatedAt:
        new Date().toISOString()

    }


    await store.updateBug(
      bug
    )

    ElMessage.success("Bug 更新成功")

  }


  // ================================================
  // 新增 Bug
  // ================================================

  else {

    const now =
      new Date().toISOString()


    const bug:
      DevelopmentBug = {

      id:
        Date.now().toString(),

      projectId:
        bugForm.value.projectId,

      title:
        bugForm.value.title,

      description:
        bugForm.value.description,

      priority:
        bugForm.value.priority,

      status:
        bugForm.value.status,

      createdAt:
        now,

      updatedAt:
        now

    }


    await store.createBug(
      bug
    )

    ElMessage.success("Bug 创建成功")

  }


  // 关闭弹窗

  bugDialogVisible.value = false

  editingBugId.value = null

}


// ==================================================
// 删除 Bug
// ==================================================

async function removeBug(
  id: string
) {

  try {

    await ElMessageBox.confirm(
      "确认删除该 Bug？删除后无法恢复。",
      "删除确认",
      {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }
    )

    await store.removeBug(
      id
    )

    ElMessage.success("Bug 删除成功")

  } catch {
    // 用户取消
  }

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


    case "testing":

      return "测试中"


    case "completed":

      return "已完成"


    case "archived":

      return "已归档"


    default:

      return status

  }

}


// ==================================================
// 项目状态标签颜色
// ==================================================

function getProjectStatusTagType(
  status: DevelopmentProjectStatus
) {

  switch (status) {

    case "planning":

      return "info"


    case "developing":

      return "primary"


    case "testing":

      return "warning"


    case "completed":

      return "success"


    case "archived":

      return "info"


    default:

      return ""

  }

}


// ==================================================
// 功能优先级文字
// ==================================================

function getPriorityText(
  priority: DevelopmentFeaturePriority
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
  priority: DevelopmentFeaturePriority
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
  status: DevelopmentFeatureStatus
) {

  switch (status) {

    case "todo":

      return "待处理"


    case "developing":

      return "开发中"


    case "testing":

      return "测试中"


    case "completed":

      return "已完成"


    default:

      return status

  }

}


// ==================================================
// 功能状态标签颜色
// ==================================================

function getFeatureStatusTagType(
  status: DevelopmentFeatureStatus
) {

  switch (status) {

    case "todo":

      return "info"


    case "developing":

      return "primary"


    case "testing":

      return "warning"


    case "completed":

      return "success"


    default:

      return ""

  }

}


// ==================================================
// Bug 优先级文字
// ==================================================

function getBugPriorityText(
  priority: DevelopmentBugPriority
) {

  switch (priority) {

    case "low":

      return "低"


    case "medium":

      return "中"


    case "high":

      return "高"


    case "critical":

      return "严重"


    default:

      return priority

  }

}


// ==================================================
// Bug 优先级标签颜色
// ==================================================

function getBugPriorityTagType(
  priority: DevelopmentBugPriority
) {

  switch (priority) {

    case "low":

      return "info"


    case "medium":

      return ""


    case "high":

      return "warning"


    case "critical":

      return "danger"


    default:

      return ""

  }

}


// ==================================================
// Bug 状态文字
// ==================================================

function getBugStatusText(
  status: DevelopmentBugStatus
) {

  switch (status) {

    case "open":

      return "未处理"


    case "processing":

      return "处理中"


    case "resolved":

      return "已解决"


    case "closed":

      return "已关闭"


    default:

      return status

  }

}


// ==================================================
// Bug 状态标签颜色
// ==================================================

function getBugStatusTagType(
  status: DevelopmentBugStatus
) {

  switch (status) {

    case "open":

      return "danger"


    case "processing":

      return "warning"


    case "resolved":

      return "success"


    case "closed":

      return "info"


    default:

      return ""

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


// ==================================================
// 跳转详情页
// ==================================================

function goDetail(projectId: string) {
  router.push(`/development/${projectId}`)
}


// ==================================================
// 导出 JSON
// ==================================================

function handleExport() {
  const data = store.exportData()
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  const date = new Date().toISOString().slice(0, 10)
  a.download = `yfhapp-development-${date}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success("导出成功")
}


// ==================================================
// 导入 JSON（触发文件选择）
// ==================================================

function triggerImportInput() {
  if (!importInputRef.value) return
  importInputRef.value.value = ""
  importInputRef.value.click()
}


// ==================================================
// 导入 JSON（文件处理）
// ==================================================

async function handleImportFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    const text = await file.text()
    let json: any
    try {
      json = JSON.parse(text)
    } catch {
      ElMessage.error("文件不是合法的 JSON 格式")
      return
    }

    if (!json || json.version !== 1) {
      ElMessage.error("文件版本不支持，请使用 version=1 的导出文件")
      return
    }

    if (
      !Array.isArray(json.projects) ||
      !Array.isArray(json.features) ||
      !Array.isArray(json.bugs) ||
      !Array.isArray(json.logs)
    ) {
      ElMessage.error("导入文件结构不正确")
      return
    }

    await ElMessageBox.confirm(
      `导入后将覆盖当前所有开发数据（${json.projects.length} 个项目、${json.features.length} 个功能、${json.bugs.length} 个 Bug、${json.logs.length} 条日志），确定继续？`,
      "导入确认",
      {
        confirmButtonText: "覆盖导入",
        cancelButtonText: "取消",
        type: "warning"
      }
    )

    await store.importData(json as DevelopmentExportData)
    ElMessage.success("导入成功")

  } catch (err) {
    if (err === "cancel" || (err as any)?.action === "cancel") {
      return
    }
    console.error(err)
    ElMessage.error("导入失败")
  }
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
