<template>
<div class="menu-container">
<el-menu
  :default-active="checked"
  mode="vertical"
  :collapse="isCollapse"
  class="el-menu-vertical-demo menu"
  @open="handleOpen"
   @select="select"
  @close="handleClose"
  router >
  <template v-for="(item,index) in menus">
    <el-submenu :key="index" :index="index+''" >
      <template slot="title">
        <!-- <i :class="item.icon" style="color: #20a0ff;width: 14px;"></i>  -->
        <i class="el-icon-s-platform"></i>
          <span slot="title">{{item.name}}</span>
      </template>
      <template>
        <el-menu-item  
          v-for="(child,index) of item.children" 
          style="padding-left:53px"
          :key="index" 
          :index=child.path 
          @click="open(child.name)"><i class="el-icon-s-tools"></i>{{child.name}}</el-menu-item>
      </template>
    </el-submenu>
  </template>
</el-menu>
</div>
</template>

<script>
import {getMenu} from './../../../../api/right-managing/menu.js'
import eventBus from './../../../../utils/eventBus.js'
  export default {
    data() {
      return { 
        checked:'',
        menus:[
        {
            "id": 1000,
            "parentId": -1,
            "children": [
                {
                    "id": 1100,
                    "parentId": 1000,
                    "children": [],
                    "icon": "icon-yonghuguanli",
                    "name": "用户管理",
                    "spread": false,
                    "path": "user",
                    "component": "views/admin/user/index",
                    "authority": null,
                    "redirect": null,
                    "keepAlive": "0",
                    "code": null,
                    "type": "0",
                    "label": "用户管理",
                    "sort": 1
                },
              
                {
                    "id": 1300,
                    "parentId": 1000,
                    "children": [],
                    "icon": "icon-jiaoseguanli",
                    "name": "角色管理",
                    "spread": false,
                    "path": "role",
                    "component": "views/admin/role/index",
                    "authority": null,
                    "redirect": null,
                    "keepAlive": "0",
                    "code": null,
                    "type": "0",
                    "label": "角色管理",
                    "sort": 3
                },
                {
                    "id": 1400,
                    "parentId": 1000,
                    "children": [],
                    "icon": "icon-web-icon-",
                    "name": "部门管理",
                    "spread": false,
                    "path": "dept",
                    "component": "views/admin/dept/index",
                    "authority": null,
                    "redirect": null,
                    "keepAlive": "0",
                    "code": null,
                    "type": "0",
                    "label": "部门管理",
                    "sort": 4
                }
            ],
            "icon": "icon-quanxianguanli",
            "name": "权限管理",
            "spread": false,
            "path": "/upms",
            "component": "Layout",
            "authority": null,
            "redirect": null,
            "keepAlive": "0",
            "code": null,
            "type": "0",
            "label": "权限管理",
            "sort": 0
        }
    ],
      };
    },
    created:function(){
        getMenu().then(res=>{      
          // this.menus = res.data.data;     
        });
         eventBus.$on('checked',res=>{//接收默认选中的导航栏菜单
            this.checked=res;
        })   
    },
    computed: {
      isCollapse(){
        return this.$store.state.isCollapse;
      }
    },
    methods: {
        select(item){
            eventBus.$emit("router",item);//发送路径给Tabs
        },
        open(name){
            eventBus.$emit("name",name);//发送菜单名给Tabs
            this.$emit('open');//
        },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }
    
  }
</script>

<style>
.menu-container .el-menu{
  border-right: solid 0px #e6e6e6;
  text-align: left
}
.menu-container .el-menu-item.is-active{
  background-color: #409EFF;
  color: white
}
 

</style>