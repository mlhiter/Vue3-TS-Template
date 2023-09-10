<template>
  <div>
    <el-card class="m-20px">
      <!-- 上 -->
      <template #header>
        <div class="w-full flex justify-between items-center">
          <span class="boldText">新增已发表论文</span>
          <span>
            <span class="text-red-600">*</span>
            为必填项
          </span>
        </div>
      </template>

      <!-- 步骤条 -->
      <el-steps
        :active="activeStep"
        align-center
        class="mb-10"
        v-if="activeStep !== 6">
        <el-step title="基本信息" description="请填写论文基本信息" />
        <el-step title="作者信息" description="请填作者及通讯作者信息" />
        <el-step title="论文文件" description="请上传论文文件" />
        <el-step title="项目支持" description="请填写项目支持" />
        <el-step title="收录" description="请填写收录情况" />
        <el-step title="提交成功" description="论文信息提交成功" />
      </el-steps>

      <!-- 表单区 -->
      <AddOne v-if="activeStep === 1"></AddOne>
      <AddTwo v-if="activeStep === 2"></AddTwo>
      <AddThree v-if="activeStep === 3"></AddThree>
      <AddFour v-if="activeStep === 4"></AddFour>
      <AddFive v-if="activeStep === 5"></AddFive>
      <AddSix v-if="activeStep === 6"></AddSix>
    </el-card>
  </div>
</template>

<script setup>
import AddOne from './components/add-one.vue'
import AddTwo from './components/add-two.vue'
import AddThree from './components/add-three.vue'
import AddFour from './components/add-four.vue'
import AddFive from './components/add-five.vue'
import AddSix from './components/add-six.vue'

const activeStep = ref(1)
provide('activeStep', activeStep)
</script>

<style scoped>
.boldText {
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #73767a;
}
</style>
