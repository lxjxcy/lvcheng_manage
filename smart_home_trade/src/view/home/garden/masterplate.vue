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
        <li class="l" @click="addmodel = true"><i class="iconfont">&#xe612;</i>添加</li>

        <el-dialog
          title="添加模板"
          :visible.sync="addmodel"
          width="30%"
          :before-close="handleClose">
          <div class="addmodel">
            <el-form :model="adddynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
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
                <el-button @click.prevent="changeremoveDomain(domain)">删除</el-button>
              </el-form-item>
              <el-form-item>

              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="addmodel = false">取 消</el-button>
    <el-button type="primary" @click="addmodel = false">保存</el-button>
  </span>
        </el-dialog>






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
    <el-button @click="addmodel = false">取 消</el-button>
    <el-button type="primary" @click="addmodel = false">保存</el-button>
  </span>
        </el-dialog>
        <li class="l"  @click="deletem() "><i class="iconfont">&#xe504;</i>删除</li>
      </ul>
    </div>
    <div class="main-table">

      <el-table
        :data="tableData3"
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
          prop="masterplateName"
          label="摸版名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="z_index"
          label="层级">
        </el-table-column>


      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage3"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    name: "masterplate",
    multipleSelection: [],
    data() {
      return {
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
          masterplateName: ''
        },
        changemodel:false,
        formInline: {
          masterplateName: '',
        },
        currentPage3: 1,
        tableData3: [{
          masterplateName: '同意',
          z_index:"dasssss",
        }, {
          masterplateName: '同意',
          z_index:"dasssss",
        },
          {
            masterplateName: '同意',
            z_index:"dasssss",
          },
          {
            masterplateName: '同意',
            z_index:"dasssss",
          },
          {
            masterplateName: '同意',
            z_index:"dasssss",
          },
          {
            masterplateName: '同意',
            z_index:"dasssss",
          },
          {
            masterplateName: '同意',
            z_index:"dasssss",
          },
          {
            masterplateName: '同意',
            z_index:"dasssss",
          },]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      onSubmit() {
        console.log('submit!');
      },

      //修改
      change_model(){
        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的模板'
          });
        }else {
          this.changemodel=true;
        }
      },
      //删除
      deletem() {
        if(this.multipleSelection!=''){
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发送ajax
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
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
  /*.addmodel{*/
    /*height: 300px;*/
    /*overflow:hidden;*/
    /*overflow-y:auto;*/
  /*}*/
  .addInput{
    width:150px !important;
  }

</style>
