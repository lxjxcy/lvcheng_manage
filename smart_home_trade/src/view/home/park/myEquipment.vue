<!-- <template>
	<div class="myEquipment">
		dddd
	</div>
</template> -->
<template>
  <div class="myEquipment">
    <div class="top-nav">
       <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
        <el-form-item label="设备名称" class="formpark">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="设备类型" class="formpark">
          <el-input v-model="formSearch.typeName" placeholder=""></el-input>
        </el-form-item>



         <!-- <el-form-item label="所在大楼" v-if="this.$store.state.userinfo.userLevel==2" class="formpark">
          <el-input v-model="formSearch.deviceBlock" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="所在大楼" v-if="this.$store.state.userinfo.userLevel==2" class="formpark">
          <el-select v-model="build.buildingId" style="width:92%" @change="getBuildinfo">
              <el-option
                v-for="item in blockList"
                :key="item.buildingId"
                :label="item.buildingName"
                :value="item.buildingId"
               >
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在楼层" v-if="this.$store.state.userinfo.userLevel==2||this.$store.state.userinfo.userLevel==3" class="formpark floorform">
          <el-select v-model="floor.id" style="width:92%" @change="getFloorinfo">
              <el-option
                v-for="item in floorList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
               >
              </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="所在房间" class="formpark roomform">
          <el-select v-model="room.id" style="width:92%" @change="getRoominfo">
              <el-option
                v-for="item in roomList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
               >
              </el-option>
          </el-select>
        </el-form-item>



         <!-- <el-form-item label="所在楼层" v-if="this.$store.state.userinfo.userLevel==2||this.$store.state.userinfo.userLevel==3" class="formpark floorform">
          <el-input v-model="formSearch.deviceFloor" placeholder=""></el-input>
        </el-form-item> -->

       <!--   <el-form-item label="所在房间" class="formpark roomform">
          <el-input v-model="formSearch.deviceRoom" placeholder=""></el-input>
        </el-form-item> -->


       <!--  <el-form-item label="设备状态">
          <el-input v-model="deviceAddress.deviceState" placeholder=""></el-input>
        </el-form-item> -->

         <el-form-item  class="formpark">
          <el-button type="primary" @click="onSubmit" >查询</el-button>
        </el-form-item>
       
         <el-form-item  class="formpark">
           <el-button @click="resetForm('formSearch')">重置</el-button>

          </el-form-item>
      </el-form>
    </div>

    <div class="nav-middle">
      <ul>
        <li class="l"  @click="eAuthorization()"></i>设备授权</li>
        <authorizationEq ref="mychild" @refreshList="getequipmentlist"  @clearselect="clear" v-if="hackReset" @reload="reloadcom"></authorizationEq>
        <openClose ref="myopenchild" @refreshList="getequipmentlist"  @clearselect="clear"></openClose>



      </ul>
    </div>
   
    <div class="main-table">

      <el-table
        :data="deviceList"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
   
        tooltip-effect="dark"
        height="380"
        border>
       <!--  <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="序号"
          width="55"
           align="center">
            <template  slot-scope="scope"><span>{{scope.$index+(equipmentParam.currentPage - 1) * equipmentParam.pageSize + 1}} </span></template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
        
           align="center">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="设备类型"
        
           align="center">
        </el-table-column>
        <el-table-column
          prop="mainStatus"
          label="设备状态"
         :formatter="mainStatus"
           align="center">
         <!--  <template slot-scope="scope">

            <el-switch
              v-model="scope.mainStatus"
             disabled>
            </el-switch>


          </template> -->
        </el-table-column>
        <el-table-column
          prop="inAddress"
          label="所在位置"
        
           align="center">
        </el-table-column>
        <el-table-column
          label="操作"
           align="center">
          <template slot-scope="scope" style="text-align: center">

            <div style="display: inline-block;width:80px;">
              <el-button class="opend" style="padding:0;border:0;color:#009fff;background: #fff;font-size: 12px;cursor: pointer" @click="switchChange(scope.row)">
              {{scope.row | equipmentStop}}
            </el-button>
              
            </div>

            <el-button @click="lookInfo(scope.row)" type="text" size="small"> 查看</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>





    <!--查看设备框-->
    <el-dialog
      title="设备信息"
      :visible.sync="getLnformation"
      width="30%"
      :before-close="handleClose">
        <div class="getLnformation">
          <ul>
            <li>设备编号：{{equipmenInfo.id}}</li>
            <!-- <li>主机厂商：{{equipmenInfo.providerName}}</li> -->
            <li>设备名称：{{equipmenInfo.name}}</li>
            <!-- <li>官网名称：{{equipmenInfo}}</li> -->
            <li>设备类型：{{equipmenInfo.typeName}}</li>
            <!-- <li>官网地址：{{equipmenInfo}}</li> -->
            <li v-if="equipmenInfo.mainStatus==1">设备状态 :开</li>
            <li v-if="equipmenInfo.mainStatus==2">设备状态 :关</li>
            <li>所属主机：{{equipmenInfo.hostId}}</li>
            <li>设备地址：{{equipmenInfo.inAddress}}</li>
          </ul>
        </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="getLnformation = false">确定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
