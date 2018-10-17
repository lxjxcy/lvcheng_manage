<template>
	<div class="gobackroom">
			<div class="goback" v-if="this.$store.state.userinfo.userLevel==2">
			    <Breadcrumb separator=">">
			        <span>当前位置：</span>
			        <BreadcrumbItem to="/park/buildingManagement"><Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
			         <BreadcrumbItem to="/park/floorList">楼层列表</BreadcrumbItem>
			        <BreadcrumbItem>房间列表</BreadcrumbItem>
			    </Breadcrumb>
		    </div>
		    <div class="goback" v-if="this.$store.state.userinfo.userLevel==3">
			    <Breadcrumb separator=">">
			        <span>当前位置：</span>
			        <BreadcrumbItem to="/building/floorManagment"><Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
			        <BreadcrumbItem>房间列表</BreadcrumbItem>
			    </Breadcrumb>
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