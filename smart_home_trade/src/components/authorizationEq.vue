<template>
	<div class="authorizationEq">

		<el-dialog
		  title="授权设备"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">		  
			    <el-radio :label="1" v-model="radio"class="single" @change="getvalue">授权单用户</el-radio>
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
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sureadddialog()">确 定</el-button>
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
			radio:'',
			title:"sss",
			deviceId:'',
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
     // 添加授权弹框
		getAuthrization(e){
      this.deviceId=e;
       console.log(this.deviceId)
			this.opendialog=true;
			this.getDepinfo()
		},
		// 获取单用户和多用户
		getvalue(value){
			this.radio=value
			
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
		// 焦点离开
	 	removeInfo(){
	 		var that=this;
	 		var param={
	 			roomIdList:that.$store.state.userinfo.manageScopeIdList,
	 			userMobile:that.input
	 		}
	 		that.axios.post("/SmartHomeTrade/appUser/selectAppUser",param).then(function(res){

	 			if(res.data.code==0){
	 				alert("111")

	 				if(res.data.data!=null){
	 					that.ucUserlist.push(res.data.data.AppUserList[0].ucUserId)
	 					console.log(res.data.data.AppUserList[0].ucUserId)
	 				}
	 				
	 			}else{
	 				that.$message.error(res.data.message)
	 			}


	 		})
	 		

	 	},
// 提交
		sureadddialog(){
			var that=this;
			var list=this.$refs.tree.getCheckedKeys()
			 var ucUserIdLists=[];
			if(that.radio!=1&&that.radio!=2){
				that.$message.warning("请选择多用户或多用户")
				return;
				
			}
			if(that.radio==2){
				alert("aaa")
				 for(var i=0;i<list.length;i++){
			 	if(list[i]!=null){
			 		ucUserIdLists.push(list[i])
			 	  }
			   }

			}
			if(that.radio==1){

				ucUserIdLists=that.ucUserlist;
				console.log(ucUserIdLists)
			}	
			alert(ucUserIdLists)		
			var param={
				ucUserIdList:ucUserIdLists,
				deviceId:that.deviceId
			}
			that.axios.post("/SmartHomeTrade/appUser/deviceAuthorization",param).then(function(res){
				if(res.data.code==0){
					that.$message.success(res.data.message)
					// that.$emit('refreshList');
					that.opendialog=false;
				}else{
					that.$message.error(res.data.message)
				}
			})


		},
		// 创建部门
		createDepart(){
			 this.$refs.mycreatechild.opendialogVisible();
		},
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
	

</style>