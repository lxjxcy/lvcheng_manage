<template>
	<div class="addAppuser">
		<el-dialog
          title="添加APP账户"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          append-to-body>
          <div class="model-conent">
            <el-form ref="addformValidate" :model="addformValidate" :rules="ruleValidate" :label-width="60">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginName" placeholder="请输入用户名">
                <el-input v-model="addformValidate.loginName" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password" placeholder="请输入密码">
                <el-input type="password" v-model="addformValidate.password" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" placeholder="请输入姓名">
                <el-input type="text" v-model="addformValidate.name" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="Dname" :label-width="formLabelWidth">
                <el-select v-model="addformValidate.Dname" placeholder="" @change="getUserLevel">
                  <el-option
                    v-for="item in dptList"
                    :key="item.dptId"
                    :label="item.name"
                    :value="item.dptId">
                  </el-option>
                </el-select>
              </el-form-item>        
              <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" placeholder="请输入电话">
                <el-input v-model="addformValidate.userMobile" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail" placeholder="请输入姓名">
                <el-input v-model="addformValidate.userEmail" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addappuser('addformValidate')">确 定</el-button>
                </span>
        </el-dialog>
		
	</div>
</template>
<script>
	export default{
		name:"addAppuser",
		 data() {
		 	 //手机号验证
		      const userMobile = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('手机号码不能为空'));
		        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))||!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
		          callback(new Error('请输入正确手机号'));
		        }else {
		          callback();
		        }
		      };
		      //用户名验证
		      const loginName = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('姓名不能为空'));
		        }else {
		          callback();
		        }
		      };
		      //层级管理验证userLevel
		      const userLevel = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('曾经不能为空'));
		        }else {
		          callback();
		        }
		      };
		      //密码验证
		      const password = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('密码不能为空'));
		        }else {
		          callback();
		        }
		      };
		      //真实姓名验证
		      const name = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('真实姓名不能为空'));
		        }else {
		          callback();
		        }
		      };
		      //邮箱验证
		      const userEmail = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('邮箱不能为空'));
		        }else if(!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g).test(value)){
		          callback(new Error('邮箱格式不正确'));
		        }else {
		          callback();
		        }
		      };
	      return {
	        dialogVisible: false,
	         formLabelWidth: '100px',
		      	   addformValidate: {
			          loginName: '',
			          password: '',
			          name:'',
			          userMobile:'',
			          userEmail:'',
			          Dname:'',
			          roomId:'',
			          departmentId:'',
			          userAddressId:''
			          
			        },
			        dptList:[],
			        url:"",
			        ruleValidate: {
			          loginName: [
			            { required: true,validator: loginName, trigger: 'blur' }
			          ],
			          password: [
			            { required: true,validator: password, trigger: 'blur' }
			          ],
			          name: [
			            { required: true,validator: name, trigger: 'blur' }
			          ],
			          userMobile: [
			            { required: true,validator: userMobile, trigger: 'blur' }
			          ],
			          userEmail: [
			            { required: true,validator: userEmail, trigger: 'blur' }
			          ],
			          Dname:[
			            { required: true,validator: userLevel, trigger: 'blur' }
			          ],

			        },
	       };
	    },
	    methods: {
	    	getaddAppuser(e){
	    		console.log(e)
	    		var that=this;
	    		that.dialogVisible=true;
	    		
	    		if(e=="1"){
				   that.axios.post("/SmartHomeTrade/department/selectDepartmentByMobile",{
			          createUser:that.$store.state.userinfo.userMobile,
			        }).then(function(res){
			        	if(res.data.code==0){
			        		that.dptList=res.data.data.dptList
			        	}
			        })
	    		}
	    			
	    		},	     
		       //关闭弹框
	      handleClose(done) {
	        done();
	         this.$emit('clearselect');
	        this.resetaddUser("addformValidate")


	      },
	      // 获取部门信息
	      getUserLevel(e){
	      	console.log(e)
	      	var that=this;
	      	that.addformValidate.departmentId=e;
	      	for(var i=0;i<that.dptList.length;i++){
	      		if(that.dptList[i].dptId==e){
	      			that.addformValidate.userAddressId=that.dptList[i].addressId
	      			that.addformValidate.roomId=that.dptList[i].roomId
	      		}
	      	}

	      },
	      addappuser(addformValidate){
	      	var that=this;
	      	that.$refs[addformValidate].validate((valid) => {
		          if (valid) {
		          	var param={
		          	  loginName: that.addformValidate.loginName,
			          password: that.addformValidate.password,
			          name:that.addformValidate.name,
			          userMobile:that.addformValidate.userMobile,
			          userEmail:that.addformValidate.userEmail,
			          roomId:that.addformValidate.roomId,
			          departmentId:that.addformValidate.departmentId,
			          userAddressId:that.addformValidate.userAddressId,
			          createUser:that.$store.state.userinfo.userMobile,
		          	}
		          	that.axios.post("/SmartHomeTrade/appUser/insertAppUser",param).then(function(res){
		          		if(res.data.code==0){
		          			that.$emit('refreshList');
		          			 that.resetaddUser("addformValidate")
		          			that.dialogVisible=false;
		          			 that.$message.success(res.data.message);
		          		}else{
		          			that.dialogVisible=false;
		          			 that.resetaddUser("addformValidate")
		          			that.$message.error(res.data.message);
		          		}

		          	})




		           
		          } else {
		            console.log('error submit!!');
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