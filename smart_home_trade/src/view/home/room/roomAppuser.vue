<template>
  <div class="roomAppuser">
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formSearch.userMobile" placeholder=""></el-input>
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
        <li class="l" @click="add()"><i class="el-icon-plus"></i>添加</li>
        <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.room_addappuser==1"  -->
        <li class="l" @click="change()" v-if="(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.park_changeappuser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.build_changeappuser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floor_changeappuser==1)||(this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.room_addappuser==1)">
          <i class="el-icon-edit" ></i>修改</li>


        <li class="l" @click="deleted()" v-if="(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.park_deleteappuser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.build_deleteappuser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floor_deleteappuser==1)||(this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.room_deleteappuser==1)">
           <i class="el-icon-close" > </i>删除</li>


         

        <li class="l" @click="stop()" v-if="(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.park_stopappuser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.build_stopappuser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floor_stopappuser==1)||(this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.room_stopappuser==1)">
             <i class="el-icon-error"></i>暂停</li>




        <li class="l" @click="recover()" v-if="(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.park_recoveredappuser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.build_recoveredappuser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floor_stopappuser==1)||(this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.room_recoveredappuser==1)">
          <i class="el-icon-success"></i>恢复</li>


         <li class="l" @click="createDepart()">
          <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.changedement==1" -->
          <i class="el-icon-edit-outline"></i>创建部门</li>


          <li class="l" @click="uploads()">
          <i class="el-icon-upload2" > </i>批量导入</li>

         <!--  <li class="l" @click="exportdata()">
          <i class="el-icon-download" > </i>下载模板</li> -->
        <addAppuser ref="myaddchild" @refreshList="getApplist"  @clearselect="clear"></addAppuser>
        <changeappuser ref="mychangechild" @refreshList="getApplist"  @clearselect="clear"></changeappuser>
         <createDepartment ref="mycreatechild"  @refreshList="getApplist"  @clearselect="clear"></createDepartment>
      </ul>
    </div>
     <load ref="myloadchild" @refreshList="getApplist" v-if="hackReset" @reload="reloadcom"></load>
    <div class="main-table">

      <el-table
        :data="appUserList"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        tooltip-effect="dark"
        height="408"
        border>
        <!-- <el-table-column
          type="selection"
          width="50">
        </el-table-column> -->
        <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.uuid" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          width="55"
           align="center">
          <template  slot-scope="scope"><span>{{scope.$index+(appuserParam.currentPage - 1) * appuserParam.pageSize + 1}} </span></template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="联系电话"
         
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
         :formatter="formatstate"
          align="center">
        </el-table-column>
        <el-table-column
          label="所属部门"
          prop="departmentName"
          align="center"
         >
        </el-table-column>
         <el-table-column
          prop="action"
          label="用户来源"
         
          align="center" 
          :formatter="formataction">
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


  </div>
</template>

