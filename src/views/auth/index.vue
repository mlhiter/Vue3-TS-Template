<template>
  <div class="containDiv">
    <div class="authDiv">
      <div class="title">
        <span>实验室内控系统</span>
      </div>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="登录" name="login">
          <el-form
            ref="loginRef"
            :model="loginForm"
            :rules="loginRules"
            hide-required-asterisk
            label-position="left"
            class="h-350px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="loginButton"
                @click="handleLogin(loginRef)">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <div>
            <el-form
              class="h-350px"
              label-position="left"
              label-width="100px"
              ref="registerRef"
              hide-required-asterisk
              :model="registerForm"
              :rules="registerRules">
              <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="registerForm.nickname" />
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password" type="password">
                <el-input v-model="registerForm.password" />
              </el-form-item>
              <el-form-item label="确认密码" prop="passwordConfirm">
                <el-input v-model="registerForm.passwordConfirm" />
              </el-form-item>
              <el-button type="primary" @click="handleRegister(registerRef)">
                注册
              </el-button>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { login, register } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { pick } from '@/utils/transform'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('login')

const registerRef = ref(null)
const registerForm = ref({
  nickname: '',
  username: '',
  password: '',
  passwordConfirm: '',
})

const registerRules = reactive({
  nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  passwordConfirm: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
  ],
})

const loginRef = ref()
const loginForm = ref({
  username: '',
  password: '',
})

const loginRules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { max: 20, message: '账号长度应小于20', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})

const handleLogin = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const res = await login(loginForm.value)
        const token = res.data
        localStorage.setItem('token', token)

        ElMessage.success('登录成功')
        router.push('/home')
      } catch (error) {
        ElMessage.warning('用户名或密码错误')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleRegister = async (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      if (registerForm.value.password === registerForm.value.passwordConfirm) {
        const registerParams = pick(registerForm.value, [
          'nickname',
          'username',
          'password',
        ])
        try {
          const res = await register(registerParams)
          if (res) {
            activeTab.value = 'login'
          }
          ElMessage.success('注册成功')
        } catch (err) {
          ElMessage.error('注册失败')
        }
      } else {
        ElMessage.warning('两次密码不一致')
      }
    } else {
      console.log('error submit!', fields)
      ElMessage.warning('请正确输入相关信息')
    }
  })
}
</script>

<style scoped>
.containDiv {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: azure;
}

.authDiv {
  background-color: rgb(211, 234, 255);
  height: 60%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  width: 45%;
  font-family: 'SourceHanSansCN-Medium';
  font-size: 35px;
  margin-bottom: 20px;
  text-align: center;
}

.el-form {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
@/utils/data-process
