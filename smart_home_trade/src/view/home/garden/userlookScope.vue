<template>
	<div class="userlookScope">
		<el-dialog
		  title="管辖范围"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  
		  <span>这是一段信息</span>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->

		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		name:"userlookScope",
		 data() {
	      return {
	        dialogVisible: false
	      };
	    },
	     methods: {
	     	getopen(){
	     		this.dialogVisible=true;
	     	},
	        handleClose(done) {
	            done()
	        }
	    }
	}
</script>
<style>
	
</style>
