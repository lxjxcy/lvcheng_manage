<template>
    <div class="buildingManagement">
      <div class="top-nav">
        <el-form :inline="true" :model="formSearch"  ref="formSearch" class="demo-form-inline">
          <el-form-item label="大楼名称"  prop="yardName">
            <el-input v-model="formSearch.buildingName" placeholder=""></el-input>
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
          <!-- 添加 -->
          <li class="l" @click="addbuildings()" v-if="this.$store.state.extendList.addbuild==1"><i class="el-icon-plus"></i>添加</li>

          <!-- 修改 -->
          <li class="l" @click="change()" v-if="this.$store.state.extendList.changebuild==1"><i class="el-icon-edit"></i>修改</li>

          <!-- 设置管理员 -->
          <li class="l" @click=" administratored()" v-if="this.$store.state.extendList.buildsetuser==1&&this.$store.state.userinfo.userLevel==2"><i class="el-icon-setting"></i>设置管理员</li>

          <!-- 主机清单 -->
          <!-- <li class="l" @click="host()" v-if="this.$store.state.extendList.hostlist==1"><i class="el-icon-tickets"></i>主机清单</li> -->

          <changebuild ref="mychild" @refreshList="getBuildlist" @clearselect="clear"></changebuild>
          <addBuild ref="myaddchild" @refreshList="getBuildlist" @clearselect="clear"  v-if="hackReset" @reload="reloadcom"></addBuild>
          <setUser ref="mysetchild" @refreshList="getBuildlist" @clearselect="clear"></setUser>
        </ul>

      </div>
      <div class="main-table">

        <el-table
          :data="blockList"
          ref="multipleTable"
           v-loading="loading"
          style="width: 100%"
          tooltip-effect="dark"
          height="408"
          border>
          <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.blockNum" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
          <el-table-column
            prop="blockNum"
            label="序号"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            prop="buildingName"
            label="大楼名称"
          
            align="center">
         <template slot-scope="scope">
            <el-button @click="goFloorlist(scope.row.buildingName,scope.row.buildingId)" type="text" size="small">{{scope.row.buildingName}}</el-button>
          </template>

          </el-table-column>
          <el-table-column
            prop="hostId"
            label="主机"
          
            align="center">
          </el-table-column>
          <el-table-column
            prop="roomNum"
            label="楼层数量"
           
            align="center">
          </el-table-column>
          <el-table-column
            prop="dcNum"
            label="设备数量"
           
            align="center">
          </el-table-column>
          <el-table-column
            prop="yardName"
            label="所在园区"
           
            align="center">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="管理员"
           
            align="center">
          </el-table-column>
          <el-table-column
            prop="userMobile"
            label="联系电话"
            align="center">
          </el-table-column>
        </el-table>
        <div class="block" v-if="!startSearch">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      
      </div>
       <div class="block" v-if="startSearch">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"       
          :page-size="100"
          layout="total, prev, pager, next"
          :total="total">
       </el-pagination>
       </div>
      </div>


    </div>
</template>

