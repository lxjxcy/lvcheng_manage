<template>
    <div class="buildingManagement">
      <div class="top-nav">
        <el-form :inline="true" :model="formSearch"  ref="formSearch" class="demo-form-inline">
          <el-form-item label="大楼名称"  prop="yardName">
            <el-input v-model="formSearch.buildingName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="大楼编号"  prop="yardNblockNumame">
            <el-input v-model="formSearch.blockNum" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="管理员"  prop="userName">
            <el-input v-model="formSearch.userName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="园区名称" prop="yardName">
            <el-input v-model="formSearch.yardName" placeholder=""></el-input>
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
        <ul>
          <li class="l" @click="addbuildings()"><i class="iconfont">&#xe612;</i>添加</li>
          <li class="l" @click="change()"><i class="iconfont" >&#xe645;</i>修改</li>
         



          <li class="l" @click=" administratored()">设置管理员</li>
          <li class="l" @click="host()">主机清单</li>
          <changebuild ref="mychild" @refreshList="getBuildlist" @clearselect="clear"></changebuild>
          <addBuild ref="myaddchild" @refreshList="getBuildlist" @clearselect="clear"></addBuild>
          <setUser ref="mysetchild" @refreshList="getBuildlist" @clearselect="clear"></setUser>
        </ul>

      </div>
      <div class="main-table">

        <el-table
          :data="blockList"
          ref="multipleTable"
           v-loading="loading"
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
            prop="blockNum"
            label="大楼编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="buildingName"
            label="大楼名称"
            width="150">
         <template slot-scope="scope">
            <el-button @click="goFloorlist(scope.row.buildingName,scope.row.buildingId)" type="text" size="small">{{scope.row.buildingName}}</el-button>
          </template>

          </el-table-column>
          <el-table-column
            prop="hostName"
            label="主机"
            width="100">
          </el-table-column>
          <el-table-column
            prop="roomNum"
            label="楼层数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="dcNum"
            label="设备数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="yardName"
            label="所在园区"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="管理员"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userMobile"
            label="联系电话">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>

      </div>


    </div>
</template>

<script>
   import axios from 'axios'   
    export default {
        name: "buildingManagement",

      data() {
        return {
          buildParams:{
            pageSize:10,
            currentPage:1,
            yardIdList:[],
            action:1,
          },
          total:0,

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
          loading:true,
          buildingN:'222',
          multipleSelection: [],
          multipleSelection2:[],
          formLabelWidth: '100px',
          addBuilding:false,
          administrator:false,
          formSearch: {
            buildingName: null,
            yardName:null,
            blockNum:null,
            userName:null,
            yardIdList:[],
             action:1,
          },
          add:'',
          blockList: [],
        }

      },
      mounted(){
      var that=this;
      that.formSearch.yardIdList=this.$store.state.userinfo.manageScopeIdList;
      that.buildParams.yardIdList=this.$store.state.userinfo.manageScopeIdList;
      that.getBuildlist()

      },
      methods: {
        // 获取大楼列表
        getBuildlist(){
          var that=this;
          axios.post('/SmartHomeTrade/block/selectBlockCount',that.buildParams).then(function(res){
              if(res.data.code==0){
                 that.blockList=res.data.data.blockList;
                that.loading=false;
               
                that.total=res.data.data.count;
               
              }
          })
      },
         //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.buildParams.pageSize=val;
        that.buildParams.currentPage=1;
        that.getBuildlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.buildParams.currentPage=val;
        that.getBuildlist()
      },
        //选中
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val)
        },
           // 情况选中
         clear(){
         this.$refs.multipleTable.clearSelection();
       },

        onSubmit() {
          var that=this;
           that.loading=false;
          if(that.formSearch.buildingName==null&&that.formSearch.yardName==null&&that.formSearch.blockNum==null&&that.formSearch.userName==null){
            return;
          }
          axios.post("/SmartHomeTrade/block/selectBlockCount",that.formSearch).then(function(res){
            console.log(res)            
            if(res.data.code==0){
              that.loading=false;
              that.blockList=res.data.data.blockList;
               that.total=res.data.count
               that.$message.success(res.data.message);
            }else{
               that.$message.error(res.data.message);
            }
          })
        },
    //清空查询
      resetForm() {
        var that=this;
            that.formSearch.buildingName= null,
            that.formSearch.yardName=null,
            that.formSearch.blockNum=null,
            that.formSearch.userName=null,
        that.getBuildlist()
      },

        handleClose(done) {
            done()
        },
        //修改
        change(){
            if(this.multipleSelection==''){
              this.$message({
                type: 'info',
                message: '请选择要修改的大楼'
              });
            }else {
              var changparam={
                buildingName:this.multipleSelection[0].buildingName,
                yardId:this.multipleSelection[0].yardId,
                yardName:this.multipleSelection[0].yardName,
                buildingId:this.multipleSelection[0].buildingId
              }
              this.$refs.mychild.parentHandleclick(changparam);
            }
        },
        // 添加
        addbuildings(){
         
          this.$refs.myaddchild.addgarden();
        },
     

  // 跳转到指定大楼的楼层列表页
       goFloorlist(buildingName,buildingId){
      // alert(this.$store.state.parame.garden_buildNmae)
        var param={
          build_floorName:buildingName,
          build_floorId:buildingId
        }
        this.$store.commit('setRouterid',param)
        this.$router.push('/park/floorList')
      },
      //  设置管理员
        administratored(){
          if(this.multipleSelection==''){
            this.$message({
              type: 'info',
              message: '请选择大楼要设置的大楼'
            });
          }else {
           
              var param={
               action:3,
               adrressId: this.multipleSelection[0].buildingId,
               manageScopeId: this.multipleSelection[0].buildingId,
             }         
              this.$refs.mysetchild.getAdminList(param);

          }
        },
       

    //  跳转到主机清单页面
        host(){
                
          this.$router.push("/park/HostListing")                
      }
            




    //  删除
        // deleted() {
        //   if(this.multipleSelection!=''){
        //     this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       //发送ajax
        //       this.$message({
        //         type: 'success',
        //         message: '删除成功!'
        //       });
        //     }).catch(() => {
        //       this.$message({
        //         type: 'info',
        //         message: '已取消删除'
        //       });
        //     });
        //   }else {
        //     this.$message({
        //       type: 'info',
        //       message: '请选择要删除的大楼删除'
        //     });
        //   }

        // }
      },

    }
</script>

<style scoped>
  .add-buliding{
    padding-right: 0.53rem;
    /*text-align: center;*/
    /*padding-left:0.8rem;*/
  }

</style>
