<template>
  <div class="login">
    <div class="mange">大楼管理系统</div>
        <div class="box">
          <div class="title">用户登录</div>
          <div class="conent">
            <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="loginName"  >
                <el-input type="username" v-model="loginForm.loginName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password"  >
                <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code" style='position: relative' >
                <el-input type="text" v-model="loginForm.code" auto-complete="off" class="checkma"></el-input>
                <span v-model="imgUrl" class="check" style="position: absolute;right:0" @click="getImg()"><img :src="imgUrl" alt="" ></span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" style="position: relative;top:-2px;">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import goRouter from "../../mixins/goRouter"
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
            callback();
          }
        };
        var validatecheckMa = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入验证码'));
          } else {
            callback();
          }
        };
        return {
          loginForm: {
            loginName:'',
            password: '',
            code: '',
          },
          check:'123',
          checkMa: '',
          imgUrl:'',
          rules2: {
            loginName: [
              { required: true,validator: validateUser, }
            ],
            password: [
              { required: true,validator: validatePass,}
            ],
            code: [
              { required: true,validator: validatecheckMa}
            ],

          }
        };
      },
      mixins: [goRouter],
      mounted(){
         this.getImg();
         // axios.post('/api/vehicle').then(function(res){
         //  console.log(res)
         // })
      },

      methods: {
         //  获取验证码
          getImg(){
            var that=this;
            axios.post("/SmartHomeTrade/user/getCode").then(function (res) {
              console.log(res)
              that.imgUrl= `data:image/jpeg;base64,`+res.data.data.base;
              console.log(that.imgUrl)
            })
          },

       // 登录
        submitForm(loginForm) {
          var that=this;
        axios.post("https://easy-mock.com/mock/5adfe7967f1c4564cd3dfbe0/example/set").then(function(res){
            // console.log(res.data.data)
             that.$store.commit('setStroge',res.data.data)
          });         
          console.log(that.loginForm)
          that.$refs[loginForm].validate((valid) => {
            if (valid) {
            axios.post('/SmartHomeTrade/user/loginUser',that.loginForm).then(function (res) {              
                if(res.data.code==0){
                  // that.$set(that.$store.state, 'islogin',true)
                 console.log(res.data.data.user)
                  
                   that.$store.commit('saveUserinfo',res.data.data.user)
                   that.$store.commit('setToken',res.data.data.user.status)
                   that.$message.success(res.data.message);
                   that.goRouter(res.data.data.user.userLevel)
                }else{
                   that.$message.error(res.data.message);
                    if(res.data.message=="验证码错误"){
                      that.loginForm.code=''
                       that.getImg()
                    }if(res.data.message=="用户名或密码错误"){
                        that.$refs[loginForm].resetFields();
                    }  
                }
                           
                
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });

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
    /*margin:100px auto;*/
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
  
  }
  .check img{
    height:40px;
    width:100%;
    position: relative;
    left:-4px;
    border:1px solid #dfe0e4;
    /*border-left:none*/
    cursor: pointer;
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
