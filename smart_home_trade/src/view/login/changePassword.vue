<template>
	<div class="changePassword">
		<el-dialog
              title="修改密码"
              :visible.sync="changePass"
              width="30%"
              :modal-append-to-body='false'
              :before-close="handleClose">
              <div class="changePass">
                <!--<div class="now-user">当前用户：<span>{{this.$store.state.userInfo.loginName}}</span></div>-->
                <el-form ref="changeformValidate" :model="changeformValidate" :rules="ruleValidate" :label-width="60">
                  <el-form-item label="当前用户" :label-width="formLabelWidth">
                    <el-input v-model="changeformValidate.loginName" auto-complete="off" style="width:220px"  :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="原密码" :label-width="formLabelWidth" prop="password" ref="password">
                    <el-input v-model="changeformValidate.password" auto-complete="off" @focus="removeValid('password')" style="width:220px" placeholder="请输入原密码"></el-input>
                  </el-form-item>
                  <el-form-item label=" 新密码" :label-width="formLabelWidth" prop="newPassword" ref="newPassword">
                    <el-input v-model="changeformValidate.newPassword" auto-complete="off"  @focus="removeValid('newPassword')" style="width:220px" placeholder="请输入新密码"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changsubmit('changeformValidate')">提交</el-button>
              </span>
        </el-dialog>
	</div>

</template>

<script>
    export default {
        name: "changePassword",
        data(){
        	  const validatePass = (rule, value, callback) => {
	          if (value === '') {
	            callback(new Error('原密码密码不能为空'));
	          }else {
	            callback();
	          }
	        };
	        const validateNewpass = (rule, value, callback) => {
	          if (value === '') {
	            callback(new Error('新密码不能为空'));
	          }else {
	            callback();
	          }
	        };
	        const validateName = (rule, value, callback) => {
	          if (value === '') {
	            callback(new Error('姓名不能为空'));
	          }else {
	            callback();
	          }
	        };
        	return{
        		 changePass:false,
	            changeformValidate:{
	              loginName: '',
	              password: '',
	              newPassword:''

	            },
	            formLabelWidth: '100px',
	            ruleValidate: {
	              loginName: [
	                { required: true,validator: validateName, trigger: 'blur' }
	              ],
	              password: [
	                { required: true,validator: validatePass, trigger: 'blur' }
	              ],
	              newPassword: [
	                { required: true,validator: validateNewpass, trigger: 'blur' }
	              ],
	            },
        	}
        },
        methods:{
        	openDialog(){
        		this.changeformValidate.loginName=this.$store.state.userinfo.loginName
                this.changePass=true;

        	},
        	    // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },
        	 //修改密码
        	
	        changsubmit(changeformValidate){
	          var that=this;
	          that.$refs[changeformValidate].validate((valid) => {
	            if (valid) {
	             that.axios.post("/SmartHomeTrade/user/updatePassword",that.changeformValidate).then(function (res) {
	             	if(res.data.code==0){
	             	that.$message({
	                   type: 'success',
	                   message: res.data.message
	                  });
	             	}else{
	             		that.$message.error(res.data.message)
	             	}
	              
	               that.changePass=false;
	                that.$refs[changeformValidate].resetFields();
	             })

	            } else {
	            
	              return false;
	            }
	          });

	        },
	         handleClose(done) {
               done();
                this.resetaddG('changeformValidate')
          
            },
             resetaddG(changeformValidate) {
		        this.$refs[changeformValidate].resetFields();
		      },
        }

    }
</script>

<style scoped>

</style>
