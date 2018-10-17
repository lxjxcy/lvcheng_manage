<template>
	<div class="lookDeviceInfo">
		<el-dialog
		  title="授权设备"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		 		<div class="dialogwidth">
		 			<el-tree
						  :data="userDcRequest"
						  node-key="key"
						  ref="tree"
						  :props="defaultProps">
			     </el-tree>
		 		</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>



<script>
  export default {
  	name:"lookDeviceInfo",
    data() {
      return {
        dialogVisible: false,
         userDcRequest:[],
         defaultProps: {
	         	 children: 'childen',
		          label: 'roomName'
		        },
      };
    },
    methods: {
    	opendialog(e){
    		var that=this;
    		that.dialogVisible=true;
    		var result = [];
					     var obj = {};
					   for(var i =0; i<e.userDcRequest.length; i++){
					      if(!obj[e.userDcRequest[i].roomId]){
					        result.push(e.userDcRequest[i]);
					        obj[e.userDcRequest[i].roomId] = true;
					     }
					  }		          	   
		          		for(var j=0;j<result.length;j++){
		          			 var result2 = [];
		          			for(var i=0;i<e.userDcRequest.length;i++){
		          				if(e.userDcRequest[i].roomId==result[j].roomId){
		          					result2.push({
		          						key:e.userDcRequest[i].deviceId,
		          						roomName:e.userDcRequest[i].deviceName
		          					})
		          					result[j]["childen"]=result2;
		          				}
		          			}
		          			
		          		}
		          		that.userDcRequest=result
    	},
      handleClose(done) {
       
            done();
        
      }
    }
  };
</script>