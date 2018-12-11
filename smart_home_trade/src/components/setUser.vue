<template>
	<div class="setUser">
		    <el-dialog
              title="设置管理员"
              :visible.sync="administrator"
              width="37%"
              :before-close="handleClose"
            >
              <!-- @open="onOpen" -->
              <div class="set"> 

                    <el-table
                      :data="adminList"
                      ref="multipleTable"
                      style="width: 100%"
                      row-key="id"
                     
                    >
                     <el-table-column label="" width="50">
                       <template slot-scope="scope">
                         <el-radio :label="scope.row.uuid" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)" v-if="disabled">&nbsp</el-radio>
                        <el-radio :label="scope.row.uuid" disabled v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)" v-if="!disabled">&nbsp</el-radio>
                       </template>
                      </el-table-column>
                      <el-table-column
                        prop="loginName"
                        label="账号"
                        width="100"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="100"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="userLevel"
                        label="管理员类型"
                        align="center">
                         <template slot-scope="scope">
	                        {{scope.row.userLevel | userlevelStop}}
	                     </template>
                      </el-table-column>
                    </el-table>
                </div>

                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="sureAdministrator()">确 定</el-button>
                </span>
          
          </el-dialog>


	</div>
</template>
<script>
	
	export default {
		name:"setUser",
		data(){
			return{
				adminList:[],
			    administrator:false,
			    multipleSelection:[],
          disabled:true,
          templateRadio:'',
          morenid:"",
          templateSelection:{},
			    currentRow:null,
			    userinfo:{},
			    userparam:{
			    	setUserUuid:'',
			    	userLevel:'',
			    	userId:'',
			    	userMobile:'',
			    	adrressId:'',
			    	manageScopeId:'',
			    	createUser:'',
			    }
			}
		},
		filters: {
	      userlevelStop: function (val) {
	        return val== 1 ? '系统管理员' : val == 2? '园区管理员' :val == 3? '大楼管理员' : val == 4? '楼层管理员' : val == 5? '房间管理员':""
	      },
       }, 
		methods:{
		//  管理员转换状态
	      userLevel: function (row, column) {
	        return row.userLevel == 1 ? '系统管理员' : row.userLevel == 2? '园区管理员' : row.userLevel == 3? '大楼管理员' : row.userLevel == 4? '楼层管理员' : row.userLevel == 5? '房间管理员':""
	      },
			// 获取管理员列表
			getAdminList(e,v){
				var that=this;
				that.userinfo=e;

        if(v==null){
          that.disabled=true
        }else{
           that.disabled=false
        }
        that.templateRadio=v;

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
                token:2,
                beScopeId:beScopeId,
                executeUser:that.$store.state.userinfo.name,
                createUserMobile:that.$store.state.userinfo.createUser,
               }
				that.axios.post("/SmartHomeTrade/user/selectNextAdmin",userParams).then(function(res){
					if(res.data.code==0){
            var list=[]
            for(var i=0;i<res.data.data.listNextAdmin.length;i++){
             
              if(e.userLevel==res.data.data.listNextAdmin[i].userLevel){
                console.log(res.data.data.listNextAdmin[i].userLevel)
                list.push(res.data.data.listNextAdmin[i])
              }
            }
						that.adminList=list
						that.administrator=true;
					}
				})
			},
       getTemplateRow(index,row){ 
       var that=this;               
        that.templateSelection = row;
        that.userparam={
          userMobile:row.userMobile,
          setUserUuid:row.uuid,
          userId:row.userId,
          createUser:that.$store.state.userinfo.userMobile,
        }
        console.log(this.templateSelection)
       },
			// 确定提交
			sureAdministrator(){

        // alert(this.templateRadio)
        var that=this;
         if(that.templateRadio==""||that.templateRadio==null){
           that.$message.error("请选择管理员");
           return;
        }
        var param=Object.assign(that.userparam, that.userinfo)
          console.log(param)
          that.axios.post("/SmartHomeTrade/user/updateAdmin",param).then(function(res){
            if(res.data.code==0){
                 that.$message.success(res.data.message);
                 that.administrator=false;
                  that.$emit('refreshList');
                  that.templateSelection={},
                   that.$emit('clearselect');
            }else{
               that.$message.error(res.data.message);
                 
            }

          })

			},
		   handleClose(done) {
            
            this.templateRadio=="";
            // alert(this.templateRadio)
             this.$emit('clearselect');
             done()
             this.templateSelection={};
           },
        //  onOpen () {
        //     setTimeout(() => {
        //     this.toggleSelection([this.adminList[1], this.adminList[2]])
        //   }, 200)
        //     },
        // toggleSelection (rows) {
        //   if (rows) {
        //     rows.forEach(row => {
        //       this.$refs.multipleTable.toggleRowSelection(row, true)
        //     })
        //   } else {
        //     this.$refs.multipleTable.clearSelection()
        //   }
        // },
      // 选择

        // handleSelectionChange(val) {
        //   this.multipleSelection = val;
        //   console.log(val)
        // },
		}
	}
</script>






<style scope>
.set{

     height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }




	
</style>