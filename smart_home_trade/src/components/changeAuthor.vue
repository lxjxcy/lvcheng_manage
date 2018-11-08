<template>
	<div class="changeAuthor">
		<el-dialog
		  title="修改授权"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		 
		  <div class="modelScope" style="height: 350px;overflow:hidden; overflow-y:auto;">
		  	<el-tree
				  :data="userDcRequest"
				  show-checkbox
				  node-key="key"
				  ref="tree"
				  :default-checked-keys="checkedlist"
				  :props="defaultProps">
			</el-tree>

		  	
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="dialogclose()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		name:"changeAuthor",
		data() {
	      return {
	        dialogVisible: false,
	         fullscreenLoading:false,

	         userDcRequest:[],
	         devicelist:[],
	         param:{
	         	ucUserId:"",
	         	action:2,
	         	deviceIdList:[]
	         },
	         userId:"",
	         checkedlist:[],
	         userLevel:'',
	         defaultProps: {
	         	 children: 'childen',
		          label: 'roomName'
		        },
	      };
	    },
	    methods:{
	    	getopen(e){
	    		var that=this;
	    	
	    		that.devicelist=e.userDcRequest


	    		var result = [];
					     var obj = {};
					   for(var i =0; i<e.userDcRequest.length; i++){
					      if(!obj[e.userDcRequest[i].roomId]){
					        result.push(e.userDcRequest[i]);
					        obj[e.userDcRequest[i].roomId] = true;
					     }
					  }
		          	   
		          	   
		          		for(var j=0;j<result.length;j++){
		          			 var result2 = [];
		          			for(var i=0;i<e.userDcRequest.length;i++){
		          				if(e.userDcRequest[i].roomId==result[j].roomId){
		          					result2.push({
		          						key:e.userDcRequest[i].deviceId,
		          						roomName:e.userDcRequest[i].deviceName
		          					})
		          					result[j]["childen"]=result2;
		          				}
		          			}
		          			
		          		}
		          		that.userDcRequest=result
		          	












	    	
	    		
	    		that.dialogVisible=true;
	    		
	    		that.param.ucUserId=e.ucUserId;
	    		// that.userDcRequest=e.userDcRequest;
	    		
	    		var list=[]
	    		for(var i=0;i<e.userDcRequest.length;i++){
	    			list.push(e.userDcRequest[i].deviceId)
	    		}
	    		that.checkedlist=list;







	    	},
	    	//提交
	    	dialogclose(){

	    		var that=this;
	    			    		
	    		var lists=that.$refs.tree.getCheckedKeys()
	    	
	    		


	    		 var arr=lists.filter(element=>element!= null)
	    	     var listid=that.devicelist;
	    		// that.param.deviceIdList=lists;
	    		for(var i=0;i<arr.length;i++){

	    		
	    			for(var j=0;j<that.devicelist.length;j++){
	    				if(arr[i]==that.devicelist[j].deviceId){
	    					 listid.splice(j, 1)
	    				}

	    			}
	    		}
	    		
	    		var listids=[]
	    		for(var i=0;i<listid.length;i++){
	    			listids.push(listid[i].deviceId)

	    		}
	    		that.param.deviceIdList=listids;
	    		var log={
                    executeUser:that.$store.state.userinfo.name,
                    createUserMobile:that.$store.state.userinfo.createUser,
                  }
	    		 var changeparam=Object.assign(that.param,log)
	    	   that.fullscreenLoading=true;
	    		that.axios.post("/SmartHomeTrade/appUser/deleteUserDeviceInfo",changeparam).then(function(res){
	    			that.fullscreenLoading=false;
	    			if(res.data.code==0){
	    				
	    				 that.$message.success(res.data.message)
	    				that.dialogVisible=false;
	    				 that.$emit('refreshList');
	    			}else{
	    				that.$message.error(res.data.message)
	    			}
	    		})

	    	},
	    	   // 获取焦点清空验证提示
	      // removeValid(formName){
	      // 	this.$refs[formName].clearValidate();
	      // },


	    	   //关闭弹框
		     handleClose(done) {
		        done();
		          // this.$emit('clearselect');
		        
		        // this.resetaddUser("addformValidate")


		      },

	    }
	}
</script>
<style scoped>
	.modelScope{
	height: 350px;
    overflow:hidden;
    overflow-y:auto;
	}
</style>