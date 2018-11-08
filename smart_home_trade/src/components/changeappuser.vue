
<template>
	<div class="addAppuser">
		<el-dialog
          title="修改APP账户"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          append-to-body>
          <div class="model-conent" style="padding-right: 10%">
            <el-form ref="addformValidate" :model="addformValidate" :rules="ruleValidate" :label-width="60">

              <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginName" ref="loginName">
                <el-input v-model="addformValidate.loginName" @focus="removeValid('loginName')" auto-complete="off" placeholder="请输入用户名"></el-input>
              </el-form-item>

              <!-- <el-form-item label="密码" :label-width="formLabelWidth" prop="password" ref="password">
                <el-input type="password" v-model="addformValidate.password"  auto-complete="off" style="width:220px" placeholder="请输入6-20位数字,字母或符号" @focus="removeValid('password')"></el-input>
              </el-form-item>
 -->
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" ref="name">
                <el-input type="text" placeholder="请输入姓名" :disabled="true" v-model="addformValidate.name" @focus="removeValid('name')" auto-complete="off"> </el-input>
              </el-form-item>
               <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" ref="userMobile">
                <el-input v-model="addformValidate.userMobile" :disabled="true" @focus="removeValid('userMobile')" auto-complete="off"  placeholder="请输入电话"></el-input>
              </el-form-item>

              <el-form-item label="所属部门" prop="addressId_name" :label-width="formLabelWidth">
                <el-select v-model="addformValidate.departmentId"  @change="getUserLevel" style="width:100%" placeholder="请选择部门">
                  <el-option
                    v-for="item in dptList"
                    :key="item.dptId"
                    :label="item.addressId_name"
                    :value="item.dptId">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="可见用户" prop="name" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel!=5">
	               <el-select
					    v-model="addformValidate.authCreateUser"
					    multiple
					    collapse-tags
					    placeholder="请选择用户" style="width:100%">
					    <el-option
					      v-for="item in listNextAdmin"
					      :key="item.userMobile"
					      :label="item.name"
					      :value="item.userMobile">
					    </el-option>
					</el-select>
	          </el-form-item> 

             

             <!--  <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail" ref="userEmail">
                <el-input v-model="addformValidate.userEmail" @focus="removeValid('userEmail')" auto-complete="off" style="width:220px" placeholder="请输入邮箱"></el-input>
              </el-form-item>
 -->
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addappuser('addformValidate')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
           </span>
        </el-dialog>
		
	</div>
