<template>
  <div class="HostLising">
    <div class="goback">
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--<el-breadcrumb-item :to="{ path: '/park/buildingManagement' }">大楼管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>主机清单</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/park/buildingManagement">大楼管理</BreadcrumbItem>
        <BreadcrumbItem>主机清单</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="formInline.hostId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="主机名称">
          <el-input v-model="formInline.hostName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="大楼名称">
          <el-input v-model="formInline.buildingName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-table">

      <el-table
        :data="tableData3"
        height="390"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="主机编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="hostName"
          label="主机名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buildingd"
          label="所属大楼"
          >
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
    name: "HostLising",
    data() {
      return {
        formInline: {
          hostId: '',
          hostName:"",
          buildingd:''
        },
        currentPage3: 1,
        tableData3: [{
          hostName:"3号主机",
          buildingd:'绿城大楼'
        }, {
          hostName:"3号主机",
          buildingd:'绿城大楼'
        },
          {
            hostName:"3号主机",
            buildingd:'绿城大楼'
          },
          {
            hostName:"3号主机",
            buildingd:'绿城大楼'
          },
          {
            // parkId: '1',
            hostName:"3号主机",
            buildingd:'绿城大楼'
          },
          {
            // parkId: '1',
            hostName:"3号主机",
            buildingd:'绿城大楼'
          },
          {
            // parkId: '1',
            hostName:"3号主机",
            buildingd:'绿城大楼'
          },
          {
            hostName:"3号主机",
            buildingd:'绿城大楼'
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
      onSubmit() {
        console.log('submit!');
      }
    },
  }
</script>

<style scoped>

</style>
