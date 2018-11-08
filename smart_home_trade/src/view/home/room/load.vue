<template>
	<div class="load">
		<el-dialog
		  title="导入app用户"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="model-conent" style="padding-right: 10%">	
		 


			 <el-form label-width="100px" :model="addB" ref="addB" :rules="ruleValidate">
			 	<!--  <li class="l" >
            </i>下载模板</li> -->
          		<!-- <el-form-item >
          			<el-button @click="exportdata()">下载模板</el-button>		
	                
	            </el-form-item> -->
	             <div style="font-size: 12px;margin:10px 0"><span style="width:100px;display: inline-block;text-align: right">
	             	<span style="color: red">*</span>
	             提示：</span>只能上传.xls文件,且文件不能为空</div>
			 	<el-form-item label="文件"
			 	 :rules="[
			      { required: true, message: '文件不能为空', },
			    
			    ]" 
			 	>
			 		<!-- <el-checkbox-group v-model="fileList"></el-checkbox-group> -->
			 		 <el-upload
						  class="upload-demo"
						  ref="upload"
						  action="acddd"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :file-list="fileList"
						  :before-remove="beforeRemove"
						  :before-upload="beforeUpload"
						  :on-exceed="handleExceed"
			              :limit="1"
						  :auto-upload="false"
						 >
						  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						   <el-button  size="small" type="primary" @click="exportdata()" style="margin-left:10%;">下载模板</el-button>						 
						</el-upload>
			 		
			 	</el-form-item>
	           <!--   <el-form-item label="所属部门" prop="name" >
	                <el-select v-model="addB.name" placeholder="请选择部门" @change="getUserLevel">
	                  <el-option
	                    v-for="item in dptList"
	                    :key="item.dptId"
	                    :label="item.name"
	                    :value="item.dptId">
	                  </el-option>
	                </el-select>
	            </el-form-item> -->
	             <el-form-item label="所属大楼" prop="buildingName" v-if="this.$store.state.userinfo.userLevel==2">
                <el-select v-model="addB.buildingName" placeholder="请选择大楼" @change="getBuildId" style="width:100%">
                  <el-option
                    v-for="item in blockList"
                    :key="item.buildingId"
                    :label="item.buildingName"
                    :value="item.buildingId">
                  </el-option>
                </el-select>
              </el-form-item>

	             <el-form-item label="可见用户" v-if="this.$store.state.userinfo.userLevel!=5">
	               <el-select
					    v-model="addB.authCreateUser"
					    multiple
					    collapse-tags
					    placeholder="请选择用户"  style="width:100%">
					    <el-option
					      v-for="item in listNextAdmin"
					      :key="item.userMobile"
					      :label="item.name"
					      :value="item.userMobile">
					    </el-option>
					</el-select>
	          </el-form-item>    
            </el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitUpload('addB')" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
		  </span>
		</el-dialog>

		
	</div>
