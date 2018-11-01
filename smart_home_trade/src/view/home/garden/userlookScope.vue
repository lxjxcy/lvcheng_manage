<template>
	<div class="usersetScope">
		<el-dialog
		  title="管辖范围"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelScope" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">
		  	<el-tree
				  :data="treeList"				 
				  node-key="id"
				  default-expand-all
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
		name:"usersetScope",
		data() {
	      return {
	        dialogVisible: false,
	        treeList:[],
	        pictLoading:true,
	       
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
	              	that.pictLoading=false;
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
	              	that.pictLoading=false;
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
	              	that.pictLoading=false;

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
	     			that.dialogVisible=true;
	     			 var param={
		            	roomListId:e.manageScopeIdList,
		            	adrIdList:e.addrList,
		            	noPage:1,
		            }
	              that.axios.post("/SmartHomeTrade/room/selectMyRoom",param).then(function(res){
	              	that.pictLoading=false;
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
	     	  handleClose(done) {
	            done()
	            this.treeList=[];
	            this.$emit('reload');
	           
	        },
	        close(){
	        	this.treeList=[];
	        	this.$emit('reload');
	        	this.dialogVisible=false;
	           
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