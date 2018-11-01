<template>
    <div class="myFloor">

       <div class="top-nav">
         <el-form :inline="true" :model="formSearch" class="demo-form-inline">
           <el-form-item label="名称">
             <el-input v-model="formSearch.name" placeholder=""></el-input>
           </el-form-item>
           <!-- <el-form-item label="编号">
             <el-input v-model="formSearch.floorNum" placeholder=""></el-input>
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
          :data="floorList"
          height="408"
          border
          v-loading="loading"
          style="width: 100%">
          <!--  <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.floorNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
          <el-table-column
            prop="floorNum"
            label="序号"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="楼层名称"
            
            align="center">
          </el-table-column>
          <el-table-column
            prop="roomNum"
            label="房间数"
           
            align="center">
          </el-table-column>
          <el-table-column
            prop="buildingName"
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
// import axios from "axios"
    export default {
        name: "myFloor",
      data() {
        return {
           total:0,
          loading:true,
          startSearch:false,
              templateRadio:'',
          templateSelection:{},
          myFloorparam:{
            pageSize:10,
            currentPage:1,
            addRegionIdList:[]
            // floorIdList:[],
            // buildingIdList:[],
          },
          formSearch:{
            name:null,
            floorNum:null,
            addRegionIdList:[]
            // floorIdList:[],
            // buildingIdList:[],
          },
          floorList: []
        }
      },
        mounted(){
         var that=this;
          that.$store.commit('saveIndex',"4-1")
          var list2=that.$store.state.userinfo.addrList;
            var list1=that.$store.state.userinfo.manageScopeIdList;
            var obj=[]
            for(var i=0;i<list1.length;i++){
                var obj2={
                  regionId:list1[i],
                  addressId:list2[i]
                }
                obj.push(obj2)
            }
          that.formSearch.addRegionIdList=obj;
          that.myFloorparam.addRegionIdList=obj
           that.getMyfloorlist()
        },


      methods: {
        getMyfloorlist(){
          var that=this;
          that.axios.post("/SmartHomeTrade/floor/selectMyFloor",that.myFloorparam).then(function(res){
             if(res.data.code==0){
              if(res.data.data!=null){
                that.floorList=res.data.data.floorList;
                            
               that.total=res.data.data.count;
              }
               that.loading=false; 

            }else{
              that.$message.error(res.data.message)
            }
          })

        },
         getTemplateRow(index,row){                
        this.templateSelection = row;
        
       },
        handleSizeChange(val) {
        var that=this;
        that.myFloorparam.pageSize=val;
        that.myFloorparam.currentPage=1;
        that.getMyfloorlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.myFloorparam.currentPage=val;
        that.getMyfloorlist()
      },
        //查询
        onSubmit() {
          var that=this;
          if(that.formSearch.name==""){
            that.formSearch.name=null

          }
            if(that.formSearch.floorNum==""){
            that.formSearch.floorNum=null

          }
          if(that.formSearch.name==null&&that.formSearch.floorNum==null){
             that.getMyfloorlist()
              that.startSearch=false;
            return;
          }
           that.loading=true;             
          that.axios.post("/SmartHomeTrade/floor/selectMyFloor",that.formSearch).then(function(res){
              if(res.data.code==0){
                that.startSearch=true;
                that.loading=false;  
              that.floorList=res.data.data.floorList;
              that.total=res.data.data.floorList.length;
                

            }else{
              that.$message.error(that.data.message)
            }
          })
        },
        // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.name= null;
            that.formSearch.floorNum=null;
              that.paramRoom.pageSize=10;
            that.paramRoom.currentPage=1;   
           that.startSearch=false      
            that.getMyfloorlist()
        },
      },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
