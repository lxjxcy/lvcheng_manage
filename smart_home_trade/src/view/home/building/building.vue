<template>
  <div class="building all">
    <header>
      <myHeader message="大楼管理后台"></myHeader>
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
                <li style="color:#fff">{{this.$store.state.userinfo.loginName}}</li>
                <li style="color:#fff;font-size: 14px;">大楼管理员</li>
              </ul>
            </div>
            <el-menu
              router 
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
                <el-menu-item index="/building/MyBuilding">
                  <i class="iconfont">&#xe605;</i>
                  <span slot="title">我的大楼</span>
                </el-menu-item>
                <el-menu-item index="/building/floorManagment">
                  <i class="iconfont">&#xe607;</i>
                  <span slot="title">楼层管理</span>
                </el-menu-item>
                <el-menu-item index="/building/buildingUser">
                  <i class="iconfont">&#xe60e;</i>
                  <span slot="title">账户管理</span>
                </el-menu-item>
                <el-menu-item index="/building/buildingAppuser">
                  <i class="iconfont">&#xe60e;</i>
                  <span slot="title">App用户管理</span>
                </el-menu-item>
                <el-menu-item index="/building/buildingLog">
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
        name: "building",
      data(){
        return{
          theme2: 'light'
        }
      }
    }
</script>

<style scoped>

</style>
