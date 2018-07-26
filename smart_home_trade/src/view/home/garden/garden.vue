<template>
  <div class="garden all">
    <header>
      <myHeader message="办公大楼设备管理后台"></myHeader>
    </header>
    <div class="container">
      <aside>
        <Row>
          <Col span="8">
            <Menu :theme="theme2">
              <Submenu name="1">
                <template slot="title">
                  <router-link to="/garden/gardenManagement">
                    <MenuItem name="1">
                      <i class="iconfont">&#xe605;</i>园区管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <router-link to="/garden/gardenUser">
                    <MenuItem name="2">
                      <i class="iconfont">&#xe607;</i>账户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <router-link to="/garden/masterplate">
                    <MenuItem name="3">
                      <i class="iconfont">&#xe60e;</i>摸版设置
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <router-link to="/garden/gardenAppuser">
                    <MenuItem name="4">
                      <i class="iconfont">&#xe60e;</i>App用户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <router-link to="/garden/gardenLog">
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
        name: "garden",
      data(){
        return{
          theme2: 'light'
        }
      }
    }
</script>

<style scoped>

</style>
