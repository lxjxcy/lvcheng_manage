<template>
  <div class="equipment">
    <gobackequim></gobackequim>
    <div class="top-nav">
       <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
       <!--  <el-form-item label="编号">
          <el-input v-model="formSearch.deviceNum" placeholder=""></el-input>
        </el-form-item> -->
         <el-form-item label="设备类型">
          <el-input v-model="formSearch.typeName" placeholder=""></el-input>
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
        <span>{{this.$store.state.parame.buildname}}{{this.$store.state.parame.floorname}}{{this.$store.state.parame.roomname}}</span>
        ---设备列表
      </div>
       <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==3">
        <span>{{this.$store.state.parame.floorname}}{{this.$store.state.parame.roomname}}</span>
        ---设备列表
      </div>
       <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==4">
        <span>{{this.$store.state.parame.roomname}}</span>
        ---设备列表
      </div>
      <ul v-bind:class="classObject">
        <!-- <li class="l" @click="move = true" v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1"><i class="el-icon-location-outline"></i>迁移设备</li> -->
        <li class="l"  @click="eAuthorization()" v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.quementAuthor==1"><i class="el-icon-edit-outline"></i>设备授权</li>
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
        height="404"
        border>
       <!--  <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.deviceNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="序号"
          width="55"
           align="center">
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
    name: "equipment",

    data() {
      return {
          templateRadio:'',
        templateSelection:{},
        total:0,
        loading:true,
        equipmenInfo:{},
        value3:true,

        equipmentParam:{
          pageSize:10,
          currentPage:1,
          addressIdList:[],
        },
        formSearch:{
          deviceNum:null,
          name:null,
          typeName:null,
          addressIdList:[],

        },
         classObject:{
              'r': false,
          },
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
          if(this.$store.state.userinfo.userLevel==5){
          this.$store.commit('saveIndex',"5-2")
        }
        
     },

    mounted(){
        var that=this;

        // that.$store.commit('saveIndex',"5-2")
        if(that.$store.state.userinfo.userLevel==2||that.$store.state.userinfo.userLevel==3||that.$store.state.userinfo.userLevel==4){
          that.classObject.r=true;
        }
         if(that.$store.state.parame.roomid==null&&that.$store.state.parame.roomaddressId==null){
            that.equipmentParam.addressIdList=null
            that.formSearch.addressIdList=null
         }else{
               var obj=[]
              var obj1= {
                id:that.$store.state.parame.roomid,
                addressId:that.$store.state.parame.roomaddressId
              };
              obj.push(obj1)
              that.equipmentParam.addressIdList=obj
              that.formSearch.addressIdList=obj
         }
        that.getequipmentlist()        
      },
    methods: {
      // 获取设备列表
      getequipmentlist(){
        var that=this;
        that.axios.post("/SmartHomeTrade/device/getDeviceList",that.equipmentParam).then(function(res){
          that.loading=false;
          if(res.data.code==0){
            if(res.data.data!=null){
               that.deviceList=res.data.data.deviceList;
               that.total=res.data.data.count;  
            }
            that.loading=false;
                
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
          if(that.formSearch.deviceNum==''){
            that.formSearch.deviceNum=null
          }
           if(that.formSearch.name==''){
            that.formSearch.name=null
          }
           if(that.formSearch.typeName==''){
            that.formSearch.typeName=null
          }
          if(that.formSearch.deviceNum==null&&that.formSearch.name==null&&that.formSearch.typeName==null){
             that.getequipmentlist()
            return;
          }
           that.loading=true;             
          that.axios.post("/SmartHomeTrade/device/getDeviceList",that.formSearch).then(function(res){
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
               deviceName:that.templateSelection.name 
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

</style>
