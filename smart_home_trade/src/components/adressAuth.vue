<template>
	<div class="adressAuth">
		<el-dialog
		  title="区域授权"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">		  
			    <div class="selectUser" v-if="sectionlist!=[]">
			    	 <!-- default-expand-all -->
					<el-tree
					  :data="sectionlist"
					  show-checkbox
					 :default-expanded-keys="userIdlist"
					  node-key="ucUserId"
					   :default-checked-keys="userIdlist"
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
			 fullscreenLoading:false,
			title:"sss",
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
		getAuthrization(e,q){
          this.addresslist=e;
          // this.deviceIdName=q,
          this.userIdlist=q;
          debugger
		  this.opendialog=true;
		  this.getDepinfo(q)
		},
		//获取部门下的用户信息
		getDepinfo(q){
	    	var that=this;
	    	 var param={
		          createUser:that.$store.state.userinfo.userMobile,
		          action:2
		        }
	    	that.axios.post("/SmartHomeTrade/appUser/selectDptUser",param).then(function(res){
	    		if(res.data.code==0){
	    			if(res.data.data!=null){
	    				that.sectionlist=res.data.data.dptUserList;
	    				var userlist=res.data.data.dptUserList;
		              for(var i=0;i<userlist.length;i++){
		                userlist[i].name=userlist[i].buildingName;
		                userlist[i].appUserInfoList=userlist[i].dptList;

		              }
		              var userlist=userlist;
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
		              that.sectionlist=userlist;
		             
	    			}
	    		}
	    	})

		},
// 提交
		sureadddialog(){			
			var that=this;
			
			var list=this.$refs.tree.getCheckedKeys()			
			 var arr=list.filter((element)=> String(element))
			debugger
			 var arr=list.filter(element=>element!= null)


			 for(var i=0;i<arr.length;i++){

	    		
	    			for(var j=0;j<that.userIdlist.length;j++){
	    				if(arr[i]==that.userIdlist[j]){
	    					 arr.splice(i, 1)
	    				}

	    			}
	    		}

			if(that.$store.state.userinfo.userLevel==2){

             var param={
             	blockIdList:that.addresslist,
             	ucUserIdList:arr,
             	token:3,
             	createUser:that.$store.state.userinfo.userMobile,
             }

            }
             if(that.$store.state.userinfo.userLevel==3){
             	var param={
             	floorIdList:that.addresslist,
             	ucUserIdList:arr,
             	addressId:that.$store.state.parame.buildid,
             	token:4,
             	createUser:that.$store.state.userinfo.userMobile,
             }
              
            }
             if(that.$store.state.userinfo.userLevel==4){
             	var param={
             	roomIdList:that.addresslist,
             	ucUserIdList:arr,
             	addressId:that.$store.state.parame.flooraddressId,
             	token:4,
             	createUser:that.$store.state.userinfo.userMobile,
             }
              
            }
              if(that.$store.state.userinfo.userLevel==5){
              	var param={
             	deviceList:that.addresslist,
             	ucUserIdList:arr,
             	token:6,
             	
             	createUser:that.$store.state.userinfo.userMobile,
             }
             debugger

               
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