// import axios from "axios"
import openClose from "./openClose.vue"
  export default {
    name: "myEquipment",
     components:{
         openClose
    },

    data() {
      return {
        hackReset:true,
          templateRadio:'',
        templateSelection:{},
        total:0,
        loading:true,
        equipmenInfo:{},
        value3:true,
          classObject:{
              'wap': false,
              "floorwap":false,
          },

        equipmentParam:{
          pageSize:10,
          currentPage:1,         
        },
        deviceState:'',
         parkparam:{
        	yardId:null,
        },
         buildparam:{
        	blockId:null,
        },
        floorparam:{
        	floorId:null,
        	addressId:null,

        },

        formSearch:{
          name:null,
          typeName:null,
          deviceFloor:null,
          deviceRoom:null,
          deviceBlock:null,
        },
        url:"",
        move:false,
        multipleSelection: [],
        getLnformation:false,

        deviceList: [],
        formation:{
          equipmentid:"SB002",

        },
        deviceAddress:{
          deviceState:'',
         
        },
        floor:{
          id:"",
        },
        room:{
          id:""
        },
        build:{
          buildingId:"",

        },
        blockList:[],
        floorList:[],
        roomList:[],
      }
    },


    filters: {
      equipmentStop: function (val) {
       
          if(val.type==1||val.type==4){

            return val.mainStatus == 1? '关闭' : val.mainStatus == 2 ? '开启' : '';
          }
          
           
                    
      },
    },

    mounted(){
        var that=this;
         if(that.$store.state.userinfo.userLevel==2){
          that.$store.commit('saveIndex',"2-6")
          that.url="/SmartHomeTrade/device/yardAdUserDeviceList";
          that.axios.post("/SmartHomeTrade/device/yardAdUserDeviceList",{
            yardId:that.$store.state.parame.parkid,
            action:3,
          }).then(function(res){
            that.blockList=res.data.data.blockList;

          })
         


        }
         if(that.$store.state.userinfo.userLevel==3){
          that.$store.commit('saveIndex',"3-6")
           that.url="/SmartHomeTrade/device/blockAdUserDeviceList";
           that.axios.post("/SmartHomeTrade/device/yardAdUserDeviceList",{
            blockId:that.$store.state.parame.buildid,
            action:4,
          }).then(function(res){
            that.floorList=res.data.data.floorList;
            
          })
          
        }
         if(that.$store.state.userinfo.userLevel==4){
          that.$store.commit('saveIndex',"4-6")
           that.url="/SmartHomeTrade/device/floorAdUserDeviceList";
           that.axios.post("/SmartHomeTrade/device/yardAdUserDeviceList",{
             floorId:that.$store.state.parame.floorid,
            action:5,
          }).then(function(res){
            that.roomList=res.data.data.roomList;
            
          })
         
        }






        that.getequipmentlist()        
      },
    methods: {
      // 获取设备列表
      getequipmentlist(){
        var that=this;
      
        var equipmentParam={
            pageSize:that.equipmentParam.pageSize,
            currentPage:that.equipmentParam.currentPage
        }
         if(that.$store.state.userinfo.userLevel==2){
          var parkparam={
          yardId:that.$store.state.parame.parkid,
           }
         	var param=Object.assign(equipmentParam,parkparam)
          that.classObject.wap=true;

         }
         if(that.$store.state.userinfo.userLevel==3){
           var buildparam={
             blockId:that.$store.state.parame.buildid,
           }
         	var param=Object.assign(equipmentParam,buildparam)
          that.classObject.floorwap=true;
         }
         if(that.$store.state.userinfo.userLevel==4){
           var floorparam={
            floorId:that.$store.state.parame.floorid,
            addressId:that.$store.state.parame.flooraddressId,
           }
         	var param=Object.assign(equipmentParam,floorparam)
          
         }
         that.axios.post(that.url,param).then(function(res){
     		if(res.data.code==0){
     			if(res.data.data!=null){
     				that.deviceList=res.data.data.deviceList;
     				that.total=res.data.data.count
     			}else{
     				that.deviceList=[]
     			}
     			that.loading=false;


     		}else{
     			that.$message.error(res.data.message)
     		}
         })
         
      },




      // 选择大楼
      getBuildinfo(value){
        debugger
         var that=this;
         let obj = {};  
        obj = that.blockList.find((item)=>{ 
        return item.buildingId === value;
        });  
        that.formSearch.deviceBlock=obj.buildingName;
        that.axios.post("/SmartHomeTrade/device/yardAdUserDeviceList",{
            blockId:value,
            action:4,
        }).then(function (res) {
          that.floorList=res.data.data.floorList;
          that.formSearch.deviceFloor='';
          that.formSearch.deviceRoom='';
          that.floor.id="";          
          that.roomList=[]      
        })

      },
      // 选择楼层
      getFloorinfo(value){
         var that=this;
         let obj = {};  
        obj = that.floorList.find((item)=>{ 
        return item.id === value;
        });  
        that.formSearch.deviceFloor=obj.name;
        that.axios.post("/SmartHomeTrade/device/yardAdUserDeviceList",{
            floorId:value,
            action:5,
        }).then(function (res) {
          that.roomList=res.data.data.roomList;
          that.formSearch.deviceRoom=''; 
           that.room.id="";              
        })
      },
      // 选择房间
      getRoominfo(value){
          var that=this;
         let obj = {};  
        obj = that.roomList.find((item)=>{ 
        return item.id === value;
        });  
        that.formSearch.deviceRoom=obj.name;

      },
      // 刷新组件
       reloadcom(){
        this.hackReset = false
      this.$nextTick(() => {
      this.hackReset = true
      })
       },
     // 每页几条
        handleSizeChange(val) {
        var that=this;
        that.equipmentParam.pageSize=val;
        that.equipmentParam.currentPage=1;
        that.getequipmentlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.equipmentParam.currentPage=val;
        that.getequipmentlist()
      },
        //查询
        onSubmit() {
          var that=this;
         
           if(that.formSearch.name==''){
            that.formSearch.name=null
          }
           if(that.formSearch.typeName==''){
            that.formSearch.typeName=null
          }
          if(that.formSearch.deviceBlock==''){
            that.formSearch.deviceBlock=null
          }
          if(that.formSearch.deviceFloor==''){
            that.formSearch.deviceFloor=null
          }
          if(that.formSearch.deviceRoom==''){
            that.formSearch.deviceRoom=null
          }
           var formSearch={
            name:that.formSearch.name,
            deviceRoom:that.formSearch.deviceRoom,
            deviceBlock:that.formSearch.deviceBlock,
            deviceFloor:that.formSearch.deviceFloor,
            typeName:that.formSearch.typeName,
           }

          if(that.$store.state.userinfo.userLevel==2){
              if(that.formSearch.name==null&&that.formSearch.typeName==null&&that.formSearch.deviceRoom==null&&that.formSearch.deviceFloor==null&&that.formSearch.deviceBlock==null){
                 that.getequipmentlist()
                return;
              }
             
              var parkparam={
                   yardId:that.$store.state.parame.parkid,
               }
              var param=Object.assign(parkparam,formSearch)
              that.Search(param)
              
             
          }
           if(that.$store.state.userinfo.userLevel==3){
              if(that.formSearch.name==null&&that.formSearch.typeName==null&&that.formSearch.deviceRoom==null&&that.formSearch.deviceFloor==null){
                 that.getequipmentlist()
                return;
              }
              
               var buildparam={
               blockId:that.$store.state.parame.buildid,
              }
    
              var param=Object.assign(buildparam,formSearch)
              that.Search(param)
          }
           if(that.$store.state.userinfo.userLevel==4){
              if(that.formSearch.name==null&&that.formSearch.typeName==null&&that.formSearch.deviceRoom==null){
                 that.getequipmentlist()
                return;
              }
             
              var floorparam={
                floorId:that.$store.state.parame.floorid,
                addressId:that.$store.state.parame.flooraddressId,
               }
             var paramd=Object.assign(floorparam,formSearch)
              that.Search(paramd)
          }
          
         
        },
        // 查询方法
        Search(param){
          var that=this;
           that.loading=true;             
          that.axios.post(that.url,param).then(function(res){
              if(res.data.code==0){
              that.deviceList=res.data.data.deviceList;
                that.loading=false;  
                      
            }

          })

        },

        // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.deviceNum= null,
            that.formSearch.name=null,
             that.formSearch.typeName=null, 
             that.formSearch.deviceBlock=null,   
             that.formSearch.deviceRoom=null,   
             that.formSearch.deviceFloor=null,
             that.build.buildingId="";  
             that.floor.id="";
              that.room.id="";  
            that.getequipmentlist()
        },
         //  转换状态
      mainStatus: function (val, column) {
        // if(row.type==1||row.type==4){
        //    return row.mainStatus == 1? '开启' : row.mainStatus == 2? '关闭' : row.mainStatus == 3? '停':""
        // }

              let state=val.state
              let content=''
              if(state.onlineState==='ONLINE'||state.online==='true'){
                content='在线'
              }else if(state.onlineState!=='ONLINE'||state.online==='false'){
                return '离线'
              }
              //灯和插座
              if(val.type===1||val.type===2){
                if(state.main==='1'){
                  content='开'
                }
                else if(state.main==='2'){
                  content='关'
                }
              }

              // //门锁
              // if (h.type === 3) {
              //   if (state.main==='1') {
              //     content='开'
              //   }else{
              //     content='关'
              //   }
              // }
              //窗帘电机
              if (state.motorPos || val.type===4) {
                switch (state.main) {
                  case '2' :
                    content= '关'
                    break
                  case '1' :
                    content= '开'
                    break
                  case '3' :
                    content= '开'
                    break
                  default:
                    return
                }
              }
              //布尔传感器---人体传感器/烟感传感器/燃气传感器/水浸报警器
              if (val.type === 5) {
                if (state.dismantle == 'true') {
                  return '防拆报警'
                }
                else if (state.lowPower == 'true') {
                  return '低电量报警'
                }
                else if (state.probeFalloff == 'true') {
                  return '探头脱落报警'
                }
                else {
                  return '警戒'
                }
              }
              //数值传感器---温度/湿度/光照
              if (val.type === 6) {
                if (state.num) {
                  if (val.subType == '17') {
                    return state.num + '℃'
                  } else if (val.subType == '18') {
                    return state.num + '%RH'
                  } else if (val.subType == '19') {
                    return state.num + 'lux'
                  }
                }
              }
              //报警器
              if (val.type === 21) {
                if (state.alarm==='true') {
                  content='报警中'
                }else{
                  content='警戒'
                }
              }
              //红外设备
              if (val.type === 23) {

              }
              //呼叫面板
              if (val.type === 25) {
                if (state.on === 'true') {
                  return '报警'
                } else {
                  return '警戒'
                }
              }
              //中央空调
              // if (h.type === 27) {
              //   if (state.main === '1') {
              //     return '开'
              //   }else{
              //     return '关'
              //   }
              // }

              // if (h.type === 27) {
              //   if (state.online === 'true') {
              //     return '在线'
              //   }else{
              //     return '离线'
              //   }
              // }
              //情景面板
              if (val.type === 29) {
                if (!val.operateType) {
                  return '未关联'
                }
              }
              //快捷面板
              if (val.type === 31) {

              }
              //门磁
              if (val.type === 38) {
                if (state.main === '1') {
                  return '开'
                }else{
                  return '关'
                }
              }
              return content

       
      },

      getTemplateRow(index,row){                
        this.templateSelection = row;
        debugger
       
       },
      //关闭设备信息框
      handleClose(done) {
            done();
      },
      // 情况选中
         clear(){
         this.templateRadio="";
       },


    //  设备授权
      eAuthorization(){
        var that=this;

        if(that.templateRadio==''){
          that.$message({
            type: 'info',
            message: '请选择要授权的设备'
          });
        }else {
          var changparam={
               deviceId:that.templateSelection.id,
               deviceName:that.templateSelection.name,
               roomName:that.templateSelection.deviceRoom,
               roomId:that.templateSelection.roomId,

          }
             that.$refs.mychild.getAuthrization(changparam);
        }
        
      },
      //  查看设备
      lookInfo(row){
        // if(this.$store.state.userinfo.userDeviceAuth!=1){
        //   this.$message.info("抱歉,您没有查看设备的权限")
        //   return
        // }
          this.getLnformation=true;
          this.equipmenInfo=row;
        },
        // 操作设备
        switchChange(e){
           if(this.$store.state.userinfo.userDeviceAuth!=1){
              this.$message.info("抱歉,您没有操作设备的权限")
             return
           }

          this.$refs.myopenchild.open(e);
         


        },
    },
  }
</script>

<style scoped>
.getLnformation{
  height:250px;
}
.wap{
  height:100px;
  /*margin-bottom: 0;*/
  padding-bottom: 0;
}
.floorwap{
  height:100px;
  /*margin-bottom: 0;*/
  padding-bottom: 0;
}
.floorwap .floorform{
  margin-right: 20%;
}
.wap .formpark{
  margin-bottom: 0px;
}
.floorwap .formpark{
  margin-bottom: 0px;
}
.opend:hover{
  padding:4.5px 15px  !important;
  color:#fff  !important;
  background: #0ec07d  !important
}
.opend:active{
  padding:4.5px 15px  !important;
  color:#fff  !important;
  background: #0ec07d  !important
}

.opend{
  
}


</style>

