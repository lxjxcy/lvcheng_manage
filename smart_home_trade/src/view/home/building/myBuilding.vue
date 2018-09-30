<template>
  <div class="myBuilding">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.buildingName" ></el-input>
        </el-form-item>
       <!--  <el-form-item label="编号">
          <el-input v-model="formSearch.blockNum" placeholder=""></el-input>
        </el-form-item> -->
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
        v-loading='loading'
        style="width: 100%">
        <!--  <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.blockNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="blockNum"
          label="序号"
          width="55"
           align="center">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="大楼名称"
         
           align="center">
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="楼层数量"
         
           align="center">
        </el-table-column>
        <el-table-column
          prop="yardName"
          label="所在园区"
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
        name: "myBuilding",
      data() {
        return {
          templateRadio:'',
          templateSelection:{},
          total:0,
          loading:true,
          myBuildingparam:{
            pageSize:10,
            currentPage:1,
            buildingIdList:[]
          },
          formSearch:{
            blockNum:null,
            buildingName:null,
            buildingIdList:[]
          },
          blockList: []
        }
      },
      mounted(){
        var that=this;
         that.$store.commit('saveIndex',"3-1")
        that.formSearch.buildingIdList=that.$store.state.userinfo.manageScopeIdList;
        that.myBuildingparam.buildingIdList=that.$store.state.userinfo.manageScopeIdList;
        that.getMybuildlist()

      },
      methods: {
        // 获取我的大楼列表
        getMybuildlist(){
          var that=this;
          that.axios.post("/SmartHomeTrade/block/selectMyBlock",that.myBuildingparam).then(function(res){
            if(res.data.code==0){
              that.loading=false;
              if(res.data.data!=null){
                 that.blockList=res.data.data.blockList;         
                that.total=res.data.data.count;
              }
             
            }
          })
        },
         getTemplateRow(index,row){                
        this.templateSelection = row;
        console.log(this.templateSelection)
       },
            //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.myBuildingparam.pageSize=val;
        that.myBuildingparam.currentPage=1;
        that.getMybuildlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.myBuildingparam.currentPage=val;
        that.getMybuildlist()
      },
        onSubmit() {
         var that=this;
         if(that.formSearch.blockNum==""){
            that.formSearch.blockNum=null
         }
           if(that.formSearch.buildingName==""){
            that.formSearch.buildingName=null
         }
          if(that.formSearch.blockNum==null&&that.formSearch.buildingName==null){
            return;
          }
           that.loading=true;             
          that.axios.post("/SmartHomeTrade/block/selectMyBlock",that.formSearch).then(function(res){
              if(res.data.code==0){
              that.blockList=res.data.data.blockList;
                that.loading=false;              
            }else{
              that.$message.error(res.data.message)
            }
          })
        },
         // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.blockNum= null,
            that.formSearch.buildingName=null,           
            that.getMybuildlist()
        },
      },
    }
</script>

<style scoped>

</style>
