<template>
	<div class="multi">
		<div v-for="item in currentValue" :key="item.uuid">{{item.name}}</div>


		




		
	</div>
</template>
<script>

	export default{
		name:"multi",
		 props:{ 
	      sectionlist:{
	        type:Array,
	        default:0
	      }
	    },
		 data() {
	      return {
	      	 currentValue:this.sectionlist
	      };
	    },

	     methods: {
	     	addApp(id){
	     		alert(id)
	     		this.$refs.myaddchild.getaddAppuser();
	     	},
	    

	    }

	}
</script>
<style>
.dis{
display: block;
width:60px;



}
.department{
	padding-left: 10px;
}
	
</style>