<template>
  <div class="gardenUser">
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="用户名">
          <el-input v-model="formSearch.loginName" placeholder=""></el-input>
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
      <ul >
        <!-- 添加 -->
        <li class="l" @click="createUser()"  v-if="this.$store.state.userinfo.userLevel==1||(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.parkAdduser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.buildAdduser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floorAdduser==1)"><i class="el-icon-plus" ></i>添加</li>

        <!--修改-->
      <!--   <li class="l"  @click="change()"  v-if="this.$store.state.userinfo.userLevel==1||(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.parkChangeuser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.buildChangeuser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floorChangeuser==1)"><i class="el-icon-edit" ></i>修改</li> -->
        <!--删除-->
      <!--   <li class="l"  @click="deleted()" v-if="this.$store.state.userinfo.userLevel==1||(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.parkDeleteuser==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.buildDeleteuser==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floorDeleteuser==1)"><i class="el-icon-close" ></i>删除</li> -->

      <!-- 设置权限 -->
        <li class="l"  @click="setAccess()" v-if="this.$store.state.userinfo.userLevel==1||(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.parkSetaccess==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.buildSetaccess==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floorSetaccess==1)"><i class="el-icon-setting"></i>设置权限</li>
      </ul>
        <adduser ref="mychild" @refreshList="getUserlist" @clearselect="clear"></adduser>
        <changeuser ref="mychangechild" @refreshList="getUserlist" @clearselect="clear"></changeuser>
        <usersetScope ref="mysetScope" @refreshList="getUserlist" @clearselect="clear" v-if="hackReset" @reload="reloadcom"></usersetScope>
        <userlookScope ref="mylookScope" @refreshList="getUserlist" @clearselect="clear" v-if="hackReset" @reload="reloadcom"></userlookScope>
        <usersetAccess ref="mysetAccess" @refreshList="getUserlist" @clearselect="clear"></usersetAccess>

    </div>
    <div class="main-table">

      <el-table
        :data="listNextAdmin"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"      
        tooltip-effect="dark"
        height="408"
        border>
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.uuid" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          width="55"
           align="center">
          <template  slot-scope="scope">
            <span  v-if="!startSearch">{{scope.$index+(userParams.currentPage - 1) * userParams.pageSize + 1}} </span>
             <span v-if="startSearch">{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        
           align="center">
        </el-table-column>
         <el-table-column
          prop="loginName"
          label="用户名"
         
           align="center">
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="联系电话"
         
           align="center">
        </el-table-column>
        <el-table-column
          label="类型"
        
           align="center">
          <template slot-scope="scope">
            {{scope.row.userLevel | userlevelStop}}
          </template>
        </el-table-column>
        <el-table-column
          label="管辖范围"
           align="center">
          <template slot-scope="scope" style="text-align: center">
            <el-button @click="lookScope(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="setScope(scope.row)" type="text" size="small">设置</el-button>
          </template>

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
  // import axios from  'axios'
  import adduser from "../../../components/adduser.vue"
    import changeuser from "../../../components/changeuser.vue"
    import usersetAccess from "./usersetAccess.vue"
     import userlookScope from "./userlookScope.vue"
      import usersetScope from "./usersetScope.vue"
  export default {
    name: "gardenUser",
    components:{
      adduser,
      changeuser,
      userlookScope,
      usersetScope,
      usersetAccess,
    },
    data() {
      return {
        templateRadio:'',//选中
        startSearch:false,
        hackReset:true,
         templateSelection:{},//选中的这条数据
        total:0,//总页数
        userParams:{//获取管理员列表参数
          pageSize:10,
          currentPage:1,
          createUser:'',
           beScopeId:null,
        },   
        loading: true,//加载 
        formSearch: {//搜索
          name: null,
          userMobile:null,
          createUser:'',
          loginName:null,
          beScopeId:null,
        },
        listNextAdmin: []//管理员数据
      }
    },
    mounted(){
       if(this.$store.state.userinfo.userLevel==1){
         this.$store.commit('saveIndex',"1-2")
         this.formSearch.beScopeId=null;
       }
        if(this.$store.state.userinfo.userLevel==2){
         this.$store.commit('saveIndex',"2-3")
          this.userParams.beScopeId=this.$store.state.parame.parkid;
           this.formSearch.beScopeId=this.$store.state.parame.parkid;
       }
        if(this.$store.state.userinfo.userLevel==3){
         this.$store.commit('saveIndex',"3-3")
          this.userParams.beScopeId=this.$store.state.parame.buildid;
           this.formSearch.beScopeId=this.$store.state.parame.buildid;
       }
        if(this.$store.state.userinfo.userLevel==4){
         this.$store.commit('saveIndex',"4-3")
          this.userParams.beScopeId=this.$store.state.parame.floorid;
           this.formSearch.beScopeId=this.$store.state.parame.floorid;
       }
      
      this.userParams.createUser=this.$store.state.userinfo.userMobile;
      this.formSearch.createUser=this.$store.state.userinfo.userMobile;
      this.getUserlist()
    },
    filters: {
      userlevelStop: function (val) {
        return val== 1 ? 'admin' : val == 2? '园区管理员' :val == 3? '大楼管理员' : val == 4? '楼层管理员' : val == 5? '房间管理员':""
      },
    },
    methods: {
      // 获取用户列表
      getUserlist(){
        var that=this;
          that.axios.post("/SmartHomeTrade/user/selectNextAdmin",that.userParams).then(function (res) {
            
            if(res.data.code==0){
              that.loading=false;
              if(res.data.data!=null){
                 that.listNextAdmin =res.data.data.listNextAdmin;
                 
                 that.total=res.data.data.Count;
              }

            }else{
              that.$message.error(res.data.message)
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

      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.userParams.pageSize=val;
        that.userParams.currentPage=1;
        that.getUserlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.userParams.currentPage=val;
        that.getUserlist()
      },
     // 选中
       getTemplateRow(index,row){                
        this.templateSelection = row;
       
       },
      //关闭弹框
      handleClose(done) {
        done();
      },
      // 添加用户
      createUser(){
          this.$refs.mychild.addloginUser();

      },
      //查询
      onSubmit() {
        var that=this;
        if(that.formSearch.name==""){       
          that.formSearch.name=null        
        }
         if(that.formSearch.userMobile==""){
          that.formSearch.userMobile=null
        }
          if(that.formSearch.loginName==""){
          that.formSearch.loginName=null
        }
        if(that.formSearch.name!=null||that.formSearch.userMobile!=null||that.formSearch.loginName!=null){

          that.loading=true;
          
         
              that.axios.post('/SmartHomeTrade/user/selectNextAdminByNmOrMobile',that.formSearch).then(function (res) {
                    
              if(res.data.code==0){
                that.startSearch=true;
                 that.loading=false  
                if(res.data.data!=null){
                 that.listNextAdmin=res.data.data.AdminList;
                
                 if(res.data.data.AdminList==null){
                  that.total=0;
                 }else{
                   that.total=res.data.data.AdminList.length; 
                 }
                }
              }else{
                that.$message.error(res.data.message)
              }
            })
        }else{
           that.getUserlist()
            that.startSearch=false;
        }
      },
      //清空查询
      resetForm() {
        var that=this;
        that.formSearch.name=null;        
        that.formSearch.userMobile=null;
        that.formSearch.loginName=null;
           that.userParams.pageSize=10;
        that.userParams.currentPage=1; 
        that.startSearch=false; 
        that.getUserlist()
      },
 
      //  管理员转换状态
      userLevel: function (row, column) {
        return row.userLevel == 1 ? 'admin' : row.userLevel == 2? '园区管理员' : row.userLevel == 3? '大楼管理员' : row.userLevel == 4? '楼层管理员' : row.userLevel == 5? '房间管理员':""
      },
      // 修改
      change(){
        if(this.templateRadio==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的用户'
          });
        }else {
          var param={
            uuid:this.templateSelection.uuid,
            name: this.templateSelection.name,
            userMobile: this.templateSelection.userMobile,
            userLevel:this.templateSelection.userLevel,
            userId:this.templateSelection.userId,
          }
         this.$refs.mychangechild.updataUser(param);
        }
      },
      //  删除
      deleted() {
        var that=this;
        if(that.templateRadio!=''){
          if(that.templateSelection.userLevel==3){
              that.$message.warning("大楼管理员不能删除")
              return;
            }
         
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发送ajax
            that.axios.post('/SmartHomeTrade/user/deleteAdmin',{
              uuid:that.templateSelection.uuid
            }).then(function (res) {
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getUserlist()
            })

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
           that.$message({
            type: 'info',
            message: '请选择要删除的用户'
          });
        }
      },

      // 情除选中
      clear(){
         this.templateRadio="";
       },

    //  设置权限
      setAccess(){

          if(this.templateRadio==""){
            this.$message({
              type: 'info',
              message: '请选择用户'
            });
          }else {
           
            var param={
              userId:this.templateSelection.uuid,
              userLevel:this.templateSelection.userLevel
            }
          
            
            this.$refs.mysetAccess.getopen(param);
            

          }
        },

        //查看管辖范围
        lookScope(row){
        if(this.$store.state.userinfo.userLevel==1||(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.parkSetaccess==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.buildSetaccess==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floorSetaccess==1)){
            this.$refs.mylookScope.getopen(row);
          }else{
            that.$message.warning("您还没有权限")
            return
          }     
        },
    // 设置管辖范围
        setScope(row){
     
       if(this.$store.state.userinfo.userLevel==1||(this.$store.state.userinfo.userLevel==2&&this.$store.state.extendList.parkSetaccess==1)||(this.$store.state.userinfo.userLevel==3&&this.$store.state.extendList.buildSetaccess==1)||(this.$store.state.userinfo.userLevel==4&&this.$store.state.extendList.floorSetaccess==1)){
            this.$refs.mysetScope.getopen(row);
            
          }else{
             that.$message.warning("您还没有权限")
              return
          }
     
     
     }
    },
  }
</script>

<style scoped>

</style>
