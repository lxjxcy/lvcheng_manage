<template>
  <div class="park all">
    <header>
      <myHeader message="园区管理后台"></myHeader>
    </header>
    <div class="container">

      <aside>

        <!--<ul>-->
          <!--<li>-->
            <!--<router-link to="/park/myPark">-->
              <!--<i class="iconfont">&#xe605;</i>我的园区-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="/park/buildingManagement">-->
              <!--<i class="iconfont">&#xe607;</i>大楼管理-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li>-->
            <!--<router-link to="/park/parkUser">-->
              <!--<i class="iconfont">&#xe60e;</i>账户管理-->
            <!--</router-link>-->
          <!--</li>-->
        <!--</ul>-->

        <!--<el-menu-item index="2">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">导航二</span>-->
        <!--</el-menu-item>-->


        <!--<div class="nowuser">-->
          <!--<div><i class="iconfont">&#xe636;</i></div>-->
          <!--<div>admin</div>-->
        <!--</div>-->
        <!--<Row>-->
          <!--<Col span="8">-->
            <!--<Menu :theme="theme2">-->
              <!--<Submenu name="1">-->
                <!--<template slot="title">-->
                  <!--<Icon type="ios-paper"></Icon>-->
                  <!--内容管理-->
                <!--</template>-->
                <!--<MenuItem name="1-1">文章管理</MenuItem>-->
                <!--<MenuItem name="1-2">评论管理</MenuItem>-->
                <!--<MenuItem name="1-3">举报管理</MenuItem>-->
              <!--</Submenu>-->
              <!--<Submenu name="2">-->
                <!--<template slot="title">-->
                  <!--<Icon type="ios-people"></Icon>-->
                  <!--用户管理-->
                <!--</template>-->
                <!--<MenuItem name="2-1">新增用户</MenuItem>-->
                <!--<MenuItem name="2-2">活跃用户</MenuItem>-->
              <!--</Submenu>-->
              <!--<Submenu name="3">-->
                <!--<template slot="title">-->
                  <!--<Icon type="stats-bars"></Icon>-->
                  <!--统计分析-->
                <!--</template>-->
              <!--</Submenu>-->
            <!--</Menu>-->
          <!--</Col>-->
          <!--</Row>-->
        <Row>
          <Col span="8">
            <Menu :theme="theme2">
              <Submenu name="1">
                <template slot="title">
                  <router-link to="/park/myPark">
                  <MenuItem name="1">
                    <i class="iconfont">&#xe605;</i>我的园区
                  </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <router-link to="/park/buildingManagement">
                    <MenuItem name="2">
                    <i class="iconfont">&#xe607;</i>大楼管理
                   </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <router-link to="/park/parkUser">
                    <MenuItem name="3">
                      <i class="iconfont">&#xe60e;</i>账户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <router-link to="/park/parkAppuser">
                    <MenuItem name="4">
                      <i class="iconfont">&#xe60e;</i>App用户管理
                    </MenuItem>
                  </router-link>
                </template>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <router-link to="/park/parkLog">
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
        name: "park",
      data(){
          return{
            theme2: 'light'
          }
      }
    }
</script>

<style scoped>

</style>
