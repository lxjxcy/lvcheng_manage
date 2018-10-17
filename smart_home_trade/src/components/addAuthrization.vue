<template>
	<div class="addAuthrization">

		<el-dialog
		  title="用户授权"
		  :visible.sync="opendialog"
		  width="30%"
		  :before-close="handleClose">
		  <div class="modelContain">		  
			     <div class="selectUser bodersel" v-if="sectionlist!=[]">
			     	<span>请选择设备</span>
					<el-tree
					  :data="datalist"
					  show-checkbox
					  default-expand-all
					  node-key="key"
					  ref="tre"
					  highlight-current
					  :props="defaultProp">
					</el-tree>
			    </div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sureadddialog()"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
		  </span>
	  </el-dialog>		
	</div>
</template>
<script>
export default{
	name:"addAuthrization",
	data(){
		return{
			opendialog:false,//弹框
			 fullscreenLoading:false,//提交加载
			 input:'',
			sectionlist:[],//部门信息
			  datalist:[],       // 设备信息
		     defaultProp: {
		          children: 'childen',
		          label: 'roomName'
		    }
		}
	},
	mounted(){

			
	},
	methods:{
		// 获取设备信息
		getEqinfo(){
			var that=this;
           var obj=[]
              var obj1= {
                id:that.$store.state.parame.roomid,
                addressId:that.$store.state.parame.roomaddressId
              };
              obj.push(obj1)
			var param={
				action:2,
				addressIdList:obj
			}	
			that.axios.post("/SmartHomeTrade/device/getDeviceList",param).then(function(res){
			    if(res.data.code==0){
		          	var result = [];
					var obj = {};
					for(var i =0; i<res.data.data.deviceList.length; i++){
					      if(!obj[res.data.data.deviceList[i].roomId]){
					        result.push(res.data.data.deviceList[i]);
					        obj[res.data.data.deviceList[i].roomId] = true;
					     }
					}
		          	   	   
		            for(var j=0;j<result.length;j++){
		          	    var result2 = [];
		          		for(var i=0;i<res.data.data.deviceList.length;i++){
	          				if(res.data.data.deviceList[i].roomId==result[j].roomId){
	          					result2.push({
	          						key:res.data.data.deviceList[i].id,
	          						roomName:res.data.data.deviceList[i].name,
	          						room_name:res.data.data.deviceList[i].roomName
	          					})
	          					result[j]["childen"]=result2;
	          				}
		          		}
		          			
		            }	
		            that.datalist=result;
		        }				
			})
		},

     // 添加授权弹框
		getAuthrization(){
			this.opendialog=true;
			this.getEqinfo()
		},		
		// 提交
		sureadddialog(){			
			var that=this;
			var listsheb=this.$refs.tre.getCheckedNodes();
			if(listsheb.length==0){
				that.$message.warning("请选择设备")
				return
			}
			
			 var ucUserIdLists=[];
			

		},




		// // 创建部门
		// createDepart(){
		// 	 this.$refs.mycreatechild.opendialogVisible();
		// },
		handleClose(done) {
            done();
           

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
.single{
	margin-right:10px;
	margin-bottom: 10px;

}
.mult{
	margin:10px;
	margin-left:0;
}
.create-department{
	display: inline-block;
	color:#fff;
	padding:3px 10px;
	background: #00ae89;
	cursor: pointer;
	margin-left: 15px;
}
.modelContain{
	padding-left: 10px;
}
.bodersel{
	border-top:1px solid #ccc;
}

</style>