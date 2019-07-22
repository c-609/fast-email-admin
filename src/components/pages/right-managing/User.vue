<template>
  <div>
    <el-row class="user-table">
      <el-col :span="4">
        <user-dept-tree style="margin-right:20px"></user-dept-tree>
      </el-col>
      <el-col :span="20">
        <add-user :roles="roles" :users="users" style="float:left"></add-user>
        <!-- <add-users style="float:left;margin-right:20px"></add-users> -->
        <!-- <span>批量导入：</span><input type="file" name="file" @change="getFile"  /> -->
        <TableSearch :tableData="users" style="float:left"></TableSearch>
        <i class="el-icon-refresh refresh" @click="refresh"></i>
        <user-table :header="header" :roles="roles"></user-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRoleList } from "./../../../api/right-managing/role.js";
import { getUserList } from "./../../../api/right-managing/user.js";
import UserTable from "./user/UserTable";
import UserDeptTree from "./user/UserDeptTree";
import AddUser from "./user/AddUser";
import AddUsers from "./user/AddUsers";
import TableSearch from "./../../common/TableSearch";
import axios from "axios";
export default {
  name: "User",
  inject: ["reload"],
  components: {
    UserTable,
    AddUser,
    AddUsers,
    TableSearch,
    UserDeptTree,
    file: ""
  },

  data() {
    return {
      users: [],
      roles: [],
      header: [
        //  o:表示单个数值  1：表示多个数值 数组
        { label: "用户ID", prop: "id", type: 0 },
        { label: "账号", prop: "username", type: 0 },
        { label: "姓名", prop: "name", type: 0 },
        { label: "角色", prop: "roleName", type: 0 },
        { label: "部门", prop: "deptName", type: 0 },
        { label: "状态", prop: "status", type: 0 },
        { label: "操作", prop: "operate", width: "200px", fixed: "right" }
      ]
    };
  },

  mounted: function() {
    getUserList().then(res => {
      let data = res.data.data;
      for(var i=0; i<data.length;i++){
        var row = {};

        row.id = data[i].id;
        row.username = data[i].username;
        row.password = data[i].password;
        row.status = data[i].status;
        row.roleName = data[i].roles[0].name;
        row.roleId = data[i].roles[0].id;
        row.deptName = data[i].depts[0].name;
        row.deptId = data[i].depts[0].id;
        if(data[i].student != null){
          row.name = data[i].student.name;
        }
         if(data[i].teacher != null){
          row.name = data[i].teacher.name;
        }
        this.users.push(row);
      }
     
     
    });
    getRoleList().then(data => {
      this.roles = data.data.data;
      this.roles.splice(2,1);
    });
  },

  methods: {
    refresh() {
      this.reload();
    },
    getFile(e) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let file = e.target.files[0]; //获取文件
      let formdata = new FormData();

      formdata.append("upload_file", file);
      console.log(formdata.get("upload_file"));
      axios.post("/poi/excel/upload", formdata, config).then(res => {
        console.log("--------------");
        console.log(res);
      });
    }
  }
};
</script>

<style>
.user-table .refresh {
  font-size: 25px;
  float: right;
  color: #409eff;
}
</style>

