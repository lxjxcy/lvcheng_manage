<template>
  <div class="login">
    <div class="mange"></div>
        <div class="box">
          <div class="title">行业版管理平台</div>
          <div class="conent">
            <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="" prop="loginName" style='position: relative'>
                <i class="icon iconfont l" style='position: absolute;left:-37px'>&#xe636;</i>
                <el-input type="username" v-model="loginForm.loginName" auto-complete="off"  class="l" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password" style='position: relative'>
                <i class="icon iconfont l" style='position: absolute;left:-37px'>&#xe611;</i>
                <el-input type="password" v-model="loginForm.password" auto-complete="off" class="l" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="" prop="code" style='position: relative'>

                <el-input type="text" style='position: relative;left:-40px' v-model="loginForm.code" auto-complete="off" class="checkma" placeholder="请输入验证码"></el-input>
                <span v-model="imgUrl" class="check" style="position: absolute;right:0" @click="getImg()"><img :src="imgUrl" alt="" ></span>
              </el-form-item>
              <el-form-item>
              </el-form-item>
               <el-button type="primary" @click="submitForm('loginForm')" style="position: relative;top:-15px;left:25px; width: 230px;background:#0066b2" >登录</el-button>
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
          // axios.post("https://easy-mock.com/mock/5adfe7967f1c4564cd3dfbe0/example/set").then(function(res){
          //   // console.log(res.data.data)
          //    that.$store.commit('setStroge',res.data.data)
          // });         
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
                   if(res.data.data.user.userLevel==1){
                      that.$router.push('/garden/gardenManagement')
                   }else if(res.data.data.user.userLevel==2){
                    that.$router.push('/park/MyPark')

                   }else if(res.data.data.user.userLevel==3){
                    that.$router.push('/building/MyBuilding')

                   }else if(res.data.data.user.userLevel==4){
                    that.$router.push('/floor/myFloor')

                   }else{
                     that.$router.push('/room/myRoom')
                   }
                   // that.$router.push('/park/MyPark');
                   // that.goRouter(res.data.data.user.userLevel)
                }else{
                   that.$message.error(res.data.message);
                    if(res.data.message=="验证码错误"){
                      that.loginForm.code=''
                       that.getImg()
                    }else if(res.data.message=="账号或密码错误"){
                        that.$refs[loginForm].resetFields();
                        that.getImg()
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
    
    height:200px;
  padding-left:700px

  }
  .box{
    width:3.5rem;
    height:325px;
    background: #fff;
    /*margin:100px auto;*/
   float:right;
   margin-right:180px;
    border:5px solid #3781bb;
  }
  .title{
     height:70px;
    line-height: 70px;
    font-size: 0.18rem;
    color: #70d0f9;
    text-align: center;
    font-weight: 500
  }
  .conent{
    padding-right:0.5rem;
  }
i{
  display:inline-block;
  width:40px;
  height:39px;
  background:#00529b;
  color:#fff;
  z-index: 2;
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
    
    width:100%;
   
  }
  el-input__inner{
    height:45px;
    width:80%;
    line-height: 45px;
  }
</style>
