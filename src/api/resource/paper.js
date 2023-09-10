import request from '@/utils/request'

// 获取论文列表
export function getPaperList(params) {
  return request({
    url: '/api/resource/paper/list',
    method: 'get',
    params,
  })
}

// 普通查询
export function normalQuery(params, data) {
  return request({
    url: '/api/resource/paper/search',
    method: 'post',
    params,
    data,
  })
}

// 高级筛选
export function advancedQuery(params, data) {
  return request({
    url: '/api/resource/paper/advanced-search',
    method: 'post',
    params,
    data,
  })
}

// 删除论文
export function delPaper(params) {
  return request({
    url: '/api/resource/paper/delete/1',
    method: 'delete',
    params,
  })
}

// 新增部分
// 新增论文基本信息
export function addPaperBasicInfo(data) {
  return request({
    url: '/api/resource/paper/add/basic',
    method: 'post',
    data,
  })
}
// 获取论文作者列表
export function getAuthorList(params) {
  return request({
    url: '/api/resource/paper/add/list/author',
    method: 'get',
    params,
  })
}
// 新增论文作者信息
export function addPaperAuthorInfo(data) {
  return request({
    url: '/api/resource/paper/add/author',
    method: 'post',
    data,
  })
}
// 上传论文文件（点击下一步时调用）
export function uploadPaperFile(data) {
  return request({
    url: '/api/resource/paper/add/file',
    method: 'post',
    data,
  })
}
// 获取论文项目列表
export function getProjectList(params) {
  return request({
    url: '/api/resource/paper/add/list/project',
    method: 'get',
    params,
  })
}
// 新增论文项目支持
export function addPaperProjectSupport(data) {
  return request({
    url: '/api/resource/paper/add/project',
    method: 'post',
    data,
  })
}
// 新增论文收录情况
export function addPaperCollectionInfo(data) {
  return request({
    url: '/api/resource/paper/add/index',
    method: 'post',
    data,
  })
}
