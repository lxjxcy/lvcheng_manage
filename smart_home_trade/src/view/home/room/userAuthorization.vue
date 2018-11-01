<template>
  <div class="userAuthorization">
    <div class="nav-middle" style="margin-top: 10px;">
      <ul>
        <li class="l" @click="add()" ><i class="iconfont">&#xe637;</i>授权</li>
        <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1" -->
        <userAuthbuild ref="mybuildchild" @refreshList="getuserInfo" v-if="hackReset" @reload="reloadcom"></userAuthbuild>
         <userAuthroom ref="myroomchild" @refreshList="getuserInfo" v-if="hackReset" @reload="reloadcom"></userAuthroom>
          <userAuthfloor ref="myfloorchild" @refreshList="getuserInfo" v-if="hackReset" @reload="reloadcom"></userAuthfloor>
           <userAuthdevic ref="mydevicechild" @refreshList="getuserInfo"></userAuthdevic>
        <li class="l" @click="authInfo()"><i class="iconfont">&#xe606;</i>授权信息</li>
      </ul>
    </div>
    <div class="main-table userlist" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">
      <el-tree
        :data="userlist"
        show-checkbox
        ref="user"
        node-key="ucUserId"
        :props="defaultProps">
      </el-tree>
      

    </div>


  </div>
</template>

<script>
import userAuthbuild from "../../../components/userAuthbuild"
import userAuthroom from "../../../components/userAuthroom"
import userAuthfloor from "../../../components/userAuthfloor"
import userAuthdevic from "../../../components/userAuthdevic"
  export default {
    name: "userAuthorization",
    components:{
      userAuthbuild,
      userAuthdevic,
      userAuthroom,
      userAuthfloor

    },
    
    data() {
      return {
        userlist:[],
        manageScopeIdList:[],
        token:2,
         regionList:[],
          hackReset:true,

        pictLoading:true,
         defaultProps: {
          children: 'appUserInfoList',
          label: 'name'
        }
       
      }
    },
        beforeMount(){
       
     },


    mounted(){
      if(this.$store.state.userinfo.userLevel==2){
        
            this.manageScopeIdList.push(this.$store.state.parame.parkid)
            this.token=2
         
        }
         if(this.$store.state.userinfo.userLevel==3){
           this.manageScopeIdList.push(this.$store.state.parame.buildid)
            this.token=3
        
        }
         if(this.$store.state.userinfo.userLevel==4){
           this.manageScopeIdList.push(this.$store.state.parame.floorid)
            this.token=4
         
        }    
      this.getuserInfo()
    
    },
    methods: {
      getuserInfo(){
        var that=this;
        if(that.$store.state.userinfo.userLevel==5){
          var param={
          createUser:that.$store.state.userinfo.userMobile,
          action:2
         }
         that.url="/SmartHomeTrade/appUser/selectDptUser"
        }else if(that.$store.state.userinfo.userLevel==4){

        var param={
          createUser:that.$store.state.userinfo.userMobile,
          action:1,
          token:that.token,
          manageScopeIdList:that.manageScopeIdList,
          addressId:that.$store.state.parame.flooraddressId
        }
        that.url='/SmartHomeTrade/device/selectRegionByAdmin'
        }else{
           var param={
          createUser:that.$store.state.userinfo.userMobile,
          action:1,
          token:that.token,

          manageScopeIdList:that.manageScopeIdList,
        }
        that.url='/SmartHomeTrade/device/selectRegionByAdmin'

        }



        that.axios.post(that.url,param).then(function(res){
          if(res.data.code==0){
            that.pictLoading=false;
            if(res.data.data!=null){
              var userlist=res.data.data.dptUserList;
              if(that.$store.state.userinfo.userLevel!=5){
                 that.regionList=res.data.data.regionList;
              }
             
              for(var i=0;i<userlist.length;i++){
                userlist[i].name=userlist[i].buildingName;
                userlist[i].appUserInfoList=userlist[i].dptList;

              }
              that.userlist=userlist;

            }else{
              that.userlist=[]
            }
          }else{
            that.$message.error(res.data.message);
          }
        })

      },

        // 授权信息
        authInfo(){
          if(this.$store.state.userinfo.userLevel==2){
           this.$router.push('/park/authorizationInfo')
            }
             if(this.$store.state.userinfo.userLevel==3){
              this.$router.push('/building/authorizationInfo')
            }
             if(this.$store.state.userinfo.userLevel==4){
              this.$router.push('/floor/authorizationInfo')
            }
              if(this.$store.state.userinfo.userLevel==5){
               this.$router.push('/room/authorizationInfo')
            }
          
        },
           // 刷新组件
       reloadcom(){
        this.hackReset = false
      this.$nextTick(() => {
      this.hackReset = true
      })
       },
      // 添加授权
        add(){
           var listid=this.$refs.user.getCheckedKeys()            
           if(listid.length==0){
            this.$message.warning("请选择授权用户")
           }else{
             var arr=listid.filter(element=>element!= null)
             var regionList=this.regionList  
               if(this.$store.state.userinfo.userLevel==2){
                this.$refs.mybuildchild.getAuthrization(arr,regionList);
                }
                 if(this.$store.state.userinfo.userLevel==3){
                  this.$refs.myfloorchild.getAuthrization(arr,regionList);
                }
                 if(this.$store.state.userinfo.userLevel==4){
                  this.$refs.myroomchild.getAuthrization(arr,regionList);
                }
                  if(this.$store.state.userinfo.userLevel==5){
                    this.$refs.mydevicechild.getAuthrization(arr);
                }
               }
        },
    
    },
  }
</script>

<style scoped>
.userlist{
  height: 400px;
  overflow:hidden;
  overflow-y:auto;
}
</style>
