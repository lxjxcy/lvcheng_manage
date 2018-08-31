<template>
  <div class="myRoom">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSearch.roomNum" placeholder=""></el-input>
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
        :data="roomList"
        height="435"
        border
        v-loading='loading'

        style="width: 100%">
        <!--  <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
         <el-table-column label="" width="40">
          <template slot-scope="scope">
              <el-radio :label="scope.row.roomNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="房间编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="房间名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="设备数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="inAddress"
          label="所在位置">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "myRoom",
      data() {
        return {
            templateRadio:'',
          templateSelection:{},
          total:0,
          loading:true,
          myRoomparam:{
            pageSize:10,
            currentPage:1,
           roomListId:[],
            adrIdList:[],
          },
          formSearch:{
            name:null,
            roomNum:null,
            roomListId:[],
            adrIdList:[],
          },
          roomList: []
        }
      },

     mounted(){
        var that=this;
        that.formSearch.roomListId=that.$store.state.userinfo.manageScopeIdList;
         that.formSearch.adrIdList=that.$store.state.userinfo.addrList
        that.myRoomparam.adrIdList=that.$store.state.userinfo.addrList;
        that.myRoomparam.roomListId=that.$store.state.userinfo.manageScopeIdList;
        that.getroomList()
      },
      methods: {
        // 获取我的房间列表
        getroomList(){
          var that=this;
          that.axios.post("/SmartHomeTrade/room/selectMyRoom",that.myRoomparam).then(function(res){
              if(res.data.code==0){
              that.loading=false;
              if(res.data.data!=null){
                 that.roomList=res.data.data.roomList;          
                that.total=res.data.data.count;
              }
             
            }
          })

        },
      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.myRoomparam.pageSize=val;
        that.myRoomparam.currentPage=1;
        that.getroomList()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.myRoomparam.currentPage=val;
        that.getroomList()
      },
         getTemplateRow(index,row){                
        this.templateSelection = row;
        console.log(this.templateSelection)
       },
        onSubmit() {
         var that=this;
          if(that.formSearch.name==null&&that.formSearch.roomNum==null){
            return;
          }
           that.loading=true;             
          that.axios.post("/SmartHomeTrade/room/selectMyRoom",that.formSearch).then(function(res){
              if(res.data.code==0){
              that.roomList=res.data.data.roomList;
                that.loading=false;              
            }
          })
        },
         // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.name= null,
            that.formSearch.name=null,           
            that.getroomList()
        },
      },
    }
</script>

<style scoped>

</style>
