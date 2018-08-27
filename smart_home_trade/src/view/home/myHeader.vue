<template>
  <div class="my-header">
    <div class="left l">
      <ul>
        <li class="l">{{message}}</li>
        <li class="l change">
          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            切换<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">园区管理</el-dropdown-item>
              <el-dropdown-item command="b">楼层管理</el-dropdown-item>
              <el-dropdown-item command="c">房间管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </li>
      </ul>
    </div>
    <div class="right r">
        <ul>
          <li class="l"><i class="iconfont">&#xe636;</i>当前用户：{{this.$store.state.userinfo.loginName}}</li>
          <li class="l list-1" @click="changepass()"><i class="iconfont">&#xe611;</i>修改密码</li>
          <!--修改密码-->
            <el-dialog
              title="修改密码"
              :visible.sync="changePass"
              width="30%"
              :before-close="handleClose">
              <div class="changePass">
                <!--<div class="now-user">当前用户：<span>{{this.$store.state.userInfo.loginName}}</span></div>-->
                <el-form ref="changeformValidate" :model="changeformValidate" :rules="ruleValidate" :label-width="60">
                  <el-form-item label="当前用户" :label-width="formLabelWidth" prop="oldPsw" >
                    <el-input v-model="changeformValidate.loginName" auto-complete="off" style="width:220px"  :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPsw" >
                    <el-input v-model="changeformValidate.password" auto-complete="off" style="width:220px" placeholder="请输入原密码"></el-input>
                  </el-form-item>
                  <el-form-item label=" 新密码" :label-width="formLabelWidth" prop="newPsw" >
                    <el-input v-model="changeformValidate.newPassword" auto-complete="off" style="width:220px" placeholder="请输入新密码"></el-input>
                  </el-form-item>
                </el-form>



              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changsubmit('changeformValidate')">提交</el-button>
              </span>
            </el-dialog>
          <li class="l list-2" @click="back()"><i class="iconfont">&#xe795;</i>退出</li>
        </ul>

    </div>


   </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "myHeader",

      props : ['message'],

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
      mounted(){
          // console.log(this.$store.state.userInfo.loginName)
      },
      methods:{
        handleCommand(command) {
          this.$message('click on item ' + command);
        },
        // 修改密码弹框
        changepass(){
          this.changeformValidate.loginName=this.$store.state.userinfo.loginName
          this.changePass=true;
        },
        //修改密码
        changsubmit(changeformValidate){
          var that=this;
          that.$refs[changeformValidate].validate((valid) => {
            if (valid) {
             axios.post("/SmartHomeTrade/user/updatePassword",that.changeformValidate).then(function (res) {
               that.$message({
                 type: 'success',
                 message: res.data.message
               });
               that.changePass=false
             })

            } else {
              console.log('error submit!!');
              return false;
            }
          });

        },
        back(){
          var that=this;
          // var status=Number(that.$store.state.userInfo.status)
          axios.post('/SmartHomeTrade/user/exitUser',{
            status:1,
            loginName:that.$store.state.userinfo.loginName
          }).then(function (res) {
            console.log(res)
            that.$message({
              type: 'success',
              message: res.data.message
            });
            that.$store.commit('exitUser')
            that.$router.push("/login")
          })

        },
        //关闭弹窗
        handleClose(done) {
          done();
        },
      }


    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $header_color:#05509c;
  $color:#fff;

  .el-input.is-disabled .el-input__inner {
     background-color: #fff;
     /*border-color: #e4e7ed;*/
     color: #000 !important;
  }

  .left{
    font-size: 0.24rem;
    color:$color;
    line-height: 0.5rem;
  }
  .right{
    font-size: 0.14rem;
    color:$color;
    /*line-height: 0.5rem;*/
  }
  .change{
    font-size:0.18rem ;
  }
  li{
    padding:0 10px;
    line-height: 0.4rem;

  }
  .list-1,.list-2{
    cursor: pointer;

  }
  .now-user{
    height:60px;
    line-height: 60px;
    font-size: 20px;
   text-align: center;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown-link[data-v-69a0b576]{
    color:#fff;
    font-size: 14px;
  }





</style>
