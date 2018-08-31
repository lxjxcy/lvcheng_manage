<template>
	<div class="addAuthrization">

		<el-dialog
		  title="添加授权"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">		  
			    <el-radio :label="1" v-model="radio"class="single" @change="getvalue">授权单用户</el-radio>
			    <!-- <single></single> -->
			    <div style="width:60%;margin-bottom:10px">
			    	
			    	<el-input v-model="input" placeholder="请输入内容" @input="changeValue" @blur="removeInfo()"></el-input>
			    </div>
			    <el-radio :label="2" v-model="radio"class="mult" @change="getvalue">授权多用户</el-radio>
			    <span class="create-department" @click="createDepart()">+创建部门</span>
			    <span class="create-department" @click="addemployee()" @refreshList="getDepinfo">+添加员工</span>
			    <createDepartment ref="mycreatechild"  @refreshList="getDepinfo"></createDepartment>
			    <addAppuser ref="myaddchild" @refreshList="getDepinfo"></addAppuser>
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
		    <el-button type="primary" @click="sureadddialog()">确 定</el-button>
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
			radio:'',
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
		getDepinfo(){
	    	var that=this;
	    	that.axios.post("/SmartHomeTrade/department/selectDepartmentByMobile",{
	    		createUser:that.$store.state.userinfo.userMobile,
	    	}).then(function(res){
	    		if(res.data.code==0){
	    			if(res.data.data!=null){
	    				that.sectionlist=res.data.data.dptList
	    			}
	    		}
	    	}) 
		},
		 // 单用户
		 changeValue(v){
	 		
	 	},
	 	// 焦点离开
	 	removeInfo(){
	 		var that=this;
	 		var param={
	 			roomIdList:that.$store.state.userinfo.manageScopeIdList,
	 			userMobile:that.input
	 		}
	 		that.axios.post("/SmartHomeTrade/appUser/selectAppUser",param).then(function(res){
	 			if(res.data.code==0){
	 				if(res.data.data!=null){
	 					that.ucUserlist.push(res.data.data.AppUserList[0].ucUserId)
	 				}
	 				
	 			}else{
	 				that.$message.error(res.data.message)
	 			}

	 		})
	 	},
		// 获取设备信息
		getEqinfo(){
			var that=this;
			var list2=that.$store.state.userinfo.addrList;
            var list1=that.$store.state.userinfo.manageScopeIdList;

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
		// 获取单用户和多用户
		getvalue(value){
			
		},
		// 添加员工
		addemployee(){
			// alert("111")
			var that=this;
			if(that.sectionlist.length==0){
				that.$message.info("请先创建部门");
				return;
			}

			 that.$refs.myaddchild.getaddAppuser("1");
			
		},
		// 提交
		sureadddialog(){
			var that=this;
			var list=this.$refs.tree.getCheckedKeys()
			var listsheb=this.$refs.tre.getCheckedNodes();
			 var ucUserIdLists=[];
			if(that.radio!=1&&that.radio!=2){
				that.$message.warning("请选择多用户或多用户")
				return;
				
			}

			if(that.radio==2){
				for(var i=0;i<list.length;i++){
			 	if(list[i]!=null){
			 		ucUserIdLists.push(list[i])
			 		
			 	  }
			   }
			}
			if(that.radio==1){
				ucUserIdLists=that.ucUserlist;
			}


			var deviceIdlist=[];
			var deviceIdName=[];
			for(var j=0;j<listsheb.length;j++){
				if(listsheb[j].key!=null){
					deviceIdlist.push(listsheb[j].key)
					deviceIdName.push(listsheb[j].roomName)

				}
			}

			console.log(deviceIdlist)
			// deviceName:deviceIdName[i]

			for(var i=0;i<deviceIdlist.length;i++){
				var param={
					deviceId:deviceIdlist[i],
					ucUserIdList:ucUserIdLists,

				};
				that.axios.post("/SmartHomeTrade/appUser/deviceAuthorization",param).then(function(res){
				if(res.data.code==0){
					that.$message.success(res.data.message)
					// that.$emit('refreshList');
					that.opendialog=false;
				}else{
					that.$message.error(res.data.message)
				}
			})

			}

					
			
			


		},




		// 创建部门
		createDepart(){
			 this.$refs.mycreatechild.opendialogVisible();
		},
		handleClose(done) {
            done();
            this.radio=""

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