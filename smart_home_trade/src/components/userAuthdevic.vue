<template>
	<div class="userAuthdevic">
		<el-dialog
		  title="用户授权"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain" v-loading="pictLoading" element-loading-background="#fff"
         element-loading-text="加载数据中......">
		   <el-tree
	        :data="addresslist"
	        show-checkbox
	        ref="addresslist"
	        default-expand-all
	        node-key="id"
	        empty-text="该房间下没有设备"
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
	name:"userAuthdevic",
	data(){
		return{
			opendialog:false,
			 fullscreenLoading:false,
			 pictLoading:true,
			  addresslist:[],

			  ucUserIdList:[],
			   defaultProps: {
		          children: 'children',
		          label: 'name'
		        }
		}
	},
	mounted(){	

	},
	methods:{
		 // 区域授权弹框
		getAuthrization(e){
          this.ucUserIdList=e;
			this.opendialog=true;
			this.getaddress()
		},
		getaddress(){
			var that=this
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
			 	this.pictLoading=false;
             
              if(res.data.data!=null){
                if(res.data.data.deviceList.length==0){
                   that.addresslist=[]  
                 
                }else{
                  that.clearBoth(res.data.data.deviceList)                 
                return
                }                
              }else{
                that.addresslist=[]
                return
              }
            })     
		},
		      // 去重
      clearBoth(data){
        var that=this
                       
          var addresslist=[{
              name:that.$store.state.parame.roomname,
             }];
          addresslist[0].children=data   
           that.addresslist=addresslist;
      },


	
// 提交
		sureadddialog(){			
			var that=this;
			 var list=[]
			 var listid=that.$refs.addresslist.getCheckedKeys()
			  var arr=listid.filter(element=>element!= null)
            // var listname=that.$refs.addresslist.getCheckedNodes()

          
          if(arr.length!=0){

          	  for(var i=0;i<that.addresslist[0].children.length;i++){
              for(var j=0;j<arr.length;j++){
                if(arr[j]==that.addresslist[0].children[i].id){
                   list.push({
                      id:that.addresslist[0].children[i].id,
                      name:that.addresslist[0].children[i].name,
                      deviceRoom:that.$store.state.parame.roomname,
                      roomId:that.$store.state.parame.roomid,
                    })
                }
              }
            }

	          //   for(var i=0;i<listname[0].children.length;i++){
	          //     list.push({
	          //       id:listname[0].children[i].id,
	          //       name:listname[0].children[i].name,
	          //       deviceRoom:that.$store.state.parame.roomname,
	          //       roomId:that.$store.state.parame.roomid,

	          //     })
	          // }

          }else{

          that.$message.warning("请选择授权设备")
          return;
       

          }

            var param={
             	deviceList:list,
             	ucUserIdList:that.ucUserIdList,
             	token:6,             	
             	createUser:that.$store.state.userinfo.userMobile,
             	executeUser:that.$store.state.userinfo.name,
                createUserMobile:that.$store.state.userinfo.createUser,
             }
              that.fullscreenLoading=true;
            that.axios.post("/SmartHomeTrade/appUser/authDeviceAppUser",param).then(res=>{
            	that.fullscreenLoading=false;
            	if(res.data.code==0){
            		that.$emit('refreshList');
            		that.opendialog=false;
            		that.$message.success(res.data.message)

            	}else{
            		that.$message.error(res.data.message)
            	}
            })




			
			  // var deviceIdName=[];


		
		
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