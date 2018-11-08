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
                <el-input v-model="addF.name" @focus="removeValid('name')" placeholder="请输入楼层名称(6个字符以内)"></el-input> 
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
                  <el-input v-model="roomNameList.roomName" class="roominput" placeholder="房间名称不能超过6个字符"></el-input>
                  <span style="padding: 12px 1.5%;cursor: pointer" @click.prevent="remove_buildName(roomNameList)">
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
      const name = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('楼层名称不能为空'));
            }else if(!(/^\S{1,6}$/.test(value))){
              callback(new Error('请输入6位之内的非空字符串'));

            }else {
              callback();
            }
          };
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
            {  required: true,validator: name, trigger: 'blur'}
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
        that.addGarden=true;
     
          that.addF.addressId=that.$store.state.parame.buildid
        // }  
      },
    

 //提交添加楼层信息
  add_build(addF){
        var that=this;


    that.$refs[addF].validate((valid) => {
          if (valid) {
          
               var roomNameList1=[]
                  for(var i=0;i<that.addroomList.roomNameList.length;i++){
                    if(that.addroomList.roomNameList[i].roomName!=""||that.addroomList.roomNameList[i].roomName!=null){
                      roomNameList1.push(that.addroomList.roomNameList[i].roomName)
                    } 
                  }
                   var roomNameList1=roomNameList1.filter((element,index,self)=>element!='')
                  for(var j=0;j<roomNameList1.length;j++){
                    if(!(/^\S{1,6}$/.test(roomNameList1[j]))){
                      that.$message.error("房间名称不能大于6个字符")
                     
                      return;
                    }
                  }
                // var roomNameList1=that.addroomList.roomNameList.filter(element=>element!="")
    
                   var roomNameList1=roomNameList1.filter((element,index,self)=>self.indexOf(element) === index)
              if(that.addroom&&roomNameList1!=[]){
                 
                 var addparamGb={
                    addressId:that.addF.addressId,
                    name:that.addF.name,
                    roomList:roomNameList1,
                    executeUser:that.$store.state.userinfo.name,
                    createUserMobile:that.$store.state.userinfo.createUser,
                 }

              }else{
                 var addparamGb={
                  addressId:that.addF.addressId,
                  name:that.addF.name,
                  executeUser:that.$store.state.userinfo.name,
                  createUserMobile:that.$store.state.userinfo.createUser,
                  
                 }
              }
           that.fullscreenLoading=true;
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
                    that.$emit('reload');
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
         this.$emit('reload');
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
