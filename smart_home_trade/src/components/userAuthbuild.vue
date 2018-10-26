<template>
	<div class="userAuthbuild">
		<el-dialog
		  title="授权设备"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">
		   <el-tree
	        :data="regionList"
	        show-checkbox
	        ref="addresslist"
	       empty-text="该园区下没有设备"
	        node-key="id"
          :default-checked-keys="checkIdList"
	        :props="defaultProps"
	        >
	      </el-tree>		  
			   
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sureadddialog()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
		  </span>
	  </el-dialog>		
	</div>
</template>
<script>
export default{
	name:"userAuthbuild",
	data(){
		return{
			opendialog:false,
			 fullscreenLoading:false,
			 pictLoading:true,
			  regionList:[],
          checkIdList:[],
			  ucUserIdList:[],
			   defaultProps: {
		          children: 'manageList',
		          label: 'name'
		        }
		}
	},
	mounted(){	

	},
	methods:{
		 // 区域授权弹框
		getAuthrization(e,regionList){
      var that=this;
          that.ucUserIdList=e;
          if(that.ucUserIdList.length==1){
            that.axios.post("/SmartHomeTrade/appUser/selectRoomAndUser",{
              token:2,
              ucUserId:that.ucUserIdList[0],
            }).then(res=>{
              if(res.data.code==0){
                that.pictLoading=false;
                console.log(res.data.data)
                
                if(JSON.stringify(res.data.data)== "{}"){
                  var regionList1=regionList;
                  that.checkIdList=[];
                  that.regionList=regionList1;
                  return;
                }else{
                  var regionList1=regionList;

                  that.checkIdList=res.data.data.authDeviceList;
                    for(var i=0;i<regionList1.length;i++){
                      for(var j=0;j<regionList1[i].manageList.length;j++){
                        for(var e=0;e<regionList1[i].manageList[j].manageList.length;e++){
                          for(var h=0;h<regionList1[i].manageList[j].manageList[e].manageList.length;h++){
                            for(var f=0;f<res.data.data.authDeviceList.length;f++){
                              if(res.data.data.authDeviceList[f]==regionList1[i].manageList[j].manageList[e].manageList[h].id){
                                  regionList1[i].manageList[j].manageList[e].manageList[h].disabled=true;
                               }
                           }
                          }
                        }  
                      }
                    }
                     that.regionList=regionList1;

                }
              }

            })
          }
         
         
          // this.pictLoading=true;
			that.opendialog=true;
			// this.getaddress()
		},



	
// 提交
		sureadddialog(){	

			var that=this;

         var listid=that.$refs.addresslist.getCheckedKeys()

         if(listid.length==0){
          that.$message.warning("请选择授权的设备")
          return;
         }else{

         var arr=listid.filter(element=>element!= null)
        var q=that.checkIdList
         debugger
          for(var i=0;i<arr.length;i++){
            for(var j=0;j<that.checkIdList.length;j++){
              if(arr[i]==that.checkIdList[j]){
                 arr.splice(i, 1)
              }

            }
          }
         
          if(arr.length==0&&that.checkIdList.length!=0){
             
           that.$emit('refreshList');
           // that.$emit('reload');
          that.opendialog=false;
          return;
        }   



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
                              addressId:that.regionList[i].manageList[j].manageList[e].manageList[h].addressId,
                            })
                           buildlist.push(that.regionList[i].buildingId)

                         }
                     }
                    }
                  }  
                }
              }
              var blockIdList=buildlist.filter((element,index,self)=>self.indexOf(element) === index)

               var param={
               	action:2,
             	deviceList:list,
             	ucUserIdList:that.ucUserIdList,
             	token:6,             	
             	createUser:that.$store.state.userinfo.userMobile,
             	blockIdList:blockIdList,

             }
              that.fullscreenLoading=true;
            that.axios.post("/SmartHomeTrade/appUser/authDeviceAppUser",param).then(res=>{
            	that.fullscreenLoading=false;
            	if(res.data.code==0){
            		that.$emit('refreshList');
            		that.opendialog=false;
                 that.$emit('reload');
            		that.$message.success(res.data.message)

            	}else{
            		that.$message.error(res.data.message)
            	}
            })



       }

			
			// var list=this.$refs.addresslist.getCheckedKeys()
			// if(list.length==0){
	  //         that.$message.warning("请选择授权区域")
	  //         return;
	  //        }

			//  var arr=list.filter((element)=> String(element))
			//  var arr=list.filter(element=>element!= null)
		

   //           var param={
   //           	blockIdList:arr,
   //           	ucUserIdList:that.ucUserIdList,
   //           	token:3,
   //           	createUser:that.$store.state.userinfo.userMobile,
   //           }

   //          that.fullscreenLoading=true;
   //          that.axios.post("/SmartHomeTrade/appUser/authDeviceAppUser",param).then(res=>{
   //          	that.fullscreenLoading=false;
   //          	if(res.data.code==0){
   //          		that.$emit('refreshList');
   //          		that.opendialog=false;
   //          		that.$message.success(res.data.message)

   //          	}else{
   //          		that.$message.error(res.data.message)
   //          	}
   //          })

		
		},
		handleClose(done) {
            done();
            this.$emit('refreshList');
      }
	}

}

	
</script>
<style scoped>
	.modelContain{

     height: 350px;
    overflow:hidden;
    overflow-y:auto;

}
</style>