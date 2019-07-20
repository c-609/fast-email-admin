<template>
  <div class="user-dept-tree">
    <el-card>
      根据部门筛选
      <br />
      <br />
      <el-tree
        node-key="id"
        highlight-current
        :data="deptData"
        :props="deptProps"
        @node-click="getNodeData"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        :render-content="renderContent"
        default-expand-all
        :setCurrentKey="setCurrentKey"
        ref="tree"
      ></el-tree>
    </el-card>
  </div>
</template>

<script>
import { getDeptTree } from "./../../../../api/right-managing/dept.js";
import { getListByDeptId } from "./../../../../api/right-managing/user.js";
import eventBus from "./../../../../utils/eventBus.js";
export default {
  name: "UserDeptTree",
  data() {
    return {
      deptData: "",
      ids: [],
      current_node_keys: [1],
      deptProps: {
        label: "name",
        children: "children"
      }
    };
  },
  methods: {
    getNodeData(data) {
      
      // this.$refs.tree.setCheckedKeys(this.$refs.tree.getCheckedKeys());
      console.log("daaaa");
      console.log(this.$refs.tree.getCheckedKeys());
      // console.log(this.$refs.tree.getCheckedNodes());
     
      var deptId = this.$refs.tree.getCheckedKeys().join(",");
      getListByDeptId(deptId).then(res => {
        console.log("------11111-------")
        console.log(res)
        eventBus.$emit("tableData", res);
      });
      this.$refs.tree.setCheckedKeys([]);
    }
    // renderContent(data){
    //   console.log(data)
    // }
  },
  created: function() {
    getDeptTree().then(res => {
      this.deptData = res.data.data;
    });
  }
};
</script>

<style>
/* .el-tree-node:focus > .el-tree-node__content {
  font-weight: 200
} */
.is-current > .el-tree-node__content {
  font-weight: bold;
  white-space: normal;
}
</style>
