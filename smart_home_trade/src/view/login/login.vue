<template>
  <div class="login img1 note"  :style ="note" >
    <!-- :style ="note" -->
  <div class="lvcheng"> 
    <div class="piclog"><img src="../../assets/logo2.png" style="height:40px;width:150px;"> </div>
    <div style="font-size:36px;font-weight:500">智能楼宇管理后台</div>
  </div>
    
        <div class="box">
          <div class="title"></div>
          <div class="conent">
            <el-form :model="loginForm" :rules="rules2" ref="loginForm"  >
              <el-form-item label="" prop="loginName"  ref="loginName" class="my-username">
                <span class="boxpic">
                  <img src="../../assets/用户.png" style="width:25px;height:25px;padding:0;">
                </span>
                <!-- <i class="icon iconfont l" style='position: absolute;left:-37px'>&#xe636;</i> -->
                <el-input type="text" v-model="loginForm.loginName"  class="l" @focus="removeValid('loginName')" placeholder="请输入用户名"></el-input>
              </el-form-item>

              <el-form-item label="" prop="password"  ref="password" class="my-username">
                <!-- <i class="icon iconfont l" style='position: absolute;left:-37px'>&#xe611;</i> -->
                 <span class="boxpic">
                    <img src="../../assets/锁子.png" style="width:25px;height:25px;padding:0;">
                 </span>

                <el-input type="password" v-model="loginForm.password" class="l" @focus="removeValid('password')" placeholder="请输入密码"></el-input>


              </el-form-item> 
              <el-form-item label="" prop="code"  ref="code">

                <el-input type="text"  @focus="removeValid('code')" v-model="loginForm.code" auto-complete="off" class="checkma" placeholder="请输入验证码"></el-input>
                <span v-model="imgUrl" class="check" style="position: absolute;right:0" @click="getImg()"><img :src="imgUrl" alt="" ></span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" >登录</el-button>
              </el-form-item>
            </el-form>
             
          </div>
        </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
  import axios from 'axios';
  import goRouter from "../../mixins/goRouter"
    export default {
        name: "login",
      data() {
        return {
            iflook:"",
        note: {
          backgroundImage: "url(" + require("../../assets/back.png") + ") ",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          verticalAlign: "middle",
         backgroundColor:"#fff"
        },
          loginForm: {
            loginName:null,
            password: null,
            code: null,
          },
          check:'123',
          setDAta:[],
          password:"",
          checkMa: '',
          imgUrl:'',
          rules2: {
            loginName: [
              { required: true,message: '请输入用户名',trigger: 'blur' }
            ],
            password: [
              { required: true,message: '请输入密码',trigger: 'blur' }
            ],
            code: [
              { required: true,message: '请输入验证码',trigger: 'blur' }
            ],
          }
        };
      },
      mixins: [goRouter],
      // [,saveExtends],

      mounted(){
        if(this.$store.state.isgoback==true){
        
          this.loginForm.loginName=this.$route.params.username
        }
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
                  // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },

       // 登录
        submitForm(loginForm) {

          var that=this;
           that.password=md5(that.loginForm.password)
          that.$store.commit('exitUser')


          // axios.post("https://easy-mock.com/mock/5adfe7967f1c4564cd3dfbe0/example/set").then(function(res){
          //   // console.log(res.data.data)
          //    that.$store.commit('setStroge',res.data.data)
          // });         
          that.$refs[loginForm].validate((valid) => {
            if (valid) {
              var loginForm={
                loginName:that.loginForm.loginName,
                password:that.password,
                code:that.loginForm.code,
              }
             
             

            axios.post('/SmartHomeTrade/user/loginUser',loginForm).then(function (res) {              
                if(res.data.code==0){
                 
                  // that.$set(that.$store.state, 'islogin',true)
                 console.log(res.data.data.user)        
                   that.$store.commit('saveUserinfo',res.data.data.user)
                   that.$store.commit('setToken',res.data.data.user.status)
                   that.$message.success(res.data.message);
                      var param = {
                          userId: res.data.data.user.uuid
                        }
                        if (res.data.data.user.userLevel == 1) {
                          that.axios.post("/SmartHomeTrade/user/selectUserPermit", param).then(function(res) {
                            if (res.data.code == 0) {
                              // that.permissionList=res.data.data.permissionList;
                              var listparam = []
                              for (var i = 0; i < res.data.data.permissionList.length; i++) {
                                // console.log(res.data.data.permissionList[i].sonJdtionList)
                                listparam.push(res.data.data.permissionList[i].sonJdtionList[0])
                              }


                              that.$store.commit('setStroge', listparam)
                              that.goRouter(listparam) 
                              // that.permissionList=listparam
                            } else {
                              that.$message.error(res.data.message);
                            }

                          })
                        } else {
                          that.axios.post("/SmartHomeTrade/user/selectMyJdtion", param).then(function(res) {
                            if (res.data.code == 0) {
                              // that.permissionList=res.data.data.permissionList;
                              var listparam = []
                              for (var i = 0; i < res.data.data.permissionList.length; i++) {
                                // console.log(res.data.data.permissionList[i].sonJdtionList)
                                listparam.push(res.data.data.permissionList[i].sonJdtionList[0])
                              }
                              that.$store.commit('setStroge', listparam)
                              that.goRouter(listparam) 
                              // that.permissionList=listparam
                            } else {
                              that.$message.error(res.data.message);
                            }

                          })

                        }








                    // that.goRouter(res.data.data.user.userLevel,res.data.data.user.uuid)      
                   // that.goRouter(res.data.data.user.userLevel)
                      
                }else{
                   that.$message.error(res.data.message);
                    if(res.data.message=="验证码错误"){
                      that.loginForm.code=''
                       that.getImg()
                    }else if(res.data.message=="账号或密码错误"){
                        // that.$refs[loginForm].resetFields();
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
<style>
  .lvcheng{
    height:240px;
    padding-top: 100px;
  }
  .my-username .el-input__inner{
    padding-left:50px;
  }
  .boxpic{
    position: absolute;
    left:6px;
    top:10px;
    z-index:100;
    width:20px;
    height:20px;
    padding-right: 30px;
    border-right:2px solid #ccc;
    padding-bottom: 5px;

  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>

  $fontSize:14px;
  $backcolor:#05509c;
  .login{
    height:100%;

    text-align: center;
   
  }
  .mange{
    font-size: 40px;
    color:#fff;
    
    height:200px;


  }
  img{
  height:50px;
  display: inline-block;
  padding:0 20px;
  position: relative;
  top:-3px;
}
.home-name{
  font-size:30px;
  line-height:50px;
}
  .homeheader{
    height:50px;
    background:#00cc9d;
    width:100%;
  }
  .box{
    width:350px;
    height:310px;
    background: #fff;
    display:inline-block;
    /*margin:100px auto;*/
    padding:0 2%;


    background:rgba(255, 255, 255, .5);

 
   
    box-shadow:0 0 10px #ccc;
  }
  .title{
     height:10px;
    line-height: 10px;
   
   
    margin-bottom:30px;
   
  }

i{
  display:inline-block;
  width:43px;
  height:40px;
  background:#00529b;
  color:#fff;
  z-index: 2;
}
  .checkma{
    width:60%;
   float: left;
  }
  .check{
    width:40%;
  
  }
  .check img{
    height:37px;
    width:100%;
    position: relative;
    left:13%;
   
    top:1px;

    /*border-left:none*/
    cursor: pointer;
  }
  .el-button{
    
    width:100%;
   
  }
  el-input__inner{
    height:0.45rem;
    width:80%;
    line-height: 0.45rem;
  }
</style>
