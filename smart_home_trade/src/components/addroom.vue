<template>
  <div class="addroom">
    <el-dialog
          title="添加房间"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd" style="padding-right: 10%">
            <el-form label-width="100px" :model="addF" ref="addF" :rules="rules">
              <el-form-item label="房间名称" prop="roomName" style="position: relative;" ref="roomName">
                <el-input v-model="addF.roomName" @focus="removeValid('roomName')" placeholder="请输入房间名称"></el-input> 
              </el-form-item>
              <!-- <el-form-item label="所属大楼" prop="buildingName" v-if="this.$store.state.userinfo.userLevel==4">
                <el-select v-model="addF.buildingName" placeholder="请选择大楼" @change="getbuildingId">
                  <el-option
                    v-for="item in blockList"
                    :key="item.buildingId"
                    :label="item.buildingName"
                    :value="item.buildingId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属楼层" prop="name" v-if="this.$store.state.userinfo.userLevel==4">
                <el-select v-model="addF.name" placeholder="请选择大楼" @change="getfloorInfo">
                  <el-option
                    v-for="item in floorList"
                   :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-form>
           
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
  name: 'addroom',
   data() {
     //房间名称
          const roomName = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('房间名称不能为空'));
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
        	roomName:'',
          name:'',
          addressId:'',
          buildingName:'',
          id:''
        },
         formLabelWidth: '100px',
         rules: {
          roomName: [
            {  required: true,validator: roomName, trigger: 'blur'}
          ],
          
        },
         blockList: [],
         buildingIdList:[],
         floorList:[],
    }

   },
   methods:{
       //添加楼层时获取lou接口
      addgarden(){
        var that=this;    
        that.addGarden=true;
    
          that.addF.addressId=that.$store.state.parame.flooraddressId
          that.addF.id=that.$store.state.parame.floorid
        // }  
      },
      

 //提交添加房间信息
  add_build(addF){
        var that=this;

    that.$refs[addF].validate((valid) => {
          if (valid) {
            that.fullscreenLoading=true;
          	var roomList1=[]
          	roomList1.push(that.addF.roomName)
                 var addparamGb={
                  addressId:that.addF.addressId,
                  id:that.addF.id,
                  roomList:roomList1,
                   executeUser:that.$store.state.userinfo.name,
                    createUserMobile:that.$store.state.userinfo.createUser,
                 }
              that.axios.post('/SmartHomeTrade/floor/insertRoom',addparamGb).then(function (res) {
                that.fullscreenLoading=false;
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
                    that.$emit('refreshList');
                     that.$emit('clearselect');
                    that.addGarden=false; 
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
   // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
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
          this.$emit('clearselect');
         this.addroom=false;
         this.resetaddG('addF')
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
     height: 300px;
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
