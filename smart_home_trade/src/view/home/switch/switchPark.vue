<template>
	<div class="switchPark">
		 <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer;color:#fff">
            {{this.$store.state.switchName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" style="position: relative;top:0px;">
              <el-dropdown-item style="padding:0 30px;" v-for="item in yardsList"  :key="item.yardId" command="item" @click.native="getvalue(item)">
             	 {{item.yardName}}
             </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
       
	</div>
</template>
<script>
	export default{
		name:"switchPark",
		data(){
			return{
				yardsList:[],
				titleName:"",
				username:"",
			}
		},
		mounted(){
			this.username=this.$store.state.userinfo.loginName
				this.getmyparklist()
				
			
			
		},
		methods:{
			getmyparklist(){
				var that=this;
				var param={
					action:1,
					noPage:1,
					yardIdList:that.$store.state.userinfo.manageScopeIdList
				}
		          that.axios.post("/SmartHomeTrade/garden/selectMyYards",param).then(function(res){
		            if(res.data.code==0){
		            	if(res.data.data.yardsList.length==0||res.data.data==null){
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
					          that.$message({
					            type: 'info',
					            message: '已取消删除'
					          });          
					        });

		            	}
		            	that.yardsList=res.data.data.yardsList
		            	// that.titleName=res.data.data.yardsList[0].areaName;
		            	if(that.$store.state.switchName==''){
		            		  that.$store.commit('switchname',res.data.data.yardsList[0].yardName)
		            		  // that.$set(that.$store.state.parame,'parkname',res.data.data.yardsList[0].areaName)
		            		  // that.$set(that.$store.state.parame,'parkid',res.data.data.yardsList[0].yardId)
		            		  var parame={
							      parkname: res.data.data.yardsList[0].yardName,
							      parkid: res.data.data.yardsList[0].yardId,
							      buildname: that.$store.state.parame.buildname,
							      buildid: that.$store.state.parame.buildid,
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
           
           var parame={
			      parkname: value.yardName,
			      parkid: value.yardId,
			      buildname: that.$store.state.parame.buildname,
			      buildid: that.$store.state.parame.buildid,
			      floorname: that.$store.state.parame.floorname,
			      floorid: that.$store.state.parame.floorid,
			      flooraddressId: that.$store.state.parame.flooraddressId,
			      roomname: that.$store.state.parame.roomname,
			      roomid: that.$store.state.parame.roomid,
			      roomaddressId: that.$store.state.parame.roomaddressId
			    };
    		  that.$store.commit('setRouterid',parame)
    		  that.$store.commit('saveIndex', "2-1")
    		  that.$router.push('/park/MyPark')
    		  // that.$set(that.$store.state.parame,'parkid',res.data.data.yardsList[0].yardId)
    		  if(that.$store.state.ifswitch){
    		  	 that.$set(that.$store.state,'ifswitch',false)
    		  }else{
    		  	that.$set(that.$store.state,'ifswitch',true)
    		  }
    		  // that.$router.replace({
        //         	path:'/park/buildingManagement',
        //         	name:'buildingManagement'
        //         })
        // that.$router.go(0);  
           	  that.$store.commit('switchname',value.yardName)

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