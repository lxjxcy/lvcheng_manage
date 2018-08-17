<template>
    <div class="floor all">
        <header>
          <myHeader message="楼层管理后台"></myHeader>
        </header>
        <div class="container">
          <aside>
            <!--<Row>-->
              <!--<Col span="8">-->
                <!--<Menu :theme="theme2">-->
                  <!--<Submenu name="1">-->
                    <!--<template slot="title">-->
                      <!--<router-link to="/floor/myFloor">-->
                        <!--<MenuItem name="1">-->
                          <!--<i class="iconfont">&#xe605;</i>我的楼层-->
                        <!--</MenuItem>-->
                      <!--</router-link>-->
                    <!--</template>-->
                  <!--</Submenu>-->
                  <!--<Submenu name="2">-->
                    <!--<template slot="title">-->
                      <!--<router-link to="/floor/roomManagement">-->
                        <!--<MenuItem name="2">-->
                          <!--<i class="iconfont">&#xe607;</i>房间管理-->
                        <!--</MenuItem>-->
                      <!--</router-link>-->
                    <!--</template>-->
                  <!--</Submenu>-->
                  <!--<Submenu name="3">-->
                    <!--<template slot="title">-->
                      <!--<router-link to="/floor/floorUser">-->
                        <!--<MenuItem name="3">-->
                          <!--<i class="iconfont">&#xe60e;</i>账户管理-->
                        <!--</MenuItem>-->
                      <!--</router-link>-->
                    <!--</template>-->
                  <!--</Submenu>-->
                  <!--<Submenu name="4">-->
                    <!--<template slot="title">-->
                      <!--<router-link to="/floor/floorAppuser">-->
                        <!--<MenuItem name="4">-->
                          <!--<i class="iconfont">&#xe60e;</i>App用户管理-->
                        <!--</MenuItem>-->
                      <!--</router-link>-->
                    <!--</template>-->
                  <!--</Submenu>-->
                  <!--<Submenu name="5">-->
                    <!--<template slot="title">-->
                      <!--<router-link to="/floor/floorLog">-->
                        <!--<MenuItem name="5">-->
                          <!--<i class="iconfont">&#xe60e;</i>日志管理-->
                        <!--</MenuItem>-->
                      <!--</router-link>-->
                    <!--</template>-->
                  <!--</Submenu>-->
                <!--</Menu>-->
              <!--</Col>-->
            <!--</Row>-->
            <el-row class="tac">
              <el-col :span="12">
                <div style="overflow: hidden;padding: 15px 10px">
                  <ul class="l" style="margin-right:5px;">
                    <li ><i class="iconfont" style="font-size: 45px;color:#13cc96">&#xe636;</i></li>
                  </ul>
                  <ul class="l">
                    <li style="color:#fff">{{this.$store.state.userInfo.loginName}}</li>
                    <li style="color:#fff;font-size: 14px;">楼层管理员</li>
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
                  <router-link to="/floor/myFloor">
                    <el-menu-item index="1">
                      <i class="iconfont">&#xe605;</i>
                      <span slot="title">我的楼层</span>
                    </el-menu-item>
                  </router-link>
                  <router-link to="/floor/roomManagement">
                    <el-menu-item index="2">
                      <i class="iconfont">&#xe607;</i>
                      <span slot="title">房间管理</span>
                    </el-menu-item>
                  </router-link>
                  <router-link to="/floor/floorUser">
                    <el-menu-item index="3">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">账户管理</span>
                    </el-menu-item>
                  </router-link>
                  <router-link to="/floor/floorAppuser">
                    <el-menu-item index="4">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">App用户管理</span>
                    </el-menu-item>
                  </router-link>
                  <router-link to="/floor/floorLog">
                    <el-menu-item index="5">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">账户管理</span>
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
        name: "floor",
      data(){
        return{
          theme2: 'light'
        }
      }
    }
</script>

<style scoped>

</style>


