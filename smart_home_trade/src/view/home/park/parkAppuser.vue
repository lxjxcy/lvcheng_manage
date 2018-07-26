<template>
  <div class="parkAppuser">
    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.tel" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-middle">
      <ul>
        <!--修改-->
        <li class="l"  @click="change()"><i class="iconfont">&#xe645;</i>修改</li>
        <el-dialog
          title="修改账户"
          :visible.sync="changeUser"
          width="30%"
          :before-close="handleClose">
          <div class="changeUser">
            <el-form ref="changeformValidate" :model="changeformValidate" :rules="ruleValidate" :label-width="60">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" placeholder="请输入姓名">
                <el-input v-model="changeformValidate.name" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="telphone" placeholder="请输入电话">
                <el-input v-model="changeformValidate.telphone" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="changeUser = false">确 定</el-button>
            </span>
        </el-dialog>




        <!--删除-->
        <li class="l"  @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>

        <li class="l" @click="stop()"><i class="iconfont">&#xe504;</i>暂停</li>
        <li class="l" @click="recover()"><i class="iconfont">&#xe504;</i>恢复</li>
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
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="telphone"
          label="联系电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="180" :formatter="formatstate">
        </el-table-column>
        <el-table-column
          label="所属部门"
          prop="department">
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
    name: "parkAppuser",
    data() {
      const validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号码不能为空'));
        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))||!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
          callback(new Error('请输入正确手机号'));
        }else {
          callback();
        }
      };
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('姓名不能为空'));
        }else {
          callback();
        }
      };

      return {
        multipleSelection: [],
        formLabelWidth: '100px',
        loading: false,
        changeformValidate:{
          name: '',
          telphone: ''
        },
        addformValidate: {
          name: '',
          telphone: ''
        },
        formInline: {
          username: '',
          tel:""
        },
        ruleValidate: {
          name: [
            { required: true,validator: validateName, trigger: 'blur' }
          ],
          telphone: [
            { required: true,validator: validateTel, trigger: 'blur' }
          ],
        },
        add:false,
        changeUser:false,
        currentPage3: 1,
        tableData3: [{
          name:"23",
          telphone: '13017449988',
          state:"1",
          department:"技术部",
        }, {
          name:"23",
          telphone: '13017449988',
          state:"1",
          department:"技术部",
        },
          {
            name:"23",
            telphone: '13017449988',
            state:"1",
            department:"技术部",
          },
          {
            name:"23",
            telphone: '13017449988',
            state:"2",
            department:"技术部",
          },
          {
            name:"23",
            telphone: '13017449988',
            state:"1",
            department:"技术部",
          },
          {
            name:"23",
            telphone: '13017449988',
            state:"3",
            department:"技术部",
          },
          {
            name:"23",
            telphone: '13017449988',
            state:"1",
            department:"技术部",
          },
          {
            name:"23",
            telphone: '13017449988',
            state:"2",
            department:"技术部",
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
      //关闭弹窗
      handleClose(done) {
        done();
      },
      //搜索
      onSubmit() {
        console.log('submit!');
      },
      //添加
      adduser(){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.add=false;
          } else {
            this.$Message.error('Fail!');
          }
        })
        console.log(this.addformValidate.name+"...."+this.addformValidate.telphone)
      },

      // 修改
      change(){
        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的大楼删除'
          });
        }else {
          this.changeUser=true;
          console.log(this.multipleSelection[0].name)
          this.changeformValidate.name=this.multipleSelection[0].name;
          this.changeformValidate.telphone=this.multipleSelection[0].telphone;
        }
      },
      //  删除
      deleted() {
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
            message: '请选择要删除的大楼删除'
          });
        }

      },
    //  转换状态
      formatstate: function (row, column) {
        return row.state == 1 ? '正常' : row.state == 2 ? '恢复' : row.state == 3? '暂停':""
      },

    //  暂停
      stop(){

      },
    //  恢复
      recover(){

      }
    },
  }
</script>

<style scoped>
  .model-conent{
    padidng:0 0.15rem;
  }

</style>
