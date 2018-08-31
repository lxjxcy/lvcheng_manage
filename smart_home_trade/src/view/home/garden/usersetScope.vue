
<template>
	<div class="usersetScope">
		<el-dialog
		  title="设置管辖范围"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelScope">
		  	<el-tree
				  :data="gdList"
				  show-checkbox
				  node-key="id"
				  ref="tree"
				  :props="defaultProps">
			</el-tree>

		  	
		  </div>
		  
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="submit()">确 定</el-button>
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
	        gdList:[],
	         defaultProps: {
		          children: 'manageList',
		          label: 'name'
		        },
		     nowUser:"",
		     parkId:[],
		     parkadress:[],
	      };
	    },
	     methods: {
	     	getopen(e){
	     		var that=this;
	     		that.nowUser=e;
	     		that.dialogVisible=true;
	     		if(that.$store.state.userinfo.userLevel==1||that.$store.state.userinfo.userLevel==2){
	     			var param={
	     			action:1,
	     			manageScopeIdList:that.$store.state.userinfo.manageScopeIdList
	     		   }
	     		}
	     		that.axios.post("/SmartHomeTrade/garden/selectYardsAll",param).then(function(res){
	     			if(res.data.code==0){
	     					if(res.data.data!=null){
	     						that.gdList=res.data.data.gdList;
	     						console.log(that.gdList)	     						
	     					}
	     			}else{
	     				// that.$message.error(res.data.message);
	     			}
	     		})
	     	},

	        handleClose(done) {
	            done()
	        },
	        submit(){
	        	var that=this;
	        	var list=that.$refs.tree.getCheckedKeys()
		        	for(var i=0;i<list.length;i++){
		        		for(var j=0;j<that.gdList.length;j++){
		        			if(list[i]==that.gdList.length[j].id){
		        					that.parkId.push(that.gdList.length[j].id)
		        					that.parkadress.push(that.gdList.length[j].detailAddress)
		        			}else{
		        				// for(var a=0;a<that.gdList.length[j].manageList.length;a++){
		        					
		        				// }
		        			}
		        		}

		        	}
	        	 
	        
	        }
	    }
	}
</script>
<style>
	
</style>