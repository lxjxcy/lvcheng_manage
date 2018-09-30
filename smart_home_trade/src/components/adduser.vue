<template>
	<div class="adduser">
		<el-dialog
          title="添加账户"
          :visible.sync="add"
          width="30%"
          :before-close="handleClose">
          <div class="model-conent" style="padding-right: 10%">
            <el-form ref="addformValidate" :model="addformValidate" :rules="ruleValidate" :label-width="60">

              <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginName" ref="loginName">
                <el-input v-model="addformValidate.loginName" @focus="removeValid('loginName')" auto-complete="off" placeholder="请输入用户名"></el-input>
              </el-form-item>

              <el-form-item label="密码" :label-width="formLabelWidth" prop="password"  ref="password">
                <el-input type="password" v-model="addformValidate.password" @focus="removeValid('password')" auto-complete="off"  placeholder="请输入6-20位数字,字母或符号"></el-input>
              </el-form-item>

              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" ref="name">
                <el-input type="text" v-model="addformValidate.name"  @focus="removeValid('name')" auto-complete="off" placeholder="请输入姓名"></el-input>
              </el-form-item>
               <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" ref="userMobile">
                <el-input v-model="addformValidate.userMobile" @focus="removeValid('userMobile')" auto-complete="off" placeholder="请输入电话"></el-input>
              </el-form-item>

              <el-form-item label="管理层级" prop="userLevel2" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==1">
                <el-select v-model="addformValidate.userLevel2"  @change="getUserLevel" style="width:100%">
                  <el-option label="园区管理员" value="2"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="管理层级" prop="userLevel3" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==2">
                <el-select v-model="addformValidate.userLevel3"  @change="getUserLevel" style="width:100%">
                  <el-option label="大楼管理员" value="3"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="管理层级" prop="userLevel4" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==3">
                <el-select v-model="addformValidate.userLevel4" @change="getUserLevel" style="width:100%">
                  <el-option label="楼层管理员" value="4"></el-option>

                </el-select>
              </el-form-item>
               <el-form-item label="管理层级" prop="userLevel5" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==4">
                <el-select v-model="addformValidate.userLevel5"  @change="getUserLevel" style="width:100%">
                  <el-option label="房间管理员" value="5"></el-option>
                </el-select>
              </el-form-item>
             <!--  <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" ref="userMobile">
                <el-input v-model="addformValidate.userMobile" @focus="removeValid('userMobile')" auto-complete="off" placeholder="请输入电话"></el-input>
              </el-form-item> -->
            <!--   <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail" ref="userEmail">
                <el-input v-model="addformValidate.userEmail" @focus="removeValid('userEmail')" auto-complete="off" style="width:220px" placeholder="请输入邮箱"></el-input>
              </el-form-item> -->
              <el-form-item label="设备权限" :label-width="formLabelWidth" prop="resource">
                <el-radio-group v-model="addformValidate.resource">
                  <el-radio label="查看"></el-radio>
                  <el-radio label="操作"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addloginuser('addformValidate')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
                </span>
        </el-dialog>
		
	</div>
