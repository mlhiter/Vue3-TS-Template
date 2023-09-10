<template>
  <div class="flex flex-col items-center">
    <!-- 图标区 -->
    <div class="flex flex-col items-center">
      <icon-clarity-success-standard-line class="h-20 w-20 color-green-400" />
      <div class="mt-4">操作成功</div>
    </div>
    <!-- 时间线部分 -->
    <!-- 时间线组件无法水平显示，故采用步骤条(element-plus组件库也是挺垃圾的) -->
    <div class="bg-gray-100 h-50 w-90% mt-10 rounded-xl">
      <el-row :gutter="20" justify="space-evenly" class="mb-10 mt-5">
        <el-col :span="6" :offset="3">论文编号</el-col>
        <el-col :span="6">创建成员</el-col>
        <el-col :span="6">创建时间</el-col>
      </el-row>
      <el-steps :active="1" align-center>
        <el-step title="提交申请" description="我是提交申请的时间">
          <template #icon>
            <icon-fad-armrecording />
          </template>
        </el-step>
        <el-step title="部门审核" description="等待审批">
          <template #icon><icon-fad-armrecording /></template>
        </el-step>
        <el-step title="主管审批" description="等待审批">
          <template #icon><icon-fad-armrecording /></template>
        </el-step>
        <el-step title="申请成功" description="等待审批">
          <template #icon><icon-fad-armrecording /></template>
        </el-step>
      </el-steps>
    </div>
    <!-- 操作区 -->
    <div class="mt-10 mb-10">
      <el-button type="primary" @click="returnListPage" size="large">
        返回列表
      </el-button>
      <el-button type="primary" @click="gotoPaperInfo" plain size="large">
        查看论文
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function returnListPage() {
  router.push({ name: 'resource-paper-list' })
}
function gotoPaperInfo() {
  router.push({ name: 'resource-paper-info' })
}
</script>

<style scoped>
:deep(.el-step__icon) {
  background-color: #f3f4f6;
}
</style>
