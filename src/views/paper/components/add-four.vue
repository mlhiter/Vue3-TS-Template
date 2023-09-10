<template>
  <el-form>
    <el-alert
      title="如果已经完成的指标，正式上线后，项目应该不可见。请按论文表述项目支撑的顺序填写如下表格。"
      type="warning"
      show-icon
      :closable="false"
      class="h-12" />
    <!-- 添加项目按钮 -->
    <el-button
      type="primary"
      plain
      @click="dialogVisible = true"
      class="mt-4 mb-4">
      <icon-material-symbols-add />
      添加
    </el-button>
    <!-- 添加项目对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加项目"
      width="25%"
      center
      :show-close="false">
      <div class="flex justify-center">
        <el-select placeholder="请选择项目" v-model="addProject" clearable>
          <el-option
            v-for="project in projectList"
            :key="project.projectId"
            :label="project.projectName"
            :value="project" />
        </el-select>
      </div>
      <template #footer>
        <div>
          <el-button type="primary" @click="handleAddProject">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 表格区 -->
    <el-table :border="true" :data="projectInfoData" stripe class="w-full">
      <!-- 序号 -->
      <el-table-column label="序号" width="180">
        <template #default="scope">
          <div>
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 项目来源/编号 -->
      <el-table-column label="项目来源/编号">
        <template #default="scope">
          <span v-if="!scope.row.editing" @click="scope.row.editing = true">
            {{ scope.row.projectOrigin }}/{{ scope.row.projectNumber }}
          </span>
          <div v-else>
            <el-input
              v-model="scope.row.projectOrigin"
              size="mini"
              @blur="scope.row.editing = false"></el-input>
            <el-input
              v-model="scope.row.projectNumber"
              size="mini"
              @blur="scope.row.editing = false"></el-input>
          </div>
        </template>
      </el-table-column>
      <!-- 项目名称/起止时间 -->
      <el-table-column label="项目名称/起止时间">
        <template #default="scope">
          <span>{{ scope.row.projectName }}{{ scope.row.projectPeriod }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:上移下移的出现与否没管 -->
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <div>
            <el-button plain :icon="Top" @click="moveUpProject(scope.$index)">
              上移
            </el-button>
            <el-button
              plain
              :icon="Bottom"
              @click="moveDownProject(scope.$index)">
              下移
            </el-button>
            <el-button plain :icon="Delete" @click="delProject(scope.$index)">
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
  </el-form>
</template>

<script setup>
import { Delete, Top, Bottom } from '@element-plus/icons-vue'
import { getProjectList, addPaperProjectSupport } from '@/api/resource/paper'
// 添加作者弹窗部分逻辑
const addProject = ref('')
const dialogVisible = ref(false)
function cancel() {
  dialogVisible.value = false
  addProject.value = ''
}
// 获取作者列表
const projectList = ref([])
onMounted(() => {
  getProjectList().then((res) => {
    projectList.value = res.projectList
  })
})
const paperId = localStorage.getItem('paperId')
function handleAddProject() {
  dialogVisible.value = false
  projectInfoData.value.push(addProject.value)
  addProject.value = ''
}
// 表格部分逻辑
const projectInfo = ref([
  {
    projectId: null,
    projectNumber: '',
    projectOrigin: '',
    projectName: '',
    projectPeriod: '',
  },
])
// 表格数据
const projectInfoData = ref([])

// 上移作者
function moveUpProject(index) {
  if (index > 0) {
    const temp = projectInfoData.value[index]
    projectInfoData.value[index] = projectInfoData.value[index - 1]
    projectInfoData.value[index - 1] = temp
  }
}
// 下移作者
function moveDownProject(index) {
  if (index < projectInfoData.value.length - 1) {
    const temp = projectInfoData.value[index]
    projectInfoData.value[index] = projectInfoData.value[index + 1]
    projectInfoData.value[index + 1] = temp
  }
}
// 删除作者
function delProject(index) {
  projectInfoData.value.splice(index, 1)
}
const activeStep = inject('activeStep')
// 上一步
const gotoPrevAddPage = async () => {
  activeStep.value = 3
}
// 进入下一步的时候提交信息
const gotoNextAddPage = async () => {
  try {
    const projectIds = projectInfoData.value.map((item) => item.projectId)
    console.log(projectIds)
    const res = await addPaperProjectSupport({
      paperId,
      projectIdList: projectIds.value,
    })
    if (res.msg === 'success') {
      // 进入下一个页面
      activeStep.value = 5
    }
  } catch (err) {
    activeStep.value = 5
    ElMessage.error(err)
  }
}
</script>
