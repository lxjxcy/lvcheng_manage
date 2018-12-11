
<template>
	<div class="usersetScope">
		<el-dialog
		  title="设置管辖范围"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelScope" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">
		  	<el-tree
				  :data="treeList"
				  show-checkbox
				  node-key="id"
				  ref="tree"
				  :default-checked-keys="checkedlist"
				  :props="defaultProps">
			</el-tree>

		  	
		  </div>
		  
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="submit()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
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
	        fullscreenLoading:false,
	        pictLoading:true,
	        treeList:[],
	         defaultProps: {
		          children: 'manageList',
		          label: 'name'
		        },
		      checkedlist:[],
		     
		      checkedadress:[],
		     nowUserinfo:{},
		     parkId:[],
		     buildId:[],
		     buildAdress:[],
		     floorId:[],
		     floorAdress:[],
		     roomId:[],
		     roomAdress:[]
	      };
	    },
	     methods: {
	     	getopen(e){
	     		var that=this;
	     		that.nowUserinfo=e;
	     		that.dialogVisible=true;
	     		
	     		if(that.$store.state.userinfo.userLevel==1){	     			
	     			var param={
	     			action:1,
	     			bs:2,
	     			manageScopeIdList:that.$store.state.userinfo.manageScopeIdList
	     		   }
	     		   that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){

		     			if(res.data.code==0){
		     					that.pictLoading=false;

		     					if(res.data.data!=null){
		     						var treeList=res.data.data.gdList;

		     						for(var i=0;i<treeList.length;i++){
		     							delete treeList[i].manageList
		     						}
		     						that.treeList=treeList;
		     						   						
		     					}

		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			
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
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.gdList.length;i++){
	     							// if(res.data.data.gdList[i].manageList==null||res.data.data.gdList[i].manageList.length==0){
	     								checkedlist.push(res.data.data.gdList[i].id)

	     							// }else{
	     								for(var j=0;j<res.data.data.gdList[i].manageList.length;j++){
	     									
	     									// if(res.data.data.gdList[i].manageList[j].manageList==null||res.data.data.gdList[i].manageList[j].manageList.length==0){
	     										checkedlist.push(res.data.data.gdList[i].manageList[j].id)
	     										checkedadress.push(res.data.data.gdList[i].manageList[j].id)
	     									// }else{
	     										for(var a=0;a<res.data.data.gdList[i].manageList[j].manageList.length;a++){
	     											// if(res.data.data.gdList[i].manageList[j].manageList[a].manageList==null||res.data.data.gdList[i].manageList[j].manageList[a].manageList.length==0){
	     												checkedlist.push(res.data.data.gdList[i].manageList[j].manageList[a].id)
	     												checkedadress.push(res.data.data.gdList[i].manageList[j].manageList[a].addressId)
	     											// }else{
	     												for(var b=0;b<res.data.data.gdList[i].manageList[j].manageList[a].manageList.length;b++){
	     													checkedlist.push(res.data.data.gdList[i].manageList[j].manageList[a].manageList[b].id)
	     													checkedadress.push(res.data.data.gdList[i].manageList[j].manageList[a].manageList[b].addressId)
	     												}
	     											// }	
	     										}
	     									// }
	     								}
	     							// }
	     						}
	     						that.checkedlist=checkedlist
	     						that.checkedadress=checkedadress							
	     					}
		     			}
	     		   })
	           }
	           // 当前用户在园区下的管辖范围
	     		if(e.userLevel==3){
	            var param={
	              manageScopeIdList:e.manageScopeIdList
	              }
	              that.axios.post("/SmartHomeTrade/block/selectManageBlock",param).then(function(res){
		     			if(res.data.code==0){
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
	     								for(var j=0;j<res.data.data.bList[i].manageList.length;j++){
	     									
	     									// if(res.data.data.bList[i].manageList[j].manageList==null||res.data.data.bList[i].manageList[j].manageList.length==0){
	     										checkedlist.push(res.data.data.bList[i].manageList[j].id)
	     										checkedadress.push(res.data.data.bList[i].manageList[j].addressId)

	     									// }else{
	     										for(var a=0;a<res.data.data.bList[i].manageList[j].manageList.length;a++){	     					checkedlist.push(res.data.data.bList[i].manageList[j].manageList[a].id)
	     										    checkedadress.push(res.data.data.bList[i].manageList[j].manageList[a].addressId)	     											
	     										}
	     									// }
	     								}
	     							// }
	     						}
	     						that.checkedlist=checkedlist;
	     						that.checkedadress=checkedadress	
	     						// debugger

	     					}
		     			}
	     		   })
	           }
	            // 当前用户在园区下的管辖范围
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
		     				// alert("sss")
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.fList.length;i++){
	     							// if(res.data.data.fList[i].manageList==null||res.data.data.fList[i].manageList.length==0){
	     								checkedlist.push(res.data.data.fList[i].id)
	     								 checkedadress.push(res.data.data.fList[i].addressId)	
	     							// }else{
	     								for(var j=0;j<res.data.data.fList[i].manageList.length;j++){
	     									checkedlist.push(res.data.data.fList[i].manageList[j].id)
	     									 checkedadress.push(res.data.data.fList[i].manageList[j].addressId)	
	     								}
	     							// }
	     						}
	     						that.checkedlist=checkedlist	
	     						that.checkedadress=checkedadress						
	     					}
		     			}
	     		   })
	           }
	                 // 当前用户在园区下的管辖范围
	     		if(e.userLevel==5){
	                var param={
		            	roomListId:e.manageScopeIdList,
		            	adrIdList:e.addrList,
		            	noPage:1,
		            }
	              that.axios.post("/SmartHomeTrade/room/selectMyRoom",param).then(function(res){
		     			if(res.data.code==0){
		     				// alert("sss")
	     					if(res.data.data!=null){
	     						var  checkedlist=[]
	     						var checkedadress=[]
	     						for(var i=0;i<res.data.data.roomList.length;i++){
	     							checkedlist.push(res.data.data.roomList[i].id)
	     							 checkedadress.push(res.data.data.roomList[i].addressId)	

	     						}
	     						that.checkedlist=checkedlist
	     						that.checkedadress=checkedadress								
	     					}
		     			}
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
	                    that.pictLoading=false;
		     					if(res.data.data!=null){
		     						// that.treeList=res.data.data.gdList;
		     						var treeList=res.data.data.gdList;

		     						for(var i=0;i<treeList.length;i++){
		     							for(var j=0;j<treeList[i].manageList.length;j++){
		     								delete treeList[i].manageList[j].manageList
		     							}
		     							
		     						}

		     						that.treeList=treeList;
		     							     						
		     					}

		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			
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
		     					that.pictLoading=false;
		     					if(res.data.data!=null){
		     						// that.treeList=res.data.data.bList;
		     						
		     						var treeList=res.data.data.bList;
		     						for(var i=0;i<treeList.length;i++){
		     							for(var j=0;j<treeList[i].manageList.length;j++){
		     								delete treeList[i].manageList[j].manageList
		     							}
		     							
		     						}
		     						that.treeList=treeList;

		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			
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
		     					that.pictLoading=false;
		     					if(res.data.data!=null){
		     						// that.treeList=res.data.data.fList;
		     						
		     						var treeList=res.data.data.fList;
		     						for(var i=0;i<treeList.length;i++){
		     							for(var j=0;j<treeList[i].manageList.length;j++){
		     								delete treeList[i].manageList[j].manageList
		     							}
		     							
		     						}
		     						that.treeList=treeList;
    						
		     					}
		     			}else{
		     				that.$message.error(res.data.message);
		     			}
		     			
	     		    })

	     		}

	          // console.log(that.$refs.tree.getCheckedKeys())
	     		
	     		
	     	},

	     	// 关闭弹框
	        handleClose(done) {
	            done();
	            this.treeList=[];
	            this.$emit('reload');
	            this.checkedlist=[];
	        },
	        // 清空选中数据
	        clearDAta(){
	        	 this.parkId=[];
			     this.buildId=[];
			     this.buildAdress=[];
			     this.floorId=[];
			     this.floorAdress=[];
			     this.roomId=[];
			     this.roomAdress=[];

	        },


	        submit(){	
	        	var that=this;
	        	var list=[];
	        	 list=that.$refs.tree.getCheckedKeys();
		        	// if(list.length==0){
		        	// 	return;
		        	// }
		        	if(that.$store.state.userinfo.userLevel==1||that.$store.state.userinfo.userLevel==2){
		        		for(var i=0;i<list.length;i++){
			        		if(that.treeList!=[]){
			        			for(var j=0;j<that.treeList.length;j++){
				        			if(list[i]==that.treeList[j].id){
				        					that.parkId.push(that.treeList[j].id)
				        			}else{
				        				if(that.treeList[j].manageList!=null){
				        					for(var a=0;a<that.treeList[j].manageList.length;a++){
					        					if(list[i]==that.treeList[j].manageList[a].id){
					        						that.buildId.push(that.treeList[j].manageList[a].id)
					        						that.buildAdress.push(that.treeList[j].manageList[a].id)
					        					}else{
					        						if(that.treeList[j].manageList[a].manageList!=null){
					        							for(var b=0;b<that.treeList[j].manageList[a].manageList.length;b++){
						        							if(list[i]==that.treeList[j].manageList[a].manageList[b].id){
						        								that.floorId.push(that.treeList[j].manageList[a].manageList[b].id)
						        								that.floorAdress.push(that.treeList[j].manageList[a].manageList[b].addressId)
						        							}else{
						        								if(that.treeList[j].manageList[a].manageList[b].manageList!=null){
						        									for(var c=0;c<that.treeList[j].manageList[a].manageList[b].manageList.length;c++){
							        									if(list[i]==that.treeList[j].manageList[a].manageList[b].manageList[c].id){
							        										that.roomId.push(that.treeList[j].manageList[a].manageList[b].manageList[c].id)
							        										that.roomAdress.push(that.treeList[j].manageList[a].manageList[b].manageList[c].addressId)
							        									}
							        								}
						        								}						        								
						        							}
						        						}
					        						}					        						
					        					}
					        				}
				        				}				        				
				        			}
				        		}
			        		}
			        	}

		        	}
		        	if(that.$store.state.userinfo.userLevel==3){
		        		

		        		
		        		for(var i=0;i<list.length;i++){
		        			if(that.treeList!=[]){
		        				
		        				
		        				for(var j=0;j<that.treeList.length;j++){
		        					
		        					if(list[i]==that.treeList[j].id){
		        						
		        						that.buildId.push(that.treeList[j].id)
					        			that.buildAdress.push(that.treeList[j].id)
		        					}else{
		        						if(that.treeList[j].manageList!=null){
		        							
		        							for(var a=0;a<that.treeList[j].manageList.length;a++){
		        								if(list[i]==that.treeList[j].manageList[a].id){
		        									// debugger
		        									that.floorId.push(that.treeList[j].manageList[a].id)
						        					that.floorAdress.push(that.treeList[j].manageList[a].addressId)
		        								}else{
		        									if(that.treeList[j].manageList[a].manageList!=null){
		        										// debugger
		        										for(var b=0;b<that.treeList[j].manageList[a].manageList.length;b++){
		        											if(list[i]==that.treeList[j].manageList[a].manageList[b].id){
		        												// debugger
		        												that.roomId.push(that.treeList[j].manageList[a].manageList[b].id)
							        							that.roomAdress.push(that.treeList[j].manageList[a].manageList[b].addressId)
		        											}
		        										}
		        									}
		        								}
		        							}
		        						}
		        					}
		        				}
		        			}
		        		}
		        	}
		        	if(that.$store.state.userinfo.userLevel==4){
		        		for(var i=0;i<list.length;i++){
		        			if(that.treeList!=[]){
		        				for(var j=0;j<that.treeList.length;j++){
		        					if(list[i]==that.treeList[j].id){
		        						that.floorId.push(that.treeList[j].id)
						        		that.floorAdress.push(that.treeList[j].addressId)
		        					}else{
		        						if(that.treeList[j].manageList!=null){
		        							for(var a=0;a<that.treeList[j].manageList.length;a++){
		        								that.roomId.push(that.treeList[j].manageList[a].id)
							        			that.roomAdress.push(that.treeList[j].manageList[a].addressId)
		        							}
		        						}
		        					}
		        				}
		        			}
		        		}
		        	}





		        	var comparam={
		        			setUserUuid:that.nowUserinfo.uuid,
		        			userLevel:that.nowUserinfo.userLevel,
		        			userId:that.nowUserinfo.userId,
		        			userMobile:that.nowUserinfo.userMobile,
		        			createUser:that.$store.state.userinfo.userMobile,
		        			executeUser:that.$store.state.userinfo.name,
                            createUserMobile:that.$store.state.userinfo.createUser,
		        		}
		        	        		

		        	if(that.nowUserinfo.userLevel==2){
			        	var list1=that.parkId;
			        	if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("至少选择一个园区")
			                	that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;
		                 	 
		                    }	
			        	that.checkedlist.forEach((element,index)=>{
			        		that.parkId.forEach((item,index2)=>{
			        			if(element==item){
			        				list1.splice(index2, 1)
			        			}
			        		})
			        	})	
			        	 if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("此园区该用户已管辖,请新增一个园区")
			                	that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;
		                 	 
		                    }	 
			        	
			        	             
			                var obj=[]
			                for(var i=0;i<list1.length;i++){
			                    var obj2={
			                      manageScopeId:list1[i],
			                      adrressId:null,
			                    }
			                 
			                    obj.push(obj2)
			                }	
			                      		
		        		var Levelparam={
		        			action:2,
		        			adrManIdList:obj
		        		}

		        	}

		        	if(that.nowUserinfo.userLevel==3){
		        		var list1=that.buildId;
		        		 if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("至少一个大楼")
			                	that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;   	 
		                }	
			        	that.checkedlist.forEach((element,index)=>{
			        		that.buildId.forEach((item,index2)=>{
			        			if(element==item){
			        				list1.splice(index2, 1)
			        			}
			        		})
			        	})
			        	 if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("此大楼该用户已管辖,请新增一个大楼")
			                	that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;   	 
		                }	
			        
		                var obj=[]
		                for(var i=0;i<list1.length;i++){
		                    var obj2={
		                      manageScopeId:list1[i],
		                      adrressId:list1[i]
		                    }
		                   
		                    obj.push(obj2)
		                }		
		                   		
		        		var Levelparam={
		        			action:3,
		        			adrManIdList:obj
		        		}
		        	}
		        	if(that.nowUserinfo.userLevel==4){
		        		var list1=that.floorId;
		        		 if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("至少选择一个楼层")
			                	that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;
		                 	 
		                    }	
			        	that.checkedlist.forEach((element,index)=>{
			        		that.floorId.forEach((item,index2)=>{
			        			if(element==item){
			        				list1.splice(index2, 1)
			        			}
			        		})
			        	})
			        	 if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("此楼层该用户已管辖,请新增一个楼层")
			                	that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;
		                 	 
		                    }	

		        			
		                var list2=that.floorAdress; 
		                that.checkedadress.forEach((element,index)=>{
			        		that.floorAdress.forEach((item,index2)=>{
			        			if(element==item){
			        				list2.splice(index2, 1)
			        			}
			        		})
			        	}) 
			        

		                var obj=[]
		                for(var i=0;i<list1.length;i++){
		                    var obj2={
		                      manageScopeId:list1[i],
		                      adrressId:list2[i]
		                    }
		                   
		                    obj.push(obj2)
		                }	
		                 	 		        		
		        		var Levelparam={
		        			action:4,
		        			adrManIdList:obj
		        		}
		        	}
		        	if(that.nowUserinfo.userLevel==5){
		        		var list1=that.roomId;
		        		if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("至少选择一个房间")
			                     that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;
		                 	 
		                    }	
			        	that.checkedlist.forEach((element,index)=>{
			        		that.roomId.forEach((item,index2)=>{
			        			if(element==item){
			        				list1.splice(index2, 1)
			        			}
			        		})
			        	})
			        	 if(list1.length==0){
			                	// that.dialogVisible=false;
			                	that.$message.warning("此房间该用户已管辖,请新增一个房间")
			                     that.clearDAta()
			                	 // that.$emit('refreshList');
		                 	    return;
		                 	 
		                    }	
		        			
		                var list2=that.roomAdress; 
		                that.checkedadress.forEach((element,index)=>{
			        		that.roomAdress.forEach((item,index2)=>{
			        			if(element==item){
			        				list2.splice(index2, 1)
			        			}
			        		})
			        	})   
			            
		                var obj=[]
		                for(var i=0;i<list1.length;i++){
		                    var obj2={
		                      manageScopeId:list1[i],
		                      adrressId:list2[i]
		                    }
		                  
		                    obj.push(obj2)
		                }	
		                      		
		        		var Levelparam={
		        			action:5,
		        			adrManIdList:obj

		        		}
		        	}
		        	var param=Object.assign(comparam, Levelparam)
		        	that.fullscreenLoading=true
		        	that.axios.post("/SmartHomeTrade/user/manageSetAdmin",param).then(function(res){
		        		that.fullscreenLoading=false;
		        		if(res.data.code==0){		     				
		     			     that.$message.success(res.data.message);
		     			     that.$emit('refreshList');
		     			     that.clearDAta()
		     			     this.$emit('reload');
		     			     that.dialogVisible=false;    								     			
		     			}else{
		     				that.clearDAta()
		     				that.$message.error(res.data.message);
		     			}
		        	})


		
		        
	        }
	    }
	}
</script>
<style>
	
</style>