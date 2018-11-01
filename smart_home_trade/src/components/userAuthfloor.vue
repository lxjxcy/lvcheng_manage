<template>
	<div class="userAuthfloor">
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
	         :default-checked-keys="checkIdList"
	           
	        node-key="id"
	        empty-text="该大楼下没有设备"
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
	name:"userAuthfloor",
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
                         
                            for(var f=0;f<res.data.data.authDeviceList.length;f++){
                              if(res.data.data.authDeviceList[f]==regionList1[i].manageList[j].manageList[e].id){
                                  regionList1[i].manageList[j].manageList[e].disabled=true;
                               }
                           }
                          
                        }  
                      }
                    }
                     that.regionList=regionList1;

                }
              }

            })
          }else{
             that.regionList=regionList;
             that.pictLoading=false;
          }

           // that.regionList=regionList;
			that.opendialog=true;
			
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
          // var arr=listid.filter(element=>element!= null)
        // var q=that.checkIdList
          for(var i=0;i<arr.length;i++){
            for(var j=0;j<that.checkIdList.length;j++){
              if(arr[i]==that.checkIdList[j]){
                 arr.splice(i, 1)
              }

            }
          }
          // debugger
          if(arr.length==0&&that.checkIdList.length!=0){
             
           that.$emit('refreshList');
           // that.$emit('reload');
          that.opendialog=false;
          return;
        }   

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

               var param={
             	deviceList:list,
             	ucUserIdList:that.ucUserIdList,
             	token:6,             	
             	createUser:that.$store.state.userinfo.userMobile,
             }
              that.fullscreenLoading=true;
            that.axios.post("/SmartHomeTrade/appUser/authDeviceAppUser",param).then(res=>{
            	that.fullscreenLoading=false;
            	if(res.data.code==0){
            		that.$emit('refreshList');
                that.$emit('reload');
            		that.opendialog=false;
            		that.$message.success(res.data.message)

            	}else{
            		that.$message.error(res.data.message)
            	}
            })



       }

		
		},
		handleClose(done) {
            done();
             this.$emit('reload');
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