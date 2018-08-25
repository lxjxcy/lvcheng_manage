<template>
  <div class="floorManagement">
     <goback></goback>
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSearch.floorNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="formSearch.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="大楼">
          <el-input v-model="formSearch.buildingName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="nav-middle">
      <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==2">
        <span>{{this.$store.state.parame.build_floorName}}</span>
        ---楼层列表
      </div>
      <ul v-bind:class="classObject">
        <li class="l"><i lass="iconfont">&#xe612;</i>添加</li>
        <li class="l"><i class="iconfont">&#xe645;</i>修改</li>
        <li class="l"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l">设置管理员</li>
      </ul>
    </div>
    <div class="main-table">

      <el-table
        :data="floorList"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        height="380"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="floorNum"
          label="楼层编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="楼层名称"
          width="120">
          <template slot-scope="scope">
            <el-button @click="goRoomlist(scope.row.name,scope.row.id,scope.row.addressId)" type="text" size="small">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="所在大楼"
          width="200">
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="房间数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="管理员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="联系电话">
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
        name: "floorManagement",
  
      data() {
        return {
          loading:true,
          total:0,
          classObject:{
              'r': false,
          },
          multipleSelection: [],
          floorParam:{
            pageSize:10,
            currentPage:1,
            buildingIdList:[],
          },
          formSearch: {
            floorNum: null,
            name:null,
            buildingName:null,
            buildingName:null,
            buildingIdList:[],
          },
          currentPage3: 1,
          floorList: [],
        }
      },
      mounted(){
        if(this.$store.state.userinfo.userLevel==2){
          this.classObject.r=true;
          this.floorParam.buildingIdList.push(this.$store.state.parame.build_floorId)
          this.formSearch.buildingIdList.push(this.$store.state.parame.build_floorId)
        }else{
          this.floorParam.buildingIdList=this.$store.state.userinfo.manageScopeIdList;
          this.floorParam.buildingIdList=this.$store.state.userinfo.manageScopeIdList;
        }
        
       
        this.getfloorList()
      },


      methods: {
          // 获取楼层列表
          getfloorList(){
            var that=this;
            axios.post("/SmartHomeTrade/floor/selectFloorCount",that.floorParam).then(function(res){
              if(res.data.code==0){
                that.loading=false;
                 that.total=res.data.data.count;
                that.floorList=res.data.data.floorList;
              }
              console.log(res.data.data.blockList)
            })
          },
      // 跳转到指定楼层的房间列表页
       goRoomlist(floorName,floorId,addressId){
      // alert(this.$store.state.parame.garden_buildNmae)
        var param={
          build_floorName:this.$store.state.parame.build_floorName,
          build_floorId:this.$store.state.parame.build_floorId,
          floor_roomId:floorId,
          floor_roomName:floorName+this.$store.state.parame.build_floorName,
          addressId:addressId
        }
        this.$store.commit('setRouterid',param)
        if(this.$store.state.userinfo.userLevel==2){
          this.$router.push('/park/floorList/roomList')
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$router.push('/building/roomList')
        }
        
      },


                 //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.floorParam.pageSize=val;
        that.floorParam.currentPage=1;
         that.getfloorList()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.floorParam.currentPage=val;
       that.getfloorList()
      },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val)
        },

        // 查询
        onSubmit() {
           var that=this;
           that.loading=false;
          if(that.formSearch.floorNum==null&&that.formSearch.name==null&&that.formSearch.buildingName==null&&that.formSearch.userName==null){
            return;
          }
          axios.post("/SmartHomeTrade/floor/selectFloorCount",that.formSearch).then(function(res){
                if(res.data.code==0){
                    that.loading=false;
                    that.floorList=res.data.data.floorList;
                      that.total=res.data.count
                    that.$message.success(res.data.message)

                }else{
                  that.$message.error(res.data.message)
                }
          })
        }
      },
    }
</script>

<style scoped>

</style>
