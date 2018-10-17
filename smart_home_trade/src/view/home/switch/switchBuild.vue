<template>
	<div class="switchBuild">
		 <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer;color:#fff">
            {{this.$store.state.switchName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" style="position: relative;top:0px;">
              <el-dropdown-item style="padding:0 30px;" v-for="item in blockList" :key="item.buildingId" command="item" @click.native="getvalue(item)">{{item.buildingName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
       
	</div>
</template>
<script>
	export default{
		name:"switchBuild",
		data(){
			return{
				blockList:[],
				titleName:"",
				username:''

			}
		},
		mounted(){
			this.username=this.$store.state.userinfo.loginName
			this.getmybuildlist()

		},
		methods:{
			
			getmybuildlist(){
				var that=this;
				var param={
					action:1,
					buildingIdList:that.$store.state.userinfo.manageScopeIdList
				}
				that.axios.post("/SmartHomeTrade/block/selectMyBlock",param).then(function(res){
		            if(res.data.code==0){
		            	if(res.data.data==null){
		            		
		            		// that.$message.warning("您还没有管辖范围")
		            		// that.$message.warning("您还没有管辖范围")
						    that.$confirm('您还没有管辖范围, 请先设置', '提示', {
					          confirmButtonText: '确定',
					           showCancelButton:false,
					          closeOnClickModal:false,
					          showClose:false,
					          type: 'warning'
					        }).then(() => {
					           that.$router.push({name:'login',params:{username:that.username}})
					           return;
					        }).catch(() => {
					          // that.$message({
					          //   type: 'info',
					          //   message: '已取消删除'
					          // });          
					        });
		            	}
		            	that.blockList=res.data.data.blockList
		            	that.titleName=res.data.data.blockList[0].buildingName
		            	if(that.$store.state.switchName==''){

		            		that.$store.commit('switchname',res.data.data.blockList[0].buildingName)
		            		 // that.$set(that.$store.state.parame,'buildname',res.data.data.yardsList[0].buildingName)
		            		 //  that.$set(that.$store.state.parame,'buildid',res.data.data.yardsList[0].buildingId)
		            		  var parame={
					              parkname: that.$store.state.parame.parkname,
					              parkid: that.$store.state.parame.parkid,
					              buildname: res.data.data.blockList[0].buildingName,
					              buildid: res.data.data.blockList[0].buildingId,
					              allAddress:res.data.data.blockList[0].addressInfo,
					              floorname: that.$store.state.parame.floorname,
					              floorid: that.$store.state.parame.floorid,
					              flooraddressId: that.$store.state.parame.flooraddressId,
					              roomname: that.$store.state.parame.roomname,
					              roomid: that.$store.state.parame.roomid,
					              roomaddressId: that.$store.state.parame.roomaddressId
					            };
					        that.$store.commit('setRouterid',parame)
		            	}
		            	

		            }

		          })

			},
           getvalue(value){
           	var that=this;
           	 
           	 that.$store.commit('switchname',value.buildingName)
           	 var parame={
	              parkname: that.$store.state.parame.parkname,
	              parkid: that.$store.state.parame.parkid,
	              buildname: value.buildingName,
	              buildid: value.buildingId,
	               allAddress:value.addressInfo,
	              floorname: that.$store.state.parame.floorname,
	              floorid: that.$store.state.parame.floorid,
	              flooraddressId: that.$store.state.parame.flooraddressId,
	              roomname: that.$store.state.parame.roomname,
	              roomid: that.$store.state.parame.roomid,
	              roomaddressId: that.$store.state.parame.roomaddressId
	            };
	        that.$store.commit('setRouterid',parame)
	        that.$store.commit('saveIndex', "3-1")
	        that.$router.push('/building/MyBuilding')
	       
           	// this.titleName=value.buildingName
           }

		}
	}
</script>
<style>
	.switchPark .el-input__inner{
		background: #2bc999 !important;
		border:none !important;
		color:#fff !important;
		height:30px !important;
		line-height:30px !important
	}
	.switchPark .el-select .el-input .el-select__caret{
		color:#fff !important;
	}
</style>