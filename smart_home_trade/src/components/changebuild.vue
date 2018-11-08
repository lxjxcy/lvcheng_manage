<template>
	<div class="changebuild">
		 <el-dialog title="修改大楼" :visible.sync="dialogVisible" width="30%">
          <div class="add-buliding dialogwidth">
            <el-form :model="changeBuildparam"  ref="changeBuildparam" label-width="100px" :rules="rules">
              <el-form-item label="大楼名称" prop="buildingName" ref="buildingName">
                <el-input v-model="changeBuildparam.buildingName"  @focus="removeValid('buildingName')" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeBuildparam')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
          </div>
    </el-dialog>
	</div>

</template>
<script>
export default {
  name: 'changebuild',
   data() {
     //大楼名称
          const buildingName = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('大楼名称不能为空'));
            }else if(!(/^\S{1,6}$/.test(value))){
              callback(new Error('请输入6位之内的非空字符串'));

            }else {
              callback();
            }
          };
      return {
        dialogVisible: false,
         fullscreenLoading:false,
        buildN:"",
        changeBuildparam:{

        },
         rules: {
          buildingName: [
            {  required: true,validator: buildingName}
          ],
        }
      };
    },
    methods: {
      handleClose(done) {
            done();
             this.$emit('clearselect');

      },
      parentHandleclick(e){
      	this.dialogVisible=true;
      	this.changeBuildparam=e;
        this.buildN=e.buildingName;

      },
         // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },
        
      dialogchang(changeBuildparam){ 
      	var that=this;
           // 提交修改大楼信息
      	that.$refs[changeBuildparam].validate((valid) => {
          if (valid) {
            if(that.buildN==that.changeBuildparam.buildingName){
              that.dialogVisible=false;
              return;
            }
            that.fullscreenLoading=true;
            var log={
                    executeUser:that.$store.state.userinfo.name,
                    createUserMobile:that.$store.state.userinfo.createUser,
                  }
           var changeBuildparam=Object.assign(that.changeBuildparam,log)

		      	 that.axios.post("/SmartHomeTrade/block/updateBlock",changeBuildparam).then(function(res){
              that.fullscreenLoading=false;
                if(res.data.code==0){
                  that.dialogVisible=false;
                    that.$message.success(res.data.message);
                    that.$emit('refreshList');
                     that.$emit('clearselect');
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

	





</style>