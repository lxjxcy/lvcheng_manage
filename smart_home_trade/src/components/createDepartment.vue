<template>
	<div class="department">
		<el-dialog
		  title="创建部门"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose"
		  append-to-body>
		  <div class="dialogheight" style="padding-right: 10%">
		  	<el-form label-width="100px" :model="addD" ref="addD" :rules="rules">
              <el-form-item label="部门名称" prop="departmentName" style="position: relative;">
                <el-input v-model="addD.departmentName" placeholder="部门名称" @focus="removeValid('departmentName')"></el-input> 
              </el-form-item>
              <el-form-item label="所属大楼" prop="buildingName" v-if="this.$store.state.userinfo.userLevel==2">
                <el-select v-model="addD.buildingName" placeholder="请选择大楼" @change="getBuildId" style="width:100%">
                  <el-option
                    v-for="item in blockList"
                    :key="item.buildingId"
                    :label="item.buildingName"
                    :value="item.buildingId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="surecreta('addD')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">保存</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>
<script>
	export default{
		name:"createDepartment",
		 data() {
	      return {
	        dialogVisible: false,
	         fullscreenLoading:false,
	         addD: { 
	              buildingName:null, 
	              
		          departmentName: '',
		          addressId:null
		        },
		      parkAddress:null,
		      parkBuildname:null,
			 rules: {
	          buildingName: [
	            {  required: true,message: '大楼名称不能为空'}
	          ],
	           departmentName: [
	            {  required: true,message: '部门名称不能为空'}
	          ],
	         
	        },
	        blockList:[]
	      };
	    },
	       // 获取焦点清空验证提示
	      removeValid(formName){
	      	this.$refs[formName].clearValidate();
	      },
	    methods: {
	    	opendialogVisible(){
	    		var that=this;
	    		that.dialogVisible=true;
	    		if(that.$store.state.userinfo.userLevel==2){
	    			var list=[]
	    		    list.push(that.$store.state.parame.parkid);
		    		var param={
		    			noPage:1,
		    			yardIdList:list,
		    			action:1,
		    		}
		    		 that.axios.post("/SmartHomeTrade/block/selectBlockCount",param).then(function(res){
		    		 	if(res.data.code==0){
		    		 		that.blockList=res.data.data.blockList;
		    		 	}
		    		 })

	    		}
	    		
	    		
	    	},

	    	//提交创建部门信息
	    	surecreta(addD){
	    		var that=this;
	    		this.$refs[addD].validate((valid) => {
		          if (valid) {
		         	if(that.$store.state.userinfo.userLevel==5){
		          		var address=that.$store.state.parame.roomaddressId
		          		var  adrScope= that.$store.state.parame.inAddress

		          	}
		          	if(that.$store.state.userinfo.userLevel==2){
		          		var address=that.parkAddress
		          		var adrScope=that.parkBuildname
		          	}
		          	if(that.$store.state.userinfo.userLevel==3){
		          		var address=that.$store.state.parame.buildid;
		          		var adrScope=that.$store.state.parame.allAddress

		          	}
		          	if(that.$store.state.userinfo.userLevel==4){
		          		var address=that.$store.state.parame.flooraddressId
		          		var  adrScope= that.$store.state.parame.building_floorName
		          	}
		           var param={
	    			name:that.addD.departmentName,
	    			createUser:that.$store.state.userinfo.userMobile,
	    			addressId:address,
	    			adrScope:adrScope,
	    		   }
	    		   
	    		   that.fullscreenLoading=true;
	    		   // var param=Object.assign(commparam,)
		    		that.axios.post("/SmartHomeTrade/department/insertDpt",param).then(function(res){
		    			that.fullscreenLoading=false;
		    			if(res.data.code==0){
		    				 that.$message.success(res.data.message);
		    				 that.$refs[addD].resetFields();
		    				 that.$emit('refreshList');
		    				 that.dialogVisible=false;
		    			}else{
		    				that.$message.error(res.data.message);
		    			}
		    		})

	    		
		          } else {
		           
		            return false;
		          }
		        });
	    		
	    	},
	    	// 获取id
	    	getBuildId(value){
	    		this.parkAddress=value;

	    		for(var i=0;i<this.blockList.length;i++){
	    			if(this.blockList[i].buildingId==value){
	    				this.parkBuildname=this.blockList[i].addressInfo

	    			}
	    		}
	    		
	    	},
	      handleClose(done) {    
	            done(); 
	            this.reset("addD")
	      },
	      reset(addD){

	      	this.$refs[addD].resetFields();
	      }
	      
	    }

	}
	
</script>
<style>
	.dialogheight{
	padding-right: 0.53rem;
     height: 200px;
    overflow:hidden;
    overflow-y:auto;
	}
</style>