<template>
	<div class="changebuild">
		 <el-dialog title="修改大楼" :visible.sync="dialogVisible" width="30%">
          <div class="add-buliding dialogwidth">
            <el-form :model="changeBuildparam"  ref="changeBuildparam" label-width="100px" :rules="rules">
              <el-form-item label="大楼名称" prop="buildingName">
                <el-input v-model="changeBuildparam.buildingName" auto-complete="off" label-width="100px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeBuildparam')">确 定</el-button>
          </div>
    </el-dialog>
	</div>

</template>
<script>
export default {
  name: 'changebuild',
   data() {
      return {
        dialogVisible: false,
        changeBuildparam:{

        },
         rules: {
          buildingName: [
            {  required: true,message: '大楼名称不能为空'}
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
      },
      dialogchang(changeBuildparam){ 
      	var that=this;
           // 提交修改大楼信息
      	that.$refs[changeBuildparam].validate((valid) => {
          if (valid) {
		      	 that.axios.post("/SmartHomeTrade/block/updateBlock",that.changeBuildparam).then(function(res){
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