<template>
	<div class="adressAuth">
		<el-dialog
		  title="授权用户"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">		  
			    <div class="selectUser" v-if="sectionlist!=[]">
			    	 <!-- default-expand-all -->
					<el-tree
					  :data="sectionlist"
					  show-checkbox
					
					  node-key="ucUserId"
					  
					  ref="tree"
					  highlight-current
					  :props="defaultProps">
					</el-tree>
			    </div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sureadddialog()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
		  </span>
	  </el-dialog>		
	</div>
</template>
<script>
export default{
	name:"adressAuth",
	data(){
		return{
			opendialog:false,
			pictLoading:false,
			 fullscreenLoading:false,
			title:"sss",
				blockIdList:[],
			addresslist:[],
			sectionlist:[],//部门信息
			ucUserlist:[],
			userIdlist:[],
			// deviceIdName:[],
			 input:'',
			 defaultProps: {
		          children: 'appUserInfoList',
		          label: 'name'
		    }
		}
	},
	mounted(){			
	},
	methods:{
		 // 区域授权弹框
		getAuthrization(e,q,blockIdList){
          this.addresslist=e;
          if(this.$store.state.userinfo.userLevel==2){
          	this.blockIdList=blockIdList;
          }
          // this.deviceIdName=q,
          this.sectionlist=q;
          debugger
		  this.opendialog=true;
		  // this.getDepinfo(q)
		},
// 提交
		sureadddialog(){	
		debugger		
			var that=this;

			
			var list=this.$refs.tree.getCheckedKeys()			
			 var arr=list.filter((element)=> String(element))
			debugger
			 var arr=list.filter(element=>element!= null)
			 if(arr.length==0){
			 	that.$message.warning("请选择一个用户")
			  	return;
			  }	
			  if(that.$store.state.userinfo.userLevel==2){
			  	var param={
             	deviceList:that.addresslist,
             	ucUserIdList:arr,
             	token:6,
                action:2,
                blockIdList:that.blockIdList,	
             	createUser:that.$store.state.userinfo.userMobile,
             	executeUser:that.$store.state.userinfo.name,
                createUserMobile:that.$store.state.userinfo.createUser,
              }

			  }else{
			  	var param={
             	deviceList:that.addresslist,
             	ucUserIdList:arr,
             	token:6,	
             	createUser:that.$store.state.userinfo.userMobile,
             	executeUser:that.$store.state.userinfo.name,
                createUserMobile:that.$store.state.userinfo.createUser,
              }

			}	
              	
             
            that.fullscreenLoading=true;
            that.axios.post("/SmartHomeTrade/appUser/authDeviceAppUser",param).then(res=>{
            	that.fullscreenLoading=false;
            	if(res.data.code==0){
            		that.$emit('refreshList');
            		that.opendialog=false;
            		that.$message.success(res.data.message)

            	}else{
            		that.$message.error(res.data.message)
            	}
            })

		
		},
		handleClose(done) {
            done();
          
            this.$emit('refreshList');
      }
	}

}

	
</script>
<style scoped>
.modelContain{

     height: 350px;
    overflow:hidden;
    overflow-y:auto;

}
.single{
	margin-right:10px;
	margin-bottom: 10px;

}
.mult{
	margin:10px;
	margin-left:0;
}
.create-department{
	display: inline-block;
	color:#fff;
	padding:3px 10px;
	background: #00ae89;
	cursor: pointer;
	margin-left: 15px;
}
.modelContain{
	padding-left: 10px;
}
	

</style>