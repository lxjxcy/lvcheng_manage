<template>
	<div class="addPark">
		<el-dialog
          title="添加园区"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd">
           
            <el-form label-width="100px" :model="addG" ref="addG" :rules="rules">

               <el-form-item label="园区名称"  prop="yardName">
               <el-autocomplete
                  v-model="addG.yardName"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  :trigger-on-focus="false"
                  @select-when-unmatched="false"
                   style="width:100%"                  
                >
                  
                </el-autocomplete>
      
              </el-form-item>



            <!--   <el-form-item label="园区名称" prop="yardName" style="position: relative;" ref="yardName">
                <el-input v-model="addG.yardName" placeholder="请输入园区名称" @keyup.enter.native="getaddInfo(addG.yardName)" @focus="removeInfo('yardName')">                   
                </el-input> 
                <div class="getinfo" v-if='showparkinfo'>
                  <ul class="ulList">
                    <li v-for='item in getParklist' @click="getParklinfo(item)">{{item.yardName}}</li>
                  </ul>
                </div>
              </el-form-item> -->
              <el-form-item label="省"  prop="provinceId">
                <el-select v-model="addG.provinceId" placeholder="请选择省" @change="getCity" style="width:100%">
                  <el-option
                    v-for="item in provincelist"
                    :key="item.provinceId" 
                    :label="item.province"
                    :value="item.provinceId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="市"  prop="cityId">
                <el-select v-model="addG.cityId" placeholder="请选择市" @change="getRegion" style="width:100%">
                  <el-option
                    v-for="item in citylist"
                    :key="item.cityId"
                    :label="item.city"
                    :value="item.cityId"
                   >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="区"  prop="areaId">
                <el-select v-model="addG.areaId" placeholder="请选择区域" @change="getAddress" style="width:100%">
                  <el-option
                    v-for="item in regionlist"
                    :key="item.areaId"
                    :label="item.area"
                    :value="item.areaId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="园区地址" prop="detailAddress" ref="detailAddress">
                <el-input v-model="addG.detailAddress" placeholder="请输入园区地址" @focus="removeValid('detailAddress')"></el-input>
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
                  prop="blockName"

                >
                  <el-input v-model="buildingNameList.blockName" class="roominput"></el-input>
                  <span style="padding: 12px 1.5%;cursor: pointer" @click.prevent="remove_buildName(buildingNameList)">
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
            <el-button type="primary" @click="add_build('addG')" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确定</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script>
