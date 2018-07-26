<template>
  <div class="floorManagement">
    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.roomId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formInline.roomName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="formInline.management" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="大楼">
          <el-input v-model="formInline.building" placeholder=""></el-input>
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
        <li class="l">设置管理员</li>
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
        height="430"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          type="index"
          label="楼层编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="roomName"
          label="楼层名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="address"
          label="所在位置"
          width="200">
        </el-table-column>
        <el-table-column
          prop="roomNumber"
          label="房间数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="management"
          label="管理员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          width="180">
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
        name: "floorManagement",
      multipleSelection: [],
      data() {
        return {
          formInline: {
            roomId: '',
            roomName:"",
            management:"",
            building: ''
          },
          currentPage3: 1,
          tableData3: [{
            // roomId: '1',
            roomName: '8号房',
            roomNumber:"23",
            address: '杭州市滨江区锦绣国际202',
            management:'卢雪姣',
            tel:"13017082869"
          }, {
            // roomId: '1',
            roomName: '8号房',
            roomNumber:"23",
            address: '杭州市滨江区锦绣国际202',
            management:'卢雪姣',
            tel:"13017082869"
          },
            {
              // roomId: '1',
              roomName: '8号房',
              roomNumber:"23",
              address: '杭州市滨江区锦绣国际202',
              management:'卢雪姣',
              tel:"13017082869"
            },
            {
              // roomId: '1',
              roomName: '8号房',
              roomNumber:"23",
              address: '杭州市滨江区锦绣国际202',
              management:'卢雪姣',
              tel:"13017082869"
            },
            {
              // roomId: '1',
              roomName: '8号房',
              roomNumber:"23",
              address: '杭州市滨江区锦绣国际202',
              management:'卢雪姣',
              tel:"13017082869"
            },
            {
              // roomId: '1',
              roomName: '8号房',
              roomNumber:"23",
              address: '杭州市滨江区锦绣国际202',
              management:'卢雪姣',
              tel:"13017082869"
            },
            {
              // roomId: '1',
              roomName: '8号房',
              roomNumber:"23",
              address: '杭州市滨江区锦绣国际202',
              management:'卢雪姣',
              tel:"13017082869"
            },
            {
              // roomId: '1',
              roomName: '8号房',
              roomNumber:"23",
              address: '杭州市滨江区锦绣国际202',
              management:'卢雪姣',
              tel:"13017082869"
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
