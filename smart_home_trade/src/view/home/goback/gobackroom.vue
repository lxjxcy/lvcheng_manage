<template>
	<div class="gobackroom">
			<div class="goback" v-if="this.$store.state.userinfo.userLevel==2">
			   
			    <span style="font-size: 14px;position: relative;top:-2px;">当前位置：</span>
		          <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block">
		            <el-breadcrumb-item :to="{ path: '/park/buildingManagement' }" >大楼管理</el-breadcrumb-item>
		             <el-breadcrumb-item :to="{ path: '/park/floorList' }" >楼层列表</el-breadcrumb-item>
		            <el-breadcrumb-item>房间列表</el-breadcrumb-item>
		          </el-breadcrumb>
		    </div>
		    <div class="goback" v-if="this.$store.state.userinfo.userLevel==3">
			  
			      <span style="font-size: 14px;position: relative;top:-2px;">当前位置：</span>
		          <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block">
		            <el-breadcrumb-item :to="{ path: '/building/floorManagment' }" >楼层管理</el-breadcrumb-item>
		            <el-breadcrumb-item>房间列表</el-breadcrumb-item>
		          </el-breadcrumb>
		    </div>
	</div>
</template>
<script>
	 export default {
    name: "gobackroom",
    data(){
    	return{
    		
    	}
    }
  }
</script>

<style>
	






</style>