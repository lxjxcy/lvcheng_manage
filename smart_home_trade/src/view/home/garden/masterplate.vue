<template>
  <div class="masterplate">
    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="摸版名称">
          <el-input v-model="formInline.masterplateName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-middle">
      <ul>
        <!--添加-->
        <li class="l" @click="addmodel = true"><i class="iconfont">&#xe612;</i>添加</li>
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
    <el-button @click="addmodel = false">取 消</el-button>
    <el-button type="primary" @click="add_model('adddynamicValidateForm')">保存</el-button>
  </span>
        </el-dialog>



<!--修改-->

        <li class="l" @click="change_model()"><i class="iconfont">&#xe645;</i>修改</li>
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
            <el-button @click="changemodel = false">取 消</el-button>
            <el-button type="primary" @click="surechange_model('changedynamicValidateForm')">保存</el-button>
          </span>
        </el-dialog>


        <li class="l"  @click="deletem() "><i class="iconfont">&#xe504;</i>删除</li>
      </ul>
    </div>
    <div class="main-table">

      <el-table
        :data="listTemplateCount"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        height="400"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="摸版名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hierarchical"
          label="层级">
          {
            hierarchical?
             <template slot-scope="scope">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in scope.row.hierarchical"  :key="index">{{item.value}}</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          :[]

          }
         
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "masterplate",
    multipleSelection: [],
    data() {
      return {
        loading:true,
        total:0,
        setparam:{
          pageSize:10,
          currentPage:1,
        },
        multipleSelection: [],
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
        addmodel:false,
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
        formInline: {
          masterplateName: '',
        },
        listTemplateCount:[],
      }
    },
    mounted(){
        this.getMasterplate()
      console.log(this.tableData3)
    },
    methods: {
      //获取模板列表
      getMasterplate(){
        var that=this;
        axios.post('/SmartHomeTrade/template/selectTemplate',that.setparam).then(function (res) {
            console.log(res.data.data.listTemplateCount)
          that.total=res.data.data.Count;
            that.loading=false;
          var mlist=[]
          for(var i=0;i<res.data.data.listTemplateCount.length;i++){
            var n=res.data.data.listTemplateCount[i].templateName;
            var id=res.data.data.listTemplateCount[i].id
            var m=[]
            if(res.data.data.listTemplateCount[i].oeTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].oeTemplateName})
            }
            if(res.data.data.listTemplateCount[i].toTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].toTemplateName})
            }
            if(res.data.data.listTemplateCount[i].thTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].thTemplateName})
            }
            if(res.data.data.listTemplateCount[i].frTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].frTemplateName})
            }
            if(res.data.data.listTemplateCount[i].feTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].feTemplateName})
            }
            if(res.data.data.listTemplateCount[i].sxTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].sxTemplateName})
            }
            if(res.data.data.listTemplateCount[i].snTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].snTemplateName})
            }
            if(res.data.data.listTemplateCount[i].etTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].etTemplateName})
            }
            if(res.data.data.listTemplateCount[i].neTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].neTemplateName})
            }
            if(res.data.data.listTemplateCount[i].tnTemplateName!=null){
              m.push({value:res.data.data.listTemplateCount[i].tnTemplateName})
            }
            var list={
              id:id,
              templateName:n,
              hierarchical:m,
            }
            mlist.push(list)
          }
          that.listTemplateCount=mlist;
        })
      },
      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.loading=true;
        that.setparam.pageSize=val;
        that.setparam.currentPage=1;
        that.getMasterplate()
      },
      //切换到当前页
      handleCurrentChange(val) {
        var that=this;
        that.loading=true;
        that.setparam.currentPage=val;
        that.getMasterplate()
      },
      //选中某条数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //关闭弹框
      handleClose(done) {
        done()

      },
      //查询
      onSubmit() {
        console.log('submit!');
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
            axios.post("/SmartHomeTrade/template/insertTemplate",that.addparam).then(function (res) {
              console.log(res)
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getMasterplate()
              that.addmodel=false;
              that.$refs[adddynamicValidateForm].resetFields();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //点击修改
      change_model(){
        var that=this;
        if(that.multipleSelection==''){
          that.$message({
            type: 'info',
            message: '请选择要修改的模板'
          });
        }else {
          that.changedynamicValidateForm.domains=that.multipleSelection[0].hierarchical
          that.changedynamicValidateForm.masterplateName=that.multipleSelection[0].templateName
          that.changemodel=true;
        }
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
            axios.post("/SmartHomeTrade/template/updateTemplate",that.changeparam).then(function (res) {
              console.log(res)
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getMasterplate()
              that.changemodel=false;
              that.$refs[changedynamicValidateForm].resetFields();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //删除
      deletem() {
        var that=this;
        console.log(that.multipleSelection[0].id)
        if(that.multipleSelection!=''){
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post("/SmartHomeTrade/template/deleteTemplate",{
              id:that.multipleSelection[0].id
            }).then(function (res) {
              console.log(res)
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getMasterplate()
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          this.$message({
            type: 'info',
            message: '请选择要删除的模板'
          });
        }

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
      }
    },
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
