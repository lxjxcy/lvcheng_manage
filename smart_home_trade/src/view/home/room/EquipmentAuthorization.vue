<template>
  <div class="EquipmentAuthorization">

    <div class="nav-middle" style="margin-top: 10px;">
      <ul>
        <li class="l" @click="add()" ><i class="iconfont">&#xe637;</i>授权</li>
        <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1"><i class="iconfont" -->
         <li class="l" @click="authInfo()"><i class="iconfont">&#xe606;</i>授权信息</li>
        <adressAuth ref="mychild" @refreshList="getuserInfo"></adressAuth>
         <authorizationEq  ref="mychild1" @refreshList="getuserInfo"  @clearselect="clear" v-if="hackReset" @reload="reloadcom"></authorizationEq>
         <singleAuth ref="mychild2" @refreshList="getuserInfo"  @clearselect="clear" v-if="hackReset" @reload="reloadcom"></singleAuth>
      
      </ul>
    </div>
    <div class="main-table devicelist" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">
       <el-tree
        :data="regionList"
        show-checkbox
        ref="address"
        node-key="id"
        :props="defaultProps"
        
        >
      </el-tree>
    </div>


  </div>
</template>

<script>
import adressAuth from "../../../components/adressAuth"
import singleAuth from "../../../components/singleAuth"
  export default {
    name: "EquipmentAuthorization",
    components:{
      adressAuth,
      singleAuth,
    },
    
    data() {
      return {
        regionList:[],
        pictLoading:true,
        userIdlist:[],
        manageScopeIdList:[],
        userlist:[],
        token:0,
          hackReset:true,
        url:"",
         defaultProps: {
          children: 'manageList',
          label: 'name'

        }
   
      }
    },
    mounted(){
       if(this.$store.state.userinfo.userLevel==2){
          this.$store.commit('saveIndex',"2-7")
         
           this.manageScopeIdList.push(this.$store.state.parame.parkid)
            this.token=2
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$store.commit('saveIndex',"3-7")
          this.manageScopeIdList.push(this.$store.state.parame.buildid)
            this.token=3
        }
         if(this.$store.state.userinfo.userLevel==4){
          this.$store.commit('saveIndex',"4-7")
          this.manageScopeIdList.push(this.$store.state.parame.floorid)
            this.token=4
        }
        if(this.$store.state.userinfo.userLevel==5){
          this.$store.commit('saveIndex',"5-3") 
           
        }
        this.getuserInfo()
     

    },
    methods: {
      // 房间管理员获取设备列表
      getequipmentlist(){
        var that=this; 
        
           var obj=[]
              var obj1= {
                id:that.$store.state.parame.roomid,
                addressId:that.$store.state.parame.roomaddressId
              };
              obj.push(obj1)
           var param={
            addressIdList:obj,
            action:2
           }
         
         that.axios.post("/SmartHomeTrade/device/getDeviceList",param).then((res)=>{
          that.pictLoading=false           
              if(res.data.data!=null){
                if(res.data.data.deviceList.length==0){
                   that.regionList=[]  
                }else{
                   var regionList=[{
                    name:that.$store.state.parame.roomname,
                   }];
                   regionList[0].manageList=res.data.data.deviceList   
                  that.regionList=regionList;
                  // that.clearBoth(res.data.data.deviceList)                 
                return
                }                
              }else{
                that.regionList=[]
                return
              }
            })
      },
       getuserInfo(){
        var that=this;
        if(that.$store.state.userinfo.userLevel==5){
          var param={
          createUser:that.$store.state.userinfo.userMobile,
          action:2
         }
         that.url="/SmartHomeTrade/appUser/selectDptUser"
         that.getequipmentlist()
         // return;
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
          that.pictLoading=false;
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
        // 刷新组件
       reloadcom(){
        this.hackReset = false
      this.$nextTick(() => {
      this.hackReset = true
      })
       },
       clear(){},
        // 授权
      add(){
        
        var that=this
         that.userIdlist=[]
         var listid=that.$refs.address.getCheckedKeys()

         if(listid.length==0){
          that.$message.warning("请选择授权区域")
          return;
         }else{
         var arr=listid.filter(element=>element!= null)       
         if(that.$store.state.userinfo.userLevel==5){
            var list=[]
            var list1=[]
            for(var i=0;i<that.regionList[0].manageList.length;i++){

              for(var j=0;j<arr.length;j++){
                if(arr[j]==that.regionList[0].manageList[i].id){
                   list.push({
                      id:that.regionList[0].manageList[i].id,
                      name:that.regionList[0].manageList[i].name,
                      deviceRoom:that.$store.state.parame.roomname,
                      roomId:that.$store.state.parame.roomid,
                    })
                   list1.push({
                      id:that.regionList[0].manageList[i].id,
                      name:that.regionList[0].manageList[i].name,
                      deviceRoom:that.$store.state.parame.roomname,
                      roomId:that.$store.state.parame.roomid,
                      blockId:that.regionList[0].manageList[i].blockId
                    })
                }
              }
            }
            if(list1.length==1){             
                 var deviceparam={
                id:list1[0].id,
                 name:list1[0].name,
                 roomName:list1[0].deviceRoom,
                 roomId:list1[0].roomId,
                 blockId:list1[0].blockId   
                }
              that.$refs.mychild1.getAuthrization(deviceparam);

            }else{




              
               that.$refs.mychild.getAuthrization(list,that.userlist); 
            }
                      
          }else if(that.$store.state.userinfo.userLevel==2){
            // var nodelist=that.$refs.tree.getCheckedNodes()
            // debugger

            var list=[]
            var buildlist=[]
            for(var i=0;i<that.regionList.length;i++){
                for(var j=0;j<that.regionList[i].manageList.length;j++){
                  for(var e=0;e<that.regionList[i].manageList[j].manageList.length;e++){
                    for(var h=0;h<that.regionList[i].manageList[j].manageList[e].manageList.length;h++){
                      for(var f=0;f<arr.length;f++){
                        if(arr[f]==that.regionList[i].manageList[j].manageList[e].manageList[h].id){
                           list.push({
                              id:that.regionList[i].manageList[j].manageList[e].manageList[h].id,
                              name:that.regionList[i].manageList[j].manageList[e].manageList[h].name,
                              deviceRoom:that.regionList[i].manageList[j].manageList[e].manageList[h].inAddress,
                              roomId:that.regionList[i].manageList[j].manageList[e].manageList[h].roomId,
                              addressId:that.regionList[i].manageList[j].manageList[e].manageList[h].addressId

                            })
                            buildlist.push(that.regionList[i].buildingId)
                         }
                     }
                    }
                  }  
                }
              }
               var blockIdList=buildlist.filter((element,index,self)=>self.indexOf(element) === index)
               debugger

              if(list.length==1){
                var param={
                   id:list[0].id,
                 name:list[0].name,
                 roomName:list[0].deviceRoom,
                 roomId:list[0].roomId,
                 // addressId:list[0].addressId,
                }
                that.$refs.mychild2.getAuthrization(param,that.userlist,blockIdList);
              

              }else{

               
                that.$refs.mychild.getAuthrization(list,that.userlist,blockIdList);
              }
              
              
             
          }else if(that.$store.state.userinfo.userLevel==3){

            var list=[]
            for(var i=0;i<that.regionList.length;i++){
                for(var j=0;j<that.regionList[i].manageList.length;j++){
                  for(var e=0;e<that.regionList[i].manageList[j].manageList.length;e++){
                      for(var f=0;f<arr.length;f++){
                        if(arr[f]==that.regionList[i].manageList[j].manageList[e].id){
                           list.push({
                              id:that.regionList[i].manageList[j].manageList[e].id,
                              name:that.regionList[i].manageList[j].manageList[e].name,
                              deviceRoom:that.regionList[i].manageList[j].manageList[e].inAddress,
                              roomId:that.regionList[i].manageList[j].manageList[e].roomId,
                            })
                         }
                     }
                  }  
                }
              }
              var blockIdList=[]
              if(list.length==1){
                var param={
                   id:list[0].id,
                 name:list[0].name,
                 roomName:list[0].deviceRoom,
                 roomId:list[0].roomId,
                }
                
                that.$refs.mychild2.getAuthrization(param,that.userlist,blockIdList);
              

              }else{
                
                that.$refs.mychild.getAuthrization(list,that.userlist,blockIdList);
              }
          }
          else if(that.$store.state.userinfo.userLevel==4){
            var list=[]

            for(var i=0;i<that.regionList.length;i++){
                for(var j=0;j<that.regionList[i].manageList.length;j++){
                 
                      for(var f=0;f<arr.length;f++){
                        if(arr[f]==that.regionList[i].manageList[j].id){
                           list.push({
                              id:that.regionList[i].manageList[j].id,
                              name:that.regionList[i].manageList[j].name,
                              deviceRoom:that.regionList[i].manageList[j].inAddress,
                              roomId:that.regionList[i].manageList[j].roomId,
                            })
                         }
                     }
                }               
              }
               var blockIdList=[]
              if(list.length==1){
                var param={
                   id:list[0].id,
                 name:list[0].name,
                 roomName:list[0].deviceRoom,
                 roomId:list[0].roomId,
                }
                
                that.$refs.mychild2.getAuthrization(param,that.userlist,blockIdList);
              

              }else{
                
                that.$refs.mychild.getAuthrization(list,that.userlist,blockIdList);
              }
          }

            
          
           
       
        
           
         }
           
        
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






    },
  }
</script>

<style scoped>
.outlook{
  position: relative !important;

}
.devicelist{
  height: 400px;
  overflow:hidden;
  overflow-y:auto;
}
.look{
  overflow-y: scroll;
  height:200px;
 position: absolute !important;
 /*left:850px !important;*/
 /*top:-50px !important;*/

}
</style>
