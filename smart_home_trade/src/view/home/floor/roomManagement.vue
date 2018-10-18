<template>
  <div class="roomManagement">
      <gobackroom></gobackroom>
    <div class="top-nav">

    
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称" prop='name'>
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
       <!--  <el-form-item label="编号" prop='roomNum'>
          <el-input v-model="formSearch.roomNum" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="管理员" prop='userName'>
          <el-input v-model="formSearch.userName" placeholder=""></el-input>
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
        <span>{{this.$store.state.parame.buildname}}-{{this.$store.state.parame.floorname}}</span>
        ---房间列表
      </div>
       <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==3">
        <span>{{this.$store.state.parame.floorname}}</span>
        ---房间列表
      </div>


      <ul  v-bind:class="classObject">
        <li class="l" @click="addRoom()"  v-if="this.$store.state.extendList.addAuthor==1"><i class="el-icon-plus"></i>添加</li>
        <li class="l" @click="change()"  v-if="this.$store.state.extendList.changeAuthor==1"><i class="el-icon-edit"></i>修改</li> 
        <li class="l" @click="administratored()"  v-if="this.$store.state.extendList.roomsetuser==1&&this.$store.state.userinfo.userLevel==4"><i class="el-icon-setting"></i>设置管理员</li>
      </ul>
      <changeRoom ref="mychild" @refreshList="getroomlist" @clearselect="clear"></changeRoom>
      <addroom ref="myaddchild" @refreshList="getroomlist" @clearselect="clear"></addroom>
       <setUser ref="mysetchild" @refreshList="getroomlist" @clearselect="clear"></setUser>
         

    </div>
    <div class="main-table">

      <el-table
        :data="roomList"
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
         <template slot-scope="scope">
          <el-button @click="goEquimentlist(scope.row.name,scope.row.id,scope.row.addressId)" type="text" size="small">{{scope.row.name}}</el-button>
        </template>
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
import addroom from "../../../components/addroom.vue"
import changeRoom from "../../../components/changeRoom.vue"
    export default {
        name: "roomManagement",
         components:{
          changeRoom,
          addroom
        },
  
    
      data() {
        return {
          total:0,
          loading:true,
           templateRadio:'',
        templateSelection:{},
          multipleSelection: [],
           classObject:{
              'r': false,
          },
          paramRoom:{
            pageSize:10,
            currentPage:1,
            action:2,
            addressIdList:[],

          },
          formSearch: {
            name: null,
            roomNum:null,
            userName:null,
            action:2,
            addressIdList:[]
            // address: ''
          },
          roomList: []
        }
      },
        beforeMount(){
        if(this.$store.state.userinfo.userLevel==2){
          this.$store.commit('saveIndex',"2-2")
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$store.commit('saveIndex',"3-2")
        }
         if(this.$store.state.userinfo.userLevel==4){
          this.$store.commit('saveIndex',"4-2")
        }
        
     },
      mounted(){
        var that=this;
        if(that.$store.state.userinfo.userLevel==2||that.$store.state.userinfo.userLevel==3){
          that.classObject.r=true;
          // var obj=[]
          // var obj1= {
          //   id:that.$store.state.parame.floor_roomId,
          //   addressId:that.$store.state.parame.addressId
          // };
          // obj.push(obj1)
          // that.paramRoom.addressIdList=obj
          // that.formSearch.addressIdList=obj
        }

         
         if(that.$store.state.parame.floorid==null&&that.$store.state.parame.flooraddressId==null){
           that.paramRoom.addressIdList=null
          that.formSearch.addressIdList=null
         }else{
              var obj=[]
              var obj1= {
                id:that.$store.state.parame.floorid,
                addressId:that.$store.state.parame.flooraddressId
              };
              obj.push(obj1)
              that.paramRoom.addressIdList=obj
              that.formSearch.addressIdList=obj
         }
      
        // // else{
        //     var list2=that.$store.state.userinfo.addrList;
        //     var list1=that.$store.state.userinfo.manageScopeIdList;
        //     var obj=[]
        //     for(var i=0;i<list1.length;i++){
        //         var obj2={
        //           id:list1[i],
        //           addressId:list2[i]
        //         }
        //         console.log(obj2)
        //         obj.push(obj2)
        //     }
        //      that.paramRoom.addressIdList=obj;
        //      that.formSearch.addressIdList=obj;  
                     // 
        // }
        that.getroomlist()        
      },
      methods: {
        getroomlist(){
          // alert("111")
          var that=this;
          that.axios.post("/SmartHomeTrade/room/selectRoomCount",that.paramRoom).then(function(res){
            if(res.data.code==0){
             
              if(res.data.data!=null){
                that.roomList=res.data.data.roomList;
                that.total=res.data.data.count
              }
               that.loading=false;
              
            }

          })
        },

            //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.paramRoom.pageSize=val;
        that.paramRoom.currentPage=1;
         that.getBuildlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.paramRoom.currentPage=val;
        that.getroomlist()
      },
        getTemplateRow(index,row){                
        this.templateSelection = row;
    
       },
        // handleSelectionChange(val) {
        //   this.multipleSelection = val;
        //   console.log(val)
        // },
        // 搜索
        onSubmit() {
          var that=this;
            if(that.formSearch.name==''){
              that.formSearch.name=null
           }
           if(that.formSearch.name==''){
              that.formSearch.name=null
           }
           if(that.formSearch.roomNum==''){
              that.formSearch.roomNum=null
           }
           if(that.formSearch.userName==''){
              that.formSearch.userName=null
           }
          if(that.formSearch.name==null&&that.formSearch.roomNum==null&&that.formSearch.userName==null){
            that.getroomlist()
            return;
          }

          that.loading=true

         
          that.axios.post("/SmartHomeTrade/room/selectRoomCount",that.formSearch).then(function(res){
            if(res.data.code==0){
              that.loading=false;
              that.roomList=res.data.data.roomList;
               that.$message.success(res.data.message)
              
            }else{
              that.$message.error(res.data.message)
            }
          })
        },
           //清空查询
      resetForm(formSearch) {
        var that=this;
            that.formSearch.name= null,
            that.formSearch.roomNum=null,
            that.formSearch.userName=null,
        that.getroomlist()
      },
            // 情况选中
         clear(){
         this.templateRadio="";
       },


    // 跳转到指定房间的设备列表页
       goEquimentlist(roomName,roomId,roomaddressId){
        var that=this;
         if(this.$store.state.extendList.equipment==0){
            that.$message.warning("您还没有设备管理权限")
          return
        }
      // alert(this.$store.state.parame.garden_buildNmae)
            // if(this.$store.state.userinfo.userLevel==2||this.$store.state.userinfo.userLevel==3){
            //    var param={
            //     build_floorName:this.$store.state.parame.build_floorName,
            //     build_floorId:this.$store.state.parame.build_floorId,
            //     floor_roomId:this.$store.state.parame.floor_roomId,
            //     floor_roomName:this.$store.state.parame.floor_roomName,
            //     room_equimentName:this.$store.state.parame.floor_roomName+roomName,
            //     room_equimentId:roomId,
            //     addressId:this.$store.state.parame.addressId,
            //     roomaddressId:roomaddressId
            //   }
            // }else{
            //     var param={
            //       build_floorName:this.$store.state.parame.build_floorName,
            //    build_floorId:this.$store.state.parame.build_floorId,
            //     floor_roomId:this.$store.state.parame.floor_roomId,
            //     floor_roomName:this.$store.state.parame.floor_roomName,
            //     room_equimentName:roomName,
            //     room_equimentId:roomId,
            //     addressId:this.$store.state.parame.addressId,
            //     roomaddressId:roomaddressId
            //   }
             
            // } 
             var parame={
                  parkname: that.$store.state.parame.parkname,
                  parkid: that.$store.state.parame.parkid,
                  buildname: that.$store.state.parame.buildname,
                  buildid: that.$store.state.parame.buildid,
                  floorname: that.$store.state.parame.floorname,
                  floorid: that.$store.state.parame.floorid,
                  allAddress:that.$store.state.parame.allAddress,
                  flooraddressId: that.$store.state.parame.flooraddressId,
                  building_floorName: that.$store.state.parame.building_floorName,
                  roomname: roomName,
                  roomid: roomId,
                  roomaddressId: roomaddressId
                };
            that.$store.commit('setRouterid',parame)

              if(that.$store.state.userinfo.userLevel==2){
                that.$router.push('/park/floorList/roomList/equimentList')
              }
               if(that.$store.state.userinfo.userLevel==3){
                that.$router.push('/building/roomList/equimentList')
              }
               if(that.$store.state.userinfo.userLevel==4){
                that.$router.push('/floor/equimentList')
              }
              
            },
          //修改房间框显示
          change(){
            var that=this;
            if(that.templateRadio==''){
              that.$message({
                type: 'info',
                message: '请选择要修改的房间'
              });
            }else {
              var changparam={
                  name:that.templateSelection.name,
                  addressId:that.templateSelection.addressId,
                  id:that.templateSelection.id
              }
            
              this.$refs.mychild.parentHandleclick(changparam);
            }
          },
          // 添加房间
          addRoom(){
            this.$refs.myaddchild.addgarden()
          },
        //  设置管理员
        administratored(){
          if(this.templateRadio==''){
            this.$message({
              type: 'info',
              message: '请选择大楼要设置管理的房间'
            });
          }else {
            if(that.templateSelection.userName!=null){
              that.$message({
              type: 'info',
              message: '该房间已有管理员不能重复设置'
            });
            return;
          }
             var manageScopeId=[];
            manageScopeId.push(this.templateSelection.id)
           
           
              var param={
               action:5,
               adrressId: this.templateSelection.addressId,
               manageScopeIdList: manageScopeId,
               userLevel:5
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
