<template>
  <div class="gardenManagement">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
        <el-form-item label="编号"  prop="yardId">
          <el-input v-model="formSearch.yardId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="名称"  prop="yardName">
          <el-input v-model="formSearch.yardName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="管理员"  prop="userName">
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
      <ul>
        <!--添加园区-->
        <li class="l"  @click="addpark()"><i class="iconfont">&#xe612;</i>添加</li>
<!--         <el-dialog
          title="添加园区"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd">
            <el-form label-width="100px" :model="addG" ref="addG" :rules="rules">
              <el-form-item label="园区名称" prop="yardName" style="position: relative;">
                <el-input v-model="addG.yardName" @blur="getaddInfo(addG.yardName)" @focus="removeInfo()">
                   
                </el-input> 
                <div class="getinfo" v-if='showparkinfo'>
                  <ul class="ulList">
                    <li v-for='item in getParklist' @click="getParklinfo(item)">{{item.yardName}}</li>
                  </ul>
                </div>

              </el-form-item>
              <el-form-item label="省"  prop="provinceName">
                <el-select v-model="addG.provinceName" placeholder="请选择省" @change="getCity">
                  <el-option
                    v-for="item in provincelist"
                    :key="item.provinceId"
                    :label="item.province"
                    :value="item.provinceId">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="市"  prop="cityName">
                <el-select v-model="addG.cityName" placeholder="请选择市" @change="getRegion">
                  <el-option
                    v-for="item in citylist"
                    :key="item.cityId"
                    :label="item.city"
                    :value="item.cityId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="区"  prop="areaName">
                <el-select v-model="addG.areaName" placeholder="请选择区域" @change="getAddress">
                  <el-option
                    v-for="item in regionlist"
                    :key="item.areaId"
                    :label="item.area"
                    :value="item.areaId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="园区地址" prop="detailAddress">
                <el-input v-model="addG.detailAddress"></el-input>
              </el-form-item>
              <el-form-item label="添加大楼" prop="addbuild">
                <el-switch v-model="addbuild" @change="addbuildCahgne()"></el-switch>
              </el-form-item>
            </el-form>
             <div class="addB" v-if="addbuild">
              <el-form :model="addbuildList" ref="addbuildList" label-width="100px" class="demo-dynamic">
                <el-form-item
                  v-for="(buildingNameList, index) in addbuildList.buildingNameList"
                  :label="'大楼' + (index+1)"
                  :key="buildingNameList.key"
                >
                  <el-input v-model="buildingNameList.blockName" class="roominput"></el-input>
                  <span style="padding: 12px 10px;cursor: pointer" @click.prevent="remove_buildName(buildingNameList)">
                    <i class="icon iconfont">&#xe504;</i>
                  </span>
                </el-form-item>
                <el-form-item>
                  <el-button @click="add_buildName"><i class="icon iconfont">&#xe612;</i></el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add_build('addG')">确定</el-button>
          </span>
        </el-dialog> -->

      <!--修改园区-->
        <li class="l" @click="change()"><i class="iconfont" >&#xe645;</i>修改</li>
        <changePark ref="mychild" @refreshList="getlist"></changePark>
        <addPark ref="myaddchild" @refreshList="getlist"></addPark>
  
        <li class="l" @click="administratored()">设置管理员</li>

        <el-dialog
          title="设置管理员"
          :visible.sync="administrator"
          width="40%"
          :before-close="sethandleClose"
          @open="onOpen">
          <el-table
            :data="listUser"
            height="300"
            ref="listUser"
            style="width: 100%"
            row-key="id"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="账号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="130">
            </el-table-column>
            <el-table-column
              label="管理员类型">
              <template slot-scope="scope">
                  {{scope.row.userLevel | userlevelStop}}
              </template>
            </el-table-column>
          </el-table>

          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="admin_istrator()">确 定</el-button>
                </span>
        </el-dialog>

      </ul>

    </div>
    <div class="main-table">

      <el-table
        :data="yardsList"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        height="410"
        v-loading="loading"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="yardId"
          label="园区编号"
          width="270">
        </el-table-column>
        <el-table-column
          prop="yardName"
          label="园区名称"
          width="130">
          <template slot-scope="scope">
            <el-button @click="goBuildinglist(scope.row.yardName,scope.row.yardId)" type="text" size="small">{{scope.row.yardName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="buildingNum"
          label="大楼数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="设备数量"
          width="80">
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
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "gardenManagement",

    data() {
      return {
        showAddb:false,
        getParklist:[],
        showparkinfo:false,
        total:0,
        loading:true,
        params:{
          action:1,
          pageSize:10,
          currentPage:1
        },
        provincelist: [],//省
        citylist:[],//市
        regionlist:[],//区域
        addbuildList: {
          buildingNameList: [{
            blockName: ''
          }],
        },
        addG:{
          yardId:null,
           yardName:"",
          provinceName:'',
          provinceId:'',
          cityName:"",
          cityId:'',
          areaName:'',
          areaId:'',
          detailAddress:'',
        },
         addbuild: false,
        addaddressid:'',//地址合并

        rules: {
          yardName: [
            {  required: true,message: '园区名称不能为空'}
          ],
          provinceName: [
            {  required: true,message: '省不能为空'}
          ],
          cityName: [
            {  required: true,message: '市不能为空'}
          ],
          areaName: [
            {  required: true, message: '区域不能为空' }
          ],
          detailAddress: [
            {  required: true,message: '地址不能为空'}
          ]
        },
        
        openid:0,
        multipleSelection: [],
        multipleSelection2:[],
        formLabelWidth: '100px',
        addGarden:false,
        addBuild:false,
        changeGarden:false,
        administrator:false,
        formSearch: {//搜索
          action:1,
          yardId:null,
          yardName:null,
          userName:null,
        },
        setadmin:{
          id:'',
          userId:''
        },
        listUser: [],
        yardsList: [],
        createOperator:''
      }
    },
    mounted(){

    this.getlist()       
        this.createOperator=this.$store.state.userinfo.userMobile
    },
    filters: {
      userlevelStop: function (val) {
        return val== 1 ? 'admin' : val == 2? '园区管理员' :val == 3? '大楼管理员' : val == 4? '楼层管理员' : val == 5? '房间管理员':""
      },
    },
    methods: {
      //  获取列表
      getlist(){
        var that=this
       
       axios.post('/SmartHomeTrade/garden/selectGdCount',that.params).then(function (res) {
            if(res.data.code==0){
                 that.loading=false
                that.total=res.data.data.count
                that.yardsList=res.data.data.yardsList
            }
         
        })
      },


      // 添加园区
      addpark(){
         this.$refs.myaddchild.addgarden();
      },
      // 园区存在时获取园区信息
      // getaddInfo(name){
      //   var that=this;
      //     console.log(name)
      //     if(name==''){
      //         return;
      //     }
      //   axios.post("/SmartHomeTrade/garden/selectYardsByName",{
      //       yardName:name,
      //       action:2
      //     }).then(function(res){
      //       if (res.data.code==0) {
      //             if(res.data!=null&&res.data.data.length!=0){
      //               console.log(res.data.data)

      //                if(res.data.data.length==1){
      //                   that.addG={
      //                        yardId:res.data.data[0].yardId,
      //                        yardName:res.data.data[0].yardName,
      //                        provinceName:res.data.data[0].provinceName,
      //                       provinceId:res.data.data[0].provinceId,        
      //                       cityId:res.data.data[0].cityId,        
      //                       areaId:res.data.data[0].areaId,
      //                       provinceName:res.data.data[0].provinceName,
      //                       cityName:res.data.data[0].cityName,
      //                       areaName:res.data.data[0].areaName,
      //                       detailAddress:res.data.data[0].detailAddress,
      //                     }
      //                 }else{
      //                   that.showparkinfo=true;
      //                   that.getParklist=res.data.data
      //                 }
      //             }

      //       }else{
      //          that.$message({
      //             type: 'error',
      //             message: res.data.message
      //           });
      //       }
      //     })
      // },
      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.params.pageSize=val;
        that.params.currentPage=1;
        that.getlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.params.currentPage=val;
        that. getlist()
      },
      //选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },

      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
        console.log(val)
      },


      //添加园区时获取省接口
      // addgarden(){
      //   var that=this;
      //   that.addGarden=true;
      //  axios.post("/SmartHomeTrade/garden/queryPro",{ }).then(function (res) {
      //     that.provincelist=res.data.data
      //     console.log(res)
      //   })
      // },
      //查询
      onSubmit() {
        var that=this;
        if(that.formSearch.yardId==null&&that.formSearch.yardName==null&&that.formSearch.userName==null){
          return;
        }
        that.loading=true
       axios.post('/SmartHomeTrade/garden/selectGdCount',that.formSearch).then(function (res) {
          that.yardsList=res.data.data.yardsList;
          that.loading=false
        })
      },
      //清空查询
      resetForm() {
        var that=this;
        that.formSearch={
          action:1,
          yardId:null,
          yardName:null,
          userName:null,
        }
        that.getlist()
      },
      //关闭弹框
      handleClose(done) {
        done()

      },
      addhandleClose(done,){
         done()
         this.addbuild=false;
         this.resetaddG('addG')
      },
       resetaddG(addG) {
        this.$refs[addG].resetFields();
      },
      sethandleClose(done){
        this.$refs.listUser.clearSelection()
        done()
      },
      // //获取市
      // getCity : function(value){
      //    var that=this;
      //    that.addG.provinceId=value;
      //   console.log(value)
      //    let obj = {};  
      //   obj = this.provincelist.find((item)=>{ 
      //   return item.provinceId === value;
      //   });  
      //   that.addG.provinceName=obj.province;
      //   axios.post("/SmartHomeTrade/garden/queryPro",{
      //     provinceId:value
      //   }).then(function (res) {
      //     that.citylist=res.data.data;
      //     that.addG.cityName='';
      //     that.addG.areaName='';
      //      that.addG.cityId='';
      //     that.addG.areaId='';       
      //   })
      // },
      // // 获取区域
      // getRegion : function(value){
      //   var that=this;
      //    that.addG.cityId=value;
      //      console.log(value)
      //    let obj = {};  
      //   obj = this.citylist.find((item)=>{ 
      //   return item.cityId === value;
      //   });  
      //   that.addG.cityName=obj.city;
      //  axios.post("/SmartHomeTrade/garden/queryPro",{
      //     cityId:value
      //   }).then(function (res) {
      //     that.regionlist=res.data.data;
      //       that.addG.areaName='';
      //       that.addG.areaId='';    
      //   })
      // },
      // // 改变新增大楼按钮
      // addbuildCahgne(){
      //   console.log(this.addbuild)
      //   if(this.addbuild){
      //     this.$nextTick(function(){
      //         this.$refs.myadd.scrollTop=150
      //         })
      //     // this.$refs.myadd.scrollTop=100;
      //     // console.log(this.$refs.myadd.scrollTop)

      //   }else{
      //       this.$nextTick(function(){
      //         this.$refs.myadd.scrollTop=0;
      //         })
      //   }

      // },
     //  // 
     //  removeInfo(){
     //    // alert("11")
     //    this.showparkinfo=false;
     //  },
     // // 获取区域id
     //  getAddress(value){
     //    var that=this;
     //    that.addG.areaId=value; 
     //     let obj = {};  
     //    obj = this.regionlist.find((item)=>{ 
     //    return item.areaId === value;
     //    });  
     //     that.addG.areaName=obj.area; 
     //  },


 //提交添加园区信息
  // add_build(addG){
  //       var that=this;

  //   that.$refs[addG].validate((valid) => {
  //         if (valid) {
  //             // console.log(that.addG)
  //              var buildingNameList1=[]
  //                 for(var i=0;i<that.addbuildList.buildingNameList.length;i++){
  //                   buildingNameList1.push(that.addbuildList.buildingNameList[i].blockName)
  //                 }
  //             if(that.addbuild&&buildingNameList1!=[]){
  //               console.log(that.addbuildList.buildingNameList);
                 
  //                var bul={
  //                 buildingNameList:buildingNameList1
  //                };
  //                // that.$store.state.userInfo.tel
  //                var tel={
  //                 createOperator:that.createOperator
  //                }
  //                // var yardid={
  //                //  yardId:that.addG.yardId

  //                // }
  //                 var addparamGb=Object.assign(bul, tel, that.addG)
  //                 // var addparamGb=Object.assign(bul, tel, yardid)
  //             }else{
  //               var addparamGb=that.addG

  //             }

  //             axios.post('/SmartHomeTrade/garden/insertGarden',addparamGb).then(function (res) {
  //               if(res.data.code==0){
  //                 that.$refs[addG].resetFields();
  //             }
  //               console.log(res)
  //               if(res.data.code==0){
  //                  that.$message({
  //                     type: 'success',
  //                     message: res.data.message
  //                   });
  //                   that. getlist()
  //                   that.addbuild=false;
  //                   that.addGarden=false; 
  //                    that. addbuildList={
  //                     buildingNameList: [{
  //                       blockName: ''
  //                     }],
  //                   };
                    
  //                }else{
  //                  that.$message({
  //                     type: 'error',
  //                     message: res.data.message
  //                   });
  //                  that.addGarden=false; 
  //                }
                   
  //             })            
  //         } else {
  //           console.log('error submit!!');
  //           return false;
  //         }
  //       });
  //     },
      //修改园区框显示
      change(){
        var that=this;
        if(that.multipleSelection==''){
          that.$message({
            type: 'info',
            message: '请选择要修改的大楼'
          });
        }else {
          var changparam={
              yardType:2,
              detailAddress:that.multipleSelection[0].detailAddress,
              yardId:that.multipleSelection[0].yardId
              }
          this.$refs.mychild.parentHandleclick(changparam);
        }
      },
      //  设置管理员
      administratored(){

        var that=this;
        if(that.multipleSelection==''){
          that.$message({
            type: 'info',
            message: '请选择大楼要设置的园区'
          });
        }else {
          axios.post('/SmartHomeTrade/garden/selectAdmin',{
            userLevel:2
          }).then(function (res) {
            that.listUser=res.data.data
            for(var i=0;i<res.data.data.length;i++){
              if(res.data.data[i].id==that.multipleSelection[0].adminId){
                console.log(i)
                that.openid=i;
              }
            }
          })
          that.administrator=true;
          that.onOpen()
        }
      },
      admin_istrator(){
        var that=this;
        that.setadmin={
          id:that.multipleSelection[0].gardenId,
          userId:that.multipleSelection2[0].id
        }

       axios.post('/SmartHomeTrade/garden/updateUser',that.setadmin).then(function (res) {
         console.log(res)
         that.$message({
           type: 'success',
           message: res.data.message
         });
         that.getlist()
         that.administrator=false;
         this.$refs.listUser.clearSelection()
       })
      },

      //  管理员转换状态
      userLevel: function (row, column) {
        return row.userLevel == 1 ? 'admin' : row.userLevel == 2? '园区管理员' : row.userLevel == 3? '大楼管理员' : row.userLevel == 4? '楼层管理员' : row.userLevel == 5? '房间管理员':""
      },
      //默认选中
      onOpen () {
        setTimeout(() => {
          this.toggleSelection([this.listUser[this.openid]])
        }, 500)
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.listUser.toggleRowSelection(row, true)
          })
        } else {
          this.$refs.listUser.clearSelection()
        }
      },

      // 跳转到指定园区的大楼列表页
      // goBuildinglist(parkName,yardId){
      //   this.$set(this.$store.state.parame,'garden_buildNmae',parkName)
      //   this.$set(this.$store.state.parame,'garden_buildId',yardId)
      //   this.$router.push({name:'buildingList'})
      // },


    //删除大楼input框
      // remove_buildName(item) {
      //   var index = this.addbuildList.buildingNameList.indexOf(item)
      //   if (index !== -1) {
      //     this.addbuildList.buildingNameList.splice(index, 1)
      //   }
      // },
      //新增大楼input框
      // add_buildName() {
      //   this.addbuildList.buildingNameList.push({
          
      //   });
      // },

      // 获取园区信息id
      // getParklinfo(item){
      //   console.log(item.yardName)
      //    this.addG={
      //              yardId:item.yardId,
      //              yardName:item.yardName,
      //              provinceName:item.provinceName,
      //             provinceId:item.provinceId,        
      //             cityId:item.cityId,        
      //             areaId:item.areaId,
      //             provinceName:item.provinceName,
      //             cityName:item.cityName,
      //             areaName:item.areaName,
      //             detailAddress:item.detailAddress,
      //    }
      //   this.showparkinfo=false;
      // }

    },
  }
</script>

<style scoped>
  .add{
    padding-right: 0.53rem;
     height: 350px;
    overflow:hidden;
    overflow-y:auto;
  }
  /*.addB{
    height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }*/
  .roominput{
    width:160px !important;
  }
  .sibmit{
    /*position: absolute;*/
    /*bottom: 20px;*/
    /*right: 20px;*/
  }
  .add-buliding{
    /*text-align: center;*/
    /*padding-left:0.8rem;*/
  }
  .ulList li{
    height:30px;
    background: #fff;
    color:#000;
  }
  .getinfo{
     position: absolute;
     width:100%;
     
     border:1px solid #ccc;
     top:38px;
     left:0 ;
     z-index:1000;
     background: #fff; 
      height: 150px;
    overflow:hidden;
    overflow-y:auto;
   

  }
</style>
