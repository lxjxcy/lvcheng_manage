<template>
    <div class="floor all">
        <header>
          <myHeader message="楼层管理后台"></myHeader>
        </header>
        <div class="container">
          <aside>
              <!--<ul>-->
                <!--<li>-->
                  <!--<router-link to="/floor/myFloor">-->
                    <!--<i class="iconfont">&#xe605;</i>我的楼层-->
                  <!--</router-link>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<router-link to="/floor/roomManagement">-->
                    <!--<i class="iconfont">&#xe607;</i>房间管理-->
                  <!--</router-link>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<router-link to="/floor/floorUser">-->
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
                      <router-link to="/floor/myFloor">
                        <MenuItem name="1">
                          <i class="iconfont">&#xe605;</i>我的楼层
                        </MenuItem>
                      </router-link>
                    </template>
                  </Submenu>
                  <Submenu name="2">
                    <template slot="title">
                      <router-link to="/floor/roomManagement">
                        <MenuItem name="2">
                          <i class="iconfont">&#xe607;</i>房间管理
                        </MenuItem>
                      </router-link>
                    </template>
                  </Submenu>
                  <Submenu name="3">
                    <template slot="title">
                      <router-link to="/floor/floorUser">
                        <MenuItem name="3">
                          <i class="iconfont">&#xe60e;</i>账户管理
                        </MenuItem>
                      </router-link>
                    </template>
                  </Submenu>
                  <Submenu name="4">
                    <template slot="title">
                      <router-link to="/floor/floorAppuser">
                        <MenuItem name="4">
                          <i class="iconfont">&#xe60e;</i>App用户管理
                        </MenuItem>
                      </router-link>
                    </template>
                  </Submenu>
                  <Submenu name="5">
                    <template slot="title">
                      <router-link to="/floor/floorLog">
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
          <myFooter>
            <div>杭州绿城信息技术有限公司 版权所有浙公网安备
              33010602001128号</div>
          </myFooter>
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


