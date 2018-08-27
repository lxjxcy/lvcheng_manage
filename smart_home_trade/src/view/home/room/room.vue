<template>
  <div class="room all">
      <aside>
        <el-row class="tac">
          <el-col :span="12">
            <div style="overflow: hidden;padding: 15px 10px">
              <ul class="l" style="margin-right:5px;">
                <li ><i class="iconfont" style="font-size: 45px;color:#13cc96">&#xe636;</i></li>
              </ul>
              <ul class="l">
                <li style="color:#fff">{{this.$store.state.userinfo.loginName}}</li>
                <li style="color:#fff;font-size: 14px;">房间管理员</li>
              </ul>
            </div>
            <el-menu
              router 
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
                <el-menu-item index="/room/myRoom">
                  <i class="iconfont">&#xe605;</i>
                  <span slot="title">我的房间</span>
                </el-menu-item>
                <el-menu-item index="/room/equipment">
                  <i class="iconfont">&#xe607;</i>
                  <span slot="title">设备管理</span>
                </el-menu-item>
                <el-menu-item index="/room/authorization">
                  <i class="iconfont">&#xe607;</i>
                  <span slot="title">授权管理</span>
                </el-menu-item>
                <el-menu-item index="/room/roomAppuser">
                  <i class="iconfont">&#xe60e;</i>
                  <span slot="title">App用户管理</span>
                </el-menu-item>
                <el-menu-item index="/room/roomLog">
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
</template>

<script>
    export default {
        name: "room",
      data(){
        return{
        }
      }
    }
</script>

<style scoped>

</style>
