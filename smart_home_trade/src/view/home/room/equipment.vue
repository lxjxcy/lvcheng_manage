<template>
  <div class="equipment">
    <div class="top-nav">
      <el-form-item label="编号">
        <el-input v-model="formInline.equipmentId" placeholder=""></el-input>
      </el-form-item>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.equipmentName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="formInline.address" placeholder="">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="nav-middle">
      <ul>
        <li class="l" @click="move = true"><i class="iconfont">&#xe612;</i>迁移设备</li>
        <el-dialog
          title="设备迁移"
          :visible.sync="move"
          width="30%"
          :before-close="handleClose">
          <div class="move">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="move = false">取 消</el-button>
            <el-button type="primary" @click="move = false">确 定</el-button>
          </span>
        </el-dialog>


        <li class="l"  @click="eAuthorization()"><i class="iconfont">&#xe645;</i>设备授权</li>
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
          type="index"
          label="设备编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="equipmentType"
          label="设备类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="equipmentState"
          label="设备状态"
          width="180" :formatter="equipmentState">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所在位置"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">

            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">
              {{scope.row.equipmentState | equipmentStop}}
            </el-button>

            <el-button @click="handleget(scope.row)" type="text" size="small"> 查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              {{scope.row.equipmentState | equipmentHight}}
            </el-button>
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

    <!--查看设备框-->
    <el-dialog
      title="设备信息"
      :visible.sync="getLnformation"
      width="30%"
      :before-close="handleClose">
        <div class="getLnformation">
          <ul>
            <li>设备编号：Bs001</li>
            <li>主机厂商：控客</li>
            <li>设备名称：走廊灯</li>
            <li>官网名称：专用</li>
            <li>设备类型：灯</li>
            <li>官网地址：130,233,222,4444</li>
            <li>设备状态：开</li>
            <li>所属主机：主机202</li>
            <li>设备地址：锦绣国际</li>
          </ul>


        </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="getLnformation = false">确定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "equipment",

    data() {
      return {
        move:false,
        multipleSelection: [],
        getLnformation:false,
        formInline: {
          equipmentId: '',
          equipmentName:"",
          address: ''
        },
        data2: [{
          id: 1,
          label: '高科技产业园1',
          children: [{
            id: 2,
            label: '一号楼',
            children: [{
              id: 3,
              label: '第一层',
              children:[
                {
                  id: 4,
                  label: '101',
                },
                {
                  id: 5,
                  label: '102',
                },

              ]
            }, {
              id: 6,
              label: '第二层',
              children:[
                {
                  id: 7,
                  label: '201',
                },
                {
                  id: 8,
                  label: '202',
                },

              ]
            }]
          },
            {
              id: 9,
              label: '一号楼',
              children: [{
                id: 10,
                label: '第一层',
                children:[
                  {
                    id: 11,
                    label: '101',
                  },
                  {
                    id: 12,
                    label: '102',
                  },

                ]
              }, {
                id: 13,
                label: '第二层',
                children:[
                  {
                    id: 14,
                    label: '201',
                  },
                  {
                    id: 15,
                    label: '202',
                  },

                ]
              }]
            },

          ]},
          {
            id: 16,
            label: '高科技产业园2',
            children: [{
              id: 17,
              label: '一号楼',
              children: [{
                id: 18,
                label: '第一层',
                children:[
                  {
                    id: 19,
                    label: '101',
                    disabled: true
                  },
                  {
                    id: 20,
                    label: '102',
                  },

                ]
              }, {
                id: 21,
                label: '第二层',
                children:[
                  {
                    id: 22,
                    label: '201',
                  },
                  {
                    id: 23,
                    label: '202',
                  },

                ]
              }]
            },
              {
                id: 24,
                label: '一号楼',
                children: [{
                  id: 25,
                  label: '第一层',
                  children:[
                    {
                      id: 26,
                      label: '101',
                    },
                    {
                      id: 27,
                      label: '102',
                    },

                  ]
                }, {
                  id: 28,
                  label: '第二层',
                  children:[
                    {
                      id: 29,
                      label: '201',
                    },
                    {
                      id: 30,
                      label: '202',
                    },

                  ]
                }]
              },

            ]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentPage3: 1,
        tableData3: [{
          equipmentName: '8号',
          equipmentType:"23",
          equipmentState:"1",
          address: '杭州市滨江区锦绣国际202',
        }, {
          equipmentName: '8号',
          equipmentType:"23",
          equipmentState:"1",
          address: '杭州市滨江区锦绣国际202',
        },
          {
            equipmentName: '8号',
            equipmentType:"23",
            equipmentState:"1",
            address: '杭州市滨江区锦绣国际202',
          },
          {
            equipmentName: '8号',
            equipmentType:"23",
            equipmentState:"0",
            address: '杭州市滨江区锦绣国际202',
          },
          {
            equipmentName: '8号',
            equipmentType:"23",
            equipmentState:"1",
            address: '杭州市滨江区锦绣国际202',
          },
          {
            equipmentName: '8号',
            equipmentType:"23",
            equipmentState:"1",
            address: '杭州市滨江区锦绣国际202',
          },
          {
            equipmentName: '8号',
            equipmentType:"23",
            equipmentState:"0",
            address: '杭州市滨江区锦绣国际202',
          },
          {
            equipmentName: '8号',
            equipmentType:"23",
            equipmentState:"1",
            address: '杭州市滨江区锦绣国际202',
          },],
        formation:{
          equipmentid:"SB002",

        }
      }
    },
    filters: {
      equipmentStop: function (val) {
        console.log(val)

        return val == 1? '关闭' : val == 0 ? '开启' : '';
      },
      equipmentHight: function (val) {
        console.log(val)
        return val == 1? '高级': '';
      },
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
      //关闭设备信息框
      handleClose(done) {
            done();
      },
      //搜索
      onSubmit() {
        console.log('submit!');
      },
      //  转换状态
      equipmentState: function (row, column) {
        return row.equipmentState == 0 ? '关闭' : row.equipmentState == 1? '开启' :""
      },
    //  查看设备
      handleget(row){
        console.log(row)
          this.getLnformation=true;
     }
     ,
    //  设备授权
      eAuthorization(){
        this.$router.push({name:'EquipmentAuthorization',params:{
            id:"123",
          }})
      }
    },
  }
</script>

<style scoped>

</style>
