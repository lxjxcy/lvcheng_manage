<template>
  <div class="park all"> 
      <aside>
        <el-row class="tac">
          <el-col :span="12">
            <div style="overflow: hidden;padding: 15px 10px">
              <ul class="l" style="margin-right:5px;">
                <li ><i class="iconfont" style="font-size: 45px;color:#13cc96">&#xe636;</i></li>
              </ul>
              <ul class="l">
                <li style="color:#fff">{{this.$store.state.userinfo.loginName}}</li>
                <li style="color:#fff;font-size: 14px;">园区管理员</li>
              </ul>
            </div>
            <el-menu
              router 
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
                <el-menu-item index="/park/MyPark">
                  <i class="iconfont">&#xe605;</i>
                  <span slot="title" v-model="MyPark">我的园区</span>
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
          </el-col>
        </el-row>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>

</template>

<script>
  import goRouter from "../../../mixins/goRouter"
    export default {
        name: "park",
      data(){
          return{
            show:true,
            MyPark:'',
            buildingManagement:'',
            parkAppuser:'',
            parkLog:'',
          }
      },
      mixins: [goRouter],
      mounted(){
        this.goRouter();
          if(this.$store.state.userinfo.userLevel==2){
          this.show=true;
        }else{
           this.show=false;
        }
      },
     
    }
</script>

<style scoped>

</style>
