<template>
  <div class="floorManagement">
     <goback></goback>
    
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
       <!--  <el-form-item label="编号">
          <el-input v-model="formSearch.floorNum" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="管理员">
          <el-input v-model="formSearch.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="大楼">
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

    <div class="nav-middle">
      <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==2">
        <span>{{this.$store.state.parame.buildname}}</span>
        ---楼层列表
      </div>
      <ul v-bind:class="classObject">
        <!-- 添加 -->
        <li class="l" @click="addFloorName()" v-if="this.$store.state.extendList.addfloor==1"><i class="el-icon-plus"></i>添加</li>
        <!-- 修改 -->
        <li class="l" @click="changeFloorName()" v-if="this.$store.state.extendList.changefloor==1"><i class="el-icon-edit"></i>修改</li>
        <!-- 设置管理 -->
        <li class="l" @click="administratored()" v-if="this.$store.state.extendList.floorsetuser==1&&this.$store.state.userinfo.userLevel==3"><i class="el-icon-setting"></i>设置管理员</li>
      </ul>
      <changeFloor ref="mychild" @refreshList="getfloorList" @clearselect="clear"></changeFloor>
       <addFloor ref="myaddchild" @refreshList="getfloorList" @clearselect="clear" v-if="hackReset" @reload="reloadcom"></addFloor>
        <setUser ref="mysetchild" @refreshList="getfloorList" @clearselect="clear"></setUser>
    </div>
    <div class="main-table">

      <el-table
        :data="floorList"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        tooltip-effect="dark"
        height="408"
        border>
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
         
          label="序号"
          width="55"
          align="center">
          <template  slot-scope="scope">
            <span v-if="!startSearch">{{scope.$index+(floorParam.currentPage - 1) * floorParam.pageSize + 1}} </span>
             <span v-if="startSearch">{{scope.$index+1}}</span>

          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="楼层名称"
         
          align="center">
          <template slot-scope="scope">
            <el-button @click="goRoomlist(scope.row.name,scope.row.id,scope.row.addressId)" type="text" size="small">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="所在大楼"
        
          align="center">
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="房间数量"
        
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="管理员"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="联系电话"
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
 // import changeFloor from '@/components/changeFloor'
 import addFloor from "../../../components/addFloor.vue"
 import changeFloor from "../../../components/changeFloor.vue"
