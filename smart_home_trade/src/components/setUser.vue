<template>
	<div class="setUser">
		    <el-dialog
              title="设置管理员"
              :visible.sync="administrator"
              width="30%"
              :before-close="handleClose"
            >
              <!-- @open="onOpen" -->

                    <el-table
                      :data="adminList"
                      height="300"
                      ref="multipleTable"
                      style="width: 100%"
                      row-key="id"
                      highlight-current-row
                      @current-change="handleCurrentChange"
                    >
                    <!--   <el-table-column
                        type="selection"
                        :reserve-selection="true"
                        width="50"
                      > -->
                      </el-table-column>
                      <el-table-column
                        prop="loginName"
                        label="账号"
                        width="130">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="130">
                      </el-table-column>
                      <el-table-column
                        prop="userLevel"
                        label="管理员类型">
                         <template slot-scope="scope">
	                        {{scope.row.userLevel | userlevelStop}}
	                     </template>

                      </el-table-column>
                    </el-table>

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
			getAdminList(e){
				var that=this;
				that.userinfo=e;					
				var param={
					userMobile:that.$store.state.userinfo.userMobile
				}
				that.axios.post("/SmartHomeTrade/user/selectCreateAdmin",param).then(function(res){
					if(res.data.code==0){
						that.adminList=res.data.data.adminList;
						that.administrator=true;
					}
				})
			},
			// 确定提交
			sureAdministrator(){
        var that=this;
        var param=Object.assign(that.userparam, that.userinfo)
          console.log(param)
          that.axios.post("/SmartHomeTrade/user/updateAdmin",param).then(function(res){
            if(res.data.code==0){
                 that.$message.success(res.data.message);
                 that.administrator=false;
                  that.$emit('refreshList');
            }else{
               that.$message.error(res.data.message);
                 that.administrator=false;
            }

          })

			},




		   handleClose(done) {
            done()
             this.$emit('clearselect');
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
       setCurrent(row) {
        this.$refs.multipleTable.setCurrentRow(row);
      },
      // 选择
       handleCurrentChange(val) {
       	var that=this;

       	console.log(val)
        that.currentRow = val;
        that.userparam={
          userMobile:that.currentRow.userMobile,
          userLevel:that.currentRow.userLevel,
          setUserUuid:that.currentRow.uuid,
          userId:that.currentRow.userId,
          createUser:that.$store.state.userinfo.userMobile,
        }
        that.setCurrent(val)
        
      }

        // handleSelectionChange(val) {
        //   this.multipleSelection = val;
        //   console.log(val)
        // },
		}
	}
</script>






<style>




	
</style>