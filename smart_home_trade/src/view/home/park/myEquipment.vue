<!-- <template>
	<div class="myEquipment">
		dddd
	</div>
</template> -->
<template>
  <div class="myEquipment">
    <div class="top-nav" v-bind:class="classObject">
       <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
        <el-form-item label="设备名称" class="formpark">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="设备类型" class="formpark">
          <el-input v-model="formSearch.typeName" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="所在大楼" v-if="this.$store.state.userinfo.userLevel==2" class="formpark">
          <el-input v-model="formSearch.deviceBlock" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="所在楼层" v-if="this.$store.state.userinfo.userLevel==2||this.$store.state.userinfo.userLevel==3" class="formpark floorform">
          <el-input v-model="formSearch.deviceFloor" placeholder=""></el-input>

        </el-form-item>

         <el-form-item label="所在房间" class="formpark roomform">
          <el-input v-model="formSearch.deviceRoom" placeholder=""></el-input>
        </el-form-item>
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
        <authorizationEq ref="mychild" @refreshList="getequipmentlist"  @clearselect="clear"></authorizationEq>



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
          <template slot-scope="scope">

            <el-button size="small" type="text" @click="switchChange(scope.row)">
              {{scope.row | equipmentStop}}
            </el-button>

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
  export default {
    name: "myEquipment",

    data() {
      return {
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

        }
      }
    },


    filters: {
      equipmentStop: function (val) {
        console.log(val)
          if(val.type==1||val.type==4){

            return val.mainStatus == 1? '关闭' : val.mainStatus == 2 ? '开启' : '';
          }
      },
    },

    // beforeMount(){
    //     if(this.$store.state.userinfo.userLevel==2){
    //       this.$store.commit('saveIndex',"2-6")
    //     }
    //      if(this.$store.state.userinfo.userLevel==3){
    //       this.$store.commit('saveIndex',"3-2")
    //     }
    //      if(this.$store.state.userinfo.userLevel==4){
    //       this.$store.commit('saveIndex',"4-2")
    //     }   
    //  },

    mounted(){
        var that=this;
         if(that.$store.state.userinfo.userLevel==2){
          that.$store.commit('saveIndex',"2-6")
          that.url="/SmartHomeTrade/device/yardAdUserDeviceList"
         


        }
         if(that.$store.state.userinfo.userLevel==3){
          that.$store.commit('saveIndex',"3-6")
           that.url="/SmartHomeTrade/device/blockAdUserDeviceList"
          
        }
         if(that.$store.state.userinfo.userLevel==4){
          that.$store.commit('saveIndex',"4-6")
           that.url="/SmartHomeTrade/device/floorAdUserDeviceList"
         
        }   
        that.getequipmentlist()        
      },
    methods: {
      // 获取设备列表
      getequipmentlist(){
        var that=this;
        console.log(that.equipmentParam)
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
               console.log(that.equipmentParam)
             
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
            that.getequipmentlist()
        },
         //  转换状态
      mainStatus: function (row, column) {
        if(row.type==1||row.type==4){
           return row.mainStatus == 1? '开启' : row.mainStatus == 2? '关闭' : row.mainStatus == 3? '停':""
        }

       
      },

      getTemplateRow(index,row){                
        this.templateSelection = row;
        debugger
        console.log(this.templateSelection)
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
          var that=this;
          console.log(e.mainStatus)

        

          if(e.mainStatus==1){
            var swit=false;
            var clo="CLOSE"
          }else{
            var swit=true;
             var clo="OPEN"
          }         
          if(e.type==1){
            var param={
            "on":swit
            }
             var Swiparam={
              "command":"SwitchMain",
              "argument":param,
              }
          }else if(e.type==4){
             var param={
            "opt":clo
            }
            var Swiparam={
              "command":"SetMotorOption",
              "argument":param,
              }

          } 

         // 共同参数
            var commparam={
               userId: this.$store.state.userinfo.uuid,
               deviceId:e.id,
               userDeviceAuth:this.$store.state.userinfo.userDeviceAuth
            }

          var param = Object.assign(commparam, Swiparam);       
          that.axios.post('/SmartHomeTrade/device/deviceSwitchOnFalse',param).then(function(res){
            if(res.data.code==0){
              that.getequipmentlist()

            }else{
              that.$message.error(res.data.message)
            }

          })


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
/*.wap .rightch,.wap .rightre{
  float: left;

}
.wap .rightch{
  margin-right: 20%;
}*/

</style>

