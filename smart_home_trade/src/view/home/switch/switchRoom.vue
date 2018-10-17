<template>
	<div class="switchRoom">
		 <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer;color:#fff">
            {{this.$store.state.switchName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" style="position: relative;top:0px;">
              <el-dropdown-item style="padding:0 30px;" v-for="item in roomList"  :key="item.id" command="item" @click.native="getvalue(item)">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
       
	</div>
</template>
<script>
	export default{
		name:"switchRoom",
		data(){
			return{
				roomList:[],
				titleName:"",
				username:"",
			}
		},
		mounted(){
			this.username=this.$store.state.userinfo.loginName
				this.getmyroomlist()
			
			
		},
		methods:{
			getmyroomlist(){
				var that=this;
		       
				var param={
					noPage:1,
					roomListId:that.$store.state.userinfo.manageScopeIdList,
					adrIdList:that.$store.state.userinfo.addrList
				}
		          that.axios.post("/SmartHomeTrade/room/selectMyRoom",param).then(function(res){
		            if(res.data.code==0){
		            	if(res.data.data==null){
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
		            	that.roomList=res.data.data.roomList
		            	that.titleName=res.data.data.roomList[0].name
		            	if(that.$store.state.switchName==''){
		            		that.$store.commit('switchname',res.data.data.roomList[0].name)
		            		
		            		  var parame={
					                  parkname: that.$store.state.parame.parkname,
					                  parkid: that.$store.state.parame.parkid,
					                  buildname: that.$store.state.parame.buildname,
					                  buildid: that.$store.state.parame.buildid,
					                  floorname: that.$store.state.parame.floorname,
					                  inAddress:res.data.data.roomList[0].inAddress,
					                  floorid: that.$store.state.parame.floorid,
					                  flooraddressId: that.$store.state.parame.flooraddressId,
					                  roomname: res.data.data.roomList[0].name,
					                  roomid: res.data.data.roomList[0].id,
					                  roomaddressId: res.data.data.roomList[0].addressId
					                };
					            that.$store.commit('setRouterid',parame)
		            	}
		            	
		            }
		          })

			},
			
           getvalue(value){
         
           	var that=this;
           	 that.$store.commit('switchname',value.name)
           	    var parame={
	                  parkname: that.$store.state.parame.parkname,
	                  parkid: that.$store.state.parame.parkid,
	                  buildname: that.$store.state.parame.buildname,
	                  buildid: that.$store.state.parame.buildid,
	                  floorname: that.$store.state.parame.floorname,
	                  floorid: that.$store.state.parame.floorid,
	                  flooraddressId: that.$store.state.parame.flooraddressId,
	                  roomname: value.name,
	                  roomid: value.id,
	                  inAddress:value.inAddress,
	                  roomaddressId: value.addressId
	                };
	                that.$store.commit('saveIndex', "5-1")
	                 that.$router.push('/room/myRoom')
	            that.$store.commit('setRouterid',parame)
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