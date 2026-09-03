<template>
  <div class="diet-page">
    <div class="header">
      <h1>饮食计划</h1>
      <el-button type="primary" @click="openCreate">新增饮食记录</el-button>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>今日热量</template>
          <div class="stat-value">{{ todayStats.calories }} <small>kcal</small></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>今日蛋白质</template>
          <div class="stat-value">{{ todayStats.protein }} <small>g</small></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-table :data="sortedDiets" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="meal" label="餐次" width="100">
        <template #default="scope">
          <el-tag>{{ scope.row.meal }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="food" label="食物" />
      <el-table-column prop="calories" label="热量 (kcal)" width="120" />
      <el-table-column prop="protein" label="蛋白质 (g)" width="120" />
      <el-table-column prop="carbs" label="碳水 (g)" width="100" />
      <el-table-column prop="fat" label="脂肪 (g)" width="100" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑饮食记录' : '新增饮食记录'"
      width="500px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="日期">
          <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <el-form-item label="餐次">
          <el-select v-model="form.meal" placeholder="请选择餐次" style="width: 100%">
            <el-option label="早餐" value="早餐" />
            <el-option label="午餐" value="午餐" />
            <el-option label="晚餐" value="晚餐" />
            <el-option label="加餐" value="加餐" />
          </el-select>
        </el-form-item>
        <el-form-item label="食物">
          <el-input v-model="form.food" placeholder="请输入食物名称" />
        </el-form-item>
        <el-form-item label="热量">
          <el-input-number v-model="form.calories" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="蛋白质">
          <el-input-number v-model="form.protein" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="碳水">
          <el-input-number v-model="form.carbs" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="脂肪">
          <el-input-number v-model="form.fat" :min="0" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDietStore } from '@/stores/dietStore'
import { ElMessageBox, ElMessage } from 'element-plus'
import dayjs from 'dayjs'

const dietStore = useDietStore()

const dialogVisible = ref(false)
const editingId = ref<string | null>(null)
const form = ref({
  date: dayjs().format('YYYY-MM-DD'),
  meal: '早餐',
  food: '',
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
})

const sortedDiets = computed(() => {
  return [...dietStore.diets].sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
})

const todayStats = computed(() => {
  const today = dayjs().format('YYYY-MM-DD')
  const todayDiets = dietStore.diets.filter(d => d.date === today)
  return {
    calories: todayDiets.reduce((sum, d) => sum + d.calories, 0),
    protein: todayDiets.reduce((sum, d) => sum + d.protein, 0)
  }
})

onMounted(() => {
  dietStore.loadDiet()
})

function openCreate() {
  editingId.value = null
  form.value = {
    date: dayjs().format('YYYY-MM-DD'),
    meal: '早餐',
    food: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  }
  dialogVisible.value = true
}

function edit(row: any) {
  editingId.value = row.id
  form.value = { ...row }
  dialogVisible.value = true
}

async function save() {
  if (!form.value.food) {
    ElMessage.warning('请输入食物名称')
    return
  }

  if (editingId.value) {
    await dietStore.updateDiet({
      ...form.value,
      id: editingId.value,
      updatedAt: new Date().toISOString()
    } as any)
    ElMessage.success('更新成功')
  } else {
    await dietStore.createDiet({
      ...form.value,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
}

async function remove(id: string) {
  try {
    await ElMessageBox.confirm('确定删除这条记录吗？', '提示', {
      type: 'warning'
    })
    await dietStore.removeDiet(id)
    ElMessage.success('删除成功')
  } catch (error) {
    // 用户取消删除
  }
}
</script>

<style scoped>
.diet-page {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.stat-cards {
  margin-bottom: 20px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}
.stat-value small {
  font-size: 14px;
  color: #909399;
}
</style>