// import axios from "axios"
    export default {
        name: "floorManagement",
        components:{
          addFloor,
          changeFloor
        },
  
      data() {
        return {
          hackReset:true,
          startSearch:false,
            templateRadio:'',
        templateSelection:{},
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
       beforeMount(){
        if(this.$store.state.userinfo.userLevel==2){
          this.$store.commit('saveIndex',"2-2")
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$store.commit('saveIndex',"3-2")
        }
        
     },

      mounted(){

        // if(this.$store.state.userinfo.userLevel==2){
        //   this.classObject.r=true;
        //   this.floorParam.buildingIdList.push(this.$store.state.parame.build_floorId)
        //   this.formSearch.buildingIdList.push(this.$store.state.parame.build_floorId)
        // }else{
        //   this.floorParam.buildingIdList=this.$store.state.userinfo.manageScopeIdList;
        //   this.floorParam.buildingIdList=this.$store.state.userinfo.manageScopeIdList;
        // }      
        if(this.$store.state.userinfo.userLevel==2){
          this.classObject.r=true;
         
        }
        if(this.$store.state.parame.buildid==null){
          this.floorParam.buildingIdList=null
         this.formSearch.buildingIdList=null 
        }else{
          this.floorParam.buildingIdList.push(this.$store.state.parame.buildid)
         this.formSearch.buildingIdList.push(this.$store.state.parame.buildid)     
        }
         
        this.getfloorList()
      },


      methods: {
          // 获取楼层列表
          getfloorList(){
            var that=this;
            that.axios.post("/SmartHomeTrade/floor/selectFloorCount",that.floorParam).then(function(res){
              if(res.data.code==0){
                that.loading=false;
                if(res.data.data!=null){
                 that.total=res.data.data.count;
                 that.floorList=res.data.data.floorList;
                }
                
              }
            
            })
          },
      // 跳转到指定楼层的房间列表页
       goRoomlist(floorName,floorId,addressId){
        var that=this;
         if(this.$store.state.extendList.roomManagement==0){
            that.$message.warning("您还没有房间管理权限")
          return
        }
      // alert(this.$store.state.parame.garden_buildNmae)
      // if(this.$store.state.userinfo.userLevel==3){
          // that.$set(that.$store.state.parame,'floorname',floorName)
          // that.$set(that.$store.state.parame,'floorid',floorId)
          // that.$set(that.$store.state.parame,'flooraddressId',addressId)
         var parame={
              parkname: that.$store.state.parame.parkname,
              parkid: that.$store.state.parame.parkid,
              buildname: that.$store.state.parame.buildname,
              buildid: that.$store.state.parame.buildid,
              allAddress:that.$store.state.parame.allAddress,
              floorname: floorName,
              floorid: floorId,
              flooraddressId: addressId,
              roomname: that.$store.state.parame.roomname,
              roomid: that.$store.state.parame.roomid,
              roomaddressId: that.$store.state.parame.roomaddressId
            };
        that.$store.commit('setRouterid',parame)
       // var param={
       //    build_floorName:this.$store.state.parame.build_floorName,
       //    build_floorId:this.$store.state.parame.build_floorId,
       //    floor_roomId:floorId,
       //    floor_roomName:floorName,
       //    addressId:addressId
       //  }
      // }else if(this.$store.state.userinfo.userLevel==2){
        //  var param={
        //   build_floorName:this.$store.state.parame.build_floorName,
        //   build_floorId:this.$store.state.parame.build_floorId,
        //   floor_roomId:floorId,
        //   floor_roomName:this.$store.state.parame.build_floorName+floorName,
        //   addressId:addressId
        // }
      // }

       
        // this.$store.commit('setRouterid',param)
        if(that.$store.state.userinfo.userLevel==2){
          that.$router.push('/park/floorList/roomList')
        }
         if(that.$store.state.userinfo.userLevel==3){
          that.$router.push('/building/roomList')
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
        getTemplateRow(index,row){                
        this.templateSelection = row;
       
       },
              // 刷新组件
       reloadcom(){
        this.hackReset = false
         this.$nextTick(() => {
            this.hackReset = true
         })
       },
        // handleSelectionChange(val) {
        //   this.multipleSelection = val;
        //   console.log(val)
        // },
        // 查询
        onSubmit() {
           var that=this;
             if(that.formSearch.floorNum==''){
              that.formSearch.floorNum=null
           }
           if(that.formSearch.name==''){
              that.formSearch.name=null
           }
           if(that.formSearch.buildingName==''){
              that.formSearch.buildingName=null
           }
           if(that.formSearch.userName==''){
              that.formSearch.userName=null
           }
          if(that.formSearch.floorNum==null&&that.formSearch.name==null&&that.formSearch.buildingName==null&&that.formSearch.userName==null){
            return;
          }
           that.loading=true;


          that.axios.post("/SmartHomeTrade/floor/selectFloorCount",that.formSearch).then(function(res){
          
                if(res.data.code==0){
                  that.startSearch=true;
                  if(res.data.data!=null){
                     that.floorList=res.data.data.floorList;
                    that.total=res.data.data.floorList.length;
                  }
                 
                    that.loading=false;
                   
                    that.$message.success(res.data.message)

                }else{
                  that.$message.error(res.data.message)
                }
               
          })
        },
         // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.floorNum= null;
            that.formSearch.name=null;
             that.formSearch.buildingName=null;
            that.formSearch.userName=null;   
            that.startSearch=false; 
            that.floorParam.pageSize=10;
            that.floorParam.currentPage=1;   
            that.getfloorList()
        },
             // 情况选中
         clear(){
         this.templateRadio="";
       },

// 修改楼层
        changeFloorName() {
          if(this.templateRadio==''){
              this.$message({
                type: 'info',
                message: '请选择要修改的楼层'
              });
            }else {
              var changparam={
                addressId:this.templateSelection.addressId,
                id:this.templateSelection.id,
                name:this.templateSelection.name
              }
              this.$refs.mychild.parentHandleclick(changparam);
            
            }
           
        },
        // 添加楼层
        addFloorName(){
           this.$refs.myaddchild.addgarden();

        },
         //  设置管理员
        administratored(){
          if(this.templateRadio==''){
            this.$message({
              type: 'info',
              message: '请选择要设置管理员的的楼层'
            });
          }else {
            if(this.templateSelection.userName!=null){
              this.$message({
              type: 'info',
              message: '该楼层已有管理员不能重复设置'
            });
            return;
          }
             var manageScopeId=[];
          manageScopeId.push(this.templateSelection.id)
           
              var param={
               action:4,
               adrressId: this.templateSelection.addressId,
               manageScopeIdList: manageScopeId,
                userLevel:4
             } 
              var uuid=this.templateSelection.userUuid               
              this.$refs.mysetchild.getAdminList(param,uuid);

          }
        },




      },
    }
</script>

<style scoped>

</style>
