<template>
  <div class="garden all">
   <!--  {
      this.$store.state.userinfo.userLevel==1? -->
    <header v-if="show">
      <myHeader message="办公大楼设备管理后台"></myHeader>
    </header>
      <div class="container"  v-if="show">
        <aside>
          <el-row class="tac">
            <el-col :span="12">
              <div style="overflow: hidden;padding: 15px 10px">
                <ul class="l" style="margin-right:5px;">
                  <li ><i class="iconfont" style="font-size: 45px;color:#13cc96">&#xe636;</i></li>
                </ul>
                <ul class="l">
                  <li style="color:#fff">{{this.$store.state.userinfo.loginName}}</li>
                  <li style="color:#fff;font-size: 14px;">系统管理员</li>
                </ul>
              </div>

              <el-menu
                router 
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                  <el-menu-item index="/garden/gardenManagement">
                    <i class="iconfont">&#xe605;</i>
                    <span slot="title">园区管理</span>
                  </el-menu-item>
                  <el-menu-item index="/garden/gardenUser">
                    <i class="iconfont">&#xe607;</i>
                    <span slot="title">账户管理</span>
                  </el-menu-item>
                  <el-menu-item index="/garden/masterplate">
                    <i class="iconfont">&#xe607;</i>
                    <span slot="title">模板设置</span>
                  </el-menu-item>
                  <el-menu-item index="/garden/gardenLog">
                    <i class="iconfont">&#xe60e;</i>
                    <span slot="title">日志管理</span>
                  </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </aside>
        <main>
          <router-view></router-view>
        </main>
      </div>
      <div class="footerall">
        <myFooter></myFooter>
      </div>

  </div>
 </template>

<script>
    export default {
        name: "garden",
      data(){
        return{
          show:true,

        }
      },
       mounted(){
        if(this.$store.state.userinfo.userLevel==1){
          this.show=true;
        }else{
           this.show=false;
        }
        // console.log(this.$store.state.userinfo)
        // console.log(this.$store.state.userinfo.userLevel)

      },
    }
</script>

<style scoped>

</style>
