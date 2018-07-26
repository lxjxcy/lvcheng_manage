<template>
  <div class="myBuilding">

    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.roomId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formInline.roomName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-table">

      <el-table
        :data="tableData3"
        height="435"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="大楼编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="大楼名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="floorNumber"
          label="楼层数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所在园区">
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
        name: "myBuilding",
      data() {
        return {
          formInline: {
            roomId: '',
            roomName:"",
          },
          currentPage3: 1,
          tableData3: [{
            // buildingId: '1',
            buildingName: '逸夫楼',
            floorNumber:"23",
            address: '杭州市滨江区锦绣国际202'
          }, {
            // buildingId: '1',
            buildingName: '逸夫楼',
            floorNumber:"23",
            address: '杭州市滨江区锦绣国际202'
          },
            {
              // buildingId: '1',
              buildingName: '逸夫楼',
              floorNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // buildingId: '1',
              buildingName: '逸夫楼',
              floorNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // buildingId: '1',
              buildingName: '逸夫楼',
              floorNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // buildingId: '1',
              buildingName: '逸夫楼',
              floorNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // buildingId: '1',
              buildingName: '逸夫楼',
              floorNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // buildingId: '1',
              buildingName: '逸夫楼',
              floorNumber:"23",
              address: '杭州市滨江区锦绣国际202'
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