<script>
   // import axios from 'axios' 
   import addBuild from "../../../components/addBuild.vue"
     import changebuild from "../../../components/changebuild.vue"
    export default {
        name: "buildingManagement",
         components:{
          changebuild,
          addBuild
        },
      data() {
        return {
           hackReset:true,
           startSearch:false,
          buildParams:{//获取大楼列表参数
            pageSize:10,
            currentPage:1,
            yardIdList:[],
            action:1,
          },
          templateRadio:'',//选中
        templateSelection:{},//选中的数据
          total:0,//总页数
          loading:true,//加载
          buildingN:'222',
          multipleSelection: [],
          multipleSelection2:[],
          formLabelWidth: '100px',
          administrator:false,
          formSearch: {//搜索
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
       that.$store.commit('saveIndex',"2-2")
      that.formSearch.yardIdList.push(this.$store.state.parame.parkid);
      that.buildParams.yardIdList.push(this.$store.state.parame.parkid);
      that.getBuildlist()

      },
     computed: {
      listenshowpage1() {
        return this.$store.state.ifswitch;
      }
    },
    watch: {
      listenshowpage1: function(a, b) {
      
        return 1;
       
      }
    },

      methods: {

        // 获取大楼列表
        getBuildlist(){

          var that=this;
          that.axios.post('/SmartHomeTrade/block/selectBlockCount',that.buildParams).then(function(res){
              if(res.data.code==0){
                if(res.data.data!=null){
                   that.blockList=res.data.data.blockList;
                   that.total=res.data.data.count;
                }
                that.loading=false;    
              }else{
                that.$message.error(res.data.message)
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
      
         getTemplateRow(index,row){                
        this.templateSelection = row;
      
       },
            // 刷新组件
       reloadcom(){
        this.hackReset = false
         this.$nextTick(() => {
            this.hackReset = true
         })
       },
           // 情况选中
       clear(){
         this.templateRadio="";
       },

        onSubmit() {
          var that=this;
          if(that.formSearch.buildingName==""){
            that.formSearch.buildingName=null
          }
           if(that.formSearch.yardName==""){
            that.formSearch.yardName=null
          }
           if(that.formSearch.userName==""){
            that.formSearch.userName=null
          }
          
          if(that.formSearch.buildingName==null&&that.formSearch.yardName==null&&that.formSearch.blockNum==null&&that.formSearch.userName==null){
            that.getBuildlist()
            return;
          }
           that.loading=true;
           
          that.axios.post("/SmartHomeTrade/block/selectBlockCount",that.formSearch).then(function(res){
                   
            if(res.data.code==0){
              that.startSearch=true;
              that.loading=false;
              that.blockList=res.data.data.blockList;
               that.total=res.data.data.blockList.length;
               that.$message.success(res.data.message);
            }else{
               that.$message.error(res.data.message);
            }
          })
        },
    //清空查询
      resetForm() {
        var that=this;
            that.formSearch.buildingName= null;
            that.formSearch.yardName=null;
            that.formSearch.blockNum=null;
            that.formSearch.userName=null;
           that.buildParams.pageSize=10;
           that.buildParams.currentPage=1; 
            that.startSearch=false;
        that.getBuildlist()
      },

        handleClose(done) {
            done()
        },
        //修改
        change(){
            if(this.templateRadio==''){
              this.$message({
                type: 'info',
                message: '请选择要修改的大楼'
              });
            }else {
              var changparam={
                buildingName:this.templateSelection.buildingName,
                yardId:this.templateSelection.yardId,
                yardName:this.templateSelection.yardName,
                buildingId:this.templateSelection.buildingId
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
        var that=this;
        if(this.$store.state.extendList.floorManagment==0){
            that.$message.warning("您还没有楼层管理权限")
          return
        }
      // alert(this.$store.state.parame.garden_buildNmae)
        // var param={
        //   build_floorName:buildingName,
        //   build_floorId:buildingId
        // }
         that.$set(that.$store.state.parame,'buildname',buildingName)
        that.$set(that.$store.state.parame,'buildid',buildingId)
         var parame={
              parkname: that.$store.state.parame.parkname,
              parkid: that.$store.state.parame.parkid,
              buildname: buildingName,
              buildid: buildingId,
              floorname: that.$store.state.parame.floorname,
              floorid: that.$store.state.parame.floorid,
              flooraddressId: that.$store.state.parame.flooraddressId,
              roomname: that.$store.state.parame.roomname,
              roomid: that.$store.state.parame.roomid,
              roomaddressId: that.$store.state.parame.roomaddressId
            };
        that.$store.commit('setRouterid',parame)




        that.$router.push('/park/floorList')
      },
      //  设置管理员
        administratored(){
          if(this.templateRadio==''){
            this.$message({
              type: 'info',
              message: '请选择要设置管理员的大楼'
            });
          }else {
            if(this.templateSelection.userName!=null){
              this.$message({
              type: 'info',
              message: '该大楼已有管理员不能重复设置'
            });
            return;
          }
             var manageScopeId=[];
          manageScopeId.push(this.templateSelection.buildingId)
           
              var param={
               action:3,
               adrressId: this.templateSelection.buildingId,
               manageScopeIdList: manageScopeId,
                userLevel:3
             }  
              var uuid=this.templateSelection.userUuid         
              this.$refs.mysetchild.getAdminList(param,uuid);

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
    padding-right: 53px;
    /*text-align: center;*/
    /*padding-left:0.8rem;*/
  }

</style>
