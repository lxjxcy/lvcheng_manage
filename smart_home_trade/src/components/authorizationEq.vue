<template>
	<div class="authorizationEq">
		<el-dialog
		  title="授权用户"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">		  
			    <div class="selectUser" v-if="sectionlist!=[]">
					<el-tree
					  :data="sectionlist"
					  show-checkbox
					  node-key="ucUserId"
					   :default-expanded-keys="userIdList"
					   :default-checked-keys="userIdList"
					  ref="tree"
					  highlight-current
					  empty-text="没有匹配的app用户"
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
			pictLoading:true,
			 fullscreenLoading:false,
			 buildId:'',
			title:"sss",
			deviceparam:{

			},
			sectionlist:[],//部门信息
			ucUserlist:[],
			userIdList:[],
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
		getDepinfo(q){
			
	    	var that=this;
	    	that.axios.post("/SmartHomeTrade/appUser/selectDptUser",{
	    		createUser:that.$store.state.userinfo.userMobile,
	    		action:2
	    	}).then(function(res){
	    		that.pictLoading=false;
	    		if(res.data.code==0){
	    			if(res.data.data!=null){
	    				// that.sectionlist=res.data.data.dptUserList;
	    				var userlist=res.data.data.dptUserList;
		              for(var i=0;i<userlist.length;i++){
		                userlist[i].name=userlist[i].buildingName;
		                userlist[i].appUserInfoList=userlist[i].dptList;
		              }
		              var userlist=userlist;



		              if(q.length>0){
		              	for(var j=0;j<userlist.length;j++){
			              	for(var k=0;k<userlist[j].appUserInfoList.length;k++){
			              		for(var d=0;d<userlist[j].appUserInfoList[k].appUserInfoList.length;d++){
			              			for(var w=0;w<q.length;w++){
			              				if(q[w]==userlist[j].appUserInfoList[k].appUserInfoList[d].ucUserId){
			              					userlist[j].appUserInfoList[k].appUserInfoList[d].disabled=true;
			              				}
			              			}
			              		}
			              	}
			              }
		              }		              
		               var buidlist=[]
		              for(var d=0;d<userlist.length;d++){
		              		if(userlist[d].buildingId==that.buildId){
		              				buidlist.push(userlist[d])
		              		}
		              }		             
		              that.sectionlist=buidlist;		             
	    			}
	    		}
	    	})

		},

		// 用户回填
		havauser(id){
			var that=this;
			that.axios.post("/SmartHomeTrade/device/selectUserIdByDeviceId",{
				deviceId:id
			}).then(res=>{
				if(res.data.data!=null){
				  that.userIdList=res.data.data.userIdList;
				  debugger
				  that.getDepinfo(res.data.data.userIdList)
				}else{
				   that.userIdList=[]
				   that.getDepinfo([])
				}
				

			})

		},

     // 添加授权弹框
		getAuthrization(e){
			this.buildId=e.blockId;
			 
      this.deviceparam={
      	      deviceId:e.id,
               deviceName:e.name,
               roomName:e.inAddress,
               roomId:e.roomId,
      };
      debugger
			this.opendialog=true;
			this.havauser(e.id)
			
			









		},
// 提交
		sureadddialog(){			
			var that=this;
			
			var list=this.$refs.tree.getCheckedKeys()

				
			  var arr=list.filter(element=>element!= null)

			  var arr=list.filter(element=>element!= null)
			 if(arr.length==0){
			 	that.$message.warning("请选择一个用户")
			  	return;
			  }		
			 for(var i=0;i<arr.length;i++){
	    			for(var j=0;j<that.userIdList.length;j++){
	    				if(arr[i]==that.userIdList[j]){
	    					 arr.splice(i, 1)
	    				}

	    			}
	    		}
	    		if(arr.length==0&&that.userIdList.length!=0){
	    		  	debugger
			  	that.$emit('refreshList');
					 that.$emit('reload');
					 that.$emit('clearselect');
					that.opendialog=false;
			  	return;
			  }		
			var param={
				ucUserIdList:arr,
				deviceId:that.deviceparam.deviceId,
				deviceName:that.deviceparam.deviceName,	
				roomName:that.deviceparam.roomName,
				roomId:that.deviceparam.roomId,
				createUser:that.$store.state.userinfo.userMobile,
			}
			debugger
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