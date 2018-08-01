<template>
  <div class="building all">
    <header>
      <myHeader message="大楼管理后台"></myHeader>
    </header>
    <div class="container">
      <aside>
        <!--<ul>-->
          <!--<li>-->
            <!--<router-link to="/building/myBuilding">-->
              <!--<i class="iconfont">&#xe605;</i>我的大楼-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="/building/floorManagment">-->
              <!--<i class="iconfont">&#xe607;</i>楼层管理-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="/building/buildingUser">-->
              <!--<i class="iconfont">&#xe60e;</i>账户管理-->
            <!--</router-link>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<div class="nowuser">-->
          <!--<div><i class="iconfont">&#xe636;</i></div>-->
          <!--<div>admin</div>-->
        <!--</div>-->

        <Row>
          <Col span="8">
            <Menu :theme="theme2">
              <Submenu name="1">
                <template slot="title">
                  <router-link to="/building/myBuilding">
                    <MenuItem name="1">
                      <i class="iconfont">&#xe605;</i>我的大楼
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <router-link to="/building/floorManagment">
                    <MenuItem name="2">
                      <<i class="iconfont">&#xe607;</i>楼层管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <router-link to="/building/buildingUser">
                    <MenuItem name="3">
                      <i class="iconfont">&#xe60e;</i>账户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <router-link to="/building/buildingAppuser">
                    <MenuItem name="4">
                      <i class="iconfont">&#xe60e;</i>App用户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <router-link to="/building/buildingLog">
                    <MenuItem name="5">
                      <i class="iconfont">&#xe60e;</i>日志管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
            </Menu>
          </Col>
        </Row>
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
