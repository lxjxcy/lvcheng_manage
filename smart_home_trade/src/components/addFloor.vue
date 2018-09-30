<template>
  <div class="addFloor">
    <el-dialog
          title="添加楼层"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd" style="padding-right: 10%">
            <el-form label-width="100px" :model="addF" ref="addF" :rules="rules">
              <el-form-item label="楼层名称" prop="name" style="position: relative;" ref="name">
                <el-input v-model="addF.name" @focus="removeValid('name')" placeholder="请输入楼层名称"></el-input> 
              </el-form-item>
             <!--  <el-form-item label="所属大楼" prop="buildingName" v-if="this.$store.state.userinfo.userLevel==3">
                <el-select v-model="addF.buildingName" placeholder="请选择大楼" @change="getparkInfo">
                  <el-option
                    v-for="item in blockList"
                    :key="item.buildingId"
                    :label="item.buildingName"
                    :value="item.buildingId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="添加房间" prop="addroom">
                <el-switch v-model="addroom" @change="addbuildCahgne()"></el-switch>
              </el-form-item>
            </el-form>
             <div class="addB" v-if="addroom">
              <el-form :model="addroomList" ref="addroomList" label-width="100px" class="demo-dynamic">
                <el-form-item
                  v-for="(roomNameList, index) in addroomList.roomNameList"
                  :label="'房间' + (index+1)"
                  :key="roomNameList.key"
                >
                  <el-input v-model="roomNameList.roomName" class="roominput"></el-input>
                  <span style="padding: 12px 10px;cursor: pointer" @click.prevent="remove_buildName(roomNameList)">
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
            <el-button type="primary" @click="add_build('addF')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
// import axios from "axios"
export default {
  name: 'addFloor',
   data() {
    return{
      addGarden:false,
       getParklist:[],
        showparkinfo:false,
         fullscreenLoading:false,
        addF:{
          name:'',
          addressId:'',
          buildingName:''
        },
         formLabelWidth: '100px',
         addroom: false,
         parkList: [],//省
        // citylist:[],//市
        // regionlist:[],//区域
        addroomList: {
          roomNameList: [{
            roomName: ''
          }],
        },
         rules: {
          name: [
            {  required: true,message: '园区名称不能为空'}
          ],
          buildingName: [
            {  required: true,message: '大楼名称不能为空'}
          ]
        },
         blockList: [],
    }

   },
   methods:{
       //添加楼层时获取大楼接口
      addgarden(){
        var that=this;
        // axios.post("/SmartHomeTrade/user/selectCreateAdmin",{
        //   userMobile:that.$store.state.userinfo.userMobile
        // }).then(function(res){})       
        that.addGarden=true;
        // if(that.$store.state.userinfo.userLevel==3){
        //    var param={
        //      action:1,
        //     buildingIdList:that.$store.state.userinfo.manageScopeIdList
        //   }
        //    that.axios.post("/SmartHomeTrade/block/selectMyBlock",param).then(function(res){
        //   if(res.data.code==0){
        //     that.blockList=res.data.data.blockList;
        //     console.log(that.blockList)
        //     }
        //   })
        // }else{
          that.addF.addressId=that.$store.state.parame.buildid
        // }  
      },
        // // 获取园区信息
        // getparkInfo(value){
        //   var that=this;
        //   that.addF.addressId=value;
        //   // let obj={};
        //   // obj = this.blockList.find((item)=>{ 
        //   //    return item.yardId === value;
        //   // });
        //   // that.addB.yardName=obj.yardName;
        //   // console.log(that.addB.yardName+","+that.addB.yardId)
        // },

 //提交添加楼层信息
  add_build(addF){
        var that=this;


    that.$refs[addF].validate((valid) => {
          if (valid) {
            that.fullscreenLoading=true;
               var roomNameList1=[]
                  for(var i=0;i<that.addroomList.roomNameList.length;i++){
                    if(that.addroomList.roomNameList[i].roomName!=""){
                      roomNameList1.push(that.addroomList.roomNameList[i].roomName)
                    }
                    
                  }
              if(that.addroom&&roomNameList1!=[]){
                 
                 var addparamGb={
                    addressId:that.addF.addressId,
                    name:that.addF.name,
                    roomList:roomNameList1,
                 }

              }else{
                 var addparamGb={
                  addressId:that.addF.addressId,
                  name:that.addF.name,
                  
                 }
              }

             that.axios.post('/SmartHomeTrade/floor/insertFloor',addparamGb).then(function (res) {
              that.fullscreenLoading=false;
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
                    that.$emit('refreshList');
                    that.addroom=false;
                    that.addGarden=false; 
                     that.addroomList={
                      roomNameList: [{
                        roomName: ''
                      }],
                    };
                     that.$refs[addF].resetFields();
                    
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
       
        if(this.addroom){
          this.$nextTick(function(){
              this.$refs.myadd.scrollTop=150
              })
        }else{
            this.$nextTick(function(){
              this.$refs.myadd.scrollTop=0;
              })
        }

      },
         // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },
       //删除大楼input框
      remove_buildName(item) {
        var index = this.addroomList.roomNameList.indexOf(item)
        if (index !== -1) {
          this.addroomList.roomNameList.splice(index, 1)
        }
      },
      //新增大楼input框
      add_buildName() {
        this.addroomList.roomNameList.push({
          
        });
      },
       //删除大楼input框
      remove_buildName(item) {
        var index = this.addroomList.roomNameList.indexOf(item)
        if (index !== -1) {
          this.addroomList.roomNameList.splice(index, 1)
        }
      },
      //新增大楼input框
      add_buildName() {
        this.addroomList.roomNameList.push({
          
        });
      },
     // 关闭弹框
      addhandleClose(done,){
         done()
         this.addroom=false;
         this.resetaddG('addF')
          this.$emit('clearselect');
           this.addroomList={
          roomNameList: [{
            roomName: ''
          }],
        }
      },
       resetaddG(addF) {
        this.$refs[addF].resetFields();
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
