import request from '@/utils/request'
interface UserInfo {
  username: string
  password: string
}

export function login(data: UserInfo) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function register(data: UserInfo) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}
