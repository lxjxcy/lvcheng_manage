<template>
  <div class="myBuilding">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.buildingName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSearch.blockNum" placeholder=""></el-input>
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
        height="435"
        border
        v-loading='loading'
        style="width: 100%">
         <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="blockNum"
          label="大楼编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="大楼名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="楼层数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="yardName"
          label="所在园区">
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
import axios from "axios"
    export default {
        name: "myBuilding",
      data() {
        return {
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
        that.formSearch.buildingIdList=that.$store.state.userinfo.manageScopeIdList;
        that.myBuildingparam.buildingIdList=that.$store.state.userinfo.manageScopeIdList;
        that.getMybuildlist()

      },
      methods: {
        // 获取我的大楼列表
        getMybuildlist(){
          var that=this;
          axios.post("/SmartHomeTrade/block/selectMyBlock",that.myBuildingparam).then(function(res){
            if(res.data.code==0){
              that.loading=false;
              if(res.data.data!=null){
                 that.blockList=res.data.data.blockList;         
                that.total=res.data.data.count;
              }
             
            }
          })
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
          if(that.formSearch.blockNum==null&&that.formSearch.buildingName==null){
            return;
          }
           that.loading=true;             
          axios.post("/SmartHomeTrade/block/selectMyBlock",that.formSearch).then(function(res){
              if(res.data.code==0){
              that.blockList=res.data.data.blockList;
                that.loading=false;              
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
