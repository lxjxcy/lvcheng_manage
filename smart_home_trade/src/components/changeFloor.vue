<template>
	<div class="changeFloor">
		<el-dialog
		  title="修改楼层"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		   <div class="dialogwidth">
            <el-form :model="changeFloorparam"  ref="changeFloorparam" label-width="100px" :rules="rules">
              <el-form-item label="大楼名称" prop="name">
                <el-input v-model="changeFloorparam.name" auto-complete="off" label-width="100px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeFloorparam')">确 定</el-button>
          </div>
		</el-dialog>
	</div>

</template>
<script>
export default {
  name: 'changeFloor',
   data() {
      return {
        dialogVisible: false,
        changeFloorparam:{

        },
         rules: {
          name: [
            {  required: true, message: '楼层名称不能为空'}
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
      	this.changeFloorparam=e;
      },

      dialogchang(changeFloorparam){ 
      	var that=this;
      	that.$refs[changeFloorparam].validate((valid) => {
          if (valid) {
		      	 that.axios.post("/SmartHomeTrade/floor/updateFloor",that.changeFloorparam).then(function(res){
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