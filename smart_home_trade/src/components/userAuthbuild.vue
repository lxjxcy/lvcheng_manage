<template>
	<div class="userAuthbuild">
		<el-dialog
		  title="用户授权"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">
		   <el-tree
	        :data="addresslist"
	        show-checkbox
	        ref="addresslist"
	         default-expand-all

	       
	        node-key="blockId"
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
			  addresslist:[],
			  ucUserIdList:[],
			   defaultProps: {
		          children: 'children',
		          label: 'deviceBlock'
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
			var param={
            yardId:that.$store.state.parame.parkid,
            action:2
           } 
			 that.axios.post("/SmartHomeTrade/device/yardAdUserDeviceList",param).then((res)=>{
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
		},
		      // 去重
      clearBoth(data){
        var that=this
          var result = [], hash = {}, hashs = {}
          for (var i = 0; i<data.length; i++) {          
             var elem_ = data[i].blockId; 
              if (!hash[elem_]) {
                  if (!hashs[elem_]) {
                      result.push(data[i]);
                      hashs[elem_] = true;
                  };
                  hash[elem_] = true;
              }
          }                     
           var addresslist=[{
               deviceBlock:that.$store.state.parame.parkname,
             }];
          addresslist[0].children=result   
           that.addresslist=addresslist;
      },


	
// 提交
		sureadddialog(){			
			var that=this;
			
			var list=this.$refs.addresslist.getCheckedKeys()
			if(list.length==0){
	          that.$message.warning("请选择授权区域")
	          return;
	         }

			 var arr=list.filter((element)=> String(element))
			 var arr=list.filter(element=>element!= null)
		

             var param={
             	blockIdList:arr,
             	ucUserIdList:that.ucUserIdList,
             	token:3,
             	createUser:that.$store.state.userinfo.userMobile,
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