</template>
<script>
	export default{
		name:"load",
		data(){
			return{
				dialogVisible:false,
				fullscreenLoading:false,
				 fileList: [],
				 addB:{
				 	name:"",
				 	Dname:"",
				 	authCreateUser:null,				 	
				 	userAddressId:"",
				 	buildingName:"",
				 	roomId:"",
				 	departmentId:"",
				 	 createUser:'',
				 },
				 parkAddress:"",
				 parkBuildname:"",
				  blockList:[],
				 listNextAdmin:[],
				 dptList:[],
				 ruleValidate: {
			          buildingName: [
			            { required: true,message: '部门不能为空' }
			          ],
			          
			      },
			
		     
				 yardsList:[{
				 	yardId:1,
				 	yardName:111111,

				 },
				 {
				 	yardId:2,
				 	yardName:22222,

				 },
				 {
				 	yardId:3,
				 	yardName:3333,

				 }]
			}
		},
		methods:{
			openDia(){
				var that=this
				that.dialogVisible=true;
				that.addB.createUser=that.$store.state.userinfo.userMobile,
				// 部门
				that.axios.post("/SmartHomeTrade/department/selectDepartmentByMobile",{
			          createUser:that.$store.state.userinfo.userMobile,
			        }).then(function(res){
			        	if(res.data.code==0){
			        		that.dptList=res.data.data.dptList
			        	}
			        })
			         // 获取用户
			          if(that.$store.state.userinfo.userLevel==2){
			          	var beScopeId=that.$store.state.parame.parkid;
			          }
			          if(that.$store.state.userinfo.userLevel==3){
			          	var beScopeId=that.$store.state.parame.buildid;
			          }
			          if(that.$store.state.userinfo.userLevel==4){
			          	var beScopeId=that.$store.state.parame.floorid;
			          }
				       var userParams={
				       	createUser:that.$store.state.userinfo.userMobile,
				       	beScopeId:beScopeId,
				       	 token:2,
				       }
				        that.axios.post("/SmartHomeTrade/user/selectNextAdmin",userParams).then(function (res) {
			              
			              if(res.data.code==0){
			                if(res.data.data!=null){
			                   that.listNextAdmin =res.data.data.listNextAdmin;		                   
			             
			                }

			              }else{
			                that.$message.error(res.data.message)
			              } 
			            })	    	

			     

			        if(that.$store.state.userinfo.userLevel==2){
	    			var list=[]
	    		    list.push(that.$store.state.parame.parkid);
		    		var param={
		    			noPage:1,
		    			yardIdList:list,
		    			action:1,
		    		}
		    		 that.axios.post("/SmartHomeTrade/block/selectBlockCount",param).then(function(res){
		    		 	if(res.data.code==0){
		    		 		that.blockList=res.data.data.blockList;
		    		 	}
		    		 })

	    		}




			},
			 handleClose(done) {
			  this.$emit('refreshList');	            	
             
              // this.resetlo("addB")
               this.$emit('reload');
			  this.listNextAdmin=[]
			   done();
            },

            getBuildId(value){
	    		this.parkAddress=value;
	    		for(var i=0;i<this.blockList.length;i++){
	    			if(this.blockList[i].buildingId==value){
	    				this.parkBuildname=this.blockList[i].addressInfo

	    			}
	    		}

	    		
	    	},
           // 获取部门信息
	      // getUserLevel(e){
	
	      
	      // 	var that=this;
	      // 	that.addB.departmentId=e;
	      // 	for(var i=0;i<that.dptList.length;i++){
	      // 		if(that.dptList[i].dptId==e){
	      // 			that.addB.userAddressId=that.dptList[i].addressId
	      // 			that.addB.roomId=that.dptList[i].roomId,
	      // 			that.addB.Dname=that.dptList[i].name
	      // 		}
	      // 	}


	      // },
	      // 下载摸版
    exportdata() {
      this.axios.get('/SmartHomeTrade/user/downloadTemplate',{responseType: 'blob'}).then((res) => {

                  let fileName = 'appUserInfo.xls'
                  let blob = new Blob([res.data], { type: 'application/x-xls' })
                    if (window.navigator.msSaveOrOpenBlob) {
                      navigator.msSaveBlob(blob, fileName);
                    } else {
                      var link = document.createElement('a');
                      link.href = window.URL.createObjectURL(blob);
                      link.download = fileName;
                      link.click();
                      window.URL.revokeObjectURL(link.href);
                    }
              })
  },
             submitUpload(addB) {
              	     	var that=this;
	      	that.$refs[addB].validate((valid) => {
		           if (valid) {
		          	 that.$refs.upload.submit();
		          } else {
		           
		            return false;
		          }
		        });
		       
		      },
		      handleRemove(file, fileList) {
		      	this.fileList=[]

		       

		      },
		      handlePreview(file) {
		      	this.fileList=["1"]
		       


		      },
		      beforeUpload(file){
		      
		      	var that=this;
		      	// const isxls=file.type=='application/x-xls'
		      	// if(!isxls){
		      	// 	that.$message.error("文件格式不正确")
		      	// 	return;
		      	// }

		      	that.fullscreenLoading=true;
		      	  let fd = new FormData();
		      	  // if(file==""){
		      	 //  // 	that.$message.error("请选择文件")
		      	 //   if(this.$store.state.userinfo.userLevel==1){
			       //   this.formSearch.beScopeId=null;
			       // }
			        if(that.$store.state.userinfo.userLevel==2){
			           var userAddressId=that.parkAddress;
			          var adrScope=that.parkBuildname
			       }
			        if(that.$store.state.userinfo.userLevel==3){
			           var userAddressId=that.$store.state.parame.buildid;
			           var adrScope=that.$store.state.parame.allAddress
			       }
			        if(that.$store.state.userinfo.userLevel==4){
			           var userAddressId=that.$store.state.parame.flooraddressId;
			           var  adrScope= that.$store.state.parame.building_floorName
			       }
			       if(that.$store.state.userinfo.userLevel==5){
			           var userAddressId=that.$store.state.parame.roomaddressId;
			           var  adrScope= that.$store.state.parame.inAddress
			       }


		      	  // }
				    fd.append('file',file);//传文件
				    fd.append('authCreateUser',that.addB.authCreateUser);
				    
				    fd.append('action',"2");
				    fd.append('dptAdrScope',adrScope);
				    fd.append('userAddressId',userAddressId);
				    // fd.append('departmentId',that.addB.departmentId);
				    fd.append('createUser',that.addB.createUser);
				     fd.append('executeUser',that.$store.state.userinfo.name);
				    fd.append('createUserMobile',that.$store.state.userinfo.createUser);
				    that.axios.post('/SmartHomeTrade/user/batchimportUser',fd).then(function(res){
				    	that.fullscreenLoading=false;
				            if(res.data.code==0){
				            	
				            	that.$message.success(res.data.message)
				            	 that.$emit('refreshList');
				            	that.dialogVisible=false;
				            	// that.resetlo("addB")
				            	that.$emit('reload');
				            	that.listNextAdmin=[]
				            }else{
				            	that.$message.error(res.data.message)

				            }
				    })
				},
		      handleExceed(files, fileList) {
		      	
		        this.$message.warning(`当前限制选择 1个文件`);
		      },
		      beforeRemove(file, fileList) {
		        return this.$confirm(`确定移除 ${ file.name }？`);
		      },
		      getparkInfo(){

		      },

		}
	}
</script>
<style scoped>
el-upload-list__item is-ready{
	background-color: #fff !important;
}
.model-conent{

   padding-right: 53px;
     height: 300px;
    overflow:hidden;
    overflow-y:auto;
}
	
</style>