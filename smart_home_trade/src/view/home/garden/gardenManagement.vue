<template>
  <div class="buildingManagement">

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
      <ul>
        <!--添加园区-->
        <li class="l"  @click="addGarden = true"><i class="iconfont">&#xe612;</i>添加</li>
        <el-dialog
          title="添加园区"
          :visible.sync="addGarden"
          width="30%"
          :before-close="handleClose">
          <div class="add">
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
              <el-form-item label="园区名称">
                <el-input v-model="addG.gardenname"></el-input>
              </el-form-item>
              <el-form-item label="园区编号">
                <el-input v-model="addG.gardenId"></el-input>
              </el-form-item>
              <el-form-item label="省">
                <el-select v-model="addG.province" placeholder="请选择省" @change="getValue">
                  <el-option v-for="item in options" :label="item.label" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="市">
                <el-select v-model="addG.city" placeholder="请选择市">
                  <el-option>北京</el-option>
                  <el-option >上海</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="区">
                <el-select v-model="addG.region" placeholder="请选择区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="园区地址">
                <el-input v-model="addG.address"></el-input>
              </el-form-item>
              <el-form-item label="添加大楼" prop="addbuild">
                <el-switch v-model="addG.addbuild"></el-switch>
              </el-form-item>
            </el-form>


          </div>
          <el-dialog
            width="30%"
            title="添加大楼"
            :visible.sync="addBuild"
            append-to-body>
            <div class="addB">
              <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :label="'大楼' + (index+1)"
                  :key="domain.key"
                >
                  <el-input v-model="domain.value" class="roominput"></el-input>
                  <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="addDomain">新增房间</el-button>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="colseOutin()">确 定</el-button>
          </span>
          </el-dialog>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add_build()">确 定</el-button>
          </span>
        </el-dialog>
      <!--修改园区-->
        <li class="l" @click="change()"><i class="iconfont" >&#xe645;</i>修改</li>
        <el-dialog
          title="修改园区"
          :visible.sync="changeGarden"
          width="30%"
          :before-close="handleClose">
          <div class="add">
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
              <el-form-item label="园区名称">
                <el-input v-model="changeG.gardenname"></el-input>
              </el-form-item>
              <el-form-item label="园区编号">
                <el-input v-model="changeG.gardenId"></el-input>
              </el-form-item>
              <el-form-item label="省">
                <el-select v-model="changeG.province" placeholder="请选择省">
                  <el-option v-for="item in options" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="市">
                <el-select v-model="changeG.city" placeholder="请选择市">
                  <el-option>北京</el-option>
                  <el-option >上海</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="区">
                <el-select v-model="changeG.region" placeholder="请选择区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="园区地址">
                <el-input v-model="changeG.address"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changeGarden = false">确 定</el-button>
          </span>
        </el-dialog>






        <li class="l" @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l" @click=" administratored()">设置管理员</li>

        <el-dialog
          title="提示"
          :visible.sync="administrator"
          width="40%"
          :before-close="handleClose"
          @open="onOpen">
          <!--<span class="titles">{{buildingN}}</span>-->
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
        height="410"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column

          type="index"
          label="园区编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="parkName"
          label="园区名称"
          width="100">
          <template slot-scope="scope">
            <el-button @click="goBuildinglist(scope.row.parkName)" type="text" size="small">{{scope.row.parkName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="buildingNumber"
          label="大楼数量"
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
    name: "buildingManagement",

    data() {
      return {
        options: [{
          id: '1',
          label: '辽宁'
        }, {
          id: '2',
          label: '贵州'
        }, {
          id: '3',
          label: '浙江'
        }, {
          id: '4',
          label: '江苏'
        }, {
          id: '5',
          label: '天津'
        }
        ],
        value4: '选项2',
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
        addG:{
          gardenname:"",
          gardenId:"",
          province:"",
          city:"",
          region:"",
          address:'',
          addbuild: false,
        },
        changeG:{
          gardenname:"",
          gardenId:"",
          province:"",
          city:"",
          region:"",
          address:''
        },
        buildingN:'222',
        multipleSelection: [],
        multipleSelection2:[],
        formLabelWidth: '100px',
        addGarden:false,
        addBuild:false,
        changeGarden:false,
        administrator:false,
        formInline: {
          roomId: '',
          roomName:"",
          management:"",
        },
        currentPage3: 1,
        tableData2: [
          {
            phone: '1301799887',
            name: '陆续',
            admintype: '园区管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '大楼管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '园区管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '园区管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '园区管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '园区管理员'
          }, {
            phone: '1301799887',
            name: '陆续',
            admintype: '园区管理员'
          }
        ],
        tableData3: [{
          id:1,
          parkName: '科技园',
          buildingNumber:"34",
          equipmentNumber:"23",
          management:'热',
          tel:"13017082869"
        }, {
          id:1,
          parkName: '软件园',
          buildingNumber:"34",
          equipmentNumber:"23",
          management:'热',
          tel:"13017082869"
        },
          {
            id:1,
            parkName: '南苑',
            buildingNumber:"34",
            equipmentNumber:"23",
            management:'热',
            tel:"13017082869"
          },
          {
            id:1,
            parkName: '北苑',
            buildingNumber:"34",
            equipmentNumber:"23",
            management:'热',
            tel:"13017082869"
          },
          {
            id:1,
            parkName: '东苑',
            buildingNumber:"34",
            equipmentNumber:"23",
            management:'热',
            tel:"13017082869"
          },
          {
            id:1,
            parkName: '西苑',
            buildingNumber:"34",
            equipmentNumber:"23",
            management:'热',
            tel:"13017082869"
          },
          {
            id:1,
            parkName: '江南国际城',
            buildingNumber:"34",
            equipmentNumber:"23",
            management:'热',
            tel:"13017082869"
          },
          {
            id:1,
            parkName: '金色钱塘',
            buildingNumber:"34",
            equipmentNumber:"23",
            management:'热',
            tel:"13017082869"
          },],

      }

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
      onSubmit(submit) {
        console.log(submit);
      },
      //关闭弹框
      handleClose(done) {
        done()
      },
      colseOutin(){
        this.addGarden=false;
          this.addBuild=false;
      },
      submitFrm() {

            console.log(this.dynamicValidateForm);

      },
      //
      getValue : function(value){
        alert(value)
        // alert(value.label)
      },

      add_build(){
        if(this.addG.addbuild==true){
          this.addBuild=true
        }else {
          this.addGarden=false
        }
      },
      //修改
      change(){

        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的大楼删除'
          });
        }else {
          this.changeGarden=true;
          console.log(this.multipleSelection[0].parkName)
          // this.form.buildingname=this.multipleSelection[0].buildingName;
        }
      },
      //  设置管理员
      administratored(){
        console.log(this.multipleSelection)
        if(this.multipleSelection==''){
          this.$message({
            type: 'info',
            message: '请选择大楼要设置的大楼'
          });
        }else {
          this.administrator=true;

        }
      },
      onOpen () {
        console.log(this.multipleSelection)
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
      // 跳转到指定园区的大楼列表页
      goBuildinglist(parkName){
        // this.$router.push("/park/buildingList")
        this.$router.push({name:'buildingList',params:{
            goName:parkName,
            parkid:"123",
          }})
      },

      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
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

      },

    },

  }
</script>

<style scoped>
  .add{
    padding-right: 0.53rem;
  }
  .addB{
    height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }
  .roominput{
    width:160px !important;
  }
  .sibmit{
    /*position: absolute;*/
    /*bottom: 20px;*/
    /*right: 20px;*/
  }
  .add-buliding{
    /*text-align: center;*/
    /*padding-left:0.8rem;*/
  }
</style>
