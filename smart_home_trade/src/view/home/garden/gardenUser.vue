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
        <li class="l" @click="createUser()"><i class="iconfont">&#xe612;</i>添加</li>
        <!--修改-->
        <li class="l"  @click="change()"><i class="iconfont">&#xe645;</i>修改</li>
        <!--删除-->
        <li class="l"  @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l"  @click="setAccess()">设置权限</li>
      </ul>
        <adduser ref="mychild" @refreshList="getUserlist" @clearselect="clear"></adduser>
        <changeuser ref="mychangechild" @refreshList="getUserlist" @clearselect="clear"></changeuser>

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
      return {
        total:0,
        userParams:{
          pageSize:10,
          currentPage:1,
          createUser:'',
        },
        multipleSelection: [],     
        loading: true,
   
        userLevelv:0,

        formSearch: {
          name: null,
          userMobile:null,
          createUser:'',

        },
        listNextAdmin: []
      }
    },
    mounted(){
      this.userParams.createUser=this.$store.state.userinfo.userMobile;
      this.formSearch.createUser=this.$store.state.userinfo.userMobile;
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
        that.getUserlist()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //关闭弹框
      handleClose(done) {
        done();
      },

      // 添加用户
      createUser(){
          this.$refs.mychild.addloginUser();

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
        that.formSearch.name=null,
          
          that.formSearch.userMobile=null,

        
        that.getUserlist()
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
            message: '请选择要修改的用户'
          });
        }else {
          var param={
            uuid:this.multipleSelection[0].uuid,
            name: this.multipleSelection[0].name,
            userMobile: this.multipleSelection[0].userMobile
          }
         this.$refs.mychangechild.updataUser(param);
        }
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
              uuid:that.multipleSelection[0].uuid
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

      // 情况选中
      clear(){
         this.$refs.multipleTable.clearSelection();
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
