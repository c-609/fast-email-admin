import request from 'axios'

// 获取所有用户
export function getUserList(){
  return request({
    url: '/manage/user/list/info',
    method: 'get'
  })
}

//添加用户
export function addUser (username,password,status,roleIds,groupIds,deptIds) {
  // const data = {
  //   "username": username,
  //   "password": password,
  //   "status": status,
  //   "roleIds":roleIds,
  //   "groupIds":groupIds,
  //   "deptIds":deptIds
  // }
  return request({
    url: '/manage/user/back',
    method: 'post',
    // params: {data},
    // transformRequest: [function(){
    //   return JSON.stringify(data)
    // }],
    // headers: { 'content-type': 'application/x-www-form-urlencoded' }
    params:{username,password,status,roleIds,groupIds,deptIds}
  })
  // return request({
  //   url: '/upms/user/add',
  //   method: 'post',
  //   params:{username,password,rids}
  // })
}

//增加前台老师
export function addTeacher(name,userId){
  return request({
    url: '/manage/user/reception/teacher',
    method: 'post',
    params: {name,userId}
  })
}

//增加前台学生
export function addStudent(name,userId){
  return request({
    url: '/manage/user/reception/student',
    method: 'post',
    params: {name,userId}
  })
}
//删除用户
export function deleteUser(userId){
  return request({
    url: '/manage/user',
    method: 'delete',
    params: {userId}
  })
}

export function updateUser(userId, roleId,deptId){
    // const data = {
    //   "id": id,
    //   "username": username,
    //   "password": password,
    //   "status": status,
    // }
    return request({
      url: '/manage/user/dept',
      method: 'post',
      params: {userId,roleId,deptId},
      // transformRequest: [function(){
      //   return JSON.stringify(data)
      // }],
      // headers: {
      //   'Content-Type' : 'application/json;'
      // }
    })
}

// 根据用户id 获取用户拥有的权限
export function getUserMenuTree (uid) {
  return request ({
    url: '/upms/user/menuTree',
    method: 'post',
    params: {uid}
  })
}

//根据部门id获取用户列表
export function getListByDeptId (deptIds) {
  return request ({
    url: '/manage/user/dept',
    method: 'get',
    params: {deptIds}
  })
}


