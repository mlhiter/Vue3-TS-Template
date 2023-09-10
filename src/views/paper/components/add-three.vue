<template>
  <div>
    <!-- 提示信息 -->
    <el-alert
      title="请按照列表中的要求上传论文相关的pdf格式的附件，如果传错，可点击上传更新，或者删除后重传。"
      type="warning"
      show-icon
      :closable="false"
      class="h-12" />

    <!-- 文件列表 -->
    <el-table :border="true" :data="fileInfoData" stripe class="w-full mt-4">
      <!-- 序号 -->
      <el-table-column label="序号" prop="id"></el-table-column>

      <!-- 文件要求 -->
      <el-table-column
        label="文件要求"
        prop="fileDescription"></el-table-column>

      <!-- 文件名称 -->
      <el-table-column label="文件名称" prop="fileName"></el-table-column>

      <!-- 更新日期 -->
      <el-table-column label="更新日期" prop="updateTime"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <div class="flex flex-row justify-center items-center">
            <!-- <el-upload
              :action="addFileUrl"
              name="paperFile"
              :limit="1"
              :on-success="handleUploadSuccess(scope.$index)">
              
            </el-upload> -->
            <el-button class="mr-3" :icon="Upload">上传</el-button>
            <el-button @click="handleDownload(scope.$index)" :icon="Download">
              下载
            </el-button>
            <el-button @click="handleDel(scope.$index)" :icon="Delete">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 操作区 -->
    <div class="ml-42% mt-10">
      <el-button type="primary" plain @click="gotoPrevAddPage" size="large">
        上一步
      </el-button>
      <el-button type="primary" @click="gotoNextAddPage" size="large">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { Delete, Upload, Download } from '@element-plus/icons-vue'
import { getCurrentTime } from '@/utils/time'

const paperId = localStorage.getItem('paperId')
const addFileUrl = ref(
  `http://10.245.142.239:88/api/resource/paper/add/file/${paperId}`
)

const fileInfoData = ref([
  {
    id: 1,
    fileDescription: '论文全文pdf文件',
    fileName: '',
    updateTime: '',
  },
  {
    id: 2,
    fileDescription: '论文首页pdf文件',
    fileName: '',
    updateTime: '',
  },
  {
    id: 3,
    fileDescription: '论文挂项目那页的pdf文件',
    fileName: '',
    updateTime: '',
  },
])
// 上传成功则替换文件名和更新日期
function handleUploadSuccess(response, uploadFile, uploadFiles, index) {
  // const updateTime = getCurrentTime()
  // const fileName = uploadFile.name
  // fileInfoData.value[index].fileName = fileName
  // fileInfoData.value[index].updateTime = updateTime
  // console.log("这是上传文件返回的信息"+response);
  if (response) {
    ElMessage({
      message: '文件上传成功',
      type: 'success',
    })
    this.load()
  }
}
const activeStep = inject('activeStep')
// 上一步
const gotoPrevAddPage = async () => {
  activeStep.value = 2
}
// 进入下一步的时候提交信息
const gotoNextAddPage = async () => {
  activeStep.value = 4
}
</script>

<style scoped></style>
