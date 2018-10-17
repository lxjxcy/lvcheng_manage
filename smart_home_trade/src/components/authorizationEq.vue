<template>
	<div class="authorizationEq">
		<el-dialog
		  title="授权设备"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">		  
			    <div class="selectUser" v-if="sectionlist!=[]">
					<el-tree
					  :data="sectionlist"
					  show-checkbox
					  default-expand-all
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
	name:"authorizationEq",
	data(){
		return{
			opendialog:false,
			 fullscreenLoading:false,
			title:"sss",
			deviceparam:{

			},
			sectionlist:[],//部门信息
			ucUserlist:[],
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
		//获取部门下的用户信息
		getDepinfo(){
	    	var that=this;
	    	that.axios.post("/SmartHomeTrade/appUser/selectDptUser",{
	    		createUser:that.$store.state.userinfo.userMobile,
	    		action:2
	    	}).then(function(res){
	    		if(res.data.code==0){
	    			if(res.data.data!=null){
	    				// that.sectionlist=res.data.data.dptUserList;
			    	  var userlist=res.data.data.dptUserList;
		              for(var i=0;i<userlist.length;i++){
		                userlist[i].name=userlist[i].buildingName;
		                userlist[i].appUserInfoList=userlist[i].dptList;

		              }
		              that.sectionlist=userlist;
	    			}
	    		}
	    	})

		},
     // 添加授权弹框
		getAuthrization(e){
      this.deviceparam=e;
      
			this.opendialog=true;
			this.getDepinfo()
		},
// 提交
		sureadddialog(){			
			var that=this;
			
			var list=this.$refs.tree.getCheckedKeys()
			 var ucUserIdLists=[];	
				 for(var i=0;i<list.length;i++){
			 	if(list[i]!=null){
			 		ucUserIdLists.push(list[i])
			 	  }
			   }				
			var param={
				ucUserIdList:ucUserIdLists,
				deviceId:that.deviceparam.deviceId,
				deviceName:that.deviceparam.deviceName,	
				roomName:that.deviceparam.roomName,
				roomId:that.deviceparam.roomId,
				createUser:that.$store.state.userinfo.userMobile,
			}
			that.fullscreenLoading=true;
			that.axios.post("/SmartHomeTrade/appUser/deviceAuthorization",param).then(function(res){
				that.fullscreenLoading=false;
				if(res.data.code==0){
					that.$message.success(res.data.message)
					that.$emit('refreshList');
					 that.$emit('reload');
					 that.$emit('clearselect');
					that.opendialog=false;
				}else{
					that.$message.error(res.data.message)
				}
			})
		},
		handleClose(done) {
            done();
            this.$emit('clearselect');
            this.$emit('refreshList');
            this.$emit('reload');


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