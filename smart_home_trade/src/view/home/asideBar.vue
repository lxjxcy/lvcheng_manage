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
                   :default-active="this.$store.state.activeIndex"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect">
                      <el-menu-item index="1-1">
                        <i class="iconfont">&#xe605;</i>
                        <span slot="title">园区管理</span>
                      </el-menu-item>
                      <el-menu-item index="1-2">
                         <i class="iconfont">&#xe60e;</i>
                        <span slot="title">账户管理</span>
                      </el-menu-item>
                     <!--  <el-menu-item index="1-3">
                        <i class="iconfont">&#xe607;</i>
                        <span slot="title">模板设置</span>
                      </el-menu-item> -->
                      <el-menu-item index="1-4">
                        <i class="iconfont">&#xe503;</i>
                        <span slot="title">日志管理</span>
                      </el-menu-item>
                    </el-menu>
                </div>

           <!--  <div v-if="this.$store.state.userinfo.userLevel==1">
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
              </div> -->
              <div v-if="this.$store.state.userinfo.userLevel==2">
                 <el-menu
                   :default-active="this.$store.state.activeIndex"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect">
                      <el-menu-item index="2-1">
                        <i class="iconfont">&#xe605;</i>
                        <span slot="title">我的园区</span>
                      </el-menu-item>
                      <el-menu-item index="2-2" v-if="this.$store.state.extendList.buildingManagement==1">
                        <i class="iconfont">&#xe772;</i>
                        <span slot="title">大楼管理</span>
                      </el-menu-item>
                       <el-menu-item index="2-6">
                        <i class="iconfont">&#xe607;</i>
                        <span slot="title">设备管理</span>
                      </el-menu-item>
                      <el-menu-item index="2-7">
                         <i class="iconfont">&#xe6bf;</i>
                         <span slot="title">授权管理</span>
                       </el-menu-item>
                      <el-menu-item index="2-3" v-if="this.$store.state.extendList.parkuser==1">
                        <i class="iconfont">&#xe60e;</i>
                        <span slot="title">账户管理</span>
                      </el-menu-item>
                     
                      <el-menu-item index="2-4" v-if="this.$store.state.extendList.parkAppuser==1">
                        <i class="iconfont">&#xe604;</i>
                        <span slot="title">App用户管理</span>
                      </el-menu-item>
                      
                      <el-menu-item index="2-5">
                        <i class="iconfont">&#xe503;</i>
                        <span slot="title"> 日志管理</span>
                      </el-menu-item>
                  </el-menu>
                
              </div>
               <div v-if="this.$store.state.userinfo.userLevel==3">
                 <el-menu
                    :default-active="this.$store.state.activeIndex"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect">
                      <el-menu-item index="3-1">
                        <i class="iconfont">&#xe772;</i>
                        <span slot="title">我的大楼</span>
                      </el-menu-item>
                      <el-menu-item index="3-2" v-if="this.$store.state.extendList.floorManagment==1">
                        <i class="iconfont">&#xe608;</i>
                        <span slot="title">楼层管理</span>
                      </el-menu-item>
                       <el-menu-item index="3-6">
                        <i class="iconfont">&#xe607;</i>
                        <span slot="title">设备管理</span>
                      </el-menu-item>
                       <el-menu-item index="3-7">
                         <i class="iconfont">&#xe6bf;</i>
                         <span slot="title">授权管理</span>
                       </el-menu-item>
                      <el-menu-item index="3-3" v-if="this.$store.state.extendList.buildingUser==1">
                        <i class="iconfont">&#xe60e;</i>
                        <span slot="title">账户管理</span>
                      </el-menu-item>
                      <el-menu-item index="3-4" v-if="this.$store.state.extendList.buildingAppuser==1">
                        <i class="iconfont">&#xe604;</i>
                        <span slot="title">App用户管理</span>
                      </el-menu-item>
                      <el-menu-item index="3-5">
                        <i class="iconfont">&#xe503;</i>
                        <span slot="title">日志管理</span>
                      </el-menu-item>
                  </el-menu>
                      
              </div>
                <div v-if="this.$store.state.userinfo.userLevel==4">
                 <el-menu
                 :default-active="this.$store.state.activeIndex"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  @select="handleSelect">
                    <el-menu-item index="4-1">
                      <i class="iconfont">&#xe608;</i>
                      <span slot="title">我的楼层</span >
                    </el-menu-item>
                    <el-menu-item index="4-2" v-if="this.$store.state.extendList.roomManagement==1">
                      <i class="iconfont">&#xe6c2;</i>
                      <span slot="title">房间管理</span>
                    </el-menu-item>
                     <el-menu-item index="4-6">
                        <i class="iconfont">&#xe607;</i>
                        <span slot="title">设备管理</span>
                      </el-menu-item>
                       <el-menu-item index="4-7">
                         <i class="iconfont">&#xe6bf;</i>
                         <span slot="title">授权管理</span>
                       </el-menu-item>
                    <el-menu-item index="4-3" v-if="this.$store.state.extendList.floorUser==1">
                      <i class="iconfont">&#xe60e;</i>
                      <span slot="title">账户管理</span>
                    </el-menu-item>
                    <el-menu-item index="4-4" v-if="this.$store.state.extendList.floorAppuser==1">
                      <i class="iconfont">&#xe604;</i>
                      <span slot="title">App用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="4-5">
                      <i class="iconfont">&#xe503;</i>
                      <span slot="title">日志管理</span>
                    </el-menu-item>
                </el-menu>
                
              </div>
               <div v-if="this.$store.state.userinfo.userLevel==5">
                <el-menu
                  :default-active="this.$store.state.activeIndex"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  @select="handleSelect">
                    <el-menu-item index="5-1">
                      <i class="iconfont">&#xe6c2;</i>
                      <span slot="title">我的房间</span>
                    </el-menu-item>
                    <el-menu-item index="5-2" v-if="this.$store.state.extendList.equipment==1">
                      <i class="iconfont">&#xe607;</i>
                      <span slot="title">设备管理</span>
                    </el-menu-item>
                    <el-menu-item index="5-3" v-if="this.$store.state.extendList.authorization==1">
                      <i class="iconfont">&#xe6bf;</i>
                      <span slot="title">授权管理</span>
                    </el-menu-item>
                    <el-menu-item index="5-4" v-if="this.$store.state.extendList.roomAppuser==1">
                      <i class="iconfont">&#xe604;</i>
                      <span slot="title">App用户管理</span>
                    </el-menu-item>
                   <!--  <el-menu-item index="5-5">
                      <i class="iconfont">&#xe503;</i>
                      <span slot="title">日志管理</span>
                    </el-menu-item> -->
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
          
          userLevelName:"",
          // activeIndex:"1",

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
      },
        methods:{
            handleSelect(key, keyPath) {
              var that=this;
              // that.activeIndex=key;
               that.$store.commit('saveIndex',key)
              if(key=="1-1"){
                  that.$router.push('/garden/gardenManagement')
              }
              if(key=="1-2"){
                  that.$router.push('/garden/gardenUser')
              }
              if(key=="1-3"){
                  that.$router.push('/garden/masterplate')
              }
              if(key=="1-4"){
                  that.$router.push('/garden/gardenLog')
              }
               if(key==="2-1"){
                  that.$router.push('/park/MyPark')
              }
              if(key=="2-2"){
               
                  that.$router.push('/park/buildingManagement')
              }
              if(key==="2-3"){
                  that.$router.push('/park/parkUser')
              }
              if(key==="2-4"){
                  that.$router.push('/park/parkAppuser')
              }
               if(key=="2-5"){
                  that.$router.push('/park/parkLog')
              }
              if(key=="2-6"){
                  that.$router.push('/park/myEquipment')
              }
               if(key=="2-7"){
                  that.$router.push('/park/authorManagement')
              }
                if(key=="3-1"){
                  that.$router.push('/building/MyBuilding')
              }
              if(key=="3-2"){
                  that.$router.push('/building/floorManagment')
              }
              if(key=="3-3"){
                  that.$router.push('/building/buildingUser')
              }
              if(key=="3-4"){
                  that.$router.push('/building/buildingAppuser')
              }
               if(key=="3-5"){
                  that.$router.push('/building/buildingLog')
              }
               if(key=="3-6"){
                  that.$router.push('/building/myEquipment')
              }
               if(key=="3-7"){
                  that.$router.push('/building/authorManagement')
              }
              if(key=="4-1"){
                  that.$router.push('/floor/myFloor')
              }
              if(key=="4-2"){
                  that.$router.push('/floor/roomManagement')
              }
              if(key=="4-3"){
                  that.$router.push('/floor/floorUser')
              }
              if(key=="4-4"){
                  that.$router.push('/floor/floorAppuser')
              }
               if(key=="4-5"){
                  that.$router.push('/floor/floorLog')
              }
              if(key=="4-6"){
                  that.$router.push('/floor/myEquipment')
              }
               if(key=="4-7"){
                  that.$router.push('/floor/authorManagement')
              }
               if(key=="5-1"){
                  that.$router.push('/room/myRoom')
              }
              if(key=="5-2"){
                  that.$router.push('/room/equipment')
              }
              if(key=="5-3"){
                  that.$router.push('/room/authorManagement')
              }
              if(key=="5-4"){
                  that.$router.push('/room/roomAppuser')
              }
               if(key=="5-5"){
                  that.$router.push('/room/roomLog')
              }
            
          }
       }
    }
</script>

<style scoped>

</style>
