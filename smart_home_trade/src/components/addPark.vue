<template>
	<div class="addPark">
		<el-dialog
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
        </el-dialog>
	</div>
</template>
<script>
import axios from "axios"
export default {
	name: 'addPark',
   data() {
   	return{
   		addGarden:false,
   		 getParklist:[],
        showparkinfo:false,
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
         formLabelWidth: '100px',
         addbuild: false,
         provincelist: [],//省
        citylist:[],//市
        regionlist:[],//区域
        addbuildList: {
          buildingNameList: [{
            blockName: ''
          }],
        },
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
         yardsList: [],
        createOperator:''

   	}

   },
   methods:{
   	  getaddInfo(name){
        var that=this;
          console.log(name)
          if(name==''){
              return;
          }
        axios.post("/SmartHomeTrade/garden/selectYardsByName",{
            yardName:name,
            action:2
          }).then(function(res){
            if (res.data.code==0) {
                  if(res.data!=null&&res.data.data.length!=0){
                    console.log(res.data.data)

                     if(res.data.data.length==1){
                        that.addG={
                             yardId:res.data.data[0].yardId,
                             yardName:res.data.data[0].yardName,
                             provinceName:res.data.data[0].provinceName,
                            provinceId:res.data.data[0].provinceId,        
                            cityId:res.data.data[0].cityId,        
                            areaId:res.data.data[0].areaId,
                            provinceName:res.data.data[0].provinceName,
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
       axios.post("/SmartHomeTrade/garden/queryPro",{ }).then(function (res) {
          that.provincelist=res.data.data
          console.log(res)
        })
      },
        //获取市
      getCity : function(value){
         var that=this;
         that.addG.provinceId=value;
        console.log(value)
         let obj = {};  
        obj = this.provincelist.find((item)=>{ 
        return item.provinceId === value;
        });  
        that.addG.provinceName=obj.province;
        axios.post("/SmartHomeTrade/garden/queryPro",{
          provinceId:value
        }).then(function (res) {
          that.citylist=res.data.data;
          that.addG.cityName='';
          that.addG.areaName='';
           that.addG.cityId='';
          that.addG.areaId='';       
        })
      },
        // 获取区域
      getRegion : function(value){
        var that=this;
         that.addG.cityId=value;
           console.log(value)
         let obj = {};  
        obj = this.citylist.find((item)=>{ 
        return item.cityId === value;
        });  
        that.addG.cityName=obj.city;
       axios.post("/SmartHomeTrade/garden/queryPro",{
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


 //提交添加园区信息
  add_build(addG){
        var that=this;

    that.$refs[addG].validate((valid) => {
          if (valid) {
              // console.log(that.addG)
               var buildingNameList1=[]
                  for(var i=0;i<that.addbuildList.buildingNameList.length;i++){
                    buildingNameList1.push(that.addbuildList.buildingNameList[i].blockName)
                  }
              if(that.addbuild&&buildingNameList1!=[]){
                console.log(that.addbuildList.buildingNameList);
                 
                 var bul={
                  buildingNameList:buildingNameList1
                 };
                 // that.$store.state.userInfo.tel
                 var tel={
                  createOperator:that.$store.state.userinfo.userMobile
                 }
                 // var yardid={
                 //  yardId:that.addG.yardId

                 // }
                  var addparamGb=Object.assign(bul, tel, that.addG)
                  // var addparamGb=Object.assign(bul, tel, yardid)
              }else{
                var addparamGb=that.addG

              }

              axios.post('/SmartHomeTrade/garden/insertGarden',addparamGb).then(function (res) {
             
                console.log(res)
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
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
                   that.addGarden=false; 
                 }
                   
              })            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


        // 改变新增大楼按钮
      addbuildCahgne(){
        console.log(this.addbuild)
        if(this.addbuild){
          this.$nextTick(function(){
              this.$refs.myadd.scrollTop=150
              })
          // this.$refs.myadd.scrollTop=100;
          // console.log(this.$refs.myadd.scrollTop)

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
        console.log(item.yardName)
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
      removeInfo(){
        // alert("11")
        this.showparkinfo=false;
      },
     // 关闭弹框
      addhandleClose(done,){
         done()
          this.$emit('clearselect');
         this.addbuild=false;
         this.resetaddG('addG')
      },
       resetaddG(addG) {
        this.$refs[addG].resetFields();
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
