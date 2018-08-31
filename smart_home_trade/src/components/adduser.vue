<template>
	<div class="adduser">
		<el-dialog
          title="添加账户"
          :visible.sync="add"
          width="30%"
          :before-close="handleClose">
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
              <el-form-item label="管理层级" prop="userLevel" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==1">
                <el-select v-model="addformValidate.userLevel" placeholder="" @change="getUserLevel">
                  <el-option label="园区管理员" value="2"></el-option>
                  <el-option label="大楼管理员" value="3"></el-option>
                  <el-option label="楼层管理员" value="4"></el-option>
                  <el-option label="房间管理员" value="5"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="管理层级" prop="userLevel" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==2">
                <el-select v-model="addformValidate.userLevel" placeholder="" @change="getUserLevel">
                  <el-option label="大楼管理员" value="3"></el-option>
                  <el-option label="楼层管理员" value="4"></el-option>
                  <el-option label="房间管理员" value="5"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="管理层级" prop="userLevel" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==3">
                <el-select v-model="addformValidate.userLevel" placeholder="" @change="getUserLevel">
                  <el-option label="楼层管理员" value="4"></el-option>
                  <el-option label="房间管理员" value="5"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="管理层级" prop="userLevel" :label-width="formLabelWidth" v-if="this.$store.state.userinfo.userLevel==4">
                <el-select v-model="addformValidate.userLevel" placeholder="" @change="getUserLevel">
                  <el-option label="房间管理员" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" placeholder="请输入电话">
                <el-input v-model="addformValidate.userMobile" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail" placeholder="请输入姓名">
                <el-input v-model="addformValidate.userEmail" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="设备权限" :label-width="formLabelWidth" prop="resource" >
                <el-radio-group v-model="addformValidate.resource">
                  <el-radio label="查看"></el-radio>
                  <el-radio label="操作"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addloginuser('addformValidate')">确 定</el-button>
                </span>
        </el-dialog>
		
	</div>
</template>
<script>
import axios from "axios"
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
		      return{
		      	   add:false,//添加框
		      	  formLabelWidth: '100px',
		      	   addformValidate: {
			          loginName: '',
			          password: '',
			          name:'',
			          userMobile:'',
			          userEmail:'',
			          userLevel:'',
			          resource:''
			        },
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
			          userLevel:[
			            { required: true,validator: userLevel, trigger: 'blur' }
			          ],
			          resource: [
			            { required: true, message: '请选择设备权限', trigger: 'change' }
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
        this.userLevelv=value;
        if(value==3){
        	this.url='/SmartHomeTrade/user/inserBlockAdminUser'
        }else{
        	this.url='/SmartHomeTrade/user/registAdUser'
        }


      },
			  //添加
      addloginuser(addformValidate){

		        var that=this;
		        that.$refs[addformValidate].validate((valid) => {
		          if (valid) {
		            if(that.addformValidate.resource=="查看"){
		              that.addformValidate.resource=2
		            }else{
		              that.addformValidate.resource=1
		            }
		            var param={
		              loginName: that.addformValidate.loginName,
		              password: that.addformValidate.password,
		              name:that.addformValidate.name,
		              userMobile:that.addformValidate.userMobile,
		              userEmail:that.addformValidate.userEmail,
		              userLevel:that.userLevelv,
		              userDeviceAuth:that.addformValidate.resource,
		              createUser:that.$store.state.userinfo.userMobile

		            }
		           
		           

		            axios.post(that.url,param).then(function (res) {
		              console.log(res.data.message)
		              if(res.data.code==0){
		              	 that.$message({
		                type: 'success',
		                message: res.data.message
		                });
		              	 that.$emit('refreshList');
		                 that.add=false;
		                 that.$refs[addformValidate].resetFields();

		              }else{
		              	that.$message({
		                type: 'error',
		                message: res.data.message
		                });
		                that.add=false;
		               that.$refs[addformValidate].resetFields();

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
         this.$emit('clearselect');
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