<template>
	<div class="changeuser">
		 <el-dialog
          title="修改账户"
          :visible.sync="changeUser"
          width="30%"
          :before-close="handleClose">
          <div class="changeUser" style="padding-right: 10%;height:250px">
            <el-form ref="changeformValidate" :model="changeformValidate" :rules="ruleValidate" :label-width="60">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" >
                <el-input v-model="changeformValidate.name" @focus="removeValid('name')" auto-complete="off" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile">
                <el-input v-model="changeformValidate.userMobile" @focus="removeValid('userMobile')" auto-complete="off"  placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="change_User('changeformValidate')"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0)">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>
<script>
// import axios from "axios"
	export default{
		name:"changeuser",
		data(){
					  //手机号验证
		      const userMobile = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('手机号码不能为空'));
		        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))||!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
		          callback(new Error('请输入正确手机号'));
		        }else {
		          callback();
		        }
		      };
		       //真实姓名验证
		      const name = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('真实姓名不能为空'));
		        }else {
		          callback();
		        }
		      };
			return{
				changeUser:false,
				 fullscreenLoading:false,
				 formLabelWidth: '100px',
				 ruleValidate: {
		          name: [
		            { required: true,validator: name, }
		          ],
		          userMobile: [
		            { required: true,validator: userMobile, trigger: 'blur' }
		          ],
		        },
		         changeformValidate:{
			          uuid:null,
			          name: null,
			          userMobile: null,
			          userLevel:null,
			          userId:null
			        },
			}
		},
		methods:{
			updataUser(e){
				this.changeUser=true;
				this.changeformValidate.uuid=e.uuid;
				this.changeformValidate.name=e.name;
				this.changeformValidate.userMobile=e.userMobile;
				if(e.userLevel==3){
					this.changeformValidate.userLevel=e.userLevel
					this.changeformValidate.userId=e.userId
				}

			},
			   // 获取焦点清空验证提示
	      removeValid(formName){
	      	this.$refs[formName].clearValidate();
	      },
			// 提交修改信息
			 change_User(changeformValidate){
		        var that=this;
		        that.$refs[changeformValidate].validate((valid) => {
		          if (valid) {
		          	that.fullscreenLoading=true;
		           that.axios.post('/SmartHomeTrade/user/updateNextAdmin',that.changeformValidate).then(function (res) {
		           	that.fullscreenLoading=false;
		                 
		                  if(res.data.code==0){
		                  	that.$message({
				                type: 'success',
				                message: res.data.message
						        });
				               that.$emit('refreshList');
				               that.$emit('clearselect');
				              that.changeUser=false;

		                  }else{
		                  	that.$message({
				                type: 'error',
				                message: res.data.message
						     });
		                  	 that.changeUser=false;

		                  }
		              
		            })
		          } else {
		          
		            return false;
		          }
		        });
		      },




			   //关闭弹框
		     handleClose(done) {
		        done();
		          this.$emit('clearselect');
		        
		        // this.resetaddUser("addformValidate")


		      },

		}
	}
</script>