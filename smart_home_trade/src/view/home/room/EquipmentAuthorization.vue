<template>
  <div class="EquipmentAuthorization">

    <div class="nav-middle" style="margin-top: 10px;">
      <ul>
        <li class="l" @click="add()" ><i class="iconfont">&#xe637;</i>授权</li>
        <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1"><i class="iconfont" -->
         <li class="l" @click="authInfo()"><i class="iconfont">&#xe606;</i>授权信息</li>
        <adressAuth ref="mychild" @refreshList="getequipmentlist"></adressAuth>
      
      </ul>
    </div>
    <div class="main-table">
       <el-tree
        :data="addresslist"
        show-checkbox
        ref="address"
        node-key="blockId"
        :props="defaultProps"
        v-if="this.$store.state.userinfo.userLevel==2"
        >
      </el-tree>
       <el-tree
        :data="addresslist"
        show-checkbox
        ref="address"
        node-key="floorId"
        :props="defaultProps"
         v-if="this.$store.state.userinfo.userLevel==3"
        >
      </el-tree>
       <el-tree
        :data="addresslist"
        show-checkbox
        ref="address"
        node-key="roomId"
        :props="defaultProps"
         v-if="this.$store.state.userinfo.userLevel==4"
        >
      </el-tree>
       <el-tree
        :data="addresslist"
        show-checkbox
        ref="address"
        node-key="id"
        :props="defaultProps"
         v-if="this.$store.state.userinfo.userLevel==5"
        >
      </el-tree>
    </div>


  </div>
</template>

<script>
import adressAuth from "../../../components/adressAuth"
  export default {
    name: "EquipmentAuthorization",
    components:{
      adressAuth
    },
    
    data() {
      return {
        addresslist:[],
        
        url:"",
         defaultProps: {
          children: 'children',
          label: 'deviceBlock'

        }
   
      }
    },
    mounted(){
       if(this.$store.state.userinfo.userLevel==2){
          this.$store.commit('saveIndex',"2-7")
         
          this.defaultProps.label="deviceBlock"
           this.url="/SmartHomeTrade/device/yardAdUserDeviceList"
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$store.commit('saveIndex',"3-7")
          this.url="/SmartHomeTrade/device/blockAdUserDeviceList"
         
           this.defaultProps.label="deviceFloor"
        }
         if(this.$store.state.userinfo.userLevel==4){
          this.$store.commit('saveIndex',"4-7")
          this.url="/SmartHomeTrade/device/floorAdUserDeviceList"
        
           this.defaultProps.label="deviceRoom"
        }
          if(this.$store.state.userinfo.userLevel==5){
          this.$store.commit('saveIndex',"5-3")
          this.url="/SmartHomeTrade/device/getDeviceList"
         
           this.defaultProps.label="name"
        }
      this.getequipmentlist()

    },
    methods: {
      getequipmentlist(){
        var that=this; 
         if(that.$store.state.userinfo.userLevel==2){
          var param={
            yardId:that.$store.state.parame.parkid,
            action:2
           }  
         }
         if(that.$store.state.userinfo.userLevel==3){
           var param={
             blockId:that.$store.state.parame.buildid,
            action:2
           } 
         }
         if(that.$store.state.userinfo.userLevel==4){
           var param={
            floorId:that.$store.state.parame.floorid,
            addressId:that.$store.state.parame.flooraddressId,
            action:2
           }

                      
         }
         if(that.$store.state.userinfo.userLevel==5){
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
         }

         that.axios.post(that.url,param).then((res)=>{
              console.log(res)
              if(res.data.data!=null){
                if(res.data.data.deviceList.length==0){
                   that.addresslist=[]  
                    debugger
                }else{
                  that.clearBoth(res.data.data.deviceList)                 
                return
                }                
              }else{
                that.addresslist=[]
                return
              }
            })     





         // debugger         
      },
      // 去重
      clearBoth(data){
        var that=this
          var result = [], hash = {}, hashs = {}
          for (var i = 0; i<data.length; i++) {
            if(that.$store.state.userinfo.userLevel==2){
             var elem_ = data[i].blockId; 
             
            }
            if(that.$store.state.userinfo.userLevel==3){
             var elem_ = data[i].floorId; 
             
            }
            if(that.$store.state.userinfo.userLevel==4){
             var elem_ = data[i].roomId; 
             
            }
            if(that.$store.state.userinfo.userLevel==5){
             var elem_ = data[i].hostId; 
             
            }
             
              // var elem_ = data[i].blockId; 
              if (!hash[elem_]) {
                  if (!hashs[elem_]) {
                      result.push(data[i]);
                      hashs[elem_] = true;
                  };
                  hash[elem_] = true;
              }
          }



          console.log(result)
          if(that.$store.state.userinfo.userLevel==2){    
              var addresslist=[{
              deviceBlock:that.$store.state.parame.parkname,
             }];
            }
            if(that.$store.state.userinfo.userLevel==3){
            
              var addresslist=[{
              deviceFloor:that.$store.state.parame.buildname,
             }];
            }
            if(that.$store.state.userinfo.userLevel==4){
            
              var addresslist=[{
              deviceRoom:that.$store.state.parame.floorname,
             }];
            }
            if(that.$store.state.userinfo.userLevel==5){
             
              var addresslist=[{
              name:that.$store.state.parame.roomname,
             }];
            }
         

          addresslist[0].children=result   
           that.addresslist=addresslist;
         
           debugger
          

        

        // that.addresslist=result
   

      },

        // 授权
      add(){
        var that=this
         var listid=that.$refs.address.getCheckedKeys()
         if(listid.length==0){
          that.$message.warning("请选择授权区域")
         }else{
         var arr=listid.filter(element=>element!= null)
         if(that.$store.state.userinfo.userLevel==5){

         
            var list=[]
            var listname=that.$refs.address.getCheckedNodes()
            
          
            for(var i=0;i<listname[0].children.length;i++){
              list.push({
                id:listname[0].children[i].id,
                name:listname[0].children[i].name,
                deviceRoom:that.$store.state.parame.roomname,
                roomId:that.$store.state.parame.roomid,

              })
            }


            that.$refs.mychild.getAuthrization(list);
           
            
             
          }else{
            that.$refs.mychild.getAuthrization(arr);
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
.look{
  overflow-y: scroll;
  height:200px;
 position: absolute !important;
 /*left:850px !important;*/
 /*top:-50px !important;*/

}
</style>
