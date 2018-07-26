<template>
  <div class="myPark">

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
          label="园区编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="parkName"
          label="园区名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="builidngNumber"
          label="大楼数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="园区地址">
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
        name: "myPark",
      data() {
        return {
          formInline: {
            roomId: '',
            roomName:"",
          },
          currentPage3: 1,
          tableData3: [{
            // parkId: '1',
            parkName: '逸夫楼',
            builidngNumber:"23",
            address: '杭州市滨江区锦绣国际202'
          }, {
            // parkId: '1',
            parkName: '逸夫楼',
            builidngNumber:"23",
            address: '杭州市滨江区锦绣国际202'
          },
            {
              // parkId: '1',
              parkName: '逸夫楼',
              builidngNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // parkId: '1',
              parkName: '逸夫楼',
              builidngNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // parkId: '1',
              parkName: '逸夫楼',
              builidngNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // parkId: '1',
              parkName: '逸夫楼',
              builidngNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // parkId: '1',
              parkName: '逸夫楼',
              builidngNumber:"23",
              address: '杭州市滨江区锦绣国际202'
            },
            {
              // parkId: '1',
              parkName: '逸夫楼',
              builidngNumber:"23",
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
