<template>
  <div class="media-page">
    <div class="header">
      <h1>自媒体管理</h1>
      <el-button type="primary" @click="openCreate">新增内容选题</el-button>
    </div>

    <!-- 筛选 -->
    <div class="filter-bar">
      <el-radio-group v-model="statusFilter" size="small">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="idea">灵感</el-radio-button>
        <el-radio-button label="preparing">准备中</el-radio-button>
        <el-radio-button label="creating">制作中</el-radio-button>
        <el-radio-button label="pending_publish">待发布</el-radio-button>
        <el-radio-button label="published">已发布</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 内容列表 -->
    <el-row :gutter="20" class="media-list">
      <el-col :span="8" v-for="item in filteredMedias" :key="item.id">
        <el-card class="media-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="title">{{ item.title }}</span>
              <el-tag :type="getStatusTag(item.status)">{{ getStatusText(item.status) }}</el-tag>
            </div>
          </template>
          
          <div class="card-body">
            <p><strong>平台：</strong><el-tag size="small" effect="plain">{{ item.platform }}</el-tag></p>
            <p><strong>形式：</strong>{{ item.contentType }}</p>
            <p v-if="item.publishDate"><strong>发布日期：</strong>{{ item.publishDate }}</p>
            
            <div class="stats" v-if="item.status === 'published'">
              <span>👁️ {{ item.views || 0 }}</span>
              <span>❤️ {{ item.likes || 0 }}</span>
              <span>💬 {{ item.comments || 0 }}</span>
            </div>
          </div>

          <div class="card-footer">
            <el-button size="small" type="primary" link @click="edit(item)">编辑</el-button>
            <el-button size="small" type="success" link @click="openData(item)" v-if="item.status === 'published'">记录数据</el-button>
            <el-button size="small" type="danger" link @click="remove(item.id)">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑内容选题' : '新增内容选题'"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入内容标题" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台">
              <el-select v-model="form.platform" placeholder="请选择平台" style="width: 100%">
                <el-option label="Bilibili" value="Bilibili" />
                <el-option label="Youtube" value="Youtube" />
                <el-option label="抖音" value="抖音" />
                <el-option label="小红书" value="小红书" />
                <el-option label="公众号" value="公众号" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容形式">
              <el-select v-model="form.contentType" placeholder="请选择形式" style="width: 100%">
                <el-option label="图文" value="图文" />
                <el-option label="视频" value="视频" />
                <el-option label="音频" value="音频" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="制作状态">
          <el-select v-model="form.status" style="width: 100%">
            <el-option label="灵感 (Idea)" value="idea" />
            <el-option label="准备中 (Preparing)" value="preparing" />
            <el-option label="制作中 (Creating)" value="creating" />
            <el-option label="待发布 (Pending)" value="pending_publish" />
            <el-option label="已发布 (Published)" value="published" />
          </el-select>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker v-model="form.publishDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <el-form-item label="文案/大纲">
          <el-input v-model="form.content" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="素材位置">
          <el-input v-model="form.materialPath" placeholder="本地文件夹路径或云盘链接" />
        </el-form-item>
        <el-form-item label="发布链接">
          <el-input v-model="form.url" placeholder="已发布的视频或文章链接" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>

    <!-- 数据记录弹窗 -->
    <el-dialog v-model="dataDialogVisible" title="记录发布数据" width="400px">
      <el-form :model="dataForm" label-width="80px">
        <el-form-item label="播放/阅读">
          <el-input-number v-model="dataForm.views" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="点赞数">
          <el-input-number v-model="dataForm.likes" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="评论数">
          <el-input-number v-model="dataForm.comments" :min="0" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dataDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData">保存数据</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMediaStore } from '@/stores/mediaStore'
import { ElMessageBox, ElMessage } from 'element-plus'

const mediaStore = useMediaStore()

const statusFilter = ref('all')
const dialogVisible = ref(false)
const dataDialogVisible = ref(false)
const editingId = ref<string | null>(null)

const form = ref({
  title: '',
  platform: 'Bilibili',
  contentType: '视频',
  status: 'idea',
  publishDate: '',
  content: '',
  materialPath: '',
  url: ''
})

const dataForm = ref({
  views: 0,
  likes: 0,
  comments: 0
})

const filteredMedias = computed(() => {
  if (statusFilter.value === 'all') return mediaStore.medias
  return mediaStore.medias.filter(m => m.status === statusFilter.value)
})

onMounted(() => {
  mediaStore.loadMedias()
})

function getStatusTag(status: string) {
  const map: Record<string, string> = {
    idea: 'info',
    preparing: 'warning',
    creating: 'primary',
    pending_publish: 'danger',
    published: 'success'
  }
  return map[status] || 'info'
}

function getStatusText(status: string) {
  const map: Record<string, string> = {
    idea: '灵感',
    preparing: '准备中',
    creating: '制作中',
    pending_publish: '待发布',
    published: '已发布'
  }
  return map[status] || status
}

function openCreate() {
  editingId.value = null
  form.value = {
    title: '',
    platform: 'Bilibili',
    contentType: '视频',
    status: 'idea',
    publishDate: '',
    content: '',
    materialPath: '',
    url: ''
  }
  dialogVisible.value = true
}

function edit(item: any) {
  editingId.value = item.id
  form.value = { ...item }
  dialogVisible.value = true
}

async function save() {
  if (!form.value.title) {
    ElMessage.warning('请输入标题')
    return
  }

  if (editingId.value) {
    await mediaStore.updateMedia({
      ...form.value,
      id: editingId.value,
      updatedAt: new Date().toISOString()
    } as any)
    ElMessage.success('更新成功')
  } else {
    await mediaStore.createMedia({
      ...form.value,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
}

function openData(item: any) {
  editingId.value = item.id
  dataForm.value = {
    views: item.views || 0,
    likes: item.likes || 0,
    comments: item.comments || 0
  }
  dataDialogVisible.value = true
}

async function saveData() {
  const item = mediaStore.medias.find(m => m.id === editingId.value)
  if (item) {
    await mediaStore.updateMedia({
      ...item,
      ...dataForm.value,
      updatedAt: new Date().toISOString()
    })
    ElMessage.success('数据记录成功')
  }
  dataDialogVisible.value = false
}

async function remove(id: string) {
  try {
    await ElMessageBox.confirm('确定删除这个选题吗？', '提示', {
      type: 'warning'
    })
    await mediaStore.removeMedia(id)
    ElMessage.success('删除成功')
  } catch (error) {}
}
</script>

<style scoped>
.media-page {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.filter-bar {
  margin-bottom: 20px;
}
.media-list {
  margin-top: 10px;
}
.media-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-weight: bold;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}
.card-body p {
  margin: 8px 0;
  font-size: 14px;
  color: #606266;
}
.stats {
  margin-top: 12px;
  display: flex;
  gap: 15px;
  color: #909399;
  font-size: 13px;
}
.card-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: flex-end;
}
</style>