</template>
<script>
// import axios from "axios"
	export default{
		name:'adduser',
		data(){
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
		        }else if(!(/^\S{1,6}$/.test(value))){
		        	callback(new Error('请输入6位之内的非空字符串'));

		        }else {
		          callback();
		        }
		      };
		      //密码验证
		      const password = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('密码不能为空'));
		        }else if(!(/^[a-zA-Z0-9\W_]{6,20}/.test(value))){
		        	callback(new Error('请输入6-20位数字，字母或符号'));

		        }else {
		          callback();
		        }
		      };
		      //真实姓名验证
		      const name = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('真实姓名不能为空'));
		        }else if(!(/^\S{1,6}$/.test(value))){
		        	callback(new Error('请输入6位之内的非空字符串'));

		        }else {
		          callback();
		        }
		      };
		      // //邮箱验证
		      // const userEmail = (rule, value, callback) => {
		      //  if(value!=""&&!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g).test(value)){
		      //     callback(new Error('邮箱格式不正确'));
		      //   }else {
		      //     callback();
		      //   }
		      // };
		      return{
		      	   add:false,//添加框
		      	  formLabelWidth: '100px',
		      	   fullscreenLoading:false,
		      	   addformValidate: {
			          loginName: '',
			          password: '',
			          name:'',
			          userMobile:'',
			          // userEmail:null,
			          userLevel2:"2",
			          userLevel3:"3",
			          userLevel4:"4",
			          userLevel5:"5",
			          resource:''
			        },
			        url:"",
			        ruleValidate: {
			          loginName: [
			            { required: true,validator: loginName, trigger: 'blur'}
			          ],
			          password: [
			            { required: true,validator: password, trigger: 'blur'}
			          ],
			          name: [
			            { required: true,validator: name,  trigger: 'blur'}
			          ],
			          userMobile: [
			            { required: true,validator: userMobile,  trigger: 'blur'}
			          ],
			          // userEmail: [
			          //   {validator: userEmail, trigger: 'blur' }
			          // ],
			          userLevel2:[
			            { required: true,message: '层级不能为空', }
			          ],
			           userLevel3:[
			            { required: true,message: '层级不能为空', }
			          ],
			           userLevel4:[
			            { required: true,message: '层级不能为空', }
			          ],
			           userLevel5:[
			            { required: true,message: '层级不能为空', }
			          ],
			          resource: [
			            { required: true, message: '请选择设备权限', trigger: 'change'}
			          ],

			        },
		      }



		},
		methods:{

		// 添加弹框
		addloginUser(){
			this.add=true;
		},
	
			  //获取层级id
      getUserLevel(value){
        console.log(value)
        // this.userLevelv=value;
       
      },
         // 获取焦点清空验证提示
	      removeValid(formName){
	      	this.$refs[formName].clearValidate();
	      },
			  //添加
      addloginuser(addformValidate){

		        var that=this;
		        that.$refs[addformValidate].validate((valid) => {
		          if (valid) {
		          	that.fullscreenLoading=true;
		            if(that.addformValidate.resource=="查看"){
		              that.addformValidate.resource=2
		            }else{
		              that.addformValidate.resource=1
		            }
		             if(that.$store.state.userinfo.userLevel==1){
			        	var userLevelv=2
			        	var beScopeIdv=null
			        }
			        if(that.$store.state.userinfo.userLevel==2){
			        	var userLevelv=3
			        	var beScopeIdv=that.$store.state.parame.parkid
			        	this.url='/SmartHomeTrade/user/inserBlockAdminUser'
			        }else{
			            this.url='/SmartHomeTrade/user/registAdUser'
			        }
			        if(that.$store.state.userinfo.userLevel==3){
			        	var userLevelv=4
			        	var beScopeIdv=that.$store.state.parame.buildid
			        }
			        if(that.$store.state.userinfo.userLevel==4){
			        	var userLevelv=5
			        	var beScopeIdv=that.$store.state.parame.floorid
			        }
		            var userL={
		            	userLevel:userLevelv,
		            	beScopeId:beScopeIdv
		            }
		            var comparam={
		              loginName: that.addformValidate.loginName,
		              password: that.addformValidate.password,
		              name:that.addformValidate.name,
		              userMobile:that.addformValidate.userMobile,
		              userEmail:that.addformValidate.userEmail,
		              // userLevel:that.userLevelv,
		              userDeviceAuth:that.addformValidate.resource,
		              createUser:that.$store.state.userinfo.userMobile
		             }
		             var param=Object.assign(userL,comparam)
		            that.axios.post(that.url,param).then(function (res) {
		            	that.fullscreenLoading=false;
		              console.log(res.data.message)
		              if(res.data.code==0){
		              	 that.$message({
		                type: 'success',
		                message: "添加成功请设置权限"
		                });
		              	 that.$emit('refreshList');
		                 that.add=false;
		                 that.$refs[addformValidate].resetFields();

		              }else{
		              	that.$message({
		                type: 'error',
		                message: res.data.message
		                });
		               
		               // that.$refs[addformValidate].resetFields();

		              }
		             
		              

		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		            // this.add=false;
		      },



		       //关闭弹框
      handleClose(done) {
        done();
         // this.$emit('clearselect');
         this.resetaddUser("addformValidate")
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