<template>
  <div>
    <!-- 提示信息 -->
    <el-alert
      title="请按照成果中的作者顺序填写人员信息！每个作者一条记录，请勿将多个作者放到同一记录中。论文的申报工作由第一作者完成。管理员可以批量添加论文情况"
      type="warning"
      show-icon
      :closable="false"
      class="h-12" />
    <!-- 添加按钮 -->
    <el-button plain @click="dialogVisible = true" class="mt-4 mb-4">
      <icon-material-symbols-add />
      添加
    </el-button>

    <!-- 添加作者对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加作者"
      width="25%"
      center
      :show-close="false">
      <div class="flex justify-center">
        <el-select placeholder="请选择作者" v-model="addAuthor" clearable>
          <el-option
            v-for="author in authorList"
            :key="author.userId"
            :label="author.authorName"
            :value="author" />
        </el-select>
      </div>
      <template #footer>
        <div>
          <el-button type="primary" @click="handleAddAuthor">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 表格区 -->
    <el-table :border="true" :data="authorInfoData" stripe class="w-full">
      <!-- 序号 -->
      <el-table-column label="序号" width="180">
        <template #default="scope">
          <div>
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 文章中作者的英文 -->
      <el-table-column label="文章中作者的英文" prop="authorEnglishName">
        <template #default="scope">
          <span v-if="!scope.row.editing" @click="scope.row.editing = true">
            {{ scope.row.authorEnglishName }}
          </span>
          <el-input
            v-else
            v-model="scope.row.authorEnglishName"
            size="mini"
            @blur="scope.row.editing = false"></el-input>
        </template>
      </el-table-column>
      <!-- 对应中文名字 -->
      <el-table-column label="对应中文名字" prop="authorName">
        <template #default="scope">
          <span v-if="!scope.row.editing" @click="scope.row.editing = true">
            {{ scope.row.authorName }}
          </span>
          <el-input
            v-else
            v-model="scope.row.authorName"
            size="mini"
            @blur="scope.row.editing = false"></el-input>
        </template>
      </el-table-column>
      <!-- 是否是通讯作者 -->
      <el-table-column label="是否是通讯作者" prop="isCorrespondingAuthor">
        <template #default="scope">
          <div>
            <el-checkbox
              v-model="scope.row.isCorrespondingAuthor"
              :true-label="1"
              :false-label="0"
              size="large" />
          </div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:上移下移的出现与否没管 -->
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <div>
            <el-button plain :icon="Top" @click="moveUpAuthor(scope.$index)">
              上移
            </el-button>
            <el-button
              plain
              :icon="Bottom"
              @click="moveDownAuthor(scope.$index)">
              下移
            </el-button>
            <el-button plain :icon="Delete" @click="delAuthor(scope.$index)">
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
import { Delete, Top, Bottom } from '@element-plus/icons-vue'
import { addPaperAuthorInfo, getAuthorList } from '@/api/resource/paper'
import { pick } from '@/utils/transform'
// 获取论文id
const paperId = localStorage.getItem('paperId')
// 添加作者弹窗部分逻辑
const addAuthor = ref('')
const dialogVisible = ref(false)
function cancel() {
  dialogVisible.value = false
  addAuthor.value = ''
}
// 获取作者列表
const authorList = ref([])
onMounted(() => {
  getAuthorList().then((res) => {
    authorList.value = res.data.list
  })
})
function handleAddAuthor() {
  dialogVisible.value = false
  const tempAuthor = pick(addAuthor.value, [
    'authorName',
    'authorEnglishName',
    'isCorrespondingAuthor',
    'userId',
  ])
  authorInfoData.value.push({ ...tempAuthor, paperId })
  addAuthor.value = ''
}
// 表格部分逻辑
const authorInfo = ref([
  {
    authorName: '',
    authorEnglishName: '',
    isCorrespondingAuthor: 0, // 是否是通讯作者: 0. 否 1. 是
    paperId,
    userId: null,
  },
])
// 表格数据
const authorInfoData = ref([])

// 上移作者
function moveUpAuthor(index) {
  if (index > 0) {
    const temp = authorInfoData.value[index]
    authorInfoData.value[index] = authorInfoData.value[index - 1]
    authorInfoData.value[index - 1] = temp
  }
}
// 下移作者
function moveDownAuthor(index) {
  if (index < authorInfoData.value.length - 1) {
    const temp = authorInfoData.value[index]
    authorInfoData.value[index] = authorInfoData.value[index + 1]
    authorInfoData.value[index + 1] = temp
  }
}
// 删除作者
function delAuthor(index) {
  authorInfoData.value.splice(index, 1)
}
const activeStep = inject('activeStep')
// 上一步
const gotoPrevAddPage = async () => {
  activeStep.value = 1
}
// 进入下一步的时候提交信息
const gotoNextAddPage = async () => {
  try {
    const res = await addPaperAuthorInfo(authorInfoData.value)
    if (res.msg === 'success') {
      // 进入下一个页面
      activeStep.value = 3
    }
  } catch (err) {
    ElMessage.error(err)
  }
}
</script>