<script>
import changeappuser from "../../../components/changeappuser.vue"
import load from "./load.vue"

  export default {
    name: "roomAppuser",
    components:{
      changeappuser,
      load
    },
    data() {
      return {
         templateRadio:'',
         hackReset:true,
        templateSelection:{},
        // multipleSelection: [],
        total:0,
        appuserParam:{
          pageSize:10,
          currentPage:1,
          createUser:null,
        },
        loading: true,
        formSearch: {
          name: null,
          userMobile:null,
          createUser:null
        },
        appUserList: []
      }
    },
    beforeMount(){

      if(this.$store.state.userinfo.userLevel==2){
         this.$store.commit('saveIndex',"2-4")
      }
      if(this.$store.state.userinfo.userLevel==4){
         this.$store.commit('saveIndex',"4-4")
      }

      if(this.$store.state.userinfo.userLevel==3){
         this.$store.commit('saveIndex',"3-4")
      }
      if(this.$store.state.userinfo.userLevel==5){
         this.$store.commit('saveIndex',"5-4")
      }

    },
    mounted(){
      var that=this;
      that.appuserParam.createUser=that.$store.state.userinfo.userMobile
       that.formSearch.createUser=that.$store.state.userinfo.userMobile

      that.getApplist()

    },
    methods: {
      // 获取app用户列表
      getApplist(){
        var that=this;
        that.axios.post("/SmartHomeTrade/appUser/selectUserByCreateUser",that.appuserParam).then(function(res){
          if(res.data.code==0){
            // that.$message.success(res.data.message);
            if(res.data.data!=null){
               that.appUserList=res.data.data.appUserList;
               that.total=res.data.data.count

            }else{
              that.appUserList=[]
            }

           
            that.loading=false

          }else{
            that.$message.error(res.data.message);

          }
           

        })
      },
         // 刷新组件
       reloadcom(){
        this.hackReset = false
         this.$nextTick(() => {
            this.hackReset = true
         })
       },
       //
          //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.appuserParam.pageSize=val;
        that.appuserParam.currentPage=1;
        that.getApplist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.appuserParam.currentPage=val;
        that.getApplist()
      },
      // 情况选中
       clear(){
         this.templateRadio="";
       },
      //搜索
       onSubmit() {
          var that=this;
           that.loading=false;
           if(that.formSearch.name==''){
            that.formSearch.name=null
           }
            if(that.formSearch.userMobile==''){
            that.formSearch.userMobile=null
           }
          if(that.formSearch.name==null&&that.formSearch.userMobile==null){
             that.getApplist()
            return;
          }
          that.axios.post("/SmartHomeTrade/appUser/selectUserByCreateUser",that.formSearch).then(function(res){
            
            if(res.data.code==0){
              that.loading=false;
              if(res.data.data!=null){
                that.appUserList=res.data.data.appUserList;
              }
              
             
               // that.$message.success(res.data.message);
            }else{
               that.$message.error(res.data.message);
            }
          })
        },
    //清空查询
      resetForm() {
        var that=this;
            that.formSearch.name= null,
            that.formSearch.userMobile=null,
        that.getApplist()
      },
      // 添加
      add(){
       var that=this;     
        that.$refs.myaddchild.getaddAppuser();
      },
         getTemplateRow(index,row){                
        this.templateSelection = row;
      
      
       },
       // 创建部门
       createDepart(){
       this.$refs.mycreatechild.opendialogVisible();
    },
   
   

      //  删除
      deleted() {
        var that=this;
        if(that.templateRadio!=''){
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var param={
              loginName:that.templateSelection.loginName,
              ucUserId:that.templateSelection.ucUserId
            }
            that.axios.post("/SmartHomeTrade/appUser/deleteUserState",param).then(function(res){
              if(res.data.code==0){
               that.$message.success(res.data.message);
                that.getApplist()
              }else{
                that.$message.error(res.data.message);
              }
            })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          that.$message({
            type: 'info',
            message: '请选择要删除的用户'
          });
        }
      },
      //  转换状态
      formatstate: function (row, column) {
        return  row.state == 1 ? '正常' : row.state == 2? '暂停':""
      },
       formataction: function (row, column) {
        return  row.action == 1 ? '授权' : "创建"
      },
      
       // 修改
      change(){
        if(this.templateRadio==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的用户'
          });
        }else {
          if(this.templateSelection.createUser!==this.$store.state.userinfo.userMobile){
            this.$message.warning("该用户不是您创建的，无法修改")
            return;
          }

          var param=this.templateSelection
         this.$refs.mychangechild.getchangeAppuser(param);
        }
      },

      //  暂停
      stop(){

        var that=this;
        if(that.templateSelection.state==2){
           that.$message.info("该用户已暂停");
           return;

        }
        debugger
        if(that.templateRadio!=''){
          that.$confirm('您确定要暂停该用户么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var param={
              loginName:that.templateSelection.loginName,
              ucUserId:that.templateSelection.ucUserId
            }
            that.axios.post("/SmartHomeTrade/appUser/updateUserState",param).then(function(res){
              if(res.data.code==0){
               that.$message.success(res.data.message);
                that.getApplist()
                 that.templateRadio='';
               that.templateSelection={};
              }else{
                that.$message.error(res.data.message);
              }
            })
          }).catch(() => {
             that.clear()
            that.$message({
              type: 'info',
              message: '已取消暂停'
            });
          });
        }else {
          that.$message({
            type: 'info',
            message: '请选择要暂停的用户'
          });
        }

      },
   
   

      //  恢复
      recover(){
        var that=this;
        if(that.templateSelection.state==1){
           that.$message.info("该用户已恢复");
           return;
        }
        if(that.templateRadio!=''){
          that.$confirm('您确定要恢复该用户么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var param={
              loginName:that.templateSelection.loginName,
              ucUserId:that.templateSelection.ucUserId
            }
            that.axios.post("/SmartHomeTrade/appUser/recoverUserState",param).then(function(res){
              if(res.data.code==0){
               that.$message.success(res.data.message);
                that.getApplist()
                that.templateRadio='';
               that.templateSelection={};
              }else{
                that.$message.error(res.data.message);
              }
            })
          }).catch(() => {
             that.clear()
            that.$message({
              type: 'info',
              message: '已取消恢复'
            });
          });
        }else {
          that.$message({
            type: 'info',
            message: '请选择要恢复的用户'
          });
        }

      },
           // 导入
    uploads(){
    
       this.$refs.myloadchild.openDia();

    },

// 下载摸版
    exportdata() {
      this.axios.get('/SmartHomeTrade/user/downloadTemplate',{responseType: 'blob'}).then((res) => {

                  let fileName = 'appUserInfo.xls'
                  let blob = new Blob([res.data], { type: 'application/x-xls' })
                    if (window.navigator.msSaveOrOpenBlob) {
                      navigator.msSaveBlob(blob, fileName);
                    } else {
                      var link = document.createElement('a');
                      link.href = window.URL.createObjectURL(blob);
                      link.download = fileName;
                      link.click();
                      window.URL.revokeObjectURL(link.href);
                    }
              })
      // this.axios.get("/SmartHomeTrade/user/downloadTemplate",{responseType: 'blob'}).then((res) => {
      //             let fileName = 'App用户列表.xls';
      //             let blob = new Blob([res.data], { type: 'application/x-xls' })
      //               if (window.navigator.msSaveOrOpenBlob) {
      //                 navigator.msSaveBlob(blob, fileName);
      //               } else {
      //                 var link = document.createElement('a');
      //                 link.href = window.URL.createObjectURL(blob);
      //                 link.download = fileName;
      //                 link.click();
      //                 window.URL.revokeObjectURL(link.href);
      //               }
      //             }
        // require.ensure([], () => {
        //   const { export_json_to_excel } = require('@/vendor/Export2Excel');
        //   const tHeader = ['姓名', '联系电话', '状态', '所属部门'];
        //   const filterVal = ['name', 'userMobile', 'state', 'departmentName'];
        //   const list = this.appUserList;
        //   const data = this.formatJson(filterVal, list);
        //   export_json_to_excel(tHeader, data, 'app用户列表');
        // })
        },


        // formatJson(filterVal, jsonData) {
        //   return jsonData.map(v => filterVal.map(j => v[j]))
        // }
  

    },





























  }
</script>

<style scoped>
  .model-conent{
    padidng:0 0.15rem;
  }

</style>
