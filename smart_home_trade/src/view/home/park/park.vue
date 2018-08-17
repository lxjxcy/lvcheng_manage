<template>
  <div class="park all">
    <header>
      <myHeader message="园区管理后台"></myHeader>
    </header>
    <div class="container">


      <aside>
        <el-row class="tac">
          <el-col :span="12">
            <div style="overflow: hidden;padding: 15px 10px">
              <ul class="l" style="margin-right:5px;">
                <li ><i class="iconfont" style="font-size: 45px;color:#13cc96">&#xe636;</i></li>
              </ul>
              <ul class="l">
                <li style="color:#fff">{{this.$store.state.userInfo.loginName}}</li>
                <li style="color:#fff;font-size: 14px;">园区管理员</li>
              </ul>
            </div>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <router-link to="/park/MyPark">
                <el-menu-item index="1">
                  <i class="iconfont">&#xe605;</i>
                  <span slot="title">我的园区</span>
                </el-menu-item>
              </router-link>
              <router-link to="/park/buildingManagement">
                <el-menu-item index="2">
                  <i class="iconfont">&#xe607;</i>
                  <span slot="title">大楼管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/park/parkUser">
                <el-menu-item index="3">
                  <i class="iconfont">&#xe60e;</i>
                  <span slot="title">账户管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/park/parkAppuser">
                <el-menu-item index="4">
                  <i class="iconfont">&#xe60e;</i>
                  <span slot="title">App用户管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/park/parkLog">
                <el-menu-item index="5">
                  <i class="iconfont">&#xe60e;</i>
                  <span slot="title"> 日志管理</span>
                </el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
        </el-row>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
    <div class="footerall">
      <myFooter> </myFooter>
    </div>
  </div>

</template>

<script>
    export default {
        name: "park",
      data(){
          return{
            userLevel:''
          }
      },
      mounted(){
          if(this.$store.state.userInfo.userLevel==2){
            this.userLevel='园区管理员'
          }
      }
    }
</script>

<style scoped>

</style>
