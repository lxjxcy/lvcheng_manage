<!--<template>-->
    <!--<div class="buildingList">-->

      <!--{{this.$route.params.parkName}}-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
        <!--name: "buildingList"-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div class="buildingManagement">
    <div class="goback">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/garden/gardenManagement">园区管理</BreadcrumbItem>
        <BreadcrumbItem>大楼列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="top-nav">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.roomId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formInline.roomName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="园区">
          <el-input v-model="formInline.park" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="nav-middle">
      <div class="l" style="font-size: 20px;font-weight: 400"><span v-model="paramed">{{this.$route.params.goName}}</span>-----大楼列表</div>
      <ul class="r">
        <li class="l" @click="addBuilding = true"><i class="iconfont">&#xe612;</i>添加大楼</li>
        <el-dialog title="添加大楼" :visible.sync="addBuilding" width="40%">
          <div class="add-buliding">
            <el-form :model="form">
              <el-form-item label="大楼名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item label="所属区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addBuilding = false">确 定</el-button>
          </div>
        </el-dialog>
        <li class="l" @click="change()"><i class="iconfont" >&#xe645;</i>修改</li>
        <el-dialog title="修改大楼" :visible.sync="changeBuilding" width="40%">
          <div class="add-buliding">
            <el-form :model="form">
              <el-form-item label="大楼名称" :label-width="formLabelWidth">
                <el-input v-model="form.buildingname" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changeBuilding = false">确 定</el-button>
          </div>
        </el-dialog>

        <li class="l" @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l" @click=" administratored()">设置管理员</li>

        <el-dialog
          title="提示"
          :visible.sync="administrator"
          width="40%"
          :before-close="handleClose"
          @open="onOpen">
          <span class="titles">{{buildingN}}</span>
          <el-table
            :data="tableData2"
            height="300"
            ref="multipleTable2"
            style="width: 100%"
            row-key="id"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="账号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="130">
            </el-table-column>
            <el-table-column
              prop="admintype"
              label="管理员类型">
            </el-table-column>
          </el-table>

          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="administrator = false">确 定</el-button>
                </span>
        </el-dialog>
      </ul>

    </div>
    <div class="main-table">

      <el-table
        :data="tableData3"
        ref="multipleTable"
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
          label="大楼编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="大楼名称"
          width="100">
          <template slot-scope="scope">
            <el-button @click="goFloorlist(scope.row.buildingName)" type="text" size="small">{{scope.row.buildingName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="computer"
          label="主机"
          width="100">
        </el-table-column>
        <el-table-column
          prop="floorNumber"
          label="楼层数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="equipmentNumber"
          label="设备数量"
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
    name: "buildingManagement",

    data() {
      return {
        form: {
          name: '',
          region: '',
          buildingId:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          buildingname:"",
          desc: '',
        },
        buildingN:'222',
        multipleSelection: [],
        multipleSelection2:[],
        formLabelWidth: '100px',
        addBuilding:false,
        changeBuilding:false,
        administrator:false,
        formInline: {
          roomId: '',
          roomName:"",
          management:"",
          park: ''
        },
        currentPage3: 1,
        tableData2: [
          {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }
        ],
        tableData3: [{
          // buildingId: '1',
          buildingName: '逸夫楼',
          computer:"2号主机",
          floorNumber:"34",
          equipmentNumber:"23",
          management:'卢雪姣',
          tel:"13017082869"
        }, {
          // buildingId: '1',
          buildingName: '逸夫楼',
          computer:"2号主机",
          floorNumber:"34",
          equipmentNumber:"23",
          management:'卢雪姣',
          tel:"13017082869"
        },
          {
            // buildingId: '1',
            buildingName: '逸夫楼',
            computer:"2号主机",
            floorNumber:"34",
            equipmentNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // buildingId: '1',
            buildingName: '逸夫楼',
            computer:"2号主机",
            floorNumber:"34",
            equipmentNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // buildingId: '1',
            buildingName: '逸夫楼',
            computer:"2号主机",
            floorNumber:"34",
            equipmentNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // buildingId: '1',
            buildingName: '逸夫楼',
            computer:"2号主机",
            floorNumber:"34",
            equipmentNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // buildingId: '1',
            buildingName: '逸夫楼',
            computer:"2号主机",
            floorNumber:"34",
            equipmentNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },
          {
            // buildingId: '1',
            buildingName: '逸夫楼',
            computer:"2号主机",
            floorNumber:"34",
            equipmentNumber:"23",
            management:'卢雪姣',
            tel:"13017082869"
          },],
        paramed:"",

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
      //选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      handleSelectionChange2(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      onSubmit() {
        console.log('submit!');
      },
      handleClose(done) {
        done()
      },
      //修改
      change(){

        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的大楼删除'
          });
        }else {
          this.changeBuilding=true;
          console.log(this.multipleSelection[0].buildingName)
          this.form.buildingname=this.multipleSelection[0].buildingName;
        }
      },
      //  设置管理员
      administratored(){
        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择大楼要设置的大楼'
          });
        }else {
          this.administrator=true;
          console.log(this.multipleSelection[0].buildingName)
          this.buildingN=this.multipleSelection[0].buildingName;

        }
      },
      onOpen () {
        setTimeout(() => {
          this.toggleSelection([this.tableData2[1], this.tableData2[2]])
        }, 200)
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable2.toggleRowSelection(row, true)
          })
        } else {
          this.$refs.multipleTable2.clearSelection()
        }
      },

      //  跳转到主机清单页面
      host(){
        this.$router.push("/park/HostListing")
      },
      // 跳转到指定大楼的楼层列表页
      goFloorlist(buildingName){
        this.$router.push({name:'floorList',params:{
            goName:this.paramed+buildingName,
            buildingId:"123",
          }})
      },





      //  删除
      deleted() {
        if(this.multipleSelection!=''){
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发送ajax
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          this.$message({
            type: 'info',
            message: '请选择要删除的大楼删除'
          });
        }

      }
    },

  }
</script>

<style scoped>
  .add-buliding{
    /*text-align: center;*/
    padding-left:0.8rem;
  }
</style>

