<template>
  <div class="room all">
    <header>
      <myHeader message="房间管理后台"></myHeader>
    </header>
    <div class="container">
      <aside>
        <Row>
          <Col span="8">
            <Menu :theme="theme2">
              <Submenu name="1">
                <template slot="title">
                  <router-link to="/room/myRoom">
                    <MenuItem name="1">
                      <i class="iconfont">&#xe605;</i>我的房间
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <router-link to="/room/equipment">
                    <MenuItem name="2">
                      <i class="iconfont">&#xe607;</i>设备管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <router-link to="/room/authorization">
                    <MenuItem name="3">
                      <i class="iconfont">&#xe60e;</i>授权管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <router-link to="/room/roomAppuser">
                    <MenuItem name="4">
                      <i class="iconfont">&#xe60e;</i>App用户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <router-link to="/room/roomLog">
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
      <myFooter> </myFooter>
    </div>
  </div>
</template>

<script>
    export default {
        name: "room",
      data(){
        return{
          theme2: 'light'
        }
      }
    }
</script>

<style scoped>

</style>
