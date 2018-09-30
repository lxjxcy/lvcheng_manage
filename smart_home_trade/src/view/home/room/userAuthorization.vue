<template>
  <div class="userAuthorization">
    <div class="nav-middle" style="margin-top: 10px;">
      <ul>
        <li class="l" @click="add()" ><i class="iconfont">&#xe637;</i>授权</li>
        <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1" -->
        <userAuthbuild ref="mybuildchild" @refreshList="getuserInfo"></userAuthbuild>
         <userAuthroom ref="myroomchild" @refreshList="getuserInfo"></userAuthroom>
          <userAuthfloor ref="myfloorchild" @refreshList="getuserInfo"></userAuthfloor>
           <userAuthdevic ref="mydevicechild" @refreshList="getuserInfo"></userAuthdevic>
        <li class="l" @click="authInfo()"><i class="iconfont">&#xe606;</i>授权信息</li>
      </ul>
    </div>
    <div class="main-table userlist">
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
         defaultProps: {
          children: 'appUserInfoList',
          label: 'name'
        }
       
      }
    },
        beforeMount(){
       
     },


    mounted(){
      
        
      this.getuserInfo()
    
    },
    methods: {
      getuserInfo(){
        var that=this;
        var param={
          createUser:that.$store.state.userinfo.userMobile,
          action:2
        }
        that.axios.post("/SmartHomeTrade/appUser/selectDptUser",param).then(function(res){
          if(res.data.code==0){
            if(res.data.data!=null){
              that.userlist=res.data.data.dptUserList

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
      // 添加授权
        add(){
           var listid=this.$refs.user.getCheckedKeys()
           if(listid.length==0){
            this.$message.warning("请选择授权用户")
           }else{
             var arr=listid.filter(element=>element!= null)
             
                
               if(this.$store.state.userinfo.userLevel==2){
                this.$refs.mybuildchild.getAuthrization(arr);
                }
                 if(this.$store.state.userinfo.userLevel==3){
                  this.$refs.myfloorchild.getAuthrization(arr);
                }
                 if(this.$store.state.userinfo.userLevel==4){
                  this.$refs.myroomchild.getAuthrization(arr);
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
