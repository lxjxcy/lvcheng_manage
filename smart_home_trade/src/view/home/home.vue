<template>
	<div class="home">
		<header>
           <myHeader message="园区管理后台"></myHeader>
        </header>
        <article>
        	<router-view></router-view>        	
        </article>
        <div class="footerall">
           <myFooter> </myFooter>
       </div>
		
	</div>
</template>
<script>
   export default {
        name: "home",
    }
	
</script>

<style>

.home{
	 display: flex;
    height: 100%;
    flex-direction:column;

}
article{
    flex: 1;
    display: flex;
    width:100%;
  }

	
</style>