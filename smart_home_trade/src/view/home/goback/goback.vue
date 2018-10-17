<template>
	<!-- <div class="goBack"> -->
			<div class="goback" v-if="this.$store.state.userinfo.userLevel==2">
			    <Breadcrumb separator=">" >
			        <span>当前位置：</span>
			        <BreadcrumbItem to="/park/buildingManagement"> <Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
			        <BreadcrumbItem>楼层列表</BreadcrumbItem>
			    </Breadcrumb>
		    </div>

	<!-- </div> -->
</template>
<script>
	 export default {
    name: "goback",
    data(){
    	return{
    		
    	}
    }
  }
</script>

<style>
	






</style>