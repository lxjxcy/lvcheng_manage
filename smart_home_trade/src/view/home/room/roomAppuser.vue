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
        <li class="l" @click="add()" v-if="this.$store.state.userinfo.userLevel==5"><i class="el-icon-plus"></i>添加</li>
        <li class="l" @click="change()"><i class="el-icon-edit"></i>修改</li>
        <li class="l" @click="deleted()"><i class="el-icon-close"></i>删除</li>
        <li class="l" @click="stop()"><i class="el-icon-error"></i>暂停</li>
        <li class="l" @click="recover()"><i class="el-icon-success"></i>恢复</li>
        <addAppuser ref="myaddchild" @refreshList="getApplist"></addAppuser>
      </ul>
    </div>
    <div class="main-table">

      <el-table
        :data="appUserList"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        tooltip-effect="dark"
        height="400"
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
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="联系电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="180" :formatter="formatstate">
        </el-table-column>
        <el-table-column
          label="所属部门"
          prop="departmentName"
          >
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
  export default {
    name: "roomAppuser",
    data() {
      return {
         templateRadio:'',
        templateSelection:{},
        // multipleSelection: [],
        total:0,
        appuserParam:{
          pageSize:10,
          currentPage:1,
          action:"",
          addressList:[],
          addrRegionList:[]
        },
        loading: true,
        formSearch: {
          name: null,
          userMobile:null,
          action:"",
          addressList:[],
          addrRegionList:[]
        },
        appUserList: []
      }
    },
    mounted(){
      var that=this;

      if(that.$store.state.userinfo.userLevel==2){
        that.appuserParam.action=2;
         that.formSearch.action=2;

      }
      if(that.$store.state.userinfo.userLevel==4){
        that.appuserParam.action=4;
         that.formSearch.action=4;
         var list1=that.$store.state.userinfo.manageScopeIdList;
        var list2=that.$store.state.userinfo.addrList;
            
            var obj=[]
            for(var i=0;i<list1.length;i++){
                var obj2={
                  id:list1[i],
                  addressId:list2[i]
                }
                console.log(obj2)
                obj.push(obj2)
            }
             that.appuserParam.addrRegionList=obj;
              that.formSearch.addrRegionList=obj;
      }else{
         that.appuserParam.addressList=that.$store.state.userinfo.manageScopeIdList
         that.formSearch.addressList=that.$store.state.userinfo.manageScopeIdList;
       

      }

      if(that.$store.state.userinfo.userLevel==3){
        that.appuserParam.action=3;
         that.formSearch.action=3;
      }

      if(that.$store.state.userinfo.userLevel==5){
        that.appuserParam.action=5;
         that.formSearch.action=5;
      }
      that.getApplist()

    },
    methods: {
      // 获取app用户列表
      getApplist(){
        var that=this;
        if(that.$store.state.userinfo.userLevel==4){
          var param={
            pageSize:that.appuserParam.pageSize,
            currentPage:that.appuserParam.currentPage,
            action:that.appuserParam.action,
            addrRegionList:that.appuserParam.addrRegionList
          }
        }else{
           var param={
            pageSize:that.appuserParam.pageSize,
            currentPage:that.appuserParam.currentPage,
            action:that.appuserParam.action,
            addressList:that.appuserParam.addressList
          }

        }
        that.axios.post("/SmartHomeTrade/appUser/selectAppUserListByAdrress",param).then(function(res){
          if(res.data.code==0){
            that.$message.success(res.data.message);
            if(res.data.data!=null){
               that.appUserList=res.data.data.appUserList;
            }

           
            that.loading=false

          }else{
            that.$message.error(res.data.message);

          }
           

        })
      },
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
      //搜索
       onSubmit() {
          var that=this;
           that.loading=false;
          if(that.formSearch.name==null&&that.formSearch.userMobile==null){
            return;
          }
          if(that.$store.state.userinfo.userLevel==4){
          var param={
            action:that.formSearch.action,
            addrRegionList:that.formSearch.addrRegionList,
          }
        }else{
           var param={
            action:that.formSearch.action,
            addressList:that.formSearch.addressList
          }

        }
          that.axios.post("/SmartHomeTrade/appUser/selectAppUserListByAdrress",that.formSearch).then(function(res){
            console.log(res)            
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
        that.$refs.myaddchild.getaddAppuser("1");
      },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   console.log(val)
      // },
         getTemplateRow(index,row){                
        this.templateSelection = row;
        console.log(this.templateSelection)
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
      // 修改
      change(){

 this.$message.info("App用户暂时不能修改");


      },

      //  暂停
      stop(){

        var that=this;
        if(that.templateSelection.state==0){
           that.$message.info("该用户已暂停");
            that.clear()
           return;

        }
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
         // 清空选中
         clear(){
         this.$refs.multipleTable.clearSelection();
       },

      //  恢复
      recover(){
        var that=this;
        if(that.templateSelection.state==1){
           that.$message.info("该用户已恢复");
           that.clear()
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

      }
    },
  }
</script>

<style scoped>
  .model-conent{
    padidng:0 0.15rem;
  }

</style>
