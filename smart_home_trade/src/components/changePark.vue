<template>
	<div class="changePark">
		 <el-dialog
          title="修改园区"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div class="add cdialogwidth">
            <el-form label-width="100px" :model="changeParkparam" ref="changeParkparam" :rules="rules">
              <el-form-item label="园区地址" prop="detailAddress" :label-width="formLabelWidth" ref="detailAddress">
                <el-input v-model="changeParkparam.detailAddress" @focus="removeValid('detailAddress')"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeParkparam')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
          </span>
    </el-dialog>
	</div>

</template>
<script>
export default {
  name: 'changePark',
   data() {
      return {
        dialogVisible: false,//弹框
         formLabelWidth: '100px',
          fullscreenLoading:false,//提交加载
          changeParkparam:{},
         rules: {
          detailAddress: [
            {  required: true,message: '园区地址不能为空'}
          ],
        }
      }
    },
    methods: {
      //关闭弹框
      handleClose(done) {
        done();
         this.$emit('clearselect');
      },
      // 修改框弹出
      parentHandleclick(e){
      	this.dialogVisible=true;
      	this.changeParkparam=e;
      },
      // 获取焦点清空验证提示
      removeValid(formName){
        this.$refs[formName].clearValidate();
      },
      // 提交
      dialogchang(changeParkparam){ 
      	var that=this;
      	that.$refs[changeParkparam].validate((valid) => {
          if (valid) {
            that.fullscreenLoading=true;
            var log={
                    executeUser:that.$store.state.userinfo.name,
                    createUserMobile:that.$store.state.userinfo.createUser,
                  }
           var changeParkparam=Object.assign(that.changeParkparam,log)
		      	 that.axios.post("/SmartHomeTrade/garden/updateGarden",changeParkparam).then(function(res){
              that.fullscreenLoading=false;
                if(res.data.code==0){
                  that.dialogVisible=false;
                    that.$message.success(res.data.message);
                    that.$emit('refreshList');
                    this.$emit('clearselect');
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
  height:200px;
}

	





</style>