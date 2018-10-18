<!-- <template>
	<div class="userlookScope">
		<el-dialog
		  title="管辖范围"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  
		  <div class="modelScope">
		  	<el-tree
				  :data="treeList"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  :props="defaultProps">
			</el-tree>

		  	
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="close()">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		name:"userlookScope",
		 data() {
	      return {
	        dialogVisible: false,
	         treeList:[],
	         defaultProps: {
		          children: 'manageList',
		          label: 'name'
		        },
	      };
	    },
	     methods: {
	     	getopen(e){

	     		var that=this;
	     		
	     	  if(e.userLevel==2){
	            var param={
	              action:1,
	              manageScopeIdList:e.manageScopeIdList
	              }
	              that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){
		     			if(res.data.code==0){
		     				that.dialogVisible=true;    
		     					if(res.data.data!=null){
		     						that.treeList=res.data.data.gdList;
		     						 
		     						console.log(that.treeList)	

		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
	     		   })

	           }
	           if(e.userLevel==3){
		            var param={
		              manageScopeIdList:e.manageScopeIdList
		            }
		             that.axios.post("/SmartHomeTrade/block/selectManageBlock",param).then(function(res){
		     			if(res.data.code==0){
		     				that.dialogVisible=true;     
		     					if(res.data.data!=null){
		     						that.treeList=res.data.data.bList;
		     						// console.log(that.gdList)	     						
		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
	     		    })


	            
	           }
	           if(e.userLevel==4){
	                 var list1=e.manageScopeIdList;
	                 var list2=e.addrList;              
	                var obj=[]
	                for(var i=0;i<list1.length;i++){
	                    var obj2={
	                      id:list1[i],
	                      addressId:list2[i]
	                    }
	                    console.log(obj2)
	                    obj.push(obj2)
	                }
	                var param={
	                  floorAdrIdList:obj
	                }
	                that.axios.post("/SmartHomeTrade/floor/selectManageFloor",param).then(function(res){
		     			if(res.data.code==0){
		     				that.dialogVisible=true;     
		     					if(res.data.data!=null){
		     						that.treeList=res.data.data.fList;
		     						// console.log(that.gdList)	     						
		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
	     		    })
	           }
		        if(e.userLevel==5){
		            var param={
		            	roomListId:e.manageScopeIdList,
		            	adrIdList:e.addrList,
		            	noPage:1,

		            }
		            that.axios.post("/SmartHomeTrade/room/selectMyRoom",param).then(function(res){
		     			if(res.data.code==0){
		     				that.dialogVisible=true;    
		     					if(res.data.data!=null){
		     						that.treeList=res.data.data.roomList;
		     						// console.log(that.gdList)	
		     						// that.$message.success(res.data.message);     						
		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
	     		    })

		             
		         }

	     	},
	        handleClose(done) {
	            done()
	            this.treeList=[];
	        },
	        close(){
	        	this.dialogVisible=false;
	        	this.treeList=[];
	        }
	    }
	}
</script>
<style>
.modelScope{
	 padding-left:30px;
     height: 300px;
    overflow:hidden;
    overflow-y:auto;
}
	
</style>
 -->





<template>
	<div class="usersetScope">
		<el-dialog
		  title="管辖范围"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelScope">
		  	<el-tree
				  :data="treeList"
				 
				  node-key="id"
				   :default-expanded-keys="checkedlist"
				  ref="tree"
				  :default-checked-keys="checkedlist"
				  :props="defaultProps">
			</el-tree>

		  	
		  </div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="close()">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		name:"usersetScope",
		data() {
	      return {
	        dialogVisible: false,
	        treeList:[],
	        clearData:true,
	         defaultProps: {
		          children: 'childen',
		          label: 'name'
		        },
		      checkedlist:[],
		    
	      };
	    },
	     methods: {
	     	getopen(e){
	     		var that=this;
	     			// 当前用户在园区下的管辖范围		
	     		if(that.$store.state.userinfo.userLevel==1){
	     		     that.dialogVisible=true;
	     		      var param={
	              action:1,
	              manageScopeIdList:e.manageScopeIdList
	              }
	              that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){
		     			if(res.data.code==0){
		     				// alert("sss")
		     				if(res.data.data==null){
		     					that.treeList=[]
		     					return;
		     				}
	     					if(res.data.data!=null){
	     						var tree=res.data.data.gdList
	     						var treeList=tree
	     					
	     						that.treeList=treeList
	     												
	     					}
		     			}
	     		   })
	     		}
	     		if(that.$store.state.userinfo.userLevel==2){
	     			that.dialogVisible=true;
	     			var param={
	              manageScopeIdList:e.manageScopeIdList
	              }
	              that.axios.post("/SmartHomeTrade/block/selectManageBlock",param).then(function(res){
		     			if(res.data.code==0){
		     				if(res.data.data==null){

		     					that.treeList=[];
		     						     					
		     					return;
		     				}
		     				// alert("sss")
	     					if(res.data.data!=null){
	     						var tree=res.data.data.bList
	     						var treeList=[{
	     							childen:tree,
	     							name:that.$store.state.parame.parkname
	     						}]
	     					
	     						that.treeList=treeList

	     					}
		     			}
	     		   })

	     		}

	     		if(that.$store.state.userinfo.userLevel==3){
	     			
	     			that.dialogVisible=true;
	     			var list1=e.manageScopeIdList;
	                 var list2=e.addrList;              
	                var obj=[]
	                for(var i=0;i<list1.length;i++){
	                    var obj2={
	                      id:list1[i],
	                      addressId:list2[i]
	                    }
	                   
	                    obj.push(obj2)
	                }
	                var param={
	                  floorAdrIdList:obj
	                }
	              that.axios.post("/SmartHomeTrade/floor/selectManageFloor",param).then(function(res){
		     			if(res.data.code==0){
		     				if(res.data.data==null){
		     					that.treeList=[]
		     					return;
		     				}
	     					if(res.data.data!=null){
	     						var tree=res.data.data.fList
	     						var treeList=[{
	     							childen:tree,
	     							name:that.$store.state.parame.buildname
	     						}]
	     					
	     						that.treeList=treeList
	     										
	     					}
		     			}
	     		   })
	     		}
	     		if(that.$store.state.userinfo.userLevel==4){
	     			 var param={
		            	roomListId:e.manageScopeIdList,
		            	adrIdList:e.addrList,
		            	noPage:1,
		            }
	              that.axios.post("/SmartHomeTrade/room/selectMyRoom",param).then(function(res){
		     			if(res.data.code==0){
		     				// alert("sss")
		     				if(res.data.data==null){
		     					that.treeList=[]
		     					

		     					return;
		     				}
	     					if(res.data.data!=null){
	     						var tree=res.data.data.roomList
	     						var treeList=[{
	     							childen:tree,
	     							name:that.$store.state.parame.floorname
	     						}]
	     					
	     						that.treeList=treeList
	     						
	     						
	     														
	     					}
		     			}
	     		   })
				   

	     		}
	     

	         
	     		
	     		
	     	},
	     	// submit(){

	     	// 	this.treeList=[]
	     	// },
	     	  handleClose(done) {
	            done()
	            this.treeList=[];
	            this.clearData=true;
	        },
	        close(){
	        	 this.treeList=[];
	            this.clearData=true;

	        }
	    }
	}
</script>
<style>
.modelScope{
	 padding-left:10%;
     height: 300px;
    overflow:hidden;
    overflow-y:auto;
}
	
</style>