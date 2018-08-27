<template>
  <div class="equipment">
    <gobackequim></gobackequim>
    <div class="top-nav">
       <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSearch.deviceNum" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="设备类型">
          <el-input v-model="formSearch.typeName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
         <el-form-item>
           <el-button @click="resetForm('formSearch')">重置</el-button>
          </el-form-item>
      </el-form>
    </div>

    <div class="nav-middle">
       <div class="l" style="font-size: 20px;font-weight: 400" v-if="this.$store.state.userinfo.userLevel==2||this.$store.state.userinfo.userLevel==3||this.$store.state.userinfo.userLevel==4">
        <span>{{this.$store.state.parame.room_equimentName}}</span>
        ---设备列表
      </div>
      <ul v-bind:class="classObject">
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
        :data="deviceList"
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
          prop="deviceNum"
          label="设备编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="设备类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mainStatus"
          label="设备状态"
          width="180" :formatter="mainStatus">
        </el-table-column>
        <el-table-column
          prop="inAddress"
          label="所在位置"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">

            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">
              {{scope.row.mainStatus | equipmentStop}}
            </el-button>

            <el-button @click="handleget(scope.row)" type="text" size="small"> 查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              {{scope.row.mainStatus | equipmentHight}}
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
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
import axios from "axios"
  export default {
    name: "equipment",

    data() {
      return {
        total:0,
        loading:true,
        equipmentParam:{
          pageSize:10,
          currentPage:1,
          addressIdList:[],
        },
        formSearch:{
          deviceNum:null,
          name:null,
          typeName:null,
          addressIdList:[],

        },
         classObject:{
              'r': false,
          },
        move:false,
        multipleSelection: [],
        getLnformation:false,
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
        deviceList: [],
        formation:{
          equipmentid:"SB002",

        }
      }
    },
    filters: {
      equipmentStop: function (val) {
        console.log(val)

        return val == 1? '开' : val == 2 ? '关' : val == 3 ? '停': '';
      },
      equipmentHight: function (val) {
        console.log(val)
        return val == 2? '高级': '';
      },
    },
    mounted(){
        var that=this;
        if(that.$store.state.userinfo.userLevel==2||that.$store.state.userinfo.userLevel==3||that.$store.state.userinfo.userLevel==4){
          that.classObject.r=true;
          var obj=[]
          var obj1= {
            id:that.$store.state.parame.room_equimentId,
            addressId:that.$store.state.parame.roomaddressId
          };
          obj.push(obj1)
          that.equipmentParam.addressIdList=obj
          that.formSearch.addressIdList=obj
        }else{
            var list2=that.$store.state.userinfo.addrList;
            var list1=that.$store.state.userinfo.manageScopeIdList;
            var obj=[]
            for(var i=0;i<list1.length;i++){
                var obj2={
                  id:list1[i],
                  addressId:list2[i]
                }
                console.log(obj2)
                obj.push(obj2)
            }
             that.equipmentParam.addressIdList=obj;
             that.formSearch.addressIdList=obj;  
                     
        }
        that.getequipmentlist()        
      },
    methods: {
      // 获取设备列表
      getequipmentlist(){
        var that=this;
        axios.post("/SmartHomeTrade/device/getDeviceList",that.equipmentParam).then(function(res){
          if(res.data.code==0){
            that.deviceList=res.data.data.deviceList
            that.loading=false;
             that.total=res.data.data.count;     
          }

        })


      },
     // 每页几条
        handleSizeChange(val) {
        var that=this;
        that.equipmentParam.pageSize=val;
        that.equipmentParam.currentPage=1;
        that.getequipmentlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.equipmentParam.currentPage=val;
        that.getequipmentlist()
      },
        //查询
        onSubmit() {
          var that=this;
          if(that.formSearch.deviceNum==null&&that.formSearch.name==null&&that.formSearch.typeName==null){
            return;
          }
           that.loading=true;             
          axios.post("/SmartHomeTrade/device/getDeviceList",that.formSearch).then(function(res){
              if(res.data.code==0){
              that.deviceList=res.data.data.deviceList;
                that.loading=false;  
                      
            }
          })
        },
        // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.deviceNum= null,
            that.formSearch.name=null,
             that.formSearch.typeName=null,                    
            that.getequipmentlist()
        },









      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //关闭设备信息框
      handleClose(done) {
            done();
      },
    
      //  转换状态
      mainStatus: function (row, column) {
        return row.mainStatus == 1? '开' : row.mainStatus == 2? '关' : row.mainStatus == 3? '停':""
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
