<template>
  <div class="gardenUser">
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formSearch.userMobile" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('formSearch')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-middle">
      <ul >
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
                <el-input type="text" v-model="addformValidate.name" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="管理层级" prop="userLevel" :label-width="formLabelWidth">
                <el-select v-model="addformValidate.userLevel" placeholder="" @change="getUserLevel">
                  <el-option label="园区管理员" value="2"></el-option>
                  <el-option label="大楼管理员" value="3"></el-option>
                  <el-option label="楼层管理员" value="4"></el-option>
                  <el-option label="房间管理员" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile" placeholder="请输入电话">
                <el-input v-model="addformValidate.userMobile" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail" placeholder="请输入姓名">
                <el-input v-model="addformValidate.userEmail" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="设备权限" :label-width="formLabelWidth" prop="resource" >
                <el-radio-group v-model="addformValidate.resource">
                  <el-radio label="查看"></el-radio>
                  <el-radio label="操作"></el-radio>
                </el-radio-group>
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
              <el-form-item label="电话" :label-width="formLabelWidth" prop="userMobile">
                <el-input v-model="changeformValidate.userMobile" auto-complete="off"  placeholder="请输入电话" style="width:220px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="change_User('changeformValidate')">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除-->
        <li class="l"  @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l"  @click="setAccess()">设置权限</li>
      </ul>

    </div>
    <div class="main-table">

      <el-table
        :data="listNextAdmin"
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
          prop="id"
          label="编号"
          width="120">
        </el-table-column>

        <el-table-column
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="联系电话"
          width="180">
        </el-table-column>
        <el-table-column
          label="类型"
          width="180">
          <template slot-scope="scope">
            {{scope.row.userLevel | userlevelStop}}
          </template>
        </el-table-column>
        <el-table-column
          label="管辖范围">
          <template slot-scope="scope">
            <el-button @click="lookScope(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="setScope(scope.row)" type="text" size="small">设置</el-button>
          </template>

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
      //层级管理验证userLevel
      const userLevel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('曾经不能为空'));
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
        total:0,
        userParams:{
          pageSize:10,
          currentPage:1
        },
        multipleSelection: [],

        add:false,//添加框
        changeUser:false,//修改框
        formLabelWidth: '100px',
        loading: true,
        changeformValidate:{
          uuid:'',
          name: '',
          userMobile: ''
        },
        addformValidate: {
          loginName: '',
          password: '',
          name:'',
          userMobile:'',
          userEmail:'',
          userLevel:'',
          resource:''
        },
        userLevelv:0,

        formSearch: {
          name: null,
          userMobile:null
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
          userLevel:[
            { required: true,validator: userLevel, trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择设备权限', trigger: 'change' }
          ],

        },
        formInline: {
          username: '',
          tel:""
        },
        listNextAdmin: []
      }
    },
    mounted(){
      this.getUserlist()

    },
    filters: {
      userlevelStop: function (val) {
        return val== 1 ? 'admin' : val == 2? '园区管理员' :val == 3? '大楼管理员' : val == 4? '楼层管理员' : val == 5? '房间管理员':""
      },
    },
    methods: {
      // 获取用户列表
      getUserlist(){
        var that=this;
        axios.post("/SmartHomeTrade/user/selectNextAdmin",that.userParams).then(function (res) {
          console.log(res)
          that.listNextAdmin =res.data.data.listNextAdmin;
          that.loading=false;
          that.total=res.data.data.Count;
        })
      },

      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.userParams.pageSize=val;
        that.userParams.currentPage=1;
        that.getUserlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.userParams.currentPage=val;
        that. getUserlist()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //关闭弹框
      handleClose(done) {
        done();
      },
      //查询
      onSubmit() {
        var that=this;
        if(that.formSearch.name!=null||that.formSearch.userMobile!=null){
          that.loading=true;
          console.log(that.formSearch);
          axios.post('/SmartHomeTrade/user/selectNextAdminByNmOrMobile',that.formSearch).then(function (res) {
            console.log(res);
            that.listNextAdmin=res.data.data.AdminList;
            that.loading=false
          })
        }
      },
      //清空查询
      resetForm() {
        var that=this;
        that.formSearch={
          name:null,
          userMobile:null,
        }
        that.getUserlist()
      },
      //添加
      adduser(addformValidate){

        var that=this;
        that.$refs[addformValidate].validate((valid) => {
          if (valid) {
            if(that.addformValidate.resource=="查看"){
              that.addformValidate.resource=2
            }else{
              that.addformValidate.resource=1
            }
            var param={
              loginName: that.addformValidate.loginName,
              password: that.addformValidate.password,
              name:that.addformValidate.name,
              userMobile:that.addformValidate.userMobile,
              userEmail:that.addformValidate.userEmail,
              userLevel:that.userLevelv,
              userDeviceAuth:that.addformValidate.resource,

            }
            axios.post("/SmartHomeTrade/user/registAdUser",param).then(function (res) {
              console.log(res.data.message)
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getUserlist()
              that.add=false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
            // this.add=false;
      },

      //获取层级id
      getUserLevel(value){
        console.log(value)
        this.userLevelv=value;

      },
      //  管理员转换状态
      userLevel: function (row, column) {
        return row.userLevel == 1 ? 'admin' : row.userLevel == 2? '园区管理员' : row.userLevel == 3? '大楼管理员' : row.userLevel == 4? '楼层管理员' : row.userLevel == 5? '房间管理员':""
      },
      // 修改
      change(){
        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的大楼'
          });
        }else {
          this.changeUser=true;
          console.log(this.multipleSelection[0].name)
          this.changeformValidate.name=this.multipleSelection[0].name;
          this.changeformValidate.userMobile=this.multipleSelection[0].userMobile;
          this.changeformValidate.uuid=this.multipleSelection[0].id
        }
      },
      change_User(changeformValidate){
        var that=this;
        that.$refs[changeformValidate].validate((valid) => {
          if (valid) {
            axios.post('/SmartHomeTrade/user/updateNextAdmin',that.changeformValidate).then(function (res) {
                  console.log(res)
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getUserlist()
              that.changeUser=false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //  删除
      deleted() {
        if(this.multipleSelection!=''){
          var that=this;
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发送ajax
            axios.post('/SmartHomeTrade/user/deleteAdmin',{
              uuid:that.multipleSelection[0].id
            }).then(function (res) {
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getUserlist()


            })

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          that.$message({
            type: 'info',
            message: '请选择要删除的大楼删除'
          });
        }

      },
    //  设置权限
      setAccess(){
          if(this.multipleSelection==''){
            this.$message({
              type: 'info',
              message: '请选择用户'
            });
          }else {
            this.$router.push("/park/setAccess")
          }
        },
    // 设置管辖范围
    setScope(row){
      console.log(row)
      this.$router.push("/garden/setScope")
    }
    },
  }
</script>

<style scoped>

</style>
