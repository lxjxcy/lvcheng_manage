<template>
	<div class="switchFloor">
		 <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer;color:#fff">
            {{this.$store.state.switchName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" style="position: relative;top:0px;">
              <el-dropdown-item style="padding:0 30px;" v-for="item in floorList"  :key="item.id" command="item" @click.native="getvalue(item)">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
	</div>
</template>
<script>
	export default{
		name:"switchFloor",
		data(){
			return{
				floorList:[],
				titleName:""
			}
		},
		mounted(){
			
				this.getmyfloorlist()
			
			
		},
		methods:{
			getmyfloorlist(){
				var that=this;
				
		          var list2=that.$store.state.userinfo.addrList;
		            var list1=that.$store.state.userinfo.manageScopeIdList;
		            var obj=[]
		            for(var i=0;i<list1.length;i++){
		                var obj2={
		                  regionId:list1[i],
		                  addressId:list2[i]
		                }
		                obj.push(obj2)
		            }
				var param={
					action:1,
					addRegionIdList:obj
				}
		          that.axios.post("/SmartHomeTrade/floor/selectMyFloor",param).then(function(res){
		            if(res.data.code==0){
		            	that.floorList=res.data.data.floorList
		            	that.titleName=res.data.data.floorList[0].name;
		            	if(that.$store.state.switchName==''){
		            		 that.$store.commit('switchname',res.data.data.floorList[0].name)
		            		  // that.$set(that.$store.state.parame,'floorname',res.data.data.floorList[0].name)
		            		  // that.$set(that.$store.state.parame,'floorid',res.data.data.floorList[0].id)
		            		  // that.$set(that.$store.state.parame,'flooraddressId',res.data.data.floorList[0].addressId)

		            		   var parame={
					              parkname: that.$store.state.parame.parkname,
					              parkid: that.$store.state.parame.parkid,
					              buildname: that.$store.state.parame.buildname,
					              buildid: that.$store.state.parame.buildid,
					              floorname: res.data.data.floorList[0].name,
					              building_floorName: res.data.data.floorList[0].buildingName+res.data.data.floorList[0].name,
					              floorid: res.data.data.floorList[0].id,
					              flooraddressId: res.data.data.floorList[0].addressId,
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
           	console.log(value)
           	var that=this;
           	 that.$store.commit('switchname',value.name)
           	    var parame={
		              parkname: that.$store.state.parame.parkname,
		              parkid: that.$store.state.parame.parkid,
		              buildname: that.$store.state.parame.buildname,
		              buildid: that.$store.state.parame.buildid,
		              floorname: value.name,
		              floorid: value.id,
		              building_floorName: value.buildingName+value.name,
		              flooraddressId: value.addressId,
		              roomname: that.$store.state.parame.roomname,
		              roomid: that.$store.state.parame.roomid,
		              roomaddressId: that.$store.state.parame.roomaddressId
		            };
		            that.$store.commit('saveIndex', "4-1")
		             that.$router.push('/floor/myFloor')
		        that.$store.commit('setRouterid',parame)
           	// this.titleName=value.name
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