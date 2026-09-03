<template>

  <div class="development-detail">

    <!-- =========================
         顶部：返回 + 项目名
    ========================== -->

    <div class="page-header">

      <div class="header-left">

        <el-button @click="goBack">
          ← 返回开发工作
        </el-button>

        <h1 v-if="project">
          {{ project.name }}
        </h1>

      </div>

    </div>


    <!-- 项目不存在 -->

    <el-empty
      v-if="!loading && !project"
      description="项目不存在或已被删除"
    >

      <el-button type="primary" @click="goBack">
        返回开发工作
      </el-button>

    </el-empty>


    <template v-if="project">

      <!-- =========================
           项目信息
      ========================== -->

      <el-card class="info-card">

        <template #header>
          <div class="card-header">
            <span>项目信息</span>
            <el-tag :type="getProjectStatusTagType(project.status)">
              {{ getStatusText(project.status) }}
            </el-tag>
          </div>
        </template>


        <el-descriptions :column="2" border>

          <el-descriptions-item label="项目名称">
            {{ project.name }}
          </el-descriptions-item>

          <el-descriptions-item label="开始日期">
            {{ project.startDate || "暂无" }}
          </el-descriptions-item>

          <el-descriptions-item label="技术栈">
            {{ project.techStack || "暂无" }}
          </el-descriptions-item>

          <el-descriptions-item label="项目状态">
            <el-tag :type="getProjectStatusTagType(project.status)">
              {{ getStatusText(project.status) }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Git 地址" :span="2">
            {{ project.gitUrl || "暂无" }}
          </el-descriptions-item>

          <el-descriptions-item label="本地路径" :span="2">
            {{ project.localPath || "暂无" }}
          </el-descriptions-item>

          <el-descriptions-item label="项目描述" :span="2">
            {{ project.description || "暂无描述" }}
          </el-descriptions-item>

          <el-descriptions-item label="备注" :span="2">
            {{ project.note || "暂无" }}
          </el-descriptions-item>

        </el-descriptions>

      </el-card>


      <!-- =========================
           下一步行动
      ========================== -->

      <el-card class="next-action-card">
        <template #header>
          <div class="card-header">
            <span>下一步行动</span>
          </div>
        </template>

        <p v-if="project.nextAction" class="next-action-text">
          {{ project.nextAction }}
        </p>

        <p v-else class="next-action-empty">
          暂无下一步行动，建议在此记录接下来要做的事情（在项目编辑弹窗中设置）
        </p>

      </el-card>


      <!-- =========================
           功能需求列表
      ========================== -->

      <el-card class="section-card">

        <template #header>
          <div class="card-header">
            <span>功能需求（{{ features.length }} 个）</span>
            <el-button type="primary" size="small" @click="openFeatureCreate">
              新增功能
            </el-button>
          </div>
        </template>


        <el-empty v-if="features.length === 0" description="该项目暂无功能需求"/>

        <el-table v-else :data="features" border>
          <el-table-column prop="name" label="功能名称" width="180"/>
          <el-table-column prop="description" label="描述" />
          <el-table-column label="优先级" width="100">
            <template #default="scope">
              <el-tag :type="getPriorityTagType(scope.row.priority)">
                {{ getPriorityText(scope.row.priority) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
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
           Bug 列表
      ========================== -->

      <el-card class="section-card">

        <template #header>
          <div class="card-header">
            <span>Bug 列表（{{ bugs.length }} 个）</span>
            <el-button type="primary" size="small" @click="openBugCreate">
              新增 Bug
            </el-button>
          </div>
        </template>


        <el-empty v-if="bugs.length === 0" description="该项目暂无 Bug"/>

        <el-table v-else :data="bugs" border>
          <el-table-column prop="title" label="Bug 标题" width="180"/>
          <el-table-column prop="description" label="描述" />
          <el-table-column label="优先级" width="100">
            <template #default="scope">
              <el-tag :type="getBugPriorityTagType(scope.row.priority)">
                {{ getBugPriorityText(scope.row.priority) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
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
           开发日志
      ========================== -->

      <el-card class="section-card">

        <template #header>
          <div class="card-header">
            <span>开发日志（{{ logs.length }} 条）</span>
            <el-button type="primary" size="small" @click="openLogCreate">
              新增日志
            </el-button>
          </div>
        </template>


        <el-empty v-if="logs.length === 0" description="暂无开发日志"/>

        <div v-else class="log-list">
          <div v-for="log in logs" :key="log.id" class="log-item">
            <div class="log-header">
              <el-tag :type="getLogTypeTagType(log.type)" size="small">
                {{ getLogTypeText(log.type) }}
              </el-tag>
              <span class="log-time">
                {{ formatDate(log.createdAt) }}
              </span>
              <el-button
                type="danger"
                size="small"
                link
                @click="removeLog(log.id)"
              >
                删除
              </el-button>
            </div>
            <p class="log-content">
              {{ log.content }}
            </p>
          </div>
        </div>

      </el-card>


      <!-- =========================
           新增 / 编辑功能弹窗（默认项目锁定）
      ========================== -->

      <el-dialog v-model="featureDialogVisible" :title="editingFeatureId ? '编辑功能' : '新增功能'" width="500px">
        <el-form label-width="80px">
          <el-form-item label="功能名称">
            <el-input v-model="featureForm.name" placeholder="请输入功能名称"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="featureForm.description" type="textarea" :rows="3" placeholder="请输入功能描述"/>
          </el-form-item>
          <el-form-item label="优先级">
            <el-select v-model="featureForm.priority" style="width: 100%">
              <el-option label="低" value="low"/>
              <el-option label="中" value="medium"/>
              <el-option label="高" value="high"/>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="featureForm.status" style="width: 100%">
              <el-option label="待处理" value="todo"/>
              <el-option label="开发中" value="developing"/>
              <el-option label="测试中" value="testing"/>
              <el-option label="已完成" value="completed"/>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="featureDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFeature">保存</el-button>
        </template>
      </el-dialog>


      <!-- =========================
           新增 / 编辑 Bug 弹窗（默认项目锁定）
      ========================== -->

      <el-dialog v-model="bugDialogVisible" :title="editingBugId ? '编辑 Bug' : '新增 Bug'" width="500px">
        <el-form label-width="80px">
          <el-form-item label="Bug 标题">
            <el-input v-model="bugForm.title" placeholder="请输入 Bug 标题"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="bugForm.description" type="textarea" :rows="3" placeholder="请输入 Bug 描述、复现步骤等"/>
          </el-form-item>
          <el-form-item label="优先级">
            <el-select v-model="bugForm.priority" style="width: 100%">
              <el-option label="低" value="low"/>
              <el-option label="中" value="medium"/>
              <el-option label="高" value="high"/>
              <el-option label="严重" value="critical"/>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="bugForm.status" style="width: 100%">
              <el-option label="未处理" value="open"/>
              <el-option label="处理中" value="processing"/>
              <el-option label="已解决" value="resolved"/>
              <el-option label="已关闭" value="closed"/>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="bugDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveBug">保存</el-button>
        </template>
      </el-dialog>


      <!-- =========================
           新增日志弹窗
      ========================== -->

      <el-dialog v-model="logDialogVisible" title="新增开发日志" width="500px">
        <el-form label-width="80px">
          <el-form-item label="类型">
            <el-select v-model="logForm.type" style="width: 100%">
              <el-option label="日常记录" value="daily"/>
              <el-option label="遇到的问题" value="problem"/>
              <el-option label="解决方案" value="solution"/>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              v-model="logForm.content"
              type="textarea"
              :rows="5"
              placeholder="请输入日志内容..."
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="logDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveLog">保存</el-button>
        </template>
      </el-dialog>


    </template>

  </div>

</template>


<script setup lang="ts">

import { computed, onMounted, ref } from "vue"

import { useRoute, useRouter } from "vue-router"

import {
  ElMessage,
  ElMessageBox
} from "element-plus"

import { useDevelopmentStore } from "@/stores/developmentStore"

import type {
  DevelopmentProject,
  DevelopmentProjectStatus
} from "@/models/DevelopmentProject"

import type {
  DevelopmentFeature,
  DevelopmentFeaturePriority,
  DevelopmentFeatureStatus
} from "@/models/DevelopmentFeature"

import type {
  DevelopmentBug,
  DevelopmentBugPriority,
  DevelopmentBugStatus
} from "@/models/DevelopmentBug"

import type {
  DevelopmentLog,
  DevelopmentLogType
} from "@/models/DevelopmentLog"


const route = useRoute()
const router = useRouter()
const store = useDevelopmentStore()

const projectId = computed(() => String(route.params.id || ""))
const loading = ref(true)


// 当前项目
const project = ref<DevelopmentProject | null>(null)


// 过滤后属于当前项目的列表
const features = computed(
  () => store.features.filter(f => f.projectId === projectId.value)
)
const bugs = computed(
  () => store.bugs.filter(b => b.projectId === projectId.value)
)
const logs = computed(
  () => store.logs
    .filter(l => l.projectId === projectId.value)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
)


// ==================================================
// 功能弹窗
// ==================================================

const featureDialogVisible = ref(false)
const editingFeatureId = ref<string | null>(null)

interface FeatureForm {
  name: string
  description: string
  priority: DevelopmentFeaturePriority
  status: DevelopmentFeatureStatus
}

const featureForm = ref<FeatureForm>({
  name: "",
  description: "",
  priority: "medium",
  status: "todo"
})


// ==================================================
// Bug 弹窗
// ==================================================

const bugDialogVisible = ref(false)
const editingBugId = ref<string | null>(null)

interface BugForm {
  title: string
  description: string
  priority: DevelopmentBugPriority
  status: DevelopmentBugStatus
}

const bugForm = ref<BugForm>({
  title: "",
  description: "",
  priority: "medium",
  status: "open"
})


// ==================================================
// 日志弹窗
// ==================================================

const logDialogVisible = ref(false)

interface LogForm {
  type: DevelopmentLogType
  content: string
}

const logForm = ref<LogForm>({
  type: "daily",
  content: ""
})


// ==================================================
// 加载
// ==================================================

onMounted(async () => {
  await store.loadDevelopment()
  project.value =
    store.projects.find(p => p.id === projectId.value) || null
  loading.value = false
})


function goBack() {
  router.push("/development")
}


// ==================================================
// 功能 CRUD
// ==================================================

function openFeatureCreate() {
  editingFeatureId.value = null
  featureForm.value = {
    name: "",
    description: "",
    priority: "medium",
    status: "todo"
  }
  featureDialogVisible.value = true
}

function editFeature(feature: DevelopmentFeature) {
  editingFeatureId.value = feature.id
  featureForm.value = {
    name: feature.name,
    description: feature.description,
    priority: feature.priority,
    status: feature.status
  }
  featureDialogVisible.value = true
}

async function saveFeature() {
  if (!featureForm.value.name.trim()) {
    ElMessage.error("请输入功能名称")
    return
  }

  if (editingFeatureId.value) {
    const old = features.value.find(x => x.id === editingFeatureId.value)
    if (!old) {
      ElMessage.error("未找到要编辑的功能")
      return
    }
    const updated: DevelopmentFeature = {
      id: old.id,
      projectId: projectId.value,
      name: featureForm.value.name,
      description: featureForm.value.description,
      priority: featureForm.value.priority,
      status: featureForm.value.status,
      createdAt: old.createdAt,
      updatedAt: new Date().toISOString()
    }
    await store.updateFeature(updated)
    ElMessage.success("功能更新成功")
  } else {
    const now = new Date().toISOString()
    const newF: DevelopmentFeature = {
      id: Date.now().toString(),
      projectId: projectId.value,
      name: featureForm.value.name,
      description: featureForm.value.description,
      priority: featureForm.value.priority,
      status: featureForm.value.status,
      createdAt: now,
      updatedAt: now
    }
    await store.createFeature(newF)
    ElMessage.success("功能创建成功")
  }

  featureDialogVisible.value = false
  editingFeatureId.value = null
}

async function removeFeature(id: string) {
  try {
    await ElMessageBox.confirm(
      "确认删除该功能需求？删除后无法恢复。",
      "删除确认",
      { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" }
    )
    await store.removeFeature(id)
    ElMessage.success("功能删除成功")
  } catch {
    // 用户取消
  }
}


// ==================================================
// Bug CRUD
// ==================================================

function openBugCreate() {
  editingBugId.value = null
  bugForm.value = {
    title: "",
    description: "",
    priority: "medium",
    status: "open"
  }
  bugDialogVisible.value = true
}

function editBug(bug: DevelopmentBug) {
  editingBugId.value = bug.id
  bugForm.value = {
    title: bug.title,
    description: bug.description,
    priority: bug.priority,
    status: bug.status
  }
  bugDialogVisible.value = true
}

async function saveBug() {
  if (!bugForm.value.title.trim()) {
    ElMessage.error("请输入 Bug 标题")
    return
  }

  if (editingBugId.value) {
    const old = bugs.value.find(x => x.id === editingBugId.value)
    if (!old) {
      ElMessage.error("未找到要编辑的 Bug")
      return
    }
    const updated: DevelopmentBug = {
      id: old.id,
      projectId: projectId.value,
      title: bugForm.value.title,
      description: bugForm.value.description,
      priority: bugForm.value.priority,
      status: bugForm.value.status,
      createdAt: old.createdAt,
      updatedAt: new Date().toISOString()
    }
    await store.updateBug(updated)
    ElMessage.success("Bug 更新成功")
  } else {
    const now = new Date().toISOString()
    const newB: DevelopmentBug = {
      id: Date.now().toString(),
      projectId: projectId.value,
      title: bugForm.value.title,
      description: bugForm.value.description,
      priority: bugForm.value.priority,
      status: bugForm.value.status,
      createdAt: now,
      updatedAt: now
    }
    await store.createBug(newB)
    ElMessage.success("Bug 创建成功")
  }

  bugDialogVisible.value = false
  editingBugId.value = null
}

async function removeBug(id: string) {
  try {
    await ElMessageBox.confirm(
      "确认删除该 Bug？删除后无法恢复。",
      "删除确认",
      { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" }
    )
    await store.removeBug(id)
    ElMessage.success("Bug 删除成功")
  } catch {
    // 用户取消
  }
}


// ==================================================
// 日志 CRUD
// ==================================================

function openLogCreate() {
  logForm.value = {
    type: "daily",
    content: ""
  }
  logDialogVisible.value = true
}

async function saveLog() {
  if (!logForm.value.content.trim()) {
    ElMessage.error("请输入日志内容")
    return
  }
  const log: DevelopmentLog = {
    id: Date.now().toString(),
    projectId: projectId.value,
    type: logForm.value.type,
    content: logForm.value.content,
    createdAt: new Date().toISOString()
  }
  await store.createLog(log)
  ElMessage.success("日志创建成功")
  logDialogVisible.value = false
}

async function removeLog(id: string) {
  try {
    await ElMessageBox.confirm(
      "确认删除该日志？删除后无法恢复。",
      "删除确认",
      { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" }
    )
    await store.removeLog(id)
    ElMessage.success("日志删除成功")
  } catch {
    // 用户取消
  }
}


// ==================================================
// 状态 / 优先级 辅助函数
// ==================================================

function getStatusText(status: DevelopmentProjectStatus) {
  switch (status) {
    case "planning": return "规划中"
    case "developing": return "开发中"
    case "testing": return "测试中"
    case "completed": return "已完成"
    case "archived": return "已归档"
    default: return status
  }
}

function getProjectStatusTagType(status: DevelopmentProjectStatus) {
  switch (status) {
    case "planning": return "info"
    case "developing": return "primary"
    case "testing": return "warning"
    case "completed": return "success"
    case "archived": return "info"
    default: return ""
  }
}

function getPriorityText(priority: DevelopmentFeaturePriority) {
  switch (priority) {
    case "low": return "低"
    case "medium": return "中"
    case "high": return "高"
    default: return priority
  }
}

function getPriorityTagType(priority: DevelopmentFeaturePriority) {
  switch (priority) {
    case "low": return "info"
    case "medium": return ""
    case "high": return "danger"
    default: return ""
  }
}

function getFeatureStatusText(status: DevelopmentFeatureStatus) {
  switch (status) {
    case "todo": return "待处理"
    case "developing": return "开发中"
    case "testing": return "测试中"
    case "completed": return "已完成"
    default: return status
  }
}

function getFeatureStatusTagType(status: DevelopmentFeatureStatus) {
  switch (status) {
    case "todo": return "info"
    case "developing": return "primary"
    case "testing": return "warning"
    case "completed": return "success"
    default: return ""
  }
}

function getBugPriorityText(priority: DevelopmentBugPriority) {
  switch (priority) {
    case "low": return "低"
    case "medium": return "中"
    case "high": return "高"
    case "critical": return "严重"
    default: return priority
  }
}

function getBugPriorityTagType(priority: DevelopmentBugPriority) {
  switch (priority) {
    case "low": return "info"
    case "medium": return ""
    case "high": return "warning"
    case "critical": return "danger"
    default: return ""
  }
}

function getBugStatusText(status: DevelopmentBugStatus) {
  switch (status) {
    case "open": return "未处理"
    case "processing": return "处理中"
    case "resolved": return "已解决"
    case "closed": return "已关闭"
    default: return status
  }
}

function getBugStatusTagType(status: DevelopmentBugStatus) {
  switch (status) {
    case "open": return "danger"
    case "processing": return "warning"
    case "resolved": return "success"
    case "closed": return "info"
    default: return ""
  }
}

function getLogTypeText(type: DevelopmentLogType) {
  switch (type) {
    case "daily": return "日常记录"
    case "problem": return "遇到的问题"
    case "solution": return "解决方案"
    default: return type
  }
}

function getLogTypeTagType(type: DevelopmentLogType) {
  switch (type) {
    case "daily": return ""
    case "problem": return "danger"
    case "solution": return "success"
    default: return ""
  }
}

function formatDate(value: string) {
  if (!value) return "-"
  return value.replace("T", " ").slice(0, 16)
}

</script>


<style scoped>

.development-detail {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-left h1 {
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-card,
.next-action-card,
.section-card {
  margin-bottom: 20px;
}

.next-action-text {
  font-size: 15px;
  line-height: 1.7;
  color: #303133;
  margin: 0;
  white-space: pre-wrap;
}

.next-action-empty {
  margin: 0;
  color: #909399;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.log-item {
  padding: 16px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: #fafafa;
}

.log-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.log-time {
  font-size: 13px;
  color: #909399;
}

.log-content {
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.7;
  color: #303133;
}

</style>
