import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  timeout: 100000,
  baseURL: 'http://10.245.142.239:88',
})

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `${token}`

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = res.data.msg
    // 二进制数据则直接返回
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data
    }
    // 需要用户身份验证
    if (code === 401) {
      return Promise.reject(new Error(msg))
    }
    // 服务器错误
    if (code === 500) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    }
    if (code !== 200) {
      return Promise.reject(new Error('error'))
    }
    return Promise.resolve(res.data)
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default service
