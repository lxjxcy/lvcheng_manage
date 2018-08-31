<template>
  <div class="masterplate">
    <div class="top-nav">
      <addMaster></addMaster>
     <!--  <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="模版名称">
          <el-input v-model="formInline.masterplateName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="nav-middle">
      <ul>
        <!--添加-->
        <li class="l" @click="add()"><i class="iconfont">&#xe612;</i>添加</li>
        <li class="l" @click="change_model()"><i class="iconfont">&#xe645;</i>修改</li>
        <li class="l"  @click="deletem() "><i class="iconfont">&#xe504;</i>删除</li>
      </ul>
       <addMaster ref="mychild" @refreshList="getMasterplate"></addMaster>
       <changeMaster ref="mychangechild" @refreshList="getMasterplate"></changeMaster>
    </div>
    <div class="main-table">
      <el-table
        :data="listTemplateCount"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        tooltip-effect="dark"
        height="400"
        border>
        <!-- <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
          <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hierarchical"
          label="层级">
          {
            hierarchical?
             <template slot-scope="scope">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in scope.row.hierarchical"  :key="index">{{item.value}}</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          :[]

          }
         
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import addMaster from "./addMaster.vue"
  import changeMaster from "./changeMaster.vue"
  export default {
    name: "masterplate",
    components:{
      addMaster,
      changeMaster
    },
    data() {
      return {
        templateRadio:'',
        templateSelection:{},
        loading:true,
        total:0,
        setparam:{
          pageSize:10,
          currentPage:1,
        },
        multipleSelection: [],
        changemodel:false,
        formInline: {
          masterplateName: '',
        },
        listTemplateCount:[],
      }
    },
    mounted(){
        this.getMasterplate()
      console.log(this.tableData3)
    },
    methods: {
      //获取模板列表
      getMasterplate(){
        var that=this;
        axios.post('/SmartHomeTrade/template/selectTemplate',that.setparam).then(function (res) {
            console.log(res.data.data.listTemplateCount)
          that.total=res.data.data.Count;
            that.loading=false;
          var mlist=[]
          for(var i=0;i<res.data.data.listTemplateCount.length;i++){
            var n=res.data.data.listTemplateCount[i].templateName;
            var id=res.data.data.listTemplateCount[i].id
            var m=[]
            if(res.data.data.listTemplateCount[i].oeTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].oeTemplateName})
            }
            if(res.data.data.listTemplateCount[i].toTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].toTemplateName})
            }
            if(res.data.data.listTemplateCount[i].thTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].thTemplateName})
            }
            if(res.data.data.listTemplateCount[i].frTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].frTemplateName})
            }
            if(res.data.data.listTemplateCount[i].feTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].feTemplateName})
            }
            if(res.data.data.listTemplateCount[i].sxTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].sxTemplateName})
            }
            if(res.data.data.listTemplateCount[i].snTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].snTemplateName})
            }
            if(res.data.data.listTemplateCount[i].etTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].etTemplateName})
            }
            if(res.data.data.listTemplateCount[i].neTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].neTemplateName})
            }
            if(res.data.data.listTemplateCount[i].tnTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].tnTemplateName})
            }
            var list={
              id:id,
              templateName:n,
              hierarchical:m,
            }
            mlist.push(list)
          }
          that.listTemplateCount=mlist;
        })
      },
      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.loading=true;
        that.setparam.pageSize=val;
        that.setparam.currentPage=1;
        that.getMasterplate()
      },
      //切换到当前页
      handleCurrentChange(val) {
        var that=this;
        that.loading=true;
        that.setparam.currentPage=val;
        that.getMasterplate()
      },
      //选中某条数据
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   console.log(val)
      // },
        getTemplateRow(index,row){                
        this.templateSelection = row;
        console.log(this.templateSelection)
       },
   
      // //查询
      // onSubmit() {
      //   console.log('submit!');
      // },



      // //添加模板
      add(){
        this.$refs.mychild.getaddmodel();
      },
     
      //点击修改
      change_model(){
        var that=this;
        if(that.templateRadio==''){
          that.$message({
            type: 'info',
            message: '请选择要修改的模板'
          });
        }else {
          // that.changedynamicValidateForm.domains=that.multipleSelection[0].hierarchical
          // that.changedynamicValidateForm.masterplateName=that.multipleSelection[0].templateName;
          var param={
            hierarchical:that.templateSelection.hierarchical,
            templateName:that.templateSelection.templateName
          }
           that.$refs.mychangechild.getchangeMaster(param);
          }
      },

      //删除
      deletem() {
        var that=this;
        console.log(that.templateSelection.id)
        if(that.templateRadio!=''){
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post("/SmartHomeTrade/template/deleteTemplate",{
              id:that.templateSelection.id
            }).then(function (res) {
              console.log(res)
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getMasterplate()
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          this.$message({
            type: 'info',
            message: '请选择要删除的模板'
          });
        }

      },
    },
  }
</script>

<style>
  .addmodel{
    height: 340px;
    overflow:hidden;
    overflow-y:auto;
  }
  .addInput{
    width:150px !important;
  }

</style>
