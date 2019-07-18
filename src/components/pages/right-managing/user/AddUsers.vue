<template>
<div>
     <el-button type="primary" @click="userFormVisible = true" icon="el-icon-plus" size="mini">批量导入</el-button>
     <el-dialog title="批量导入用户" :visible.sync="userFormVisible">
        <el-upload
            class="upload-demo"
            drag
            accept=".xlsx"
            action="http://119.29.101.166:8090/poi/excel/upload"
            :http-request="uploadSectionFile()"
            multiple>
            
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">请上传Excel文件，点击<a href="./../../../../../static/file/user.xlsx">下载模板</a></div>
        </el-upload>
     </el-dialog>
</div>
</template>
<script>
export default {
    data(){
        return{
            userFormVisible: false,
        }
    },
    methods:{
        uploadSectionFile(){
            alert("asdas")
            console.log(event)
        }
    }
}
</script>

<style>

</style>
