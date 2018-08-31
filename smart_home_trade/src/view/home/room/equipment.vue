<template>
  <div class="equipment">
    <gobackequim></gobackequim>
    <div class="top-nav">
       <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSearch.deviceNum" placeholder=""></el-input>
        </el-form-item>
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
       <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==2||this.$store.state.userinfo.userLevel==3||this.$store.state.userinfo.userLevel==4">
        <span>{{this.$store.state.parame.room_equimentName}}</span>
        ---设备列表
      </div>
      <ul v-bind:class="classObject">
        <li class="l" @click="move = true"><i class="el-icon-location-outline"></i>迁移设备</li>
        <li class="l"  @click="eAuthorization()"><i class="el-icon-edit-outline"></i>设备授权</li>
        <authorizationEq ref="mychild" @refreshList="getequipmentlist"></authorizationEq>



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
         <el-table-column label="" width="40">
          <template slot-scope="scope">
              <el-radio :label="scope.row.deviceNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="设备编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="设备类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mainStatus"
          label="设备状态"
          width="180" :formatter="mainStatus">
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
          width="200">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">

            <el-button size="small" type="text" @click="switchChange(scope.row)">
              {{scope.row.mainStatus | equipmentStop}}
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
            <li>设备编号：{{equipmenInfo.deviceNum}}</li>
            <!-- <li>主机厂商：{{equipmenInfo.providerName}}</li> -->
            <li>设备名称：{{equipmenInfo.name}}</li>
            <!-- <li>官网名称：{{equipmenInfo}}</li> -->
            <li>设备类型：{{equipmenInfo.typeName}}</li>
            <!-- <li>官网地址：{{equipmenInfo}}</li> -->
            <li v-if="equipmenInfo.mainStatus==1">设备状态 :开</li>
            <li v-if="equipmenInfo.mainStatus==2">设备状态 :关</li>
            <li>所属主机：{{equipmenInfo.hostName}}</li>
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
import axios from "axios"
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
        return val == 1? '关闭' : val == 2 ? '开闭' : '';
      },
    },
    mounted(){
        var that=this;
        if(that.$store.state.userinfo.userLevel==2||that.$store.state.userinfo.userLevel==3||that.$store.state.userinfo.userLevel==4){
          that.classObject.r=true;
          var obj=[]
          var obj1= {
            id:that.$store.state.parame.room_equimentId,
            addressId:that.$store.state.parame.roomaddressId
          };
          obj.push(obj1)
          that.equipmentParam.addressIdList=obj
          that.formSearch.addressIdList=obj
        }else{
            var list2=that.$store.state.userinfo.addrList;
            var list1=that.$store.state.userinfo.manageScopeIdList;
            var obj=[]
            for(var i=0;i<list1.length;i++){
                var obj2={
                  id:list1[i],
                  addressId:list2[i]
                }
                console.log(obj2)
                obj.push(obj2)
            }
             that.equipmentParam.addressIdList=obj;
             that.formSearch.addressIdList=obj;  
                     
        }
        that.getequipmentlist()        
      },
    methods: {
      // 获取设备列表
      getequipmentlist(){
        var that=this;
        axios.post("/SmartHomeTrade/device/getDeviceList",that.equipmentParam).then(function(res){
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
          if(that.formSearch.deviceNum==null&&that.formSearch.name==null&&that.formSearch.typeName==null){
            return;
          }
           that.loading=true;             
          axios.post("/SmartHomeTrade/device/getDeviceList",that.formSearch).then(function(res){
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
        // 开关
        switchChange(e){
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
               userId: this.$store.state.userinfo.uuid,
               deviceId:e.id
              }
          }else if(e.type==4){
             var param={
            "opt":clo
            }
            var Swiparam={
              "command":"SetMotorOption",
              "argument":param,
               userId: this.$store.state.userinfo.uuid,
               deviceId:e.id
              }

          }
        
         
          that.axios.post('/SmartHomeTrade/device/deviceSwitchOnFalse',Swiparam).then(function(res){
            if(res.data.code==0){
              that.getequipmentlist()

            }

          })


        },









      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   console.log(val)
      // },
        getTemplateRow(index,row){                
        this.templateSelection = row;
        console.log(this.templateSelection)
       },
      //关闭设备信息框
      handleClose(done) {
            done();
      },
    
      //  转换状态
      mainStatus: function (row, column) {
        return row.mainStatus == 1? '开启' : row.mainStatus == 2? '关闭' : row.mainStatus == 3? '停':""
      },
    //  查看设备
      lookInfo(row){
          this.getLnformation=true;
          this.equipmenInfo=row;
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
          var changparam=that.templateSelection.id
             that.$refs.mychild.getAuthrization(changparam);
        }
        
      }
    },
  }
</script>

<style scoped>

</style>
