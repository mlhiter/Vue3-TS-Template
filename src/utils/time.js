export default {}
export function getCurrentTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  // 使用模板字符串拼接时间字符串
  const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return currentTime
}
