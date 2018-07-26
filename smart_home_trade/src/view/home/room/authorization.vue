<template>
  <div class="authorization">
    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="授权人">
          <el-input v-model="formInline.authorizer" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="授权设备">
          <el-input v-model="formInline.authorizEquipment" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-middle">
      <ul>
        <li class="l"><i class="iconfont">&#xe612;</i>添加授权</li>
        <li class="l"><i class="iconfont">&#xe645;</i>修改</li>
        <li class="l"><i class="iconfont">&#xe504;</i>删除</li>
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
          prop="authorizer"
          label="授权人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="authorizEquipment"
          label="授权设备">
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
    name: "authorization",
    multipleSelection: [],
    data() {
      return {
        formInline: {
          authorizer:"",
          authorizEquipment:""
        },
        currentPage3: 1,
        tableData3: [{
          authorizer:"卢雪姣",
          authorizEquipment:"灯"

        }, {
          authorizer:"卢雪姣",
          authorizEquipment:"灯"
        },
          {
            authorizer:"卢雪姣",
            authorizEquipment:"灯"
          },
          {
            authorizer:"卢雪姣",
            authorizEquipment:"灯"
          },
          {
            authorizer:"卢雪姣",
            authorizEquipment:"灯"
          },
          {
            authorizer:"卢雪姣",
            authorizEquipment:"灯"
          },
          {
            authorizer:"卢雪姣",
            authorizEquipment:"灯"
          },
          {
            authorizer:"卢雪姣",
            authorizEquipment:"灯"
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
