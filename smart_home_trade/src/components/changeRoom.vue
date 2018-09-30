<template>
  <div class="changeRoom">
      <el-dialog
          title="修改房间"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div class="dialogwidth" style="padding-right: 10%">
            <el-form label-width="100px" :model="changeRoomparam" ref="changeRoomparam" :rules="rules">
              <el-form-item label="房间名称" prop="name" ref="name">
                <el-input v-model="changeRoomparam.name" @focus="removeValid('name')"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeRoomparam')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
          </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  name: 'changeRoom',
   data() {
      return {
        dialogVisible: false,
         fullscreenLoading:false,
        changeRoomparam:{

        },
         rules: {
          name: [
            {  required: true,message: '房间名称不能为空'}
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
        this.changeRoomparam=e;
      },
         // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },
      dialogchang(changeRoomparam){ 
        var that=this;
           // 提交修改房间信息
        that.$refs[changeRoomparam].validate((valid) => {
          if (valid) {
            that.fullscreenLoading=true;
             that.axios.post("/SmartHomeTrade/room/updateRoom",that.changeRoomparam).then(function(res){
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