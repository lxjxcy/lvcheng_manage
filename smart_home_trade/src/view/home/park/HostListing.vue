<template>
  <div class="HostLising">
    <div class="goback">
      <Breadcrumb separator=">">
         <span>当前位置:</span>
        <BreadcrumbItem to="/park/buildingManagement">大楼管理</BreadcrumbItem>
        <BreadcrumbItem>主机清单</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="top-nav">
        <el-form :inline="true" :model="formSearch"  ref="formSearch" class="demo-form-inline">
          <el-form-item label="名称"  prop="hostName">
            <el-input v-model="formSearch.hostName" placeholder=""></el-input>
          </el-form-item>
         <!--  <el-form-item label="编号"  prop="hostNum">
            <el-input v-model="formSearch.hostNum" placeholder=""></el-input>
          </el-form-item> -->
          <el-form-item label="大楼名称"  prop="buildingName">
            <el-input v-model="formSearch.buildingName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
          <el-button @click="resetForm('formSearch')">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
    <div class="main-table">

      <el-table
        :data="blockList"
        height="408"
        border
        style="width: 100%">
         <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="hostNum"
          label="序号"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="hostId"
          label="主机编号"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="hostName"
          label="主机名称"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="所属大楼"
          align="center">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
// import axios from "axios"
  export default {
    name: "HostLising",
    data() {
      return {
        total:0,
         buildParams:{
            pageSize:10,
            currentPage:1,
            yardIdList:[],
            action:2,
          },
           formSearch: {
            hostName: null,
            hostNum:null,
            buildingName:null,
            yardIdList:[],
            action:2,
          },
          total:0,
        blockList: []
      }
    },
    mounted(){
       var that=this;
        that.$store.commit('saveIndex',"2-2")
       // var Idlist=[];
       // Idlist.push(that.$route.params.id)
        that.formSearch.yardIdList=this.$store.state.userinfo.manageScopeIdList;
      that.buildParams.yardIdList=this.$store.state.userinfo.manageScopeIdList;
      that.getBuildlist()

    },

    methods: {
        // 获取大楼列表
        getBuildlist(){
          var that=this;
          that.axios.post('/SmartHomeTrade/block/selectBlockCount',that.buildParams).then(function(res){
              if(res.data.code==0){
                if(res.data.data!=null){
                   that.blockList=res.data.data.blockList;
                   that.total=res.data.data.count;
                }
                that.loading=false;
              }else{
                that.$message.error(res.data.message)
              }
          })
        },
         //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.buildParams.pageSize=val;
        that.buildParams.currentPage=1;
         that.getBuildlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.buildParams.currentPage=val;
        that.getBuildlist()
      },
        //选中
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val)
        },
        handleSelectionChange2(val) {
          this.multipleSelection = val;
          console.log(val)
        },
        onSubmit() {
          var that=this;
           
           if(that.formSearch.hostName==""){
              that.formSearch.hostName=null
           }
           if(that.formSearch.hostNum==""){
              that.formSearch.hostNum=null
           }
           if(that.formSearch.buildingName==""){
              that.formSearch.buildingName=null
           }
          if(that.formSearch.hostName==null&&that.formSearch.hostNum==null&&that.formSearch.buildingName==null){
            that.getBuildlist()
            return;
          }
          that.loading=false;
          that.axios.post("/SmartHomeTrade/block/selectBlockCount",that.formSearch).then(function(res){
            console.log(res)            
            if(res.data.code==0){
              that.loading=false;
              that.blockList=res.data.data.HostList;
               that.$message.success(res.data.message);
            }else{
               that.$message.error(res.data.message);
            }
          })
        },
    //清空查询
      resetForm() {       
            this.formSearch.hostName= null;
            this.formSearch.hostNum=null;
            this.formSearch.buildingName=null;
            this.getBuildlist()
      },
    },
  }
</script>

<style scoped>

</style>
