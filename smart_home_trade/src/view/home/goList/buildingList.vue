
<template>
  <div class="buildingManagement">
    <!--系统管理员-->
    <div class="goback" v-if="headuserLevel==1">
      <Breadcrumb separator=">">
        <span>当前位置：</span>
        <BreadcrumbItem to="/garden/gardenManagement">园区管理</BreadcrumbItem>
        <BreadcrumbItem>大楼列表</BreadcrumbItem>
      </Breadcrumb>
    </div>


    <div class="top-nav">
      <el-form :inline="true" :model="searchlist" class="demo-form-inline" ref="searchlist">
        <el-form-item label="大楼名称">
         <el-input v-model="searchlist.blockName" placeholder=""></el-input>
       </el-form-item>
        <el-form-item label="大楼编号">
          <el-input v-model="searchlist.blockId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="searchlist.adminName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onclear()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-middle">
      <div class="l" style="font-size: 20px;font-weight: 400"><span v-model="paramed">{{this.$store.state.parame.garden_buildNmae}}</span>-----大楼列表</div>
      <ul class="r">
        <li class="l" @click="addBuilding = true"><i class="iconfont">&#xe612;</i>添加大楼</li>
        <li class="l" @click="change()"><i class="iconfont" >&#xe645;</i>修改</li>
        <li class="l" @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l" @click=" administratored()">设置管理员</li>
      </ul>

    </div>
    <div class="main-table">

      <el-table
        :data="listBlockCount"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange()"
        tooltip-effect="dark"
        height="380"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="blockId"
          label="大楼编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="blockName"
          label="大楼名称"
          width="100">
          <template slot-scope="scope">
            <el-button @click="goFloorlist(scope.row.blockName,scope.row.blockId)" type="text" size="small">{{scope.row.blockName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="blockCcuName"
          label="主机"
          width="100">
        </el-table-column>
        <el-table-column
          prop="floorCount"
          label="楼层数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dcCount"
          label="设备数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="管理员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminMobile"
          label="联系电话"
          >
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listBlockCount"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>


  </div>
</template>

<script>
  import axios from  'axios'
  export default {
    name: "buildingManagement",

    data() {
      return {
        headuserLevel:1,
        loading:false,
        total:0,
        builparams:{
          pageSize:10,
          gardenId:'',
          currentPage:1,
        },
        url:'',
        buildingN:'222',
        multipleSelection: [],
        searchlist: {
          gardenId: null,
          blockName: null,
          blockId:null,
          adminName:null,
        },

        listBlockCount: [
          {
            blockId:"12",
            blockName:'1号大楼',
            blockCcuName:'999',
            floorCount:'334',
            dcCount:'222',
            adminName:"333",
            adminMobile:"211"
          },
           {
            blockId:"12",
            blockName:'1号大楼',
            blockCcuName:'999',
            floorCount:'334',
            dcCount:'222',
            adminName:"333",
            adminMobile:"211"
          },
           {
            blockId:"12",
            blockName:'1号大楼',
            blockCcuName:'999',
            floorCount:'334',
            dcCount:'222',
            adminName:"333",
            adminMobile:"211"
          }
        ],
        paramed:"",

      }

    },

    mounted(){
      console.log(this.$store.state.parame)
      console.log("1111")
      // this.paramed=this.$store.state.parame.garden_buildId
      // console.log(this.$route.params.parkid)
      // this.searchlist.gardenId=this.$store.state.parame.garden_buildId
      this.builparams.gardenId=this.$store.state.parame.garden_buildId
      this.getbuildList()
      this.url=`/garden/gardenManagement`
    },
    methods: {
       // 跳转到指定大楼的楼层列表页
       goFloorlist(blockName,blockId){
      // alert(this.$store.state.parame.garden_buildNmae)
      this.$set(this.$store.state.parame,'build_floorName',this.$store.state.parame.garden_buildNmae+blockName)
      this.$set(this.$store.state.parame,'build_floorId',blockId)
      this.$router.push({name:'floorList'})
    },
      //获取大楼列表
      getbuildList(){
        console.log("ssss")
        var that=this;
        axios.post('/garden/selectBlockCount',that.builparams).then(function (res) {

          if(res.data.code==0){
            that.loading=false;
          }
          // that.listBlockCount=res.data.data.listBlockCount;
          //   that.total=res.data.data.Count
          //    that.loading=false;
        })
      },
      //每页显示几条
      handleSizeChange(val) {
        var that=this;
        that.builparams.pageSize=val;
        that.builparams.currentPage=1;
        that.getbuildList()
      },
      //选中当前页
      handleCurrentChange(val) {
        var that=this;
        that.builparams.currentPage=val;
        that. getbuildList()
      },
      //查询
      onSubmit() {
        var that=this;
        that.loading=true
        axios.post("/garden/selectBlByIdOrNameOrAdmin",that.searchlist).then(function (res) {
          console.log(res)
          that.listBlockCount=res.data.data;
          that.loading=false;
        })
      },
      //清空查询
      onclear(){
        var that=this;
        that.searchlist.blockName=null;
        that.searchlist.blockId=null;
        that.searchlist.adminName=null;
        that.getbuildList()
        },
      },
      //选中列表某一行
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //修改

      //  设置管理员

      // 跳转到指定大楼的楼层列表页
    // goFloorlist(blockName,blockId){

    //   alert("1111")
    //   this.$set(this.$store.state.parame,'build_floorName',blockName+this.$store.state.parame.garden_buildName)
    //   this.$set(this.$store.state.parame,'build_floorId',blockId)
    //   this.$router.push({name:'floorList'})
    // },
  }
</script>

<style scoped>
  .add-buliding{
    /*text-align: center;*/
    padding-left:0.8rem;
  }
</style>

