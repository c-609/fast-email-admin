<template>
  <div class="user-table">
    <el-table
      ref="dormitoryTable"
      max-height="1000"
      :data="Tables.slice((currpage - 1) * pagesize, currpage * pagesize)"
      :row-class-name="tableRowClassName"
      :header-cell-style="headerColor"
      >
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        type="index"
        width="50"
        fixed="left"
        label="序号">
      </el-table-column>

      <el-table-column
        v-for="(item,key) in header" 
        :key="key" 
        :prop="item.prop" 
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed">
        <template slot-scope="scope">
          <!-- {{scope.row[item.prop]}} -->
          <!-- <div v-if="item.label=='部门' || item.label=='角色'"> -->
            <!-- {{scope.row[item.prop][0].name}} -->
            <!-- <div v-for="(i,index) in scope.row[item.prop]" :key="index"> -->
                <!-- {{scope.row[item.prop][index].name}} -->
            <!-- </div> -->
          <!-- </div> -->
          <!-- <div v-else-if="item.type==1"> -->
             <!-- {{scope.row[item.prop][0].nameZh}} -->
            <!-- <div v-for="(i,index) in scope.row[item.prop]" :key="index"> -->
                <!-- {{scope.row[item.prop][index].nameZh}} -->
            <!-- </div> -->
            <!-- </div>  -->
          <div v-if="item.label=='状态'">
              <div v-if="scope.row[item.prop]==0">有效</div>
              <div v-if="scope.row[item.prop]==102">锁定</div>
          </div>
          <div v-else>{{scope.row[item.prop]}}</div> 
          
          <!-- <el-button @click="handleView(scope.row.id)" type="text" size="small" v-if="item.prop=='operate'">查看</el-button> -->
          <el-button @click="handleEdit( scope.row)" type="text" size="small" v-if="item.prop=='operate'">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop==='operate'">删除</el-button>
       </template>
        
      </el-table-column>  
    </el-table>
    <el-dialog
      title="查看"
      :visible.sync="dialogTransferVisible"
      @close='closeDialog'  
      >
      <el-tree
        :data="menuData"
        ref="menuData"
        node-key="id"
        :default-expand-all="true"
        :props="menuProps">
      </el-tree>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      @close='closeDialog'
      >
      <el-form :model="form" label-position="right" ref="form">
        <el-form-item label="账号" :label-width="formLabelWidth" >
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <base-tree-select
            :data="deptData"
            :defaultProps="deptProps" 
            multiple
            checkStrictly
            :nodeKey="id" 
            :checkedKeys="form.defaultCheckedKeys"
            @popoverHide="popoverHide" >
          </base-tree-select>
        </el-form-item>
      
        <el-form-item label="用户状态"  :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="102"
            active-text="有效"
            inactive-text="锁定">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleDialogSure">确 定</el-button>
      </div>
    </el-dialog>
    
    <div>
      <!-- <el-button size="mini" type="primary" style="float:left" @click="handleBatchDelete">批量删除</el-button> -->
    	<el-pagination 
        background
        layout="prev, pager, next, sizes, total, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        :total="Tables.length"
        @current-change="handleCurrentChange"  
        @size-change="handleSizeChange" 
			>
		</el-pagination>
    </div>

  </div>
  
</template>

<script>
import {getUserMenuTree, deleteUser, updateUser} from './../../../../api/right-managing/user.js'
import eventBus from './../../../../utils/eventBus.js'
import BaseTreeSelect from './UserDeptTree/../../../../common/BaseTreeSelect'
import {getDeptTree} from './../../../../api/right-managing/dept.js'
  export default {
    name: 'UserTable',
    components: {BaseTreeSelect},
    inject:['reload'],
    created:function(){
        eventBus.$on('Ta',(data)=>{
          console.log("--------2222------------")
          console.log(data)
            this.Tables=data 
        })
        getDeptTree().then(res=>{
          this.deptData = res.data.data
        })
    },
    beforeDestroy() {
      eventBus.$off('Ta');
    },
    data() {
      return {
        deptData: '',
        deptProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        Tables:[],
        search: '',  
        pagesize: 5,
				currpage: 1,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        checkIds:[],
        form:{
          deptIds:"",
          roles:[],
          id:'',
          username:'',
          password:'',
          admin:'',
          superuser:'',
          user:'',
          status: '',
          defaultCheckedKeys: [],
        },
        menuProps:{
          label: 'name',
          children: 'children',
        },
        menuData:[],
        dialogTransferVisible: false,
      }
    },
    props: ['header','roles'],
    computed:{
        TablesChange(){
          return this.Tables;
        }
    },
    watch:{
        TablesChange(){
          this.handleCurrentChange(1);
        }
    },
     methods: {
        tableRowClassName({row, rowIndex}) {
        if (rowIndex %2=== 0) {
          return 'warning-row';
        } else   {
          return 'success-row';
        }
      },
      headerColor({row, rowIndex}){
        var color = '#409EFF';
        if(localStorage.getItem("tremePackers") != null){
          color= ""+localStorage.getItem("tremePackers")+""
        }
        var obj = {
          background:color,
          color: '#fff'
        }
        // return 'header-color'
        return obj;
      },
       popoverHide (checkedIds, checkedData) {
         this.form.deptIds = checkedIds.join(",");
      },
        handleCurrentChange(cpage) {
					this.currpage = cpage;
			  },
				handleSizeChange(psize) {
					this.pagesize = psize;
				},
        handleDelete(id) {
          var _this = this;
          this.$confirm('是否删除此用户?', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
          deleteUser(id).then((res)=>{
            this.reload();
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      handleView(id){
        this.dialogTransferVisible=true;
        getUserMenuTree(id).then(res=>{     
          this.menuData  = res.data.data ;
        }) 
      },
       handleEdit(row) {
         
          this.form.username=row.username;
          this.form.roles = row.roleId;
          this.form.id=row.id;
          this.form.status=row.status;
          
         
            this.form.defaultCheckedKeys[0] = row.deptId;
          
          this.dialogFormVisible=true;
      },
      handleDialogSure(){
       console.log(this.form.id)
       console.log(this.form.roles)
       console.log(this.form.deptIds)
        updateUser(this.form.id,this.form.roles,this.form.deptIds).then(res=>{
          if(res.data.code == 0){
            this.$message({
                          type: "success",
                          message: "修改成功"
                        });
                    }else {
                        this.$message.error("修改失败");
                    }
          this.reload();
          });
          this.dialogFormVisible=false;
      },
      closeDialog(){
        console.log(this.roles)
        this.form.password='';
        this.form.admin='';
        this.form.superuser='';
        this.form.user='';
        this.dialogFormVisible=false;
      },
    },
  }
</script>

<style type="text/css" >
.user-table .el-switch{
  float:left;
  display: block;
  margin-left:35px;
  margin-top: 8px;
} 
.user-table .el-table .warning-row {
    background: oldlace;
  }
/* .user-table .el-table .header-color {
    background: #409EFF;
  } */
 .user-table .el-table .success-row {
    background: #f0f9eb;
  }
.el-pagination{
		text-align: right;
    margin-top:20px;
    margin-right: 50px
	}
</style>

