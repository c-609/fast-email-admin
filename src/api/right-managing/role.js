import request from 'axios'

//获取所有角色
export function getRoleList() {
  return request({
    url: '/manage/role/list',
    method: 'get',
  })
}

// export function getRightTree() {
//   return request({
//     // url: '/config/allmenuTree',
//     url: '/manage/menu/tree',
//     method: 'get'
//   })
// }

// 添加角色
export function addRole(name, alias) {
  return request({
    // url: '/upms/role/add',
    url: '/manage/role',
    method: 'get',
    params: {
      name,
      alias

    }
  })
}

//更新角色
export function updateRole(id, alias, name) {
  return request({
    // url: '/upms/role/update',
    url: '/manage/role/update',
    method: 'post',
    params: {
      id,

      alias,
      name,
    }
  })
}

//为角色的部门授权
export function updateRoleDept(rid, deptIds) {
  return request({
    url: '/upms/role/deptAuthForRole',
    method: 'post',
    params: {
      rid,
      deptIds
    }
  })
}

// 根据id删除角色
export function deleteRole(rid) {
  return request({
    // url: '/upms/role/delete',
    url: '/manage/role/' + roleId,
    method: 'post',
    params: {
      rid
    }
  })
}

//更新角色权限
export function updateRoleRight(rid, mids) {
  return request({
    url: '/upms/role/auth',
    method: 'post',
    params: {
      rid,
      mids
    }
  })
}

export function getRoleRight(rid) {
  return request({
    url: '/config/menuIdByRid',
    method: 'post',
    params: {
      rid
    }
  })
}

export function getRole() {
  return request({
    url: '/upms/role/',
    method: 'get',
  })
}

//根据角色id获取部门列表
export function getRoleDept(roleId) {
  return request({
    url: '/config/findDeptsByRoleid',
    method: 'get',
    params: {
      roleId
    }
  })
}