</template>
<script>
	export default{
		name:"addAppuser",
		 data() {
		 	 //手机号验证
		      // const userMobile = (rule, value, callback) => {
		      //   if (value === '') {
		      //     callback(new Error('手机号码不能为空'));
		      //   }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))||!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
		      //     callback(new Error('请输入正确手机号'));
		      //   }else {
		      //     callback();
		      //   }
		      // };
		      //用户名验证
		      const loginName = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('用户名不能为空'));
		        }else if(!(/^\S{1,6}$/.test(value))){
		        	callback(new Error('请输入6位之内的非空字符串'));

		        }
		        else {
		          callback();
		        }
		      };
		      // //密码验证
		      // const password = (rule, value, callback) => {
		      //   if (value === '') {
		      //     callback(new Error('密码不能为空'));
		      //   }
		      //   else if(!(/^[a-zA-Z0-9\W_]{6,20}/.test(value))){
		      //   	callback(new Error('请输入6-20位数字，字母或符号'));

		      //   }else {
		      //     callback();
		      //   }
		      // };
		      // //真实姓名验证
		      // const name = (rule, value, callback) => {
		      //   if (value === '') {
		      //     callback(new Error('真实姓名不能为空'));
		      //   }else if(!(/^\S{1,6}$/.test(value))){
		      //   	callback(new Error('请输入6位之内的非空字符串'));

		      //   }else {
		      //     callback();
		      //   }
		      // };
		      //邮箱验证
		      // const userEmail = (rule, value, callback) => {
		      //   if (value === '') {
		      //     callback(new Error('邮箱不能为空'));
		      //   }else if(!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g).test(value)){
		      //     callback(new Error('邮箱格式不正确'));
		      //   }else {
		      //     callback();
		      //   }
		      // };
	      return {
	        dialogVisible: false,
	        fullscreenLoading:false,
	         formLabelWidth: '100px',
		      	   addformValidate: {
			          loginName: '',
			          name:'',
			          userMobile:'',
			          addressId_name:'',
			          roomId:'',
			          ucUserId:"",
			          departmentId:'',
			        
			          authCreateUser:null, 
			          userAddressId:"", //用户地址id
			        },
			        listNextAdmin:[],
			        dptList:[],
			        url:"",
			        ruleValidate: {
			          loginName: [
			            { required: true,validator: loginName, trigger: 'blur' }
			          ],
			          // password: [
			          //   { required: true,validator: password, trigger: 'blur' }
			          // ],
			          // name: [
			          //   { required: true,validator: name, trigger: 'blur' }
			          // ],
			          // userMobile: [
			          //   { required: true,validator: userMobile, trigger: 'blur' }
			          // ],
			          // userEmail: [
			          //   { required: true,validator: userEmail, trigger: 'blur' }
			          // ],
			          Dname:[
			            { required: true,message: '部门不能为空', }
			          ],

			        },
	       };
	    },
	    methods: {
	    	getchangeAppuser(e){
	    		var that=this;
	    		that.dialogVisible=true;
		       var aradrespList=e.aradrespList;
		       debugger
		       var authCreateUser=[]
		       if(e.aradrespList!=null){
		       	for(var i=0;i<aradrespList.length;i++){
		       	authCreateUser.push(aradrespList[i].mobile)
		       }
		       }
		       
		           that.addformValidate= {
			          loginName: e.loginName,
			          name:e.name,
			          ucUserId:e.ucUserId,
			          userMobile:e.userMobile,
			          addressId_name:e.departmentName,
			          departmentId:e.departmentId,
			          authCreateUser:authCreateUser, 
			          userAddressId:e.userAddressId  
			        };
			      

	    		// 部门
				     that.axios.post("/SmartHomeTrade/department/selectDepartmentByMobile",{
			          createUser:that.$store.state.userinfo.userMobile,
			        }).then(function(res){
			        	
			        	if(res.data.code==0){
			        		var dptList=res.data.data.dptList;
			        		for(var i=0;i<dptList.length;i++){
			        			if(dptList[i].adrScope!=null){
			        					dptList[i].addressId_name=dptList[i].name+"      ("+dptList[i].adrScope+")"
			        			}else{
			        				dptList[i].addressId_name=dptList[i].name
			        			}
			        		

			        		}
			        		that.dptList=dptList
			        	
			        	}
			        })
			        debugger




			       // 用户
			        //   if(that.$store.state.userinfo.userLevel==2){
			        //   	var beScopeId=that.$store.state.parame.parkid;
				       //    }
				       // if(that.$store.state.userinfo.userLevel==3){
				       //    	var beScopeId=that.$store.state.parame.buildid;
				       //  }
				       //  if(that.$store.state.userinfo.userLevel==4){
				       //    	var beScopeId=that.$store.state.parame.floorid;
				       //  }
				       var userParams={
				       	createUser:that.$store.state.userinfo.userMobile,
				       	// beScopeId:beScopeId
				       }
				        that.axios.post("/SmartHomeTrade/user/selectAllCreateUser",userParams).then(function (res) {
		             
		              if(res.data.code==0){
		                if(res.data.data!=null){
		                   that.listNextAdmin =res.data.data.listNextAdmin;		                   
		             
		                }

		              }else{
		                // that.$message.error(res.data.message)
		              } 
		            })

	    		

	    			
	        },	

		       //关闭弹框
	      handleClose(done) {
	        done();
	         this.$emit('clearselect');
	        this.resetaddUser("addformValidate")


	      },
	      // 获取焦点清空验证提示
	      removeValid(formName){
	      	this.$refs[formName].clearValidate();
	      },
	      // 获取部门信息
	      getUserLevel(e){
	      	
	      	var that=this;
	      	that.addformValidate.departmentId=e;

	      	for(var i=0;i<that.dptList.length;i++){
	      		if(that.dptList[i].dptId==e){
	      			// that.addformValidate.userAddressId=that.dptList[i].addressId
	      			that.addformValidate.roomId=that.dptList[i].roomId
	      		}
	      	}

	      },
	      addappuser(addformValidate){
	      	var that=this;
	      	that.$refs[addformValidate].validate((valid) => {
		          if (valid) {
		          	// that.fullscreenLoading=true;
		          	var param={
		          		ucUserId:that.addformValidate.ucUserId,
		          		departmentId:that.addformValidate.departmentId,
		          		loginName:that.addformValidate.loginName,
		          		authCreateUser:that.addformValidate.authCreateUser,
		          		userAddressId:that.addformValidate.userAddressId,
		          		userMobile:that.addformValidate.userMobile,
		          		executeUser:that.$store.state.userinfo.name,
                        createUserMobile:that.$store.state.userinfo.createUser,
		          	}
		          	that.axios.post("/SmartHomeTrade/appUser/updateAppUserInfo",param).then(function(res){
		          		that.fullscreenLoading=false;
		          		if(res.data.code==0){
		          			that.$emit('refreshList');
		          			that.$emit('clearselect');
		          			
		          			 that.resetaddUser("addformValidate")
		          			that.dialogVisible=false;
		          			 that.$message.success(res.data.message);
		          		}else{
		          			// that.dialogVisible=false;
		          			 // that.resetaddUser("addformValidate")
		          			that.$message.error(res.data.message);
		          		}

		          	})




		           
		          } else {
		          
		            return false;
		          }
		        });

	      },

      // 关闭添加弹框清空
       resetaddUser(addformValidate) {
        this.$refs[addformValidate].resetFields();
      },
        }
	}
</script>
<style>
	






</style>