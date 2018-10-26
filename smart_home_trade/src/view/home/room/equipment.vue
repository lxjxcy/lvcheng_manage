<template>
  <div class="equipment">
    <gobackequim></gobackequim>
    <div class="top-nav">
       <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="设备类型">
           <el-select v-model="typeid" style="width:92%" @change="gettypeName">
              <el-option
                v-for="item in this.$store.state.typeList"
                :key="item.typeid"
                :label="item.typeName"
                :value="item.typeid"
               >
              </el-option>
          </el-select>
          <!-- <el-input v-model="formSearch.typeName" placeholder=""></el-input> -->
        </el-form-item>
       <el-form-item label="设备状态">
          <el-select v-model="value" placeholder="请选择" style="width:92%">
            <el-option
              v-for="item in Statuslist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <span>{{this.$store.state.parame.buildname}}-{{this.$store.state.parame.floorname}}-{{this.$store.state.parame.roomname}}</span>
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
        <authorizationEq  ref="mychild" @refreshList="getequipmentlist"  @clearselect="clear" v-if="hackReset" @reload="reloadcom"></authorizationEq>
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
        height="404"
        border>
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.deviceNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
         <el-table-column
          prop="deviceNum"
          label="序号"
          width="55"
           align="center" >
            <template  slot-scope="scope">
              <span v-if="!startSearch">{{scope.$index+(equipmentParam.currentPage - 1) * equipmentParam.pageSize + 1}} </span>
               <span v-if="startSearch">{{scope.$index+1}}</span>
            </template>
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

            <div style="display: inline-block;width:80px;">
              <el-button class="opend" style="padding:0;border:0;color:#009fff;background: #fff;font-size: 12px;cursor: pointer" @click="switchChange(scope.row)">
              {{scope.row | equipmentStop}}
            </el-button>

            </div>
            <el-button @click="lookInfo(scope.row)" type="text" size="small"> 查看</el-button>
          </template>
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

    <!--查看设备框-->
    <el-dialog
      title="设备信息"
      :visible.sync="getLnformation"
      width="30%"
      :before-close="handleClose">
        <div class="getLnformation">
          <ul>
            <li>设备编号：{{equipmenInfo.id}}</li>
            <li>设备名称：{{equipmenInfo.name}}</li>
            <li>设备类型：{{equipmenInfo.typeName}}</li>
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
import openClose from "../park/openClose.vue"
  export default {
    name: "equipment",
       components:{
         openClose
    },


    data() {
      return {
          templateRadio:'',
           hackReset:true,
           startSearch:false,
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
         typeid:null,
         classObject:{
              'r': false,
          },
            Statuslist: [{
          value: '1',
          label: '开'
        }, {
          value: '2',
          label: '关'
        }, {
          value: '3',
          label: '停'
        }, ],
        value: null,//设备状态
        move:false,
        multipleSelection: [],
        getLnformation:false,

        deviceList: [],
        deviceListall:[],
        formation:{
          equipmentid:"SB002",

        }
      }
    },


    filters: {
      equipmentStop: function (val) {
       
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
        that.getequipmentlistall()          
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
            }else{
              that.deviceList=[]
              that.total=0;
               that.Statuslist=[]
            }
                           
          }
        })
      },
      //,所有设备
      getequipmentlistall(){
        var that=this;
        var equipmentP={
          addressIdList:that.equipmentParam.addressIdList,
          action:2,

        }
        that.axios.post("/SmartHomeTrade/device/getDeviceList",equipmentP).then(function(res){
          // that.loading=false;
          if(res.data.code==0){
            if(res.data.data!=null){
               that.deviceListall=res.data.data.deviceList;
               // that.total=res.data.data.count;  
            }
            // that.loading=false;                
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
      // 查询方法
       mainStatusnull(){
          var that=this;

          var deviceList=[]
                for(var i=0;i<that.deviceListall.length;i++){
                  if(that.deviceListall[i].mainStatus==that.value){
                    deviceList.push(that.deviceListall[i])
                  }

                }
          that.deviceList=deviceList;
          that.total=deviceList.length;

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
          if(that.formSearch.deviceNum==null&&that.formSearch.name==null&&that.formSearch.typeName==null&&that.value!=null){
            that.startSearch=true;
             that.mainStatusnull()
            return;
          }
          if(that.formSearch.deviceNum==null&&that.formSearch.name==null&&that.formSearch.typeName==null){
             that.getequipmentlist()
            return;
          }
           that.loading=true;  
                 
          that.axios.post("/SmartHomeTrade/device/getDeviceList",that.formSearch).then(function(res){
              if(res.data.code==0){
                 that.loading=false; 
                 that.startSearch=true;      
                 if(that.value==null){
                that.deviceList=res.data.data.deviceList;
                that.total=res.data.data.deviceList.length;
                return;
                }
                 var deviceList=[]
                for(var i=0;i<res.data.data.deviceList.length;i++){
                  if(res.data.data.deviceList[i].mainStatus==that.value){
                    deviceList.push(res.data.data.deviceList[i])
                  }

                }
                 that.deviceList=deviceList;
                  that.total=deviceList.length;
              // that.deviceList=res.data.data.deviceList;
               
                      
            }
          })
        },
          // 选择设备类型
      gettypeName(value){
         var that=this;
         let obj = {};  
        obj = that.$store.state.typeList.find((item)=>{ 
        return item.typeid === value;
        });  
        that.formSearch.typeName=obj.typeName;

      },
    // 刷新组件
       reloadcom(){
        this.hackReset = false
      this.$nextTick(() => {
      this.hackReset = true
      })
       },
        // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.deviceNum= null;
            that.formSearch.name=null;
             that.formSearch.typeName=null;
              that.equipmentParam.pageSize=10;
            that.equipmentParam.currentPage=1; 
            that.value=null;
            that.typeid=null;
             that.startSearch=false; 


            that.getequipmentlist()
        },
         //  转换状态
      mainStatus: function (val, column) {
       
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
          var changparam=that.templateSelection
              
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

</style>
