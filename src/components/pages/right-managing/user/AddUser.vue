<template>
  <div style="margin-right:20px">
    <el-button type="primary" @click="userFormVisible = true" icon="el-icon-edit" size="mini">添加用户</el-button>

    <el-dialog title="添加用户" :visible.sync="userFormVisible" @close="closeDialog">
      <el-form
        :model="userForm"
        status-icon
        :rules="rules2"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
       <el-form-item label="姓名" prop="username">
          <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="account">
          <el-input type="text" v-model="userForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord1">
          <el-input type="password" v-model="userForm.passWord1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passWord2">
          <el-input type="password" v-model="userForm.passWord2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <base-tree-select
            :data="deptData"
            :defaultProps="deptProps"
            multiple
            checkStrictly
            :nodeKey="id"
            :checkedKeys="userForm.defaultCheckedKeys"
            @popoverHide="popoverHide"
          ></base-tree-select>
        </el-form-item>
        <el-form-item label="角色标识" prop="roles">
          <!-- <el-checkbox v-for="(item,index) in roles" :key="index" v-model="item.name" >{{item.nameZh}}</el-checkbox> -->
          <el-checkbox-group v-model="checkIds">
            <el-checkbox v-for="(item,index) in roles" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="102"
            active-text="有效"
            inactive-text="锁定"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <el-dialog :visible.sync="deptTreeVisible"  @close="closedeptTree">
      <el-tree 
        node-key="id"
        highlight-current
        :data="deptData" 
        :props="deptProps" 
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :render-content="renderContent"
        default-expand-all
        >  
      </el-tree>
    </el-dialog>-->
  </div>
</template>

<script>
import { getDeptTree } from "./../../../../api/right-managing/dept.js";
import { addUser,addTeacher,addStudent } from "../../../../api/right-managing/user.js";
import BaseTreeSelect from "./UserDeptTree/../../../../common/BaseTreeSelect";
export default {
  components: { BaseTreeSelect },
  props: {
    roles: {
      type: Array
    },
    users: {
      type: Array
    }
  },
  inject: ["reload"],
  created: function() {
    getDeptTree().then(res => {
      this.deptData = res.data.data;
    });
  },
  data() {
    
     var validateUserName = (rule, value, callback) => {
       var i = 0;
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
       
        if (i >= this.users.length) {
          this.$refs.userForm.validateField("account");
        }
        callback();
      }
    };
    var validateAcount = (rule, value, callback) => {
      var i = 0;
      if (value === "") {
        callback(new Error("账户不能为空"));
      } else {
        for (i = 0; i < this.users.length; i++) {
          if (this.userForm.account === this.users[i].username) {
            callback(new Error("账户已存在"));
            break;
          }
        }
        if (i >= this.users.length) {
          this.$refs.userForm.validateField("passWord1");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      var i = 0;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
       
        if (i >= this.users.length) {
          this.$refs.userForm.validateField("checkPass");
        } 
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      var i = 0;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.passWord1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // var validateDept = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择部门'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      checkIds: [],
      deptTreeVisible: false,
      userFormVisible: false,
      formLabelWidth: "120px",
      userForm: {
        username:"",
        account: "",
        passWord1: "",
        passWord2: "",
        dept: "",
        admin: "",
        superuser: "",
        user: "",
        status: 0,
        deptIds: [],
        defaultCheckedKeys: []
      },
      deptData: "",
      deptProps: {
        label: "name",
        children: "children"
      },
      rules2: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        account: [{ validator: validateAcount, trigger: "blur" }],
        passWord2: [{ validator: validatePass2, trigger: "blur" }],
        passWord1: [{ validator: validatePass, trigger: "blur" }]
        // dept: [
        //   { validator: validateDept, trigger: 'blur' }
        // ]
      }
    };
  },
  methods: {
    closedeptTree() {
      this.deptTreeVisible = false;
    },
    handleNodeClick(data) {
      this.userForm.dept = data.name;
      this.deptTreeVisible = false;
    },
    closeDialog() {
      this.resetForm("userForm");
    },
    popoverHide(checkedIds, checkedData) {
      // console.log(checkedIds);
      // console.log(checkedData);
      this.userForm.deptIds = checkedIds;
    },
    submitForm(formName) {
      // console.log(this.userForm.deptIds);
      // console.log(this.userForm.username);
      // console.log(this.userForm.account);
      // console.log(this.userForm.passWord1);
      // console.log(this.checkIds)
      this.$refs[formName].validate(valid => {
        if (valid) {
          var roles = [];
          roles = this.checkIds.join(",");
          var  deptIds = this.userForm.deptIds.join(",");
          addUser(
            this.userForm.account,
            this.userForm.passWord1,
            this.userForm.status,
            roles,
            roles,
           deptIds
          ).then(res => {
            console.log( this.userForm.account+"----"+this.userForm.passWord1+"-----"+ this.userForm.status+"----"+ roles+"----"+ this.userForm.deptIds)
            console.log(roles)
            if(res.data.code ==0){
              console.log(res.data.data)
              if(roles== 1){
                addStudent(this.userForm.username,res.data.data).then(res1=>{
                     if (res1 && res1.data.code == 0) {
                        this.$message({
                          type: "success",
                          message: "添加用户成功"
                        });
                      } else {
                        this.$message.error("添加失败");
                      }
                })
              }
              if(roles == 2){
               addTeacher(this.userForm.username,res.data.data).then(res2=>{
                  if (res1 && res2.data.code == 0) {
                        this.reload();
                        this.$message({
                          type: "success",
                          message: "添加用户成功"
                        });
                      } else {
                        this.$message.error("添加失败");
                      }
                })
              }
              // if(this.)
              // 
              // if (res && res.data.data != 0) {
              //   this.$message({
              //     type: "success",
              //     message: "添加用户成功"
              //   });
              // } else {
              //   this.$message.error("添加失败");
              // }
            }
          });
          this.userFormVisible = false;
          this.userForm.defaultCheckedKeys = [];
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.userForm.account = ""; //清空数据
      this.userForm.passWord1 = "";
      this.userForm.passWord2 = "";
      this.userForm.dept = "";
      this.userForm.defaultCheckedKeys = [];
    }
  }
};
</script>

<style>
</style>