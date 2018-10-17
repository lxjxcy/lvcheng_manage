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
	     		
	     		if(that.$store.state.userinfo.userLevel==1){	     			
	     			var param={
	     			action:1,
	     			bs:2,
	     			manageScopeIdList:that.$store.state.userinfo.manageScopeIdList
	     		   }
	     		   that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){
		     			if(res.data.code==0){

		     					if(res.data.data!=null){
		     						if(that.clearData){
		     							var treeList=res.data.data.gdList;

			     						for(var i=0;i<treeList.length;i++){
			     							delete treeList[i].manageList
			     						}
			     						var tree=[]
			     						for(var i=0;i<treeList.length;i++){
			     							for(var k=0;k<that.checkedlist.length;k++){
			     							   
			     									if(that.checkedlist[k]==treeList[i].id){
			     										tree.push(treeList[i])
			     									}
			     							
			     								
			     							}			
			     						}
			     						
			     						treeList=tree;
			     						that.treeList=treeList;

			     						// that.treeList=treeList;	     							
		     						}		     						
		     							     						
		     					}

		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			that.dialogVisible=true;
	     		   })
	     		   
	     		}

	     		
	     		if(that.$store.state.userinfo.userLevel==2){
	     			var list=[];
	     			list.push(that.$store.state.parame.parkid)
	     			var param={
	     			action:1,
	     			manageScopeIdList:list
	     		   }
	     		   that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){
		     			if(res.data.code==0){

		     					if(res.data.data!=null){
		     						if(that.clearData){
		     							var treeList=res.data.data.gdList;

			     						for(var i=0;i<treeList.length;i++){
			     							for(var j=0;j<treeList[i].manageList.length;j++){
			     								delete treeList[i].manageList[j].manageList
			     							}
			     							
			     						}


			     						
			     						var tree=[]
			     						for(var i=0;i<treeList.length;i++){
			     							for(var k=0;k<that.checkedlist.length;k++){
			     							   for(var j=0;j<treeList[i].manageList.length;j++){
			     									if(that.checkedlist[k]==treeList[i].manageList[j].id){
			     										tree.push(treeList[i].manageList[j])
			     									}
			     								}
			     								
			     							}			
			     						}
			     						
			     						treeList[0]["childen"]=tree;
			     						that.treeList=treeList;
		     						}
		     					     						
		     					}

		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			that.dialogVisible=true;
	     		   })
	     		}

	     		if(that.$store.state.userinfo.userLevel==3){
	     			 var list=[];
	     			 list.push(that.$store.state.parame.buildid)
	     			var param={
	     				manageScopeIdList:list
	     			}
	     			 that.axios.post("/SmartHomeTrade/block/selectManageBlock",param).then(function(res){
		     			if(res.data.code==0){
		     					if(res.data.data!=null){
		     						if(that.clearData){
		     							var treeList=res.data.data.bList;
			     						for(var i=0;i<treeList.length;i++){
			     							for(var j=0;j<treeList[i].manageList.length;j++){
			     								delete treeList[i].manageList[j].manageList
			     							}
			     							
			     						}

			     						// that.treeList=treeList;
			     						var tree=[]
			     						for(var i=0;i<treeList.length;i++){
			     							for(var k=0;k<that.checkedlist.length;k++){
			     							   for(var j=0;j<treeList[i].manageList.length;j++){
			     									if(that.checkedlist[k]==treeList[i].manageList[j].id){
			     										tree.push(treeList[i].manageList[j])
			     									}
			     								}
			     								
			     							}			
			     						}
			     						
			     						treeList[0]["childen"]=tree;
			     						that.treeList=treeList;
		     						}
		     						debugger
		     						// console.log(that.gdList)	     						
		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			that.dialogVisible=true;
	     		    })


	     		}
	     		if(that.$store.state.userinfo.userLevel==4){
				    var obj=[]
			        var obj1= {
			            id:that.$store.state.parame.floorid,
			            addressId:that.$store.state.parame.flooraddressId
			          };

			        obj.push(obj1)
		            var param={
		            	floorAdrIdList:obj
		            }
		             that.axios.post("/SmartHomeTrade/floor/selectManageFloor",param).then(function(res){
		     			if(res.data.code==0){
		     					if(res.data.data!=null){
		     						if(that.clearData){
		     							var treeList=res.data.data.fList;
		     							for(var i=0;i<treeList.length;i++){
		     							for(var j=0;j<treeList[i].manageList.length;j++){
		     								delete treeList[i].manageList[j].manageList
		     							}
		     							
		     						}
		     						// that.treeList=treeList;
		     						var tree=[]
			     						for(var i=0;i<treeList.length;i++){
			     							for(var k=0;k<that.checkedlist.length;k++){
			     							   for(var j=0;j<treeList[i].manageList.length;j++){
			     									if(that.checkedlist[k]==treeList[i].manageList[j].id){
			     										tree.push(treeList[i].manageList[j])
			     									}
			     								}
			     								
			     							}			
			     						}
			     						
			     						treeList[0]["childen"]=tree;
			     						that.treeList=treeList;
		     						}
		     						// console.log(that.gdList)	     						
		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			that.dialogVisible=true;
	     		    })

	     		}
	     	// 当前用户在园区下的管辖范围
	     		if(e.userLevel==2){
	            var param={
	              action:1,
	              manageScopeIdList:e.manageScopeIdList
	              }
	              that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){
		     			if(res.data.code==0){
		     				// alert("sss")
		     				if(res.data.data==null){
		     					that.treeList=[]
		     					that.clearData=false

		     					return;
		     				}
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.gdList.length;i++){
	     							// if(res.data.data.gdList[i].manageList==null||res.data.data.gdList[i].manageList.length==0){
	     								checkedlist.push(res.data.data.gdList[i].id)

	     							// }else{
	     								// for(var j=0;j<res.data.data.gdList[i].manageList.length;j++){
	     									
	     								// 	// if(res.data.data.gdList[i].manageList[j].manageList==null||res.data.data.gdList[i].manageList[j].manageList.length==0){
	     								// 		checkedlist.push(res.data.data.gdList[i].manageList[j].id)
	     								// 		checkedadress.push(res.data.data.gdList[i].manageList[j].id)
	     								// 	// }else{
	     								// 		for(var a=0;a<res.data.data.gdList[i].manageList[j].manageList.length;a++){
	     								// 			// if(res.data.data.gdList[i].manageList[j].manageList[a].manageList==null||res.data.data.gdList[i].manageList[j].manageList[a].manageList.length==0){
	     								// 				checkedlist.push(res.data.data.gdList[i].manageList[j].manageList[a].id)
	     								// 				checkedadress.push(res.data.data.gdList[i].manageList[j].manageList[a].addressId)
	     								// 			// }else{
	     								// 				for(var b=0;b<res.data.data.gdList[i].manageList[j].manageList[a].manageList.length;b++){
	     								// 					checkedlist.push(res.data.data.gdList[i].manageList[j].manageList[a].manageList[b].id)
	     								// 					checkedadress.push(res.data.data.gdList[i].manageList[j].manageList[a].manageList[b].addressId)
	     								// 				}
	     								// 			// }	
	     								// 		}
	     								// 	// }
	     								// }
	     							// }
	     						}
	     						that.checkedlist=checkedlist;
	     						// that.checkedadress=checkedadress							
	     					}
		     			}
	     		   })
	           }
	           // 当前用户在大楼下的管辖范围
	     		if(e.userLevel==3){
	            var param={
	              manageScopeIdList:e.manageScopeIdList
	              }
	              that.axios.post("/SmartHomeTrade/block/selectManageBlock",param).then(function(res){
		     			if(res.data.code==0){
		     				if(res.data.data==null){

		     					that.treeList=[];
		     					that.clearData=false
		     				

		     					
		     					return;
		     				}
		     				// alert("sss")
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.bList.length;i++){
	     						// 	if(res.data.data.bList[i].manageList==null||res.data.data.bList[i].manageList.length==0){
	     								checkedlist.push(res.data.data.bList[i].id)
	     								checkedadress.push(res.data.data.bList[i].id)
	     								// debugger
	     							// }else{
	     								// for(var j=0;j<res.data.data.bList[i].manageList.length;j++){
	     									
	     									// if(res.data.data.bList[i].manageList[j].manageList==null||res.data.data.bList[i].manageList[j].manageList.length==0){
	     										// checkedlist.push(res.data.data.bList[i].manageList[j].id)
	     										// checkedadress.push(res.data.data.bList[i].manageList[j].addressId)

	     									// }else{
	     										// for(var a=0;a<res.data.data.bList[i].manageList[j].manageList.length;a++){	     					checkedlist.push(res.data.data.bList[i].manageList[j].manageList[a].id)
	     										//     checkedadress.push(res.data.data.bList[i].manageList[j].manageList[a].addressId)	     											
	     										// }
	     									// }
	     								// }
	     							// }
	     						}
	     						
	     						that.checkedlist=checkedlist;
	     						that.checkedadress=checkedadress	
	     						debugger

	     					}
		     			}
	     		   })
	           }
	            // 当前用户在楼层下的管辖范围
	     		if(e.userLevel==4){
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
		     					that.clearData=false

		     					return;
		     				}
		     				// alert("sss")
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.fList.length;i++){
	     							// if(res.data.data.fList[i].manageList==null||res.data.data.fList[i].manageList.length==0){
	     								checkedlist.push(res.data.data.fList[i].id)
	     								 checkedadress.push(res.data.data.fList[i].addressId)	
	     							// }else{
	     								// for(var j=0;j<res.data.data.fList[i].manageList.length;j++){
	     								// 	checkedlist.push(res.data.data.fList[i].manageList[j].id)
	     								// 	 checkedadress.push(res.data.data.fList[i].manageList[j].addressId)	
	     								// }
	     							// }
	     						}
	     					
	     						that.checkedlist=checkedlist;	
	     						that.checkedadress=checkedadress						
	     					}
		     			}
	     		   })
	           }
	           // 当前用户在房间下的管辖范围
	     		if(e.userLevel==5){
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
		     					that.clearData=false

		     					return;
		     				}
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.roomList.length;i++){
	     							checkedlist.push(res.data.data.roomList[i].id)
	     							 checkedadress.push(res.data.data.roomList[i].addressId)	

	     						}
	     						
	     						that.checkedlist=checkedlist;
	     						
	     						that.checkedadress=checkedadress								
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