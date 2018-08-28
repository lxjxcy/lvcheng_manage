<template>
  <div class="changeRoom">
      <el-dialog
          title="修改房间"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div class="dialogwidth">
            <el-form label-width="100px" :model="changeRoomparam" ref="changeRoomparam" :rules="rules">
              <el-form-item label="房间名称" prop="name">
                <el-input v-model="changeRoomparam.name"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeRoomparam')">确 定</el-button>
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
      dialogchang(changeRoomparam){ 
        var that=this;
           // 提交修改房间信息
        that.$refs[changeRoomparam].validate((valid) => {
          if (valid) {
             that.axios.post("/SmartHomeTrade/room/updateRoom",that.changeRoomparam).then(function(res){
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

  





</style>