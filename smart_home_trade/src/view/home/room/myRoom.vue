<template>
  <div class="myRoom">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
       <!--  <el-form-item label="编号">
          <el-input v-model="formSearch.roomNum" placeholder=""></el-input>
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
        :data="roomList"
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
              <el-radio :label="scope.row.roomNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="序号"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="房间名称"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="设备数量"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="inAddress"
          label="所在位置"
          align="center">
        </el-table-column>
      </el-table>
     <div class="block" v-if="!startSearch">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      
      </div>
       <div class="block" v-if="startSearch">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"       
          :page-size="100"
          layout="total, prev, pager, next"
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
            startSearch:false,
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
         that.$store.commit('saveIndex',"5-1")
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
             
            }else{
              that.$message.error(res.data.message)
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
     
     
       },
        onSubmit() {
         var that=this;
         if(that.formSearch.name==""){
            that.formSearch.name=null
         }
          if(that.formSearch.roomNum==""){
            that.formSearch.roomNum=null
         }
          if(that.formSearch.name==null&&that.formSearch.roomNum==null){
            that.getroomList()
             that.startSearch=false;
            return;
          }
           that.loading=true;             
          that.axios.post("/SmartHomeTrade/room/selectMyRoom",that.formSearch).then(function(res){
              if(res.data.code==0){
                that.startSearch=true;
                that.loading=false;  
              that.roomList=res.data.data.roomList;
              that.total=res.data.data.roomList.length;
                            
            }else{
              that.$message.error(res.data.message)
            }
          })
        },
         // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.name= null;
            that.formSearch.name=null;
            that.myRoomparam.pageSize=10;
           that.myRoomparam.currentPage=1; 
            that.startSearch=false;          
            that.getroomList()
        },
      },
    }
</script>

<style scoped>

</style>
