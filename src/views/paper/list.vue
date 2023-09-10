<template>
  <el-card class="m-20px">
    <!-- 上 -->
    <template #header>
      <span class="boldText">论文管理</span>
    </template>
    <!-- 中 -->
    <el-form :model="queryData" ref="queryRef" :inline="true" size="large">
      <!-- 作者框（下拉选择输入框，目前为输入框） -->
      <el-form-item prop="author">
        <el-input
          v-model="queryData.author"
          placeholder="选择作者"
          clearable
          style="width: 200px"
          maxlength="500"
          @keyup.enter="handleQuery" />
      </el-form-item>
      <!-- 论文题目框 -->
      <el-form-item prop="title">
        <el-input
          v-model="queryData.title"
          placeholder="论文题目"
          clearable
          style="width: 200px"
          maxlength="500"
          @keyup.enter="handleQuery" />
      </el-form-item>
      <!-- 检索类别框(下拉选择框） -->
      <el-form-item prop="type">
        <el-select
          clearable
          placeholder="期刊/会议"
          v-model="queryData.type"
          style="height: 40px">
          <el-option label="期刊" value="0" style="height: 40px"></el-option>
          <el-option label="会议" value="1" style="height: 40px"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期选择框 -->
      <el-form-item prop="date">
        <el-date-picker
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 300px"
          v-model="queryData.date"></el-date-picker>
      </el-form-item>
      <!-- 查询按钮、重置按钮、高级筛选 -->
      <el-form-item>
        <el-button type="primary" @click="handleQuery">
          <icon-material-symbols-search />
          查询
        </el-button>
        <el-button @click="resetQuery(queryRef)">
          <icon-carbon-reset />
          重置
        </el-button>
        <el-button @click="filterDrawer = true">
          <icon-material-symbols-filter-alt-outline />
          高级筛选
        </el-button>
      </el-form-item>
      <!-- <el-form-item prop="type">
              <el-select v-model="queryParams.type" placeholder="检索类别" clearable style="width: 200px">
                <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
              </el-select>
          </el-form-item> -->
    </el-form>
    <!--高级筛选抽屉组件-->
    <el-drawer v-model="filterDrawer" size="40%">
      <template #header>
        <span class="boldText">高级筛选</span>
      </template>
      <el-form
        size="large"
        :model="advancedQueryData"
        ref="advancedQueryRef"
        label-width="auto"
        scroll-to-error>
        <!--论文标题-->
        <el-form-item label="论文标题" prop="paperTitle">
          <el-input
            placeholder="请输入待查的论文标题"
            clearable
            v-model="advancedQueryData.paperTitle"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <!--论文类别下拉框-->
            <el-form-item label="论文类别" prop="paperType">
              <el-select
                placeholder="期刊/会议"
                clearable
                v-model="advancedQueryData.paperType"
                class="filterBox">
                <el-option label="期刊" value="0"></el-option>
                <el-option label="会议" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--论文语言下拉框-->
          <el-col :span="12">
            <el-form-item label="语言" prop="paperLanguage">
              <el-select
                placeholder="中文/英文"
                clearable
                v-model="advancedQueryData.paperLanguage"
                class="filterBox">
                <el-option label="中文" value="0"></el-option>
                <el-option label="英文" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="paperStatus">
              <el-select
                class="filterBox"
                clearable
                placeholder="正式发表/在线发表"
                v-model="advancedQueryData.paperStatus">
                <el-option label="正式发表" value="0"></el-option>
                <el-option label="在线发表" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收录" prop="paperIndexing">
              <el-checkbox-group v-model="advancedQueryData.paperIndexing">
                <el-checkbox label="SCI"></el-checkbox>
                <el-checkbox label="EI"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!--选择项目支持下拉框-->
        <el-form-item label="项目支持" prop="projectId">
          <el-select
            clearable
            placeholder="论文提及的支撑项目"
            style="width: 100%"
            v-model="advancedQueryData.projectId">
            <el-option
              label="2018YFB2004201国家重点研发计划“制造基础技术与关键部件”重点专项"
              value="0"></el-option>
            <el-option
              label="2018YFB2004201国家重点研发计划“制造基础技术与关键部件”重点专项"
              value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <!--作者姓名输入框-->
          <el-col :span="12">
            <el-form-item label="作者" prop="authorName">
              <el-input
                placeholder="请输入作者的姓名"
                clearable
                v-model="advancedQueryData.authorName"
                class="filterBox"></el-input>
            </el-form-item>
          </el-col>
          <!--期刊名称输入框-->
          <el-col :span="12">
            <el-form-item label="期刊名称" prop="paperJournalName" class="ml-2">
              <el-input
                placeholder="请输入期刊名称"
                clearable
                v-model="advancedQueryData.paperJournalName"
                class="filterBox"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="发表时间" prop="publicationTime">
              <el-date-picker
                type="daterange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                v-model="advancedQueryData.publicationTime"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-button type="primary" @click="handleAdvancedQuery">
            <icon-material-symbols-search />
            查询
          </el-button>
          <el-button @click="resetAdvancedQuery(advancedQueryRef)">
            <icon-carbon-reset />
            重置
          </el-button>
        </el-row>
      </el-form>
    </el-drawer>

    <!-- 操作栏 -->
    <el-row :gutter="10" mb="20px">
      <!-- 新增已发表论文按钮 -->
      <el-col :span="1.5">
        <el-button type="primary" plain @click="goToAddPage()">
          <icon-material-symbols-add-circle-outline-rounded />
          新增已发表论文
        </el-button>
      </el-col>

      <!-- 导入数据按钮(具体内容未更改) -->
      <el-col :span="1.5">
        <el-button type="success" plain>
          <icon-uil-import />
          导入数据
        </el-button>
      </el-col>

      <!-- 导出数据按钮 -->
      <el-col :span="1.5">
        <el-button type="warning" plain>
          <icon-uil-export />
          导出数据
        </el-button>
      </el-col>
      <!-- <right-toolbar v-model:showSearch="showSearch"></right-toolbar> -->
      <!--@queryTable="getList"-->
    </el-row>

    <!--论文列表方案2-->
    <el-card shadow="never">
      <div v-for="(item, index) in renderData" :key="index">
        <el-row>
          <el-col :span="1" class="paperId">
            <span>
              {{
                (pagination.currentPage - 1) * pagination.pageSize + index + 1
              }}
            </span>
          </el-col>
          <el-col :span="23">
            <span class="boldText">{{ item.paperTitle }}</span>
          </el-col>
          <!--paperName -> paperTitle -->
        </el-row>
        <el-row>
          <el-col :offset="1" :span="19">
            <span class="normalText">
              {{ normalAuthorConcat(item.authorList) }}
            </span>
            <span class="normalText" style="font-weight: bold">
              {{ correspondingAuthorConcat(item.authorList) }}
            </span>
          </el-col>
          <el-col :span="1">
            <span class="normalText" v-if="item.paperIndexing[0]">EI</span>
          </el-col>
          <!--index -> paperIndexing-->
          <el-col :span="1">
            <span class="normalText" v-if="item.paperIndexing[1]">SCI</span>
          </el-col>
          <el-col :span="2">
            <span class="normalText">{{ journalLanguage(item) }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1">
            <span class="normalText">{{ journalConcat(item) }}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="1" :span="23">
            <span class="lightText" v-if="item.paperAbstract">
              {{ abstractHide(item) }}
            </span>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="2" class="buttonStyle">
            <el-button>
              <icon-eva-file-text-outline />
              详情
            </el-button>
          </el-col>
          <el-col :span="2" class="buttonStyle">
            <el-button @click="handleDelete(item.paperId, item.paperTitle)">
              <icon-eva-trash-2-outline />
              删除
            </el-button>
          </el-col>
        </el-row>
        <el-divider />
      </div>
      <el-row justify="center">
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next, jumper"
          v-model:current-page="pagination.currentPage"
          @current-change="handleCurrentChange"
          :page-count="totalPage" />
      </el-row>
    </el-card>
  </el-card>
</template>

<script setup>
import {
  getPaperList,
  normalQuery,
  advancedQuery,
  delPaper,
} from '@/api/resource/paper'
import { useRouter } from 'vue-router'

const router = useRouter()
const flag = ref('normal') // 用于记录上一次是什么类型的查询
const indexedFlag = ref([]) // 用于记录上一次indexed的情况,因为advancedQueryData里的indexed需要被置空
const filterDrawer = ref(false)
const renderData = ref([])
const totalPage = ref(0)

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})

