<template>
	<div class="addBuild">
		<el-dialog
          title="添加大楼"
          :visible.sync="addGarden"
          width="30%"
          :before-close="addhandleClose">
          <div class="add" ref="myadd">
            <el-form label-width="100px" :model="addB" ref="addB" :rules="rules">
              <el-form-item label="大楼名称" prop="buildingName" style="position: relative;" ref="loginName">
                <el-input v-model="addB.buildingName" @focus="removeValid('loginName')" placeholder="请输入大楼名称（6个字符以内）"></el-input> 
              </el-form-item>
              <el-form-item label="添加楼层" prop="addfloor">
                <el-switch v-model="addfloor" @change="addbuildCahgne()"></el-switch>
              </el-form-item>
            </el-form>
             <div class="addB" v-if="addfloor">

              <el-form :model="addfloorList" ref="addfloorList" label-width="100px" class="demo-dynamic"  :rules="rules">
                <el-form-item
                  v-for="(floorNameList, index) in addfloorList.floorNameList"
                  :label="'楼层' + (index+1)"
                  :key="floorNameList.key"
                 

                >
                  <el-input v-model="floorNameList.floorName" class="roominput" placeholder="楼层名称不能超过6个字符"></el-input>
                  <span style="padding: 12px 1.5%;cursor: pointer" @click.prevent="remove_buildName(floorNameList)">
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
            <el-button type="primary" @click="add_build('addB')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确定</el-button>
          </span>
        </el-dialog>
	</div>
</template>
<script>
// import axios from "axios"
export default {
	name: 'addBuild',
   data() {
       //大楼名称
          const buildingName = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('大楼名称不能为空'));
            }else if(!(/^\S{1,6}$/.test(value))){
              callback(new Error('请输入6位之内的非空字符串'));

            }else {
              callback();
            }
          };
          //  //大楼名称
          // const floorName = (rule, value, callback) => {
          //   if (value === '') {
          //     callback(new Error('楼层名称不能为'));
          //   }else if(!(/^\S{1,6}$/.test(value))){
          //     callback(new Error('请输入6位之内的非空字符串'));

          //   }else {
          //     callback();
          //   }
          // };
   	return{
   		addGarden:false,//弹框   		
        fullscreenLoading:false,//提交加载
   		  addB:{//添加大楼
          buildingName:'',//大楼名称
          yardName:'',//园区名称
          yardId:'',//园区id
        },
         formLabelWidth: '100px',
         addfloor: false,//添加楼层    
        addfloorList: {//楼层列表
          floorNameList: [{
            floorName: ''
          }],
        },
         rules: {
          buildingName: [
            {  required: true,validator: buildingName, trigger: 'blur'}
          ],        
        },


   	}

   },
   methods:{
       //添加大楼弹出
      addgarden(){
        var that=this;
        that.addGarden=true;
      },
 //提交
  add_build(addB){

    var that=this;
   
    that.$refs[addB].validate((valid) => {
          if (valid) {
            
               var getbuildingNameList=[]
                getbuildingNameList.push(that.addB.buildingName)

               var floorNameList1=[]
                  for(var i=0;i<that.addfloorList.floorNameList.length;i++){
                    if(that.addfloorList.floorNameList[i].floorName!=""||that.addfloorList.floorNameList[i].floorName!=null){
                      floorNameList1.push(that.addfloorList.floorNameList[i].floorName)
                    }   
                  }


              var floorNameList1=floorNameList1.filter((element,index,self)=>element!='')
                  for(var j=0;j<floorNameList1.length;j++){
                    if(!(/^\S{1,6}$/.test(floorNameList1[j]))){
                      that.$message.error("楼层名称不能大于6个字符")
                     
                      return;
                    }
                  }
                 


              var floorNameList1=floorNameList1.filter((element,index,self)=>self.indexOf(element) === index)
              if(that.addfloor&&floorNameList1!=[]){   
                 var addparamGb={
                  yardId:that.$store.state.parame.parkid,
                  yardName:that.$store.state.parame.parkname,
                  buildingNameList:getbuildingNameList,
                  floorList:floorNameList1,
                  createOperator:that.$store.state.userinfo.userMobile
                 }

              }else{
                 var addparamGb={
                  yardId:that.$store.state.parame.parkid,
                  yardName:that.$store.state.parame.parkname,
                  buildingNameList:getbuildingNameList,
                  createOperator:that.$store.state.userinfo.userMobile
                 }


              }
              that.fullscreenLoading=true;
              that.axios.post('/SmartHomeTrade/block/insertBlock',addparamGb).then(function (res) {
                that.fullscreenLoading=false;
              //   if(res.data.code==0){
              //     that.$refs[addB].resetFields();
              // }
             
                if(res.data.code==0){
                   that.$message({
                      type: 'success',
                      message: res.data.message
                    });
                    that.$emit('refreshList');
                    that.addfloor=false;
                    that.addGarden=false; 
                   that.$emit('reload');
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
           
            return false;
          }
        });
      },
         // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },

        //判断楼层是否为空
        ifnone(addfloorList){
        this.$refs[addfloorList].validate((valid) => {
          if (valid) {
            alert('submit!');
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
     // 关闭弹框
      addhandleClose(done,){
         done()
          this.$emit('clearselect');
         this.addfloor=false;
         this.resetaddG('addB')
        this.$emit('reload');
      },
      // 清空弹框数据
       resetaddG(addB) {
        this.$refs[addB].resetFields();
      },









   }
}
	
</script>
<style scoped>
  .add{
    padding-right: 10%;
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
