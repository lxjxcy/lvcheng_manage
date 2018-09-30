<template>
	<div class="changeMaster">
		 <el-dialog
          title="修改模板"
          :visible.sync="changemodel"
          width="30%"
          :before-close="handleClose">
          <div class="addmodel">
            <el-form :model="changedynamicValidateForm" ref="changedynamicValidateForm" label-width="100px" class="demo-dynamic">
              <el-form-item
                prop="masterplateName"
                label="模板名称"
                :rules="[
      { required: true, message: '请输入模板名称', trigger: 'blur' },
    ]"
              >
                <el-input v-model="changedynamicValidateForm.masterplateName" class="addInput"></el-input>
                <el-button @click="changeDomain">添加层级</el-button>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in changedynamicValidateForm.domains"
                :label="'第' + (index+1)+'层级'"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
      required: true, message: '层级不能为空', trigger: 'blur'
    }"
              >
                <el-input v-model="domain.value" class="addInput"></el-input>
                <el-button @click.prevent="changeremoveDomain(domain)">删除</el-button>
              </el-form-item>
              <el-form-item>

              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="changemodel = false">取 消</el-button> -->
            <el-button type="primary" @click="surechange_model('changedynamicValidateForm')">保存</el-button>
          </span>
        </el-dialog>
		

	</div>
</template>
<script>
	export default{
		name:"changeMaster",
		data(){
			return{
				  changeparam:{
		          templateName:'',
		          id:"",
		          oeTemplateName:null,
		          toTemplateName:null,
		          thTemplateName:null,
		          frTemplateName:null,
		          feTemplateName:null,
		          sxTemplateName:null,
		          snTemplateName:null,
		          etTemplateName:null,
		          neTemplateName:null,
		          tnTemplateName:null
		        },
		        changedynamicValidateForm: {
		          domains: [{
		            value: ''
		          },
		            {
		              value: ''
		            },{
		              value: ''
		            },
		            {
		              value: ''
		            },
		          ],
		          masterplateName: '',
		        },
		        changemodel:false,
			}
		},
		methods:{
			// 修改摸版弹框
			getchangeMaster(e){
				var that=this;
				 that.changedynamicValidateForm.domains=e.hierarchical
                that.changedynamicValidateForm.masterplateName=e.templateName;
				that.changemodel=true;
			},
			  //确认修改
	      surechange_model(changedynamicValidateForm){
	        var that=this;
	        that.$refs[changedynamicValidateForm].validate((valid) => {
	          if (valid) {
	            for(var i=0;i<that.changedynamicValidateForm.domains.length;i++){
	              if(i==0){
	                that.changeparam.oeTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==1){
	                that.changeparam.toTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==2){
	                that.changeparam.thTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==3){
	                that.changeparam.frTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==4){
	                that.changeparam.feTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==5){
	                that.changeparam.sxTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==6){
	                that.changeparam.snTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==7){
	                that.changeparam.etTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==8){
	                that.changeparam.neTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	              if(i==9){
	                that.changeparam.tnTemplateName=that.changedynamicValidateForm.domains[i].value
	              }
	            }
	            that.changeparam.templateName=that.changedynamicValidateForm.masterplateName;
	            that.changeparam.id=that.multipleSelection[0].id;
	            that.axios.post("/SmartHomeTrade/template/updateTemplate",that.changeparam).then(function (res) {
	              console.log(res)
	              that.$message({
	                type: 'success',
	                message: res.data.message
	              });
	               that.$emit('refreshList')
	              that.changemodel=false;
	              that.$refs[changedynamicValidateForm].resetFields();
	            })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	        changeremoveDomain(item) {
		        var index = this.changedynamicValidateForm.domains.indexOf(item)
		        if (index !== -1) {
		          this.changedynamicValidateForm.domains.splice(index, 1)
		        }
		      },
		      changeDomain() {
		        this.changedynamicValidateForm.domains.push({
		          value: '',
		          key: Date.now()
		        });
		      },
		            //关闭弹框
		      handleClose(done) {
		        done()
		        // this.resetaddG("adddynamicValidateForm")

		      },

		}
	}
</script>
<style>
	


</style>