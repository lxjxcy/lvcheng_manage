<template>
  <div class="gardenUser">
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
        <li class="l" @click="add = true"><i class="iconfont">&#xe612;</i>添加</li>
        <el-dialog
          title="添加账户"
          :visible.sync="add"
          width="30%"
          :before-close="handleClose">
          <div class="model-conent">
            <el-form ref="addformValidate" :model="addformValidate" :rules="ruleValidate" :label-width="60">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="loginName" placeholder="请输入用户名">
                <el-input v-model="addformValidate.loginName" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password" placeholder="请输入密码">
                <el-input type="password" v-model="addformValidate.password" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" placeholder="请输入姓名">
                <el-input type="password" v-model="addformValidate.name" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="管理层级" prop="userLevel" :label-width="formLabelWidth">
                <el-select v-model="addformValidate.userLevel" placeholder="请选择活动区域">
                  <el-option label="系统管理员" value="1"></el-option>
                  <el-option label="园区管理员" value="2"></el-option>
                  <el-option label="大楼管理员" value="3"></el-option>
                  <el-option label="楼层管理员" value="4"></el-option>
                  <el-option label="房间管理员" value="5"></el-option>
                  <el-option label="设备管理员" value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" placeholder="请输入电话">
                <el-input v-model="addformValidate.userMobile" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail" placeholder="请输入姓名">
                <el-input v-model="addformValidate.userEmail" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="adduser('addformValidate')">确 定</el-button>
                </span>
        </el-dialog>




        <!--修改-->
        <li class="l"  @click="change()"><i class="iconfont">&#xe645;</i>修改</li>
        <el-dialog
          title="修改账户"
          :visible.sync="changeUser"
          width="30%"
          :before-close="handleClose">
          <div class="changeUser">
            <el-form ref="changeformValidate" :model="changeformValidate" :rules="ruleValidate" :label-width="60">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" >
                <el-input v-model="changeformValidate.name" auto-complete="off" style="width:220px" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="telphone">
                <el-input v-model="changeformValidate.telphone" auto-complete="off"  placeholder="请输入电话" style="width:220px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="changeUser = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除-->
        <li class="l"  @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l">设置权限</li>
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
          prop="user"
          label=" 账户"
          width="120">
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
          prop="tpyestyle"
          label="类型"
          width="180">
        </el-table-column>
        <el-table-column
          label="管辖范围">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
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
  import axios from  'axios'
  export default {
    name: "gardenUser",

    data() {
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
      //用户名验证
      const loginName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('姓名不能为空'));
        }else {
          callback();
        }
      };
      //密码验证
      const password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
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
      //邮箱验证
      const userEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        }else if(!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g).test(value)){
          callback(new Error('邮箱格式不正确'));
        }else {
          callback();
        }
      };
      return {
        multipleSelection: [],

        add:false,//添加框
        changeUser:false,//修改框
        formLabelWidth: '100px',
        loading: false,
        changeformValidate:{
          name: '',
          telphone: ''
        },
        addformValidate: {
          loginName: '',
          password: '',
          name:'',
          userMobile:'',
          userEmail:'',
          userLevel:''

        },
        formInline: {
          username: '',
          tel:""
        },
        ruleValidate: {
          loginName: [
            { required: true,validator: loginName, trigger: 'blur' }
          ],
          password: [
            { required: true,validator: password, trigger: 'blur' }
          ],
          name: [
            { required: true,validator: name, trigger: 'blur' }
          ],
          userMobile: [
            { required: true,validator: userMobile, trigger: 'blur' }
          ],
          userEmail: [
            { required: true,validator: userEmail, trigger: 'blur' }
          ],

        },
        formInline: {
          username: '',
          tel:""
        },
        currentPage3: 1,
        tableData3: [{
          user: 'lxj',
          name:"23",
          telphone: '13017449988',
          management:'卢雪姣',
          tpyestyle:"园区管理员",
        }, {
          user: 'lxj',
          name:"23",
          telphone: '13017449988',
          management:'卢雪姣',
          tpyestyle:"园区管理员",
        },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"园区管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"园区管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"园区管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"园区管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"园区管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"园区管理员",
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
      //添加
      adduser(addformValidate){
        // var param=this.addformValidate
        this.$refs[addformValidate].validate((valid) => {
          if (valid) {
          //axios.post('/user/registAdUser,param).then(function(res){
            // console.log(res)
            // })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
            // this.add=false;
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

      }

    },
  }
</script>

<style scoped>

</style>
