<template>
  <div class="floorList">
    <!--系统管理员-->
   <!--  <div class="goback" v-if="headuserLevel==1">
      <Breadcrumb separator=">">
        <span>当前位置：</span>
        <BreadcrumbItem to="/garden/gardenManagement">园区管理</BreadcrumbItem>
        <BreadcrumbItem to="/park/buildingList">大楼列表</BreadcrumbItem>
        <BreadcrumbItem>楼层列表</BreadcrumbItem>
      </Breadcrumb>
      </div> -->
    <!--园区管理员-->
   <!--  <div class="goback" v-if="headuserLevel==2">
      <Breadcrumb separator=">">
        <span>当前位置：</span>
        <BreadcrumbItem to="/park/buildingManagement">大楼管理</BreadcrumbItem>
        <BreadcrumbItem>楼层列表</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="nav-middle">
      <div class="l" style="font-size: 20px;font-weight: 400"><span v-model="paramed">{{this.$store.state.parame.build_floorName}}</span>---楼层列表</div>
      <ul class="r">
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
        height="380"
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
          prop="floorName"
          label="楼层名称"
          width="120">
          <template slot-scope="scope">
            <el-button @click="goRoomlist(scope.row.floorName)" type="text" size="small">{{scope.row.floorName}}</el-button>
          </template>
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
          label="联系电话">
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
    name: "floorList",
    multipleSelection: [],
    data() {
      return {
        headuserLevel:1,
        paramed:'',
        formInline: {
          roomId: '',
          roomName:"",
          management:"",
          building: ''
        },
        currentPage3: 1,
        tableData3: [{
          // roomId: '1',
          floorName: '1层',
          roomNumber:"23",
          management:'卢雪姣',
          tel:"13017082869"
        }, {
          // roomId: '1',
          floorName: '1层',
          roomNumber:"23",
          management:'卢雪姣',
          tel:"13017082869"
        },
          {
            // roomId: '1',
           floorName: '1层',
            roomNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // roomId: '1',
            floorName: '1层',
            roomNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // roomId: '1',
            floorName: '1层',
            roomNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // roomId: '1',
            floorName: '1层',
            roomNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // roomId: '1',
            floorName: '1层',
            roomNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // roomId: '1',
            floorName: '1层',
            roomNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },]
      }
    },
    mounted(){
      this.paramed=this.$route.params.goName
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
      // 跳转到指定楼层的房间列表页
      goRoomlist(floorName){
      this.$set(this.$store.state.parame,'floor_roomName',this.$store.state.parame.build_floorName+floorName)
      // this.$set(this.$store.state.parame,'build_floorId',blockId)
      this.$router.push({name:'roomList'})

        // this.$router.push({name:'roomList',params:{
        //     goName:this.paramed+floorName,
        //     floorName:"123",
        //   }})
      },
      onSubmit() {
        console.log('submit!');
      }
    },
  }
</script>

<style scoped>

</style>
