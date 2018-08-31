<template>
	<div class="changePark">
		 <el-dialog
          title="修改园区"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div class="add cdialogwidth">
            <el-form label-width="100px" :model="changeParkparam" ref="changeParkparam" :rules="rules">
              <el-form-item label="园区地址" prop="detailAddress" :label-width="formLabelWidth">
                <el-input v-model="changeParkparam.detailAddress"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeParkparam')">确 定</el-button>
          </span>
    </el-dialog>
	</div>

</template>
<script>
export default {
  name: 'changePark',
   data() {
      return {
        dialogVisible: false,
         formLabelWidth: '100px',
        changeParkparam:{

        },
         rules: {
          detailAddress: [
            {  required: true,message: '园区地址不能为空'}
          ],
        }
      }
    },
    methods: {
      handleClose(done) {
            done();
             this.$emit('clearselect');
      },
      parentHandleclick(e){
      	this.dialogVisible=true;
      	this.changeParkparam=e;
      },
      dialogchang(changeParkparam){ 
      	var that=this;
      	that.$refs[changeParkparam].validate((valid) => {
          if (valid) {
		      	 that.axios.post("/SmartHomeTrade/garden/updateGarden",that.changeParkparam).then(function(res){
                if(res.data.code==0){
                  that.dialogVisible=false;
                    that.$message.success(res.data.message);
                    that.$emit('refreshList');
                }else{
                  that.$message.error(res.data.message);
                }
          })

          } else {
           
            return false;
          }
        });	

      }
    }
}
</script>
<style>
.cdialogwidth{
  width:80%;
}

	





</style>