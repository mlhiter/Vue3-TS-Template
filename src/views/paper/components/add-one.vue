<template>
  <!-- 基础信息表单 -->
  <el-form
    ref="formRef"
    class="w-80% ml-20"
    :model="basicInfoForm"
    :rules="rules"
    size="large"
    label-width="120px">
    <!-- 类别下拉框 -->
    <el-form-item label="类别：" prop="paperType">
      <el-select
        v-model="basicInfoForm.paperType"
        placeholder="选择论文类别"
        clearable
        style="width: 200px">
        <el-option
          v-for="dict in pType"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value" />
      </el-select>
    </el-form-item>

    <!-- 标题框（文本框） -->
    <el-form-item label="标题：" prop="paperTitle">
      <el-input
        v-model="basicInfoForm.paperTitle"
        placeholder="请输入论文标题"
        clearable />
    </el-form-item>

    <!-- 摘要（长文本框） -->
    <el-form-item label="摘要：" prop="paperAbstract">
      <el-input
        v-model="basicInfoForm.paperAbstract"
        type="textarea"
        :rows="4"
        placeholder="请输入论文摘要（最多500字）" />
    </el-form-item>

    <!-- 语言(单选框) -->
    <el-form-item label="语言：" prop="paperLanguage">
      <el-radio-group v-model="basicInfoForm.paperLanguage" class="ml-4">
        <el-radio :label="0" size="large">中文</el-radio>
        <el-radio :label="1" size="large">外文</el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- 期刊名称（文本框） -->
    <el-form-item label="期刊名称：" prop="paperJournalName">
      <el-input
        v-model="basicInfoForm.paperJournalName"
        placeholder="请输入期刊名称"
        clearable />
    </el-form-item>

    <el-row>
      <!-- 卷号 -->
      <el-col :span="10">
        <el-form-item label="卷号：" prop="paperVolumeNum">
          <el-input
            v-model="basicInfoForm.paperVolumeNum"
            placeholder="请输入期刊卷号"
            clearable
            style="width: 200px"
            class="mr-2" />
        </el-form-item>
      </el-col>
      <el-col :span="4"></el-col>
      <!-- 期号 -->
      <el-col :span="10">
        <el-form-item label="期号：" prop="paperIssueNum">
          <el-input
            v-model="basicInfoForm.paperIssueNum"
            placeholder="请输入期刊期号"
            clearable
            style="width: 200px" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 起止页码 -->
    <!-- 不包含则不显示右侧输入框 -->
    <el-form-item label="起止页码：">
      <el-checkbox
        v-model="noPaperPageRange"
        label="本文章不包含起止页码"
        size="large" />
      <el-row v-if="!noPaperPageRange">
        <el-col :span="5" class="ml-3">
          <el-form-item prop="paperStartPage">
            <el-input
              v-model.number="basicInfoForm.paperStartPage"
              placeholder="起页码"
              clearable />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-xl m-2">-</span>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="paperEndPage">
            <el-input
              v-model.number="basicInfoForm.paperEndPage"
              placeholder="止页码"
              clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>

    <!-- 状态框(单选框) -->
    <el-form-item label="状态：" prop="paperStatus">
      <el-radio-group v-model="basicInfoForm.paperStatus" class="m2-4">
        <el-radio label="1" size="large">正式发表</el-radio>
        <el-radio label="2" size="large">在线发表</el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- TODO:论文发表日期不可能都精确到天，需要优化 -->
    <!-- 发表日期(单选框) -->
    <el-form-item label="发表日期：" prop="paperPublishTime">
      <el-date-picker
        v-model="basicInfoForm.paperPublishTime"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="请选择论文发表日期" />
      <span class="ml-2">暂时只支持精确到天</span>
    </el-form-item>

    <!-- 全文链接URL（长文本框） -->
    <el-form-item label="全文链接URL：" prop="paperLinkUrl">
      <el-input
        v-model="basicInfoForm.paperLinkUrl"
        type="textarea"
        :rows="3"
        placeholder="请输入pdf原文的URL" />
    </el-form-item>

    <!-- 论文引用格式（长文本框） -->
    <el-form-item label="论文引用格式：" prop="paperCitationFormat">
      <el-input
        v-model="basicInfoForm.paperCitationFormat"
        type="textarea"
        :rows="3"
        placeholder="请输入论文的引用格式" />
    </el-form-item>
    <!-- 操作框 -->
    <el-form-item class="ml-35% mt-10">
      <el-button type="primary" @click="gotoNextAddPage(formRef)" size="large">
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { addPaperBasicInfo } from '@/api/resource/paper'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const pType = [
  {
    label: '期刊论文',
    value: 0,
  },
  {
    label: '会议论文',
    value: 1,
  },
]
// 检查起页码是否小于止页码
function checkStartPage(rule, value, callback) {
  if (value > basicInfoForm.paperEndPage) {
    callback(new Error('起页码必须小于止页码'))
  } else {
    callback()
  }
}
function checkEndPage(rule, value, callback) {
  if (value < basicInfoForm.paperStartPage) {
    callback(new Error('止页码必须大于起页码'))
  } else {
    callback()
  }
}

const rules = ref({
  paperType: [{ required: true, message: '请选择论文类别', trigger: 'blur' }],
  paperTitle: [{ required: true, message: '请输入论文标题', trigger: 'blur' }],
  paperAbstract: [
    { max: 500, message: '摘要超字数了，最多500字', trigger: 'blur' },
  ],
  paperJournalName: [
    { required: true, message: '请输入期刊名称', trigger: 'blur' },
  ],
  paperVolumeNum: [
    { required: true, message: '请输入期刊卷号', trigger: 'blur' },
  ],
  paperIssueNum: [
    { required: true, message: '请输入期刊期号', trigger: 'blur' },
  ],
  paperStartPage: [
    { type: 'number', message: '页码必须是数字' },
    { validator: checkStartPage, trigger: 'blur' },
  ],
  paperEndPage: [
    { type: 'number', message: '页码必须是数字' },
    { validator: checkEndPage, trigger: 'blur' },
  ],
  paperStatus: [{ required: true, message: '请选择论文状态', trigger: 'blur' }],
  paperPublishTime: [
    { required: true, message: '请选择论文发表日期', trigger: 'blur' },
  ],
  paperCitationFormat: [
    { required: true, message: '请输入论文的引用格式', trigger: 'blur' },
  ],
})
const noPaperPageRange = ref(true)
const basicInfoForm = ref({
  paperType: null,
  paperTitle: '',
  paperAbstract: '', // 可选
  paperLanguage: 0, // 可选
  paperJournalName: '', // 可选
  paperVolumeNum: '',
  paperIssueNum: '',
  paperStartPage: 0, // 可选
  paperEndPage: 0, // 可选
  paperStatus: '',
  paperPublishTime: '',
  paperLinkUrl: '', // 可选
  paperCitationFormat: '',
})

const activeStep = inject('activeStep')
// 进入下一步的时候提交信息
const gotoNextAddPage = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const res = await addPaperBasicInfo(basicInfoForm.value)
        if (res.msg === 'success') {
          // 获取新增论文id
          const { paperId } = res
          localStorage.setItem('paperId', paperId)

          // 进入下一个页面
          activeStep.value = 2
        }
      } catch (err) {
        ElMessage.error(err)
      }
    } else {
      activeStep.value = 2
      ElMessage.error('error submit!', fields)
    }
  })
}
</script>
<style></style>
