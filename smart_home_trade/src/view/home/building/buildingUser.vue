<template>
  <div class="buildingUser">
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
        <li class="l"><i class="iconfont">&#xe612;</i>添加</li>
        <li class="l"><i class="iconfont">&#xe645;</i>修改</li>
        <li class="l"><i class="iconfont">&#xe504;</i>删除</li>
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
  export default {
    name: "buildingUser",
    multipleSelection: [],
    data() {
      return {
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
          tpyestyle:"大楼管理员",
        }, {
          user: 'lxj',
          name:"23",
          telphone: '13017449988',
          management:'卢雪姣',
          tpyestyle:"大楼管理员",
        },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"大楼管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"大楼管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"大楼管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"大楼管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"大楼管理员",
          },
          {
            user: 'lxj',
            name:"23",
            telphone: '13017449988',
            management:'卢雪姣',
            tpyestyle:"大楼管理员",
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
      }
    },
  }
</script>

<style scoped>

</style>