function getList() {
  getPaperList(pagination.value).then((response) => {
    renderData.value = response.data.list
    totalPage.value = response.data.total
  })
}

onMounted(() => {
  getList()
})

function getNormalList() {
  normalQuery(pagination.value, queryData.value).then((response) => {
    totalPage.value = response.data.total
    renderData.value = response.data.list
  })
}

function getAdvancedList() {
  advancedQueryData.value.paperIndexing = indexedFlag.value

  advancedQuery(pagination.value, advancedQueryData.value).then((response) => {
    totalPage.value = response.data.total
    renderData.value = response.data.list

    advancedQueryData.value.paperIndexing = [] // indexed数组置空，否则下一次获取的数据会追加在后面
  })
}
// 跳转新增
function goToAddPage() {
  router.push({
    name: 'resource-paper-add',
  })
}
// 普通作者信息字符串拼接函数
function normalAuthorConcat(authorList) {
  const authorStr = authorList.reduce(
    (accumulator, currentAuthor, currentIndex) => {
      // 最后一个不要有逗号
      if (currentIndex === authorList.length - 1) {
        accumulator = `${accumulator + currentAuthor.authorName} `
      }
      if (!currentAuthor.isCorrespondingAuthor) {
        accumulator = `${accumulator + currentAuthor.authorName}, `
      }
      return accumulator
    },
    ''
  )
  return authorStr
}
// 通讯作者信息拼接函数
function correspondingAuthorConcat(authorList) {
  const authorStr = authorList.reduce(
    (accumulator, currentAuthor, currentIndex) => {
      // 最后一个不要有逗号
      if (currentIndex === authorList.length - 1) {
        accumulator = `${accumulator + currentAuthor.authorName}* `
      }
      if (currentAuthor.isCorrespondingAuthor) {
        accumulator = `${accumulator + currentAuthor.authorName}*, `
      }
      return accumulator
    },
    ''
  )
  return authorStr
}

