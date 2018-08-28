<template>
  <div class="addroom">
    <el-dialog
          title="添加房间"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd">
            <el-form label-width="100px" :model="addF" ref="addF" :rules="rules">
              <el-form-item label="房间名称" prop="roomName" style="position: relative;">
                <el-input v-model="addF.roomName" placeholder="请输入房间名称"></el-input> 
              </el-form-item>
              <el-form-item label="所属大楼" prop="buildingName" v-if="this.$store.state.userinfo.userLevel==4">
                <el-select v-model="addF.buildingName" placeholder="请选择大楼" @change="getbuildingId">
                  <el-option
                    v-for="item in blockList"
                    :label="item.buildingName"
                    :value="item.buildingId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属楼层" prop="name" v-if="this.$store.state.userinfo.userLevel==4">
                <el-select v-model="addF.name" placeholder="请选择大楼" @change="getfloorInfo">
                  <el-option
                    v-for="item in floorList"
                   
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
           
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add_build('addF')">确定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'addroom',
   data() {
    return{
      addGarden:false,
       getParklist:[],
        showparkinfo:false,
        addF:{
        	roomName:'',
          name:'',
          addressId:'',
          buildingName:'',
          id:''
        },
         formLabelWidth: '100px',
         rules: {
          name: [
            {  required: true,message: '园区名称不能为空'}
          ],
          buildingName: [
            {  required: true,message: '大楼名称不能为空'}
          ]
        },
         blockList: [],
         buildingIdList:[],
         floorList:[],
    }

   },
   methods:{
       //添加楼层时获取大楼接口
      addgarden(){
        var that=this;    
        that.addGarden=true;
        if(that.$store.state.userinfo.userLevel==4){
           var param={
           	action:1,
            floorIdList:that.$store.state.userinfo.manageScopeIdList,
            buildingIdList:that.$store.state.userinfo.addrList
          }
          axios.post("/SmartHomeTrade/floor/selectMyFloor",param).then(function(res){
          if(res.data.code==0){
          	var result = [];
			 var obj = {};
			   for(var i =0; i<res.data.data.floorList.length; i++){
			      if(!obj[res.data.data.floorList[i].buildingId]){
			        result.push(res.data.data.floorList[i]);
			        obj[res.data.data.floorList[i].buildingId] = true;
			     }
			  }
          	that.blockList=result;
          	that.buildingIdList=res.data.data.floorList
            }
          })
        }else{
          that.addF.addressId=that.$store.state.parame.build_floorId
          that.addF.id=that.$store.state.parame.floor_roomId
        }  
      },
        // 获取大楼信息
        getbuildingId(value){
          var that=this;
          var list=[]
          that.addF.addressId=value;
          console.log(that.buildingIdList)
          if(that.buildingIdList!=[]){
          	 for(var i=0;i<that.buildingIdList.length;i++){
          	 	console.log(that.buildingIdList[i].buildingId)
          	 	console.log(value)
          	if(that.buildingIdList[i].buildingId==that.addF.addressId){
          		list.push(that.buildingIdList[i])
          	}
          	// list.pust({
          	// 		name:buildingIdList[i].name,
          	// 		id:buildingIdList[i].id
          	// 	})
          }
          // console.log(list)
          that.floorList=list;
          }
         



          // let obj={};
          // obj = this.blockList.find((item)=>{ 
          //    return item.yardId === value;
          // });
          // that.addB.yardName=obj.yardName;
          // console.log(that.addB.yardName+","+that.addB.yardId)
        },
        // 获取楼层信息
        getfloorInfo(value){
         this.addF.id=value;
        },


 //提交添加房间信息
  add_build(addF){
        var that=this;

    that.$refs[addF].validate((valid) => {
          if (valid) {
          	var roomList1=[]
          	roomList1.push(that.addF.roomName)
                 var addparamGb={
                  addressId:that.addF.addressId,
                  id:that.addF.id,
                  roomList:roomList1
                 }
              axios.post('/SmartHomeTrade/floor/insertRoom',addparamGb).then(function (res) {
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
                    that.$emit('refreshList');
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