// import axios from "axios"
export default {
	name: 'addPark',
   data() {
   	return{
   		addGarden:false,//弹框
     
       fullscreenLoading: false,//提交加载
   		 getParklist:[],//园区数据
        showparkinfo:false,//模糊查询园区数据显示
   		  addG:{//添加园区
          yardId:null,//园区id
           yardName:"",//园区名称
          provinceName:'',//省名称
          provinceId:'',//省id
          cityName:"",//市名称
          cityId:'',//市id
          areaName:'',//区域名称
          areaId:'',//区域id
          // state4:'',
          detailAddress:'',//详细地址
        },
         formLabelWidth: '100px',

         addbuild: false,//添加大楼
         provincelist: [],//省数据
        citylist:[],//市数据
        regionlist:[],//区域数据
        addbuildList: {//大楼列表
          buildingNameList: [{
            blockName: ''
          }],
        },
        // rule:{
        //     blockName: [
        //     {  required: true,message: '大楼名称不能为空'}
        //   ],

        // },
         rules: {
          // state4: [
          //   {  required: true,message: '园区名称不能为空'}
          // ],
           yardName: [
            {  required: true,message: '园区名称不能为空'}
          ],
          provinceId: [
            {  required: true,message: '省不能为空'}
          ],
          cityId: [
            {  required: true,message: '市不能为空'}
          ],
          areaId: [
            {  required: true, message: '区域不能为空' }
          ],
          detailAddress: [
            {  required: true,message: '地址不能为空'}
          ]
        },
         yardsList: [],
        createOperator:'',
         restaurants: [],
       
        timeout:  null

   	}

   },
   methods:{
   	  getaddInfo(name){
        alert("aaaaa")
        var that=this;
        
          if(name==''){
              return;
          }
        that.axios.post("/SmartHomeTrade/garden/selectYardsByName",{
            yardName:name,
            action:2
          }).then(function(res){
            if (res.data.code==0) {
                  if(res.data!=null&&res.data.data.length!=0){
                 


                     if(res.data.data.length==1){
                        that.addG={
                             yardId:res.data.data[0].yardId,
                             yardName:res.data.data[0].yardName,
                            provinceId:res.data.data[0].provinceId,        
                            cityId:res.data.data[0].cityId,        
                            areaId:res.data.data[0].areaId,
                            provinceName:res.data.data[0].provinceId,
                            cityName:res.data.data[0].cityName,
                            areaName:res.data.data[0].areaName,
                            detailAddress:res.data.data[0].detailAddress,
                          }
                      }else{
                        that.showparkinfo=true;
                        that.getParklist=res.data.data
                      }
                  }

            }else{
               that.$message({
                  type: 'error',
                  message: res.data.message
                });
            }
          })
      },

       //添加园区时获取省接口
      addgarden(){
        var that=this;
        that.addGarden=true;
       that.axios.post("/SmartHomeTrade/garden/queryPro",{ }).then(function (res) {
          that.provincelist=res.data.data
         
        })
      },
        //获取市
      getCity : function(value){
         var that=this;
         that.addG.provinceId=value;
      
         let obj = {};  
        obj = this.provincelist.find((item)=>{ 
        return item.provinceId === value;
        });  
        that.addG.provinceName=obj.province;
        that.axios.post("/SmartHomeTrade/garden/queryPro",{
          provinceId:value
        }).then(function (res) {
          that.citylist=res.data.data;
          that.addG.cityName='';
          that.addG.areaName='';
           that.addG.cityId='';
          that.addG.areaId='';
          that.regionlist=[]      
        })
      },
        // 获取区域
      getRegion : function(value){
        var that=this;
         that.addG.cityId=value;
          
         let obj = {};  
        obj = this.citylist.find((item)=>{ 
        return item.cityId === value;
        });  
        that.addG.cityName=obj.city;
       that.axios.post("/SmartHomeTrade/garden/queryPro",{
          cityId:value
        }).then(function (res) {
          that.regionlist=res.data.data;
            that.addG.areaName='';
            that.addG.areaId=''; 

        })
      },
       // 获取区域id
      getAddress(value){
        var that=this;
        that.addG.areaId=value; 
         let obj = {};  
        obj = this.regionlist.find((item)=>{ 
        return item.areaId === value;
        });  
         that.addG.areaName=obj.area; 
      },
         // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },


 //提交添加园区信息
  add_build(addG){
        var that=this;

    that.$refs[addG].validate((valid) => {
          if (valid) {
            that.fullscreenLoading=true;
             
               var buildingNameList1=[]
                  for(var i=0;i<that.addbuildList.buildingNameList.length;i++){
                    if(that.addbuildList.buildingNameList[i].blockName!=""){
                      buildingNameList1.push(that.addbuildList.buildingNameList[i].blockName)
                    }
                    
                  }
              if(that.addbuild&&buildingNameList1!=[]){
              
                 
                 var bul={
                  buildingNameList:buildingNameList1
                 };
                 var tel={
                  createOperator:that.$store.state.userinfo.userMobile
                 }
                  var addparamGb=Object.assign(bul, tel, that.addG)
                  // var addparamGb=Object.assign(bul, tel, yardid)
              }else{
                var addparamGb=that.addG

              }

              that.axios.post('/SmartHomeTrade/garden/insertGarden',addparamGb).then(function (res) {
                that.fullscreenLoading=false;
             
              
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
                    that.fullscreenLoading=false;
                    that.$emit('refreshList');
                    that.addbuild=false;
                    that.addGarden=false; 
                     that.$refs[addG].resetFields();
                     that. addbuildList={
                      buildingNameList: [{
                        blockName: ''
                      }],
                    };
                    
                 }else{
                   that.$message({
                      type: 'error',
                      message: res.data.message
                    });
                   // that.$refs[addG].resetFields();
                   that.fullscreenLoading=false;
                   // that.addGarden=false; 
                 }
                   
              })            
          } else {
         
            return false;
          }
        });
      },


        // 改变新增大楼按钮
      addbuildCahgne(){
       
        if(this.addbuild){
          this.$nextTick(function(){
              this.$refs.myadd.scrollTop=150
              })
          // this.$refs.myadd.scrollTop=100;
         

        }else{
            this.$nextTick(function(){
              this.$refs.myadd.scrollTop=0;
              })
        }

      },
       //删除大楼input框
      remove_buildName(item) {
        var index = this.addbuildList.buildingNameList.indexOf(item)
        if (index !== -1) {
          this.addbuildList.buildingNameList.splice(index, 1)
        }
      },
      //新增大楼input框
      add_buildName() {
        this.addbuildList.buildingNameList.push({
          
        });
      },


      // 获取园区信息id
      getParklinfo(item){
        debugger
     
         this.addG={
                   yardId:item.yardId,
                   yardName:item.yardName,
                   provinceName:item.provinceName,
                  provinceId:item.provinceId,        
                  cityId:item.cityId,        
                  areaId:item.areaId,
                  provinceName:item.provinceName,
                  cityName:item.cityName,
                  areaName:item.areaName,
                  detailAddress:item.detailAddress,
         }
        this.showparkinfo=false;
      },

        //焦点离开
      removeInfo(formName){
        // alert("11")
        this.showparkinfo=false;
        this.$refs[formName].clearValidate();
      },
     // 关闭弹框
      addhandleClose(done,){
         done()
          this.$emit('clearselect');
          this.$emit('reload');
          
         this.addbuild=false;
         this.addG.yardName='';
         this.resetaddG('addG')
         this.addbuildList= {
          buildingNameList: [{
            blockName: ''
          }],
        }
      },
      //清空弹框数据
       resetaddG(addG) {
        this.$refs[addG].resetFields();
      },

      querySearchAsync(queryString, cb) {
        // alert(queryString)
        if(queryString==""){
          return;
        }
        var that=this;
         that.axios.post("/SmartHomeTrade/garden/selectYardsByName",{
            yardName:queryString,
            action:2
          }).then(function(res){
            var restaurants=res.data.data
            console.log(restaurants)
            for(var i=0;i<res.data.data.length;i++){
                restaurants[i].value=res.data.data[i].yardName
            }

           
            if (restaurants.length == 0) {

           restaurants = [{value: '暂无数据'}]
         }     
          cb(restaurants);
           


          })
        // debugger;
  
        // var results = queryString ? restaurants.filter(that.createStateFilter(queryString)) : restaurants;
       
   
      },
      createStateFilter(queryString) {
       return (state) => {
          return (state.value.indexOf(queryString) === 0);
        };
      },



      handleSelect(item) {
        var that=this
        console.log(item);
        that.addG={

                   yardId:item.yardId,
                   yardName:item.yardName,
                   provinceName:item.provinceName,
                  provinceId:item.provinceId,        
                  cityId:item.cityId,        
                  areaId:item.areaId,
                  provinceName:item.provinceName,
                  cityName:item.cityName,
                  areaName:item.areaName,
                  detailAddress:item.detailAddress,
         }
          // 获取市区
          that.axios.post("/SmartHomeTrade/garden/queryPro",{
          provinceId:item.provinceId
        }).then(function (res) {
          that.citylist=res.data.data;
        })
        // 获取区域
         that.axios.post("/SmartHomeTrade/garden/queryPro",{
          cityId:item.cityId
        }).then(function (res) {
          that.regionlist=res.data.data;
        })


        // 获取区域
        

         //  this.companyId = parseInt(item.companyId);
         //  this.$http.get("/vehicle/detail/" + this.carId,
         //  ).then((response) => {
         //    this.checkCarInfo = response.data.data;
         //    if (!this.checkCarInfo.qualification) {
         //      this.checkCarInfo.qualification = this.qualificationDefault();
         //    }
         //    this.cheCarBox = true;
         //  });
         //  this.carCheckCompany() 

      },









   }
}
	
</script>
<style scoped>
  .add{
    padding-right: 0.53rem;
     height: 350px;
    overflow:hidden;
    overflow-y:auto;
  }

  .roominput{
    width:82.5% !important;
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
