<template>
	<div class="addAuthrization">

		<el-dialog
		  title="用户授权"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">		  
			  <!--   <div class="selectUser" v-if="sectionlist!=[]">
					<el-tree
					  :data="sectionlist"
					  show-checkbox
					  default-expand-all
					  node-key="ucUserId"
					  ref="tree"
					  highlight-current
					  :props="defaultProps">
					</el-tree>
			    </div> -->
			     <div class="selectUser bodersel" v-if="sectionlist!=[]">
			     	<span>请选择设备</span>
					<el-tree
					  :data="datalist"
					  show-checkbox
					  default-expand-all
					  node-key="key"
					  ref="tre"
					  highlight-current
					  :props="defaultProp">
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
	name:"addAuthrization",
	data(){
		return{
			opendialog:false,
			 fullscreenLoading:false,
			// radio:'',
			ucUserlist:[],
			 input:'',
			sectionlist:[],//部门信息
			  datalist:[],       // 设备信息
			 defaultProps: {
		          children: 'appUserInfoList',
		          label: 'name'
		    },
		     defaultProp: {
		          children: 'childen',
		          label: 'roomName'
		    }
		}
	},
	mounted(){

			
	},
	methods:{
		//获取部门信息
		// getDepinfo(){
	 //    	var that=this;
	 //    	that.axios.post("/SmartHomeTrade/department/selectDepartmentByMobile",{
	 //    		createUser:that.$store.state.userinfo.userMobile,
	 //    	}).then(function(res){
	 //    		if(res.data.code==0){
	 //    			if(res.data.data!=null){
	 //    				that.sectionlist=res.data.data.dptList
	 //    			}
	 //    		}
	 //    	}) 
		// },
		 // // 单用户
		 // changeValue(v){
	 		
	 	// },
	 	   // 获取焦点清空验证提示
	      // removeValid(formName){
	      // 	this.$refs[formName].clearValidate();
	      // },
	 	// 焦点离开
	 	// removeInfo(){
	 	// 	var that=this;
	 	// 	if(that.input==""){
	 	// 		return;
	 	// 	}
	 	// 	var param={
	 	// 		roomIdList:that.$store.state.userinfo.manageScopeIdList,
	 	// 		userMobile:that.input
	 	// 	}
	 	// 	that.axios.post("/SmartHomeTrade/appUser/selectAppUser",param).then(function(res){
	 	// 		if(res.data.code==0){
	 	// 			if(res.data.data!=null){
	 	// 				that.ucUserlist.push(res.data.data.AppUserList[0].ucUserId)
	 	// 			}
	 				
	 	// 		}else{
	 	// 			that.$message.error(res.data.message)
	 	// 		}

	 	// 	})
	 	// },
		// 获取设备信息
		getEqinfo(){
			var that=this;
			var list2=that.$store.state.userinfo.addrList;
            var list1=that.$store.state.userinfo.manageScopeIdList;

           var obj=[]
              var obj1= {
                id:that.$store.state.parame.roomid,
                addressId:that.$store.state.parame.roomaddressId
              };
              obj.push(obj1)
			var param={
				action:2,
				addressIdList:obj

			}
			
			that.axios.post("/SmartHomeTrade/device/getDeviceList",param).then(function(res){
					   if(res.data.code==0){
		          	var result = [];
					     var obj = {};
					   for(var i =0; i<res.data.data.deviceList.length; i++){
					      if(!obj[res.data.data.deviceList[i].roomId]){
					        result.push(res.data.data.deviceList[i]);
					        obj[res.data.data.deviceList[i].roomId] = true;
					     }
					  }
		          	    console.log(result);
		          	   
		          		for(var j=0;j<result.length;j++){
		          			 var result2 = [];
		          			for(var i=0;i<res.data.data.deviceList.length;i++){
		          				if(res.data.data.deviceList[i].roomId==result[j].roomId){
		          					result2.push({
		          						key:res.data.data.deviceList[i].id,
		          						roomName:res.data.data.deviceList[i].name,
		          						room_name:res.data.data.deviceList[i].roomName
		          					})
		          					result[j]["childen"]=result2;
		          				}
		          			}
		          			
		          		}
		          		
		          		that.datalist=result;
		          		console.log(result)
		          	// that.buildingIdList=res.data.data.floorList
		           }				
			})






		},


     // 添加授权弹框
		getAuthrization(){
			this.opendialog=true;
			this.getDepinfo()
			this.getEqinfo()
		},
		
		// 提交
		sureadddialog(){
			
			var that=this;

			var listsheb=this.$refs.tre.getCheckedNodes();
			if(listsheb.length==0){
				that.$message.warning("请选择设备")
				return
			}
			console.log(this.$refs.tre.getCheckedNodes())
			 var ucUserIdLists=[];
			// if(that.radio!=1&&that.radio!=2){
			// 	that.$message.warning("请选择多用户或单用户")
			// 	return;
				
			// }

			// if(that.radio==2){
				// for(var i=0;i<list.length;i++){
			 // 	if(list[i]!=null){
			 // 		ucUserIdLists.push(list[i])
			 		
			 // 	  }
			 //   }
			// }
			// if(that.radio==1){
			// 	ucUserIdLists=that.ucUserlist;
			// }


			// var deviceIdlist=[];
			// var deviceIdName=[];
			// var roomNamelist=[];
			// for(var j=0;j<listsheb.length;j++){
			// 	if(listsheb[j].key!=null){
			// 		deviceIdlist.push(listsheb[j].key)
			// 		deviceIdName.push(listsheb[j].roomName)
			// 		roomNamelist.push(listsheb[j].room_name)
							
			// 	}
			// }

			// console.log(deviceIdlist)
			// // deviceName:deviceIdName[i]

			// for(var i=0;i<deviceIdlist.length;i++){
			// 	var param={
			// 		deviceId:deviceIdlist[i],
			// 		deviceName:deviceIdName[i],
			// 		ucUserIdList:ucUserIdLists,
			// 		roomName:that.$store.state.parame.roomname,
			// 	    roomId:that.$store.state.parame.roomid			

			// 	};
			// 	that.fullscreenLoading=true;
			// 	that.axios.post("/SmartHomeTrade/appUser/deviceAuthorization",param).then(function(res){
			// 		that.fullscreenLoading=false;
			// 	if(res.data.code==0){
			// 		that.$message.success(res.data.message)
			// 		that.$emit('refreshList')
			// 		that.opendialog=false;
			// 	}else{
			// 		that.$message.error(res.data.message)
			// 	}
			// })

			// }

					
			
			


		},




		// // 创建部门
		// createDepart(){
		// 	 this.$refs.mycreatechild.opendialogVisible();
		// },
		handleClose(done) {
            done();
           

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
.bodersel{
	border-top:1px solid #ccc;
}

</style>