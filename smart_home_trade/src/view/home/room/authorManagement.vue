<template>
	<div class="authorManagement">
		<div class="both-top">
			<el-menu  
			   router 
                :default-active="$route.path" 
                class="el-menu-demo" 
                mode="horizontal"
                v-if="this.$store.state.userinfo.userLevel==2"
                >
			  <el-menu-item index="/park/authorManagement/user">按用户授权</el-menu-item>
			   <el-menu-item index="/park/authorManagement/equipment">按区域授权</el-menu-item>
			</el-menu>
			<el-menu  
			   router 
                :default-active="$route.path" 
                class="el-menu-demo" 
                mode="horizontal"
                v-if="this.$store.state.userinfo.userLevel==3"
                >
			  <el-menu-item index="/building/authorManagement/user">按用户授权</el-menu-item>
			   <el-menu-item index="/building/authorManagement/equipment">按区域授权</el-menu-item>
			</el-menu>
			<el-menu  
			   router 
                :default-active="$route.path" 
                class="el-menu-demo" 
                mode="horizontal"
                v-if="this.$store.state.userinfo.userLevel==4"
                >
			  <el-menu-item index="/floor/authorManagement/user">按用户授权</el-menu-item>
			   <el-menu-item index="/floor/authorManagement/equipment">按区域授权</el-menu-item>
			</el-menu>
			<el-menu  
			   router 
                :default-active="$route.path" 
                class="el-menu-demo" 
                mode="horizontal"
                v-if="this.$store.state.userinfo.userLevel==5"
                >
			  <el-menu-item index="/room/authorManagement/user">按用户授权</el-menu-item>
			   <el-menu-item index="/room/authorManagement/equipment">按区域授权</el-menu-item>
			</el-menu>
		</div>
		<div>
		  <router-view></router-view> 
		</div>
		<!-- <authorization v-if="activeIndex==1"></authorization>
		<EquipmentAuthorization v-if="activeIndex==2"></EquipmentAuthorization> -->
	</div>
</template>
<script>
// import authorization from "./authorization.vue"
// import EquipmentAuthorization from "./EquipmentAuthorization.vue"
	export default{
		name:"authorManagement",
		 // components:{
   //        authorization,
   //        EquipmentAuthorization
   //     },
       data(){
       	return{
       		// activeIndex:"1",
       	}
       },
       beforeMount(){
        if(this.$store.state.userinfo.userLevel==2){
          this.$store.commit('saveIndex',"2-7")
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$store.commit('saveIndex',"3-7")
        }
         if(this.$store.state.userinfo.userLevel==4){
          this.$store.commit('saveIndex',"4-7")
        }
          if(this.$store.state.userinfo.userLevel==5){
          this.$store.commit('saveIndex',"5-3")
        }
        
     },
       methods:{
       	
       	 //    handleSelect(key, keyPath) {
       	 //    	this.activeIndex=key;
	          
	        // }
       }
	}
</script>
<style scoped>
.el-menu--horizontal>.el-menu-item{
	height:40px;
	line-height: 40px;
}
	


</style>