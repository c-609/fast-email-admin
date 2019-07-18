import request from 'axios'

//获取部门树
export function getDeptTree() {
  return request({
    url: '/manage/dept/tree',
    method: 'get',
  })
}

//根据部门id获取部门信息
//通过id查询信息
export function getDeptInfo(id) {
  return request({
    // url: '/upms/dept/'+id,
    url: '/manage/dept/' + id,
    method: 'get',
  })
}

//添加部门
export function addDept(name, parentId, sort) {
  const data = {
    "name": name,
    "parentId": parentId
  }
  return request({
    // url: '/upms/dept/dept_add',
    url: '/manage/dept',
    method: 'post',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/json;'
    }
  })
}

//删除部门
export function deleteDept(id) {
  return request({
    // url: '/upms/dept/dept_delete',
    url: '/manage/dept/' + id,
    method: 'delete',
    params: {
      id
    }
  })
}

//编辑部门
export function updateDept(id, name, parentId) {
  const data = {
    "id": id,
    "name": name,
    "parentId": parentId
  }
  return request({
    // url: '/upms/dept/dept_update',
    url: '/manage/dept/update',
    method: 'post',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/json;'
    }
  })
}
