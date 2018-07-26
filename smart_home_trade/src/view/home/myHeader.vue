<template>
  <div class="my-header">
    <div class="left l">
      <ul>
        <li class="l">{{message}}</li>
        <li class="l change"> 切换</li>
      </ul>
    </div>
    <div class="right r">
        <ul>
          <li class="l"><i class="iconfont">&#xe636;</i>当前用户：admin</li>
          <li class="l list-1" @click="changePass = true"><i class="iconfont">&#xe611;</i>修改密码</li>
          <!--修改密码-->
            <el-dialog
              title="修改密码"
              :visible.sync="changePass"
              width="30%"
              :before-close="handleClose">
              <div class="changePass">
                <div class="now-user">当前用户：<span>admin</span></div>
                <el-form ref="changeformValidate" :model="changeformValidate" :rules="ruleValidate" :label-width="60">
                  <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPsw" >
                    <el-input v-model="changeformValidate.oldPsw" auto-complete="off" style="width:220px" placeholder="请输入原密码"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth" prop="newPsw" >
                    <el-input v-model="changeformValidate.newPsw" auto-complete="off" style="width:220px" placeholder="请输入新密码"></el-input>
                  </el-form-item>
                </el-form>



              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changePass = false">提交</el-button>
              </span>
            </el-dialog>
          <li class="l list-2" @click="back()"><i class="iconfont">&#xe795;</i>退出</li>
        </ul>

    </div>


   </div>
</template>

<script>
    export default {
        name: "myHeader",

      props : ['message'],

      data(){
        const validateTel = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('手机号码不能为空'));
          }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))||!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
            callback(new Error('请输入正确手机号'));
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
              oldPsw: '',
              newPsw: ''
            },
            formLabelWidth: '100px',
            ruleValidate: {
              oldPsw: [
                { required: true,validator: validateName, trigger: 'blur' }
              ],
              newPsw: [
                { required: true,validator: validateTel, trigger: 'blur' }
              ],
            },
          }
      },
      methods:{
        back(){
          alert("sss")
          this.$router.push("/")
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



  .left{
    font-size: 0.28rem;
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
    line-height: 0.5rem;

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






</style>
