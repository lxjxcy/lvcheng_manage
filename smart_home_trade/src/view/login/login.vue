<template>
  <div class="login">
    <div class="mange">大楼管理系统</div>
        <div class="box">
          <div class="title">用户登录</div>
          <div class="conent">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="user">
                <el-input type="username" v-model="ruleForm2.user" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="checkMa">
                <el-input type="text" v-model="ruleForm2.checkMa" auto-complete="off" class="checkma"></el-input>
                <div v-model="ruleForm2.check" auto-complete="off" class="check">{{ruleForm2.check}}</div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
  </div>

</template>

<script>
  import axios from 'axios';
    export default {
        name: "login",
      data() {
        var validateUser = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入用户名'));
          } else {
            callback();
          }
        };

        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            // if (this.ruleForm2.checkPass !== '') {
            //   this.$refs.ruleForm2.validateField('checkPass');
            // }
            callback();
          }
        };
        var validatecheckMa = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入次验证码'));
          } else if (value !== this.ruleForm2.check) {
            callback(new Error('验证码不正确!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            user:'',
            pass: '',
            check:'123',
            checkMa: '',
          },
          rules2: {
            user: [
              { validator: validateUser, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkMa: [
              { validator: validatecheckMa, trigger: 'blur' }
            ],

          }
        };
      },
      methods: {
        submitForm(formName) {
          axios.post('/user/loginUser', {
            loginName: this.ruleForm2.user,
            password: this.ruleForm2.pass
          })
            .then(function (response) {
              console.log(response);
          
            }) .catch(function (error) {
              console.log(error);
            });


          // this.$refs[formName].validate((valid) => {
          //   if (valid) {
          //     //发送axios，请求登录接口
          //     alert('submit!');
          //   } else {
          //     console.log('登录失败!!');
          //     return false;
          //   }
          // });
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $fontSize:14px;
  $backcolor:#05509c;
  .login{
    height:100%;
    background: $backcolor;
    text-align: center;
  }
  .mange{
    font-size: 40px;
    color:#fff;
    padding:55px 0;
  }
  .box{
    width:4.6rem;
    height:325px;
    background: #d6eefe;
    marign:100px auto;
    display: inline-block;
    border:10px solid #3781bb;
  }
  .title{
     height:60px;
    line-height: 60px;
    font-size: 0.28rem;
    color: #70d0f9;
    text-align: center;
  }
  .conent{
    padding-right:0.5rem;
  }

  .checkma{
    width:70%;
   float: left;
  }
  .check{
    width:30%;
    float: left;
  }
  .el-button{
    padding:12px 0;
    width:100%;
    text-align: center;
  }
  el-input__inner{
    height:45px;
    line-height: 45px;
  }
</style>
