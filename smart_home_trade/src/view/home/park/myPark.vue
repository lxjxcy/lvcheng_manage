<template>
  <div class="myPark">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.yardName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSearch.gardenNum" placeholder=""></el-input>
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
        :data="yardsList"
        height="435"
        border
         v-loading="loading"
        style="width: 100%">
         <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="gardenNum"
          label="园区编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="yardName"
          label="园区名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buildingNum"
          label="大楼数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gardenAdrress"
          label="园区地址">
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
        name: "myPark",
      data() {
        return {
          total:0,
          loading:true,
          myParkparam:{
            pageSize:10,
            currentPage:1,
            action:1,
            yardIdList:[],
          },
          formSearch:{
            yardName:null,
            gardenNum:null,
            action:1,
            yardIdList:[],
          },
          yardsList: []
        }
      },
      mounted(){
         var that=this;
          that.formSearch.yardIdList=that.$store.state.userinfo.manageScopeIdList;
          that.myParkparam.yardIdList=that.$store.state.userinfo.manageScopeIdList;
          that.getMyparklist()
      },
      methods: {
        getMyparklist(){
          var that=this;
          that.axios.post("/SmartHomeTrade/garden/selectMyYards",that.myParkparam).then(function(res){
            if(res.data.code==0){
              that.yardsList=res.data.data.yardsList;
                that.loading=false;              
                that.total=res.data.data.count;

            }

          })
        },
        // 每页几条
        handleSizeChange(val) {
        var that=this;
        that.myParkparam.pageSize=val;
        that.myParkparam.currentPage=1;
        that.getMyparklist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.myParkparam.currentPage=val;
        that.getMyparklist()
      },
        //查询
        onSubmit() {
          var that=this;
          if(that.formSearch.yardName==null&&that.formSearch.gardenNum==null){
            return;
          }
           that.loading=true;             
         this.axios.post("/SmartHomeTrade/garden/selectMyYards",that.formSearch).then(function(res){
              if(res.data.code==0){
              that.yardsList=res.data.data.yardsList;
                that.loading=false;  
                      
            }
          })
        },
        // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.yardName= null,
            that.formSearch.gardenNum=null,           
            that.getMyparklist()
        },
      },
    }
</script>

<style scoped>

</style>