// 期刊信息的字符串拼接函数
// journalTitle -> paperJournalName  volumeNumber -> paperVolumeNum          issueNumber -> paperIssueNum
function journalConcat(item) {
  return `${item.paperJournalName} ,卷${item.paperVolumeNum} ,页${item.paperStartPage}-${item.paperEndPage} ,${item.paperIssueNum}`
}

// 显示中文期刊/英文期刊
function journalLanguage(item) {
  if (item.paperLanguage === 0) {
    return '中文期刊'
  }
  return '英文期刊'
}
// 论文摘要长度超出...隐藏
function abstractHide(item) {
  if (item.paperAbstract.length > 300) {
    return `${item.paperAbstract.slice(0, 300)}...`
  }
  return item.paperAbstract
}
// 当前页发生变化
function handleCurrentChange() {
  // 判断上一次查询是普通查询还是高级筛选，然后调用相应的函数
  if (flag.value === 'normal') {
    getNormalList()
  } else {
    getAdvancedList()
  }
}

/// ///////////////////////////普通查询接口/////////////////////////////////////////////
// 获取输入框中的值->调用接口函数->currentPage置1
const queryData = ref({
  author: '',
  title: '',
  type: null,
  date: ['', ''],
})
// 普通查询
function handleQuery() {
  flag.value = 'normal' // 记录本次查询是什么查询，方便切换页数时判断调用哪个方法
  pagination.value.currentPage = 1 // currentPage置1
  getNormalList()
}

// 重置按钮操作
const queryRef = ref(null)
function resetQuery(formEl) {
  formEl.resetFields()
}

/// ///////////////////////////高级筛选//////////////////////////////////////////////////
// 1.设置各栏的值，设置返回对象，绑定
// 2.写接口
// 3.绑定点击调用函数，当前页置1
const advancedQueryData = ref({
  paperTitle: '',
  paperType: null,
  paperLanguage: null,
  paperStatus: null,
  paperIndexing: [], // false表示未勾选，但不一定是未收录
  projectId: '',
  authorName: '',
  paperJournalName: '',
  publicationTime: ['', ''],
})

function handleAdvancedQuery() {
  flag.value = 'advanced'
  // 对是否收录SCI和EI的记录数组进行处理
  if (advancedQueryData.value.paperIndexing.toString() === 'SCI,EI') {
    advancedQueryData.value.paperIndexing = [true, true]
  } else if (advancedQueryData.value.paperIndexing.toString() === 'SCI') {
    advancedQueryData.value.paperIndexing = [true, false]
  } else if (advancedQueryData.value.paperIndexing.toString() === 'EI') {
    advancedQueryData.value.paperIndexing = [false, true]
  } else {
    advancedQueryData.value.paperIndexing = [false, false]
  }
  indexedFlag.value = advancedQueryData.value.paperIndexing // 点查询后更新indexedFlag中的值
  pagination.value.currentPage = 1 // currentPage置1
  getAdvancedList()
}
const advancedQueryRef = ref(null)
function resetAdvancedQuery(formEl) {
  formEl.resetFields()
}

/// ///////////////////////////////////删除论文/////////////////////////////////////////////////
// 1.点击删除调用删除函数
// 2.获取论文的id传给后端，并在前端刷新数据
function handleDelete(id, paperName) {
  const query = { id }
  ElMessageBox.confirm('确认删除该论文吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delPaper(query).then((response) => {})
    // 判断上一次查询是普通查询 还是高级筛选，然后调用相应的函数
    if (flag.value === 'normal') {
      getNormalList()
    } else {
      getAdvancedList()
    }
  })
}
</script>

<style scoped>
.paperId {
  line-height: 50px;
}

.boldText {
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #73767a;
}

.lightText {
  line-height: 25px;
  color: #a8abb2;
}

.normalText {
  line-height: 40px;
  color: #73767a;
}

.buttonStyle {
  margin-top: 20px;
}

.filterBox {
  width: 100%;
}
</style>
