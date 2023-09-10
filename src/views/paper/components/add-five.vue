<template>
  <div>
    <!-- 提示信息 -->
    <el-alert
      title="如果已经完成的指标，正式上线后，项目应该不可见。请按论文表述项目支撑的顺序填写如下表格。"
      type="warning"
      show-icon
      :closable="false"
      class="h-12" />

    <!-- 文件列表 -->
    <el-table :border="true" :data="fileInfoData" stripe class="w-full mt-4">
      <!-- 序号 -->
      <el-table-column label="序号" prop="id"></el-table-column>

      <!-- 检索类型 -->
      <el-table-column label="检索类型" prop="retrievalType"></el-table-column>

      <!-- Wos/Accession number -->
      <el-table-column label="Wos/Accession number">
        <template #default="scope">
          <span v-if="!scope.row.editing" @click="scope.row.editing = true">
            {{ scope.row.wos }}/{{ scope.row.accessNumber }}
          </span>
          <div v-else>
            <el-input
              v-model="scope.row.wos"
              size="mini"
              @blur="scope.row.editing = false"></el-input>
            <el-input
              v-model="scope.row.accessNumber"
              size="mini"
              @blur="scope.row.editing = false"></el-input>
          </div>
        </template>
      </el-table-column>
      <!-- 检索报告链接 -->
      <el-table-column
        label="检索报告链接"
        prop="retrievalUrl"></el-table-column>

      <!-- 更新日期 -->
      <el-table-column label="更新日期" prop="updateTime"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <div class="flex flex-row justify-center items-center">
            <el-upload
              :action="addFileUrl"
              name="paperFile"
              :show-file-list="false"
              :on-success="handleUploadSuccess">
              <el-button class="mr-3" :icon="Upload">上传</el-button>
            </el-upload>
            <!-- <el-button @click="handleDownload(scope.$index)" :icon="Download">
              下载
            </el-button> -->
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
        提交
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { Delete, Upload, Download } from '@element-plus/icons-vue'
import { getCurrentTime } from '@/utils/time'

const addFileUrl = ref(
  'http://127.0.0.1:4523/m1/2827859-0-default/api/resource/paper/add/file/1'
)
const fileInfoData = ref([
  {
    id: 1,
    retrievalType: 'EI',
    wos: '',
    accessNumber: '',
    retrievalUrl: '',
    updateTime: '',
  },
  {
    id: 2,
    retrievalType: 'SCI',
    wos: '',
    accessNumber: '',
    retrievalUrl: '',
    updateTime: '',
  },
])
// 上传成功则替换文件名和更新日期
function handleUploadSuccess(response, uploadFile) {
  if (response.code === 200) {
    const updateTime = getCurrentTime()
    const fileName = uploadFile.name
  }
}
const activeStep = inject('activeStep')
// 上一步
const gotoPrevAddPage = async () => {
  activeStep.value = 4
}
// 进入下一步的时候提交信息
const gotoNextAddPage = async () => {
  activeStep.value = 6
}
</script>

<style scoped></style>
