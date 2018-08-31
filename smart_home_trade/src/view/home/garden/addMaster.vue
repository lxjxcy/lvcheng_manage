<template>
	<div class="addMaster">
		    <el-dialog
			          title="添加模板"
			          :visible.sync="addmodel"
			          width="30%"
			          :before-close="handleClose">
			          <div class="addmodel">
			            <el-form :model="adddynamicValidateForm" ref="adddynamicValidateForm" label-width="100px" class="demo-dynamic">
			              <el-form-item
			                prop="masterplateName"
			                label="模板名称"
			                :rules="[
			      { required: true, message: '请输入模板名称', trigger: 'blur' },
			    ]"
			              >
			                <el-input v-model="adddynamicValidateForm.masterplateName" class="addInput"></el-input>
			                <el-button @click="addDomain">添加层级</el-button>
			              </el-form-item>
			              <el-form-item
			                v-for="(domain, index) in adddynamicValidateForm.domains"
			                :label="'第' + (index+1)+'层级'"
			                :key="domain.key"
			                :prop="'domains.' + index + '.value'"
			                :rules="{
			      required: true, message: '层级不能为空', trigger: 'blur'
			    }"
			              >
			                <el-input v-model="domain.value" class="addInput"></el-input>
			                <el-button @click.prevent="addremoveDomain(domain)">删除</el-button>
			              </el-form-item>
			              <el-form-item>

			              </el-form-item>
			            </el-form>
			          </div>
			          <span slot="footer" class="dialog-footer">
			    <!-- <el-button @click="addmodel = false">取 消</el-button> -->
			    <el-button type="primary" @click="add_model('adddynamicValidateForm')">保存</el-button>
			  </span>
        </el-dialog>
		

	</div>
</template>
<script>
	export default{
		name:"addMaster",
		data(){
			return{
				 addmodel:false,
				 adddynamicValidateForm: {
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
		          masterplateName: ''
		        },
		         addparam:{
		          templateName:'',
		          createUser:'',
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


			}
		},
		methods:{
			//添加弹框
			getaddmodel(){
				this.addmodel=true;
			},

      		//添加模板
		      add_model(adddynamicValidateForm){
		        var that=this;

		        this.$refs[adddynamicValidateForm].validate((valid) => {
		          if (valid) {
		            console.log(that.adddynamicValidateForm)
		            console.log(that.adddynamicValidateForm.domains[0]);
		            for(var i=0;i<that.adddynamicValidateForm.domains.length;i++){
		              if(i==0){
		                 that.addparam.oeTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==1){
		                that.addparam.toTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==2){
		                that.addparam.thTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==3){
		                that.addparam.frTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==4){
		                that.addparam.feTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==5){
		                that.addparam.sxTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==6){
		                that.addparam.snTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==7){
		                that.addparam.etTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==8){
		                that.addparam.neTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		              if(i==9){
		                that.addparam.tnTemplateName=that.adddynamicValidateForm.domains[i].value
		              }
		            }
		              that.addparam.templateName=that.adddynamicValidateForm.masterplateName;
		            that.addparam.createUser=that.$store.state.userinfo.loginName;
		            that.axios.post("/SmartHomeTrade/template/insertTemplate",that.addparam).then(function (res) {
		            	if(res.data.code==0){
			            	console.log(res)
			              that.$message({
			                type: 'success',
			                message: res.data.message
			              });
			             that.$emit('refreshList')
			              
			              that.$refs[adddynamicValidateForm].resetFields();
			           }else{
			           	 that.$message({
			                type: 'error',
			                message: res.data.message
			              });
			           }
			           that.addmodel=false;
		            
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
	        addremoveDomain(item) {
		        var index = this.adddynamicValidateForm.domains.indexOf(item)
		        if (index !== -1) {
		          this.adddynamicValidateForm.domains.splice(index, 1)
		        }
		      },
		      addDomain() {
		        this.adddynamicValidateForm.domains.push({
		          value: '',
		          key: Date.now()
		        });
		      },

	        handleClose(done) {
		        done()
		        this.resetaddG("adddynamicValidateForm")
		      },
		       resetaddG(adddynamicValidateForm) {
		        this.$refs[adddynamicValidateForm].resetFields();
		      },
		}
	}
</script>
<style scoped>
  .addmodel{
    height: 340px;
    overflow:hidden;
    overflow-y:auto;
  }
  .addInput{
    width:150px !important;
  }
	




</style>