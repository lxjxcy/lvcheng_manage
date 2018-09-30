<template>
  <div class="authorization">
    <div class="goBack">
      <div class="goback">
          <Breadcrumb separator=">">
              <span>当前位置：</span>
              <BreadcrumbItem to="/park/authorManagement/user" v-if="this.$store.state.userinfo.userLevel==2">授权管理</BreadcrumbItem>
               <BreadcrumbItem to="/building/authorManagement/user" v-if="this.$store.state.userinfo.userLevel==3">授权管理</BreadcrumbItem>
                <BreadcrumbItem to="/floor/authorManagement/user" v-if="this.$store.state.userinfo.userLevel==4">授权管理</BreadcrumbItem>
                 <BreadcrumbItem to="/room/authorManagement/user" v-if="this.$store.state.userinfo.userLevel==5">授权管理</BreadcrumbItem>
              <BreadcrumbItem>授权信息列表</BreadcrumbItem>
          </Breadcrumb>
        </div>
    </div>


    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="授权人">
          <el-input v-model="formSearch.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="授权设备">
          <el-input v-model="formSearch.deviceName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
           <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav-middle">
      <ul>
       
        <changeAuthor ref="mychangechild" @refreshList="getAuthrizationlist"></changeAuthor>
        
        <li class="l" @click="change()"><i class="iconfont">&#xe645;</i>修改</li>
         <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1" -->
        <li class="l" @click="delet()"><i class="el-icon-close" > </i>删除</li>

         <!-- v-if="this.$store.state.userinfo.userLevel==5&&this.$store.state.extendList.movequement==1" -->
      </ul>
    </div>
    <div class="main-table">
      <el-table
        :data="appUserList"
        ref="multipleTable"
        v-loading="loading"
        style="width: 100%"
        tooltip-effect="dark"
        height="380"
        border>
        <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.ucUserId" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
       </el-table-column>
        <el-table-column
          label="序号"
          width="55"
           align="center">
          <template  slot-scope="scope"><span>{{scope.$index+(Authrizationparam.currentPage - 1) * Authrizationparam.pageSize + 1}} </span></template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="授权人"
          width="271"
           align="center">
        </el-table-column>
        
        
        <el-table-column
          prop="userDcRequest"
          label="授权设备"
           align="center"
           width="271">
           <template slot-scope="scope">
            <el-dropdown class="outlook">
              <span class="el-dropdown-link">
                查看<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="look" placement="bottom">
                <el-dropdown-item v-for="(item,index) in scope.row.userDcRequest"  :key="index">{{index+1}},{{item.deviceName}}</el-dropdown-item>
               
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <span v-for="(item,index) in scope.row.userDcRequest"  :key="index">{{index+1}},{{item.deviceName}},</span> -->
           </template>
        </el-table-column>
        
        <el-table-column
          prop="userDcRequest"
          label="授权时间"
          width="271"
           align="center">
           <template slot-scope="scope">
            <span>{{scope.row.userDcRequest[scope.row.userDcRequest.length-1].createTime}}</span>
          </template>

        </el-table-column>
         <el-table-column
          prop="userMobile"
          label="授权人手机号"
           align="center">
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
import changeAuthor from "../../../components/changeAuthor"
  export default {
    name: "authorization",
    components:{
      changeAuthor
    },
    
    data() {
      return {
        total:0,
        templateRadio:'',
        formSearch: {
          name:null,
          deviceName:null,
          createUser:""
         
        },
        Authrizationparam:{
          pageSize:10,
          currentPage:1,
          createUser:""
         
        },

        templateSelection:{},
        multipleSelection: [],
        loading:true,
        appUserList: [
          ]
      }
    },
        beforeMount(){
        if(this.$store.state.userinfo.userLevel==2){
          this.$store.commit('saveIndex',"2-7")
        }
         if(this.$store.state.userinfo.userLevel==3){
          this.$store.commit('saveIndex',"3-7")
        }
         if(this.$store.state.userinfo.userLevel==4){
          this.$store.commit('saveIndex',"4-7")
        }
          if(this.$store.state.userinfo.userLevel==5){
          this.$store.commit('saveIndex',"5-3")
        }
        
     },


    mounted(){
      //  this.$store.commit('saveIndex',"5-3")
      this.Authrizationparam.createUser=this.$store.state.userinfo.userMobile
       this.formSearch.createUser=this.$store.state.userinfo.userMobile
      this.getAuthrizationlist()
    },
    methods: {
      // 获取授权人列表
        getAuthrizationlist(){
         
          var that=this;
          that.axios.post("/SmartHomeTrade/appUser/selectRoomAndUser",that.Authrizationparam).then(function(res){
            if(res.data.code==0){
              that.loading=false;
              if(res.data.data!=null){
                that.appUserList=res.data.data.appUserList,
                that.total=res.data.data.count;
                that.templateRadio="";
              }else{
                that.appUserList=[]
              }
            }else{
              that.$message.error(res.data.message)
            }

          })
        },
      // 每页几条
        handleSizeChange(val) {
        var that=this;
        that.Authrizationparam.pageSize=val;
        that.Authrizationparam.currentPage=1;
         that.getAuthrizationlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.Authrizationparam.currentPage=val;
         that.getAuthrizationlist()
      },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   console.log(val)
      // },
           //查询
        onSubmit() {
          var that=this;
          console.log(that.formSearch)
          if(that.formSearch.name==''){
            that.formSearch.name=null
          }
           if(that.formSearch.deviceName==''){
            that.formSearch.deviceName=null
          }

          if(that.formSearch.name==null&&that.formSearch.deviceName==null){
             that.getAuthrizationlist()
            return;
          }
            that.loading=true;           
          that.axios.post("/SmartHomeTrade/appUser/selectRoomAndUser",that.formSearch).then(function(res){
              if(res.data.code==0){
              that.appUserList=res.data.data.appUserList;
                that.loading=false; 

            }
          })
        },
        // 清空查询
        resetForm() {
        var that=this;
            that.formSearch.name= null,
            that.formSearch.deviceName=null,                 
             that.getAuthrizationlist()
        },
      // 添加授权
      add(){
        this.$refs.mychild.getAuthrization();

      },
      // 修改
           // 修改
      change(){
        if(this.templateRadio==''){
          this.$message({
            type: 'info',
            message: '请选择要修改的授权人'
          });
        }else {
          var param=this.templateSelection
          
         this.$refs.mychangechild.getopen(param)
        }
      },
      // 删除
      delet(){
         var that=this;
        if(that.templateRadio!=''){
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(that.templateSelection.userDcRequest)
            var list=[]
            for(var i=0;i<that.templateSelection.userDcRequest.length;i++){
              list.push(that.templateSelection.userDcRequest[i].deviceId)
            }      
            var param={
              ucUserId:that.templateSelection.ucUserId,
              deviceIdList:list,

            }
            that.axios.post("/SmartHomeTrade/appUser/deleteUserDeviceInfo",param).then(function(res){
              if(res.data.code==0){
               
                that.getAuthrizationlist()
               that.$message.success(res.data.message);
             
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
            message: '请选择要删除的授权用户'
          });
        }


      },
      getTemplateRow(index,row){                
      this.templateSelection = row;
      console.log(this.templateSelection)
     },
    },
  }
</script>

<style scoped>
.outlook{
  position: relative !important;

}
.look{
  overflow-y: scroll;
  height:200px;
 position: absolute !important;
 /*left:850px !important;*/
 /*top:-50px !important;*/

}
</style>
