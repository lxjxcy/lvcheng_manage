<template>
  <div class="gardenLog">
    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formInline.keyword" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="formInline.operatep" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-table">

      <el-table
        :data="tableData3"
        height="400"
        border
        style="width: 100%">
        <el-table-column
          prop="operateName"
          label="操作名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operater"
          label="操作人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operateTime"
          label="操作时间">
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
    name: "gardenLog",
    data() {
      return {
        formInline: {
          keyword: '',
          operatep:"",
          date1:'',
          date2:''
        },
        currentPage3: 1,
        tableData3: [{
          operateName: '逸夫楼',
          operater:"卢雪姣",
          operateTime: '杭州市滨江区锦绣国际202'
        }, {
          operateName: '逸夫楼',
          operater:"卢雪姣",
          operateTime: '杭州市滨江区锦绣国际202'
        },
          {
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
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
      //提交
      onSubmit() {
        console.log('submit!');
      }
    },
  }
</script>

<style scoped>

</style>
