<template>
	<div class="department">
		<el-dialog
		  title="创建部门"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose"
		  append-to-body>
		  <div class="dialogheight">
		  	<el-form label-width="100px" :model="addD" ref="addD" :rules="rules">
              <el-form-item label="部门名称" prop="departmentName" style="position: relative;">
                <el-input v-model="addD.departmentName" placeholder="部门名称" style="width:100%"></el-input> 
              </el-form-item>
              <el-form-item label="所属房间" prop="name">
                <el-select v-model="addD.name" placeholder="请选择房间" @change="getroomgId">
                  <el-option
                    v-for="item in roomList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="surecreta('addD')">保存</el-button>
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
	         addD: {
		          name: '',
		          departmentName: '',
		          roomId:'',
		          addressId:''
		        },
			 rules: {
	          name: [
	            {  required: true,message: '房间名称不能为空'}
	          ],
	           departmentName: [
	            {  required: true,message: '部门名称不能为空'}
	          ],
	         
	        },
	        roomList:[]
	      };
	    },
	    methods: {
	    	opendialogVisible(){
	    		var that=this;
	    		that.dialogVisible=true;
	    		var param={
	    			  pageSize:10,
                     currentPage:1,
	    			 roomListId:that.$store.state.userinfo.manageScopeIdList,
                     adrIdList:that.$store.state.userinfo.addrList,
	    		}
	    		 that.axios.post("/SmartHomeTrade/room/selectMyRoom",param).then(function(res){
	    		 	if(res.data.code==0){
	    		 		that.roomList=res.data.data.roomList;
	    		 	}
	    		 })
	    		
	    	},

	    	//提交创建部门信息
	    	surecreta(addD){
	    		var that=this;
	    		this.$refs[addD].validate((valid) => {
		          if (valid) {
		           var param={
	    			name:that.addD.departmentName,
	    			roomId:that.addD.roomId,
	    			createUser:that.$store.state.userinfo.userMobile,
	    			addressId:that.addD.addressId
	    		   }
		    		that.axios.post("/SmartHomeTrade/department/insertDpt",param).then(function(res){
		    			if(res.data.code==0){
		    				 that.$message.success(res.data.message);
		    				 that.$refs[addD].resetFields();
		    				 that.$emit('refreshList');
		    			}else{
		    				that.$message.error(res.data.message);
		    			}
		    		})

	    		that.dialogVisible=false;
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
	    		
	    	},
	    	// 获取房间id
	    	getroomgId(value){
	    		this.addD.roomId=value;
	    		for(var i=0;i<this.roomList.length;i++){
	    			if(this.roomList[i].id==value){
	    				this.addD.addressId=this.roomList[i].addressId

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