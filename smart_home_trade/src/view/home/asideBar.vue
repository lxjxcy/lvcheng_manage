<template>
  <div class="asideBar all">
        <aside>
          <el-row class="tac">
            <el-col :span="12">
              <div style="overflow: hidden;padding: 15px 10px">
                <ul class="l" style="margin-right:5px;">
                  <li ><i class="iconfont" style="font-size: 45px;color:#13cc96">&#xe636;</i></li>
                </ul>
                <ul class="l">
                  <li style="color:#fff">{{this.$store.state.userinfo.loginName}}</li>
                  <li style="color:#fff;font-size: 14px;">{{userLevelName}}</li>
                </ul>
              </div>

            <div v-if="this.$store.state.userinfo.userLevel==1">
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
              </div>
              <div v-if="this.$store.state.userinfo.userLevel==2">
                 <el-menu
                    router 
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                      <el-menu-item index="/park/MyPark">
                        <i class="iconfont">&#xe605;</i>
                        <span slot="title">我的园区</span>
                      </el-menu-item>
                      <el-menu-item index="/park/buildingManagement">
                        <i class="iconfont">&#xe607;</i>
                        <span slot="title">大楼管理</span>
                      </el-menu-item>
                      <el-menu-item index="/park/parkUser">
                        <i class="iconfont">&#xe60e;</i>
                        <span slot="title">账户管理</span>
                      </el-menu-item>
                      <el-menu-item index="/park/parkAppuser">
                        <i class="iconfont">&#xe60e;</i>
                        <span slot="title">App用户管理</span>
                      </el-menu-item>
                      <el-menu-item index="/park/parkLog">
                        <i class="iconfont">&#xe60e;</i>
                        <span slot="title"> 日志管理</span>
                      </el-menu-item>
                  </el-menu>
                
              </div>
               <div v-if="this.$store.state.userinfo.userLevel==3">
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
                      
              </div>
               <div v-if="this.$store.state.userinfo.userLevel==5">
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
                
              </div>
               <div v-if="this.$store.state.userinfo.userLevel==4">
                 <el-menu
                 router 
                 :default-active="$route.path"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                    <el-menu-item index="/floor/myFloor">
                      <i class="iconfont">&#xe605;</i>
                      <span slot="title">我的楼层</span>
                    </el-menu-item>
                    <el-menu-item index="/floor/roomManagement">
                      <i class="iconfont">&#xe607;</i>
                      <span slot="title">房间管理</span>
                    </el-menu-item>
                    <el-menu-item index="/floor/floorUser">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">账户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/floor/floorAppuser">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">App用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/floor/floorLog">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">日志管理</span>
                    </el-menu-item>
                </el-menu>
                
              </div>
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
        name: "asideBar",
      data(){
        return{
          
          userLevelName:""

        }
      },
       mounted(){
        if(this.$store.state.userinfo.userLevel==1){
          this.userLevelName="系统管理员"
        }else if(this.$store.state.userinfo.userLevel==2){
            this.userLevelName="园区管理员"
        }
        else if(this.$store.state.userinfo.userLevel==3){
            this.userLevelName="大楼管理员"
        }
        else if(this.$store.state.userinfo.userLevel==4){
            this.userLevelName="楼层管理员"
        }else{
          this.userLevelName="房间管理员"
        }
        // console.log(this.$store.state.userinfo)
        // console.log(this.$store.state.userinfo.userLevel)

      },
    }
</script>

<style scoped>

</style>
