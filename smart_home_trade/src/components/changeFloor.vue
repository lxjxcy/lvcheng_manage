<template>
	<div class="changeFloor">
		<el-dialog
		  title="修改楼层"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		   <div class="dialogwidth" style="padding-right: 10%">
            <el-form :model="changeFloorparam"  ref="changeFloorparam" label-width="100px" :rules="rules">
              <el-form-item label="楼层名称" prop="name" ref="name" label-width="100px">
                <el-input v-model="changeFloorparam.name" @focus="removeValid('name')" auto-complete="off" ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogchang('changeFloorparam')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
          </div>
		</el-dialog>
	</div>

</template>
<script>
export default {
  name: 'changeFloor',
   data() {
    const floorname = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('楼层名称不能为空'));
            }else if(!(/^\S{1,6}$/.test(value))){
              callback(new Error('请输入6位之内的非空字符串'));

            }else {
              callback();
            }
          };


      return {
        dialogVisible: false,
         fullscreenLoading:false,
        changeFloorparam:{

        },
         rules: {
          name: [
            {  required: true,validator: floorname}
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
         // 获取焦点清空验证提示
        removeValid(formName){
          this.$refs[formName].clearValidate();
        },

      dialogchang(changeFloorparam){ 
      	var that=this;
      	that.$refs[changeFloorparam].validate((valid) => {
          if (valid) {
            that.fullscreenLoading=true;
		      	 that.axios.post("/SmartHomeTrade/floor/updateFloor",that.changeFloorparam).then(function(res){
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