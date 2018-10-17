<template>
  <div class="my-header">
    <div class="left l">
      <ul>
        <li class="l listimg" @click="nowreload()"><img src="../../assets/userlogo.png"></li>
        <li class="l title" >{{message}}</li>
        <li class="l change">
          <switchPark v-if="this.$store.state.userinfo.userLevel==2" v-bind:Name="username"></switchPark>
          <switchRoom v-if="this.$store.state.userinfo.userLevel==5" v-bind:Name="username"></switchRoom>
          <switchBuild v-if="this.$store.state.userinfo.userLevel==3" v-bind:Name="username"></switchBuild>
          <switchFloor v-if="this.$store.state.userinfo.userLevel==4" v-bind:Name="username"></switchFloor>
         
        </li>
      </ul>
    </div>
    <div class="right r">
        <ul>
          <li class="l"><i class="iconfont">&#xe636;</i>当前用户：{{this.$store.state.userinfo.loginName}}</li>
          <li class="l list-1" @click="changepass()"><i class="iconfont">&#xe611;</i>修改密码</li>
          <!--修改密码-->
            
          <li class="l list-2" @click="back()"><i class="iconfont">&#xe795;</i>退出</li>

        </ul>
        <changePassword  ref="mychild"></changePassword>

    </div>


   </div>
</template>

<script>
  // import axios from 'axios'
  import changePassword from "../login/changePassword.vue"
  import switchPark from "./switch/switchPark.vue"
  import switchRoom from "./switch/switchRoom.vue"
  import switchBuild from "./switch/switchBuild.vue"
  import switchFloor from "./switch/switchFloor.vue"
    export default {
        name: "myHeader",
        components:{
         changePassword,
         switchPark,
         switchRoom,
         switchBuild,
         switchFloor
        },
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
            message:"",
            username:""
           
          }
      },
      mounted(){
        this.username=this.$store.state.userinfo.loginName
       if(this.$store.state.userinfo.userLevel==1){
          this.message="系统管理平台"
        }else if(this.$store.state.userinfo.userLevel==2){
            this.message="园区管理平台"
        }
        else if(this.$store.state.userinfo.userLevel==3){
            this.message="大楼管理平台"
        }
        else if(this.$store.state.userinfo.userLevel==4){
            this.message="楼层管理平台"
        }else{
          this.message="房间管理平台"
        }
      },
      methods:{
        nowreload(){
         location.reload()
        },
       
        // 修改密码弹框
        changepass(){
           this.$refs.mychild.openDialog();          
        },

        
        back(){
            var that=this;
             that.$confirm('你确认退出登录么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              that.axios.post('/SmartHomeTrade/user/exitUser',{
              status:1,
              loginName:that.$store.state.userinfo.loginName
            }).then(function (res) {
              if(res.data.code==0){

               
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.$store.commit('exitUser')
               that.$set(that.$store.state,'isgoback',true)
              // that.$router.push("/")
             
              that.$router.push({name:'login',params:{username:that.username}})
              }            
            })        
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消退出'
            });          
          });
        },
        //关闭弹窗

      }


    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $header_color:#05509c;
  $color:#fff;
img{
  height:50px;
  display: inline-block;
  padding:0 20px;
  position: relative;
  top:-3px;
}
  .el-input.is-disabled .el-input__inner {
     background-color: #fff;
     /*border-color: #e4e7ed;*/
     color: #000 !important;
  }

  .left{
    font-size: 24px;
    color:$color;
    line-height: 45px;
  }
  .right{
    font-size: 14px;
    color:$color;
    /*line-height: 50px;*/
  }
  .change{
    font-size:18px ;
  }
  .listimg{
    line-height: 45px;
    cursor: pointer
  }
  li{
    padding:0 10px;
    line-height: 45px;

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
.title{
  font-size:20px;
  font-weight: 500;
}




</style>
