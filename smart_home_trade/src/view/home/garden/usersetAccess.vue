<template>
	<div class="usersetAccess">
		<el-dialog
		  title="设置权限"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		 
		  <div class="modelScope">
		  	<el-tree
				  :data="permissionList"
				  show-checkbox
				  node-key="id"
				  ref="tree"
				  :default-checked-keys="checkedlist"
				  :props="defaultProps">
			</el-tree>

		  	
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="dialogclose()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在授权" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		name:"usersetAccess",
		data() {
	      return {
	        dialogVisible: false,
	         permissionList:[],
	         fullscreenLoading: false,
	         userId:"",
	         checkedlist:[],
	         userLevel:'',
	         defaultProps: {
		          children: 'sonJdtionList',
		          label: 'name'
		        },
	      };
	    },
	     methods: {
	     	getopen(e){
	     		
	     		var that=this;
	     		this.dialogVisible=true;
	     		that.userId=e.userId;
	     		var param={
	     			userId:e.userId
	     		}	     			
	     		that.axios.post("/SmartHomeTrade/user/selectMyJdtion",param).then(function(res){   
	     		var permission = []
	     		var checkedpermission=[]  			
					for (var i = 0; i < res.data.data.permissionList.length; i++) {
						
						permission.push(res.data.data.permissionList[i].sonJdtionList[0])	
					}
					// console.log(permission)
					for(var i=0;i<permission.length;i++){
						if(permission[i].sonJdtionList==null||permission[i].sonJdtionList==[]){
							checkedpermission.push(permission[i].sonJdtionList[j].id)
						}
						// console.log("aaa")
						if(permission[i].sonJdtionList!=null||permission[i].sonJdtionList!=[]){
							for(var j=0;j<permission[i].sonJdtionList.length;j++){
								// console.log(permission[i].sonJdtionList[j].sonJdtionList)
								if(permission[i].sonJdtionList[j].sonJdtionList.length==0){
									checkedpermission.push(permission[i].sonJdtionList[j].id)
								// console.log("qqq")
								}
								if(permission[i].sonJdtionList[j].sonJdtionList!=null){
									for(var a=0;a<permission[i].sonJdtionList[j].sonJdtionList.length;a++){
										checkedpermission.push(permission[i].sonJdtionList[j].sonJdtionList[a].id)
									}
								}
							}
						}
	     			 
	     		   }
	     		   that.checkedlist=checkedpermission;
	     		})
	     		 		
	     		that.userLevel=e.userLevel;
	     		if(that.$store.state.userinfo.userLevel==1||that.$store.state.userinfo.userLevel==2){
	     			if(e.userLevel==2){

	     			that.permissionList=that.$store.state.setDAta
		     		}else if(e.userLevel==3){
		     			var list=[]
		     			for(var i=1;i<that.$store.state.setDAta.length;i++){
		     				list.push(that.$store.state.setDAta[i])

		     			}
		     			that.permissionList=list;
		     		}else if(e.userLevel==4){
		     			var list=[]
		     			for(var i=2;i<that.$store.state.setDAta.length;i++){
		     				list.push(that.$store.state.setDAta[i])

		     			}
		     			that.permissionList=list;

		     		}else if(e.userLevel==5){
		     			// alert("a")
		     			var list=[]
		     			for(var i=3;i<that.$store.state.setDAta.length;i++){
		     				// console.log(that.$store.state.setDAta[i])
		     				list.push(that.$store.state.setDAta[i])

		     			}

		     			that.permissionList=list;
		     		}

	     		}
	     		else if(that.$store.state.userinfo.userLevel==3){
	     			if(e.userLevel==4){
	     				var list=[]
		     			for(var i=1;i<that.$store.state.setDAta.length;i++){
		     				list.push(that.$store.state.setDAta[i])

		     			}
		     		    that.permissionList=list;
	     			}else if(e.userLevel==5){
		     			var list=[]
		     			for(var i=2;i<that.$store.state.setDAta.length;i++){
		     				list.push(that.$store.state.setDAta[i])

		     			}
		     			that.permissionList=list;

		     		}

	     		}else if(that.$store.state.userinfo.userLevel==4){
	     			if(e.userLevel==5){
	     				var list=[]
		     			for(var i=1;i<that.$store.state.setDAta.length;i++){
		     				list.push(that.$store.state.setDAta[i])

		     			}
		     		    that.permissionList=list;
	     			}

	     		}
	     			     		
	     		// console.log(that.$store.state.setDAta)

	     	},
	        handleClose(done) {
	            done()
	            this.$refs.tree.setCheckedKeys([]);
	        },


	        dialogclose(){
	        	

	           var that=this;   
	           that.$emit('setloading');
	        	var a=that.$refs.tree.getHalfCheckedKeys()
	        	var b=that.$refs.tree.getCheckedKeys()
	        	 var list=a.concat(b)
	        	if(that.userLevel==2&&list!=[]){
	        		var find1=0;
	        		var find2=0;
	        		var find3=0;
	        		var find4=0;
	        		for(var i=0;i<list.length;i++){
	        			// console.log(list[i])	        				        			
	        			if(list[i]==1){
	        				find1=1;
	        			}
	        			if(list[i]==2){
	        				find2=1;
	        			}
	        			if(list[i]==3){
	        				find3=1;
	        			}
	        			if(list[i]==4){
	        				find4=1;
	        			}			
	        	    }
	        	    if(find1==0){
        				that.$message.warning("请选择一个园区管理")
        				return;
	        		}
	        		if(find1==1&&(find3==1||find4==1)&&find2==0){
	        			that.$message.warning("请选择一个大楼管理")
        				return;
	        		}
	        		if(find1==1&&find4==1&&find3==0){
	        			that.$message.warning("请选择一个楼层管理")
        				return;
	        		}
	        		if(find1==1&&find4==1&&find2==0){
	        			that.$message.warning("请选择一个大楼管理")
        				return;
	        		}

	        	}
	        	if(that.userLevel==3&&list!=[]){
	        		var find2=0;
	        		var find3=0;
	        		var find4=0;
	        		for(var i=0;i<list.length;i++){
	        			if(list[i]==2){
	        				find2=1;
	        			}
	        			if(list[i]==3){
	        				find3=1;
	        			}
	        			if(list[i]==4){
	        				find4=1;
	        			}			
	        	    }
	        	    if(find2==0){
        				that.$message.warning("请选择一个大楼管理")
        				return;
        			}
        			if(find2==1&&find4==1&&find3==0){
        				that.$message.warning("请选择一个楼层管理")
        				return;
        			}	
	        	}
	        	if(that.userLevel==4&&list!=[]){
	        		var find3=0;
	        		var find4=0;
	        		for(var i=0;i<list.length;i++){
	        			if(list[i]==3){
	        				find3=1;
	        			}
	        			if(list[i]==4){
	        				find4=1;
	        			}	
	        			
	        	    }
	        	    if(find3==0){
        				that.$message.warning("请选择一个楼层管理")
        				return;
        			}	
	        	}
	        	if(that.userLevel==5&&list!=[]){
	        		var find4=0;
	        		for(var i=0;i<list.length;i++){
	        			if(list[i]==4){
	        				find4=1;
	        			}	
	        		
	        	    }
	        	    if(find4==0){
        				that.$message.warning("请选择一个房间管理")
        				return;
        			}	
	        	}
	        	











	        	
	        	var param={
	        		permitIdList:list,
	        		userId:that.userId
	        	}
	        	that.fullscreenLoading=true;
	        	that.axios.post("/SmartHomeTrade/user/insertUserPermit",param).then(function(res){
	        		that.fullscreenLoading=false;
	        		if(res.data.code==0){
	        			that.dialogVisible=false;
	        			  that.$emit('clerloading');
	        			 
	        			that.$refs.tree.setCheckedKeys([]);
	        			that.$message.success(res.data.message)

	        		}else{
	        			that.$message.error(res.data.message)
	        			 that.$emit('clerloading');
	        		}

	        	})

	        	

	        }
	    }
	}
</script>
<style>
	
</style>