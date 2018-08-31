<template>
	<div class="addBuild">
		<el-dialog
          title="添加大楼"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd">
            <el-form label-width="100px" :model="addB" ref="addB" :rules="rules">
              <el-form-item label="大楼名称" prop="buildingName" style="position: relative;">
                <el-input v-model="addB.buildingName" placeholder="请输入大楼名称"></el-input> 
              </el-form-item>
              <el-form-item label="所属园区"  prop="yardName">
                <el-select v-model="addB.yardName" placeholder="请选择园区" @change="getparkInfo">
                  <el-option
                    v-for="item in yardsList"
                    :key="item.yardId"
                    :label="item.yardName"
                    :value="item.yardId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="添加楼层" prop="addfloor">
                <el-switch v-model="addfloor" @change="addbuildCahgne()"></el-switch>
              </el-form-item>
            </el-form>
             <div class="addB" v-if="addfloor">
              <el-form :model="addfloorList" ref="addfloorList" label-width="100px" class="demo-dynamic">
                <el-form-item
                  v-for="(floorNameList, index) in addfloorList.floorNameList"
                  :label="'楼层' + (index+1)"
                  :key="floorNameList.key"
                >
                  <el-input v-model="floorNameList.floorName" class="roominput"></el-input>
                  <span style="padding: 12px 10px;cursor: pointer" @click.prevent="remove_buildName(floorNameList)">
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
            <el-button type="primary" @click="add_build('addB')">确定</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script>
import axios from "axios"
export default {
	name: 'addBuild',
   data() {
   	return{
   		addGarden:false,
   		 getParklist:[],
        showparkinfo:false,
   		  addB:{
          buildingName:'',
          yardName:'',
          yardId:'',
        },
         formLabelWidth: '100px',
         addfloor: false,
         parkList: [],//省
        // citylist:[],//市
        // regionlist:[],//区域
        addfloorList: {
          floorNameList: [{
            floorName: ''
          }],
        },
         rules: {
          yardName: [
            {  required: true,message: '园区名称不能为空'}
          ],
          buildingName: [
            {  required: true,message: '大楼不能为空'}
          ]
        },
         yardsList: [],
        createOperator:''

   	}

   },
   methods:{
       //添加大楼时获取园区接口
      addgarden(){
        var that=this;
        that.addGarden=true;
        var param={
          action:1,
          noPage:1,
          yardIdList:that.$store.state.userinfo.manageScopeIdList
        }
         axios.post("/SmartHomeTrade/garden/selectMyYards",param).then(function(res){
          if(res.data.code==0){
            that.yardsList=res.data.data.yardsList;
          }

          })
      },
        // 获取园区信息
        getparkInfo(value){
          var that=this;
          that.addB.yardId=value;
          let obj={};
          obj = this.yardsList.find((item)=>{ 
             return item.yardId === value;
          });
          that.addB.yardName=obj.yardName;
          console.log(that.addB.yardName+","+that.addB.yardId)
        },
 //提交添加园区信息
  add_build(addB){
        var that=this;

    that.$refs[addB].validate((valid) => {
          if (valid) {
               var getbuildingNameList=[]
                getbuildingNameList.push(that.addB.buildingName)

               var floorNameList1=[]
                  for(var i=0;i<that.addfloorList.floorNameList.length;i++){
                    floorNameList1.push(that.addfloorList.floorNameList[i].floorName)
                  }
              if(that.addfloor&&floorNameList1!=[]){
               
               
                 var addparamGb={
                  yardId:that.addB.yardId,
                  yardName:that.addB.yardName,
                  buildingNameList:getbuildingNameList,
                  floorList:floorNameList1,
                  createOperator:that.$store.state.userinfo.userMobile
                 }

              }else{
                 var addparamGb={
                  yardId:that.addB.yardId,
                  yardName:that.addB.yardName,
                  buildingNameList:getbuildingNameList,
                  createOperator:that.$store.state.userinfo.userMobile
                 }


              }

              axios.post('/SmartHomeTrade//block/insertBlock',addparamGb).then(function (res) {
              //   if(res.data.code==0){
              //     that.$refs[addB].resetFields();
              // }
                console.log(res)
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
                    that.$emit('refreshList');
                    that.addfloor=false;
                    that.addGarden=false; 
                     that. addfloorList={
                      floorNameList: [{
                        floorName: ''
                      }],
                    };
                     that.$refs[addB].resetFields();
                    
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
       
        if(this.addfloor){
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
        var index = this.addfloorList.floorNameList.indexOf(item)
        if (index !== -1) {
          this.addfloorList.floorNameList.splice(index, 1)
        }
      },
      //新增大楼input框
      add_buildName() {
        this.addfloorList.floorNameList.push({
          
        });
      },
       //删除大楼input框
      remove_buildName(item) {
        var index = this.addfloorList.floorNameList.indexOf(item)
        if (index !== -1) {
          this.addfloorList.floorNameList.splice(index, 1)
        }
      },
      //新增大楼input框
      add_buildName() {
        this.addfloorList.floorNameList.push({
          
        });
      },
     // 关闭弹框
      addhandleClose(done,){
         done()
          this.$emit('clearselect');
         this.addfloor=false;
         this.resetaddG('addB')
      },
       resetaddG(addB) {
        this.$refs[addB].resetFields();
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
