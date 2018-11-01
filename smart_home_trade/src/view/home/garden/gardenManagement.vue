<template>
  <div class="gardenManagement">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
        <el-form-item label="名称"  prop="yardName">
          <el-input v-model="formSearch.yardName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="管理员"  prop="userName">
          <el-input v-model="formSearch.userName" placeholder=""></el-input>
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
        <!--添加园区-->
        <li class="l"  @click="addpark()"><i class="el-icon-plus"></i>添加</li>
      <!--修改园区-->
        <li class="l" @click="change()"><i class="el-icon-edit"></i>修改</li>
        <!-- 设置管理员 -->
        <li class="l" @click="administratored()"><i class="el-icon-setting"></i>设置管理员</li>

         <changePark ref="mychild" @refreshList="getlist" @clearselect="clear"></changePark>
         <addPark  v-if="hackReset" ref="myaddchild" @refreshList="getlist" @clearselect="clear" @reload="reloadcom"></addPark>
         <setUser ref="mysetchild" @refreshList="getlist" @clearselect="clear"></setUser>
      </ul>

    </div>



    <div class="main-table">
      <el-table
        :data="yardsList"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        height="408"
        align="center"
        v-loading="loading"
        border>
          <el-table-column label="" width="50"  align="center">
          <template slot-scope="scope">
              <el-radio :label="scope.row.gardenNum"  v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="gardenNum"
          label="序号"
          width="55"
           align="center">
        </el-table-column>
        <el-table-column
          prop="yardName"
          label="园区名称"
         
           align="center">
        </el-table-column>
        <el-table-column
          prop="buildingNum"
          label="大楼数量"
        
          align="center">
        </el-table-column>
        <el-table-column
          prop="deviceNum"
          label="设备数量"
         
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
  import addPark from "../../../components/addPark.vue"
   import changePark from "../../../components/changePark.vue"

  export default {
    name: "gardenManagement",
    components:{
      changePark,
      addPark
    },

    data() {
      return {
        hackReset:true,
        startSearch:false,
      templateRadio:'',//单选
      templateSelection:{},//选择的这条数据信息
        total:0,//总页数
        loading:true,//加载
        params:{//获取园区列表参数
          action:1,
          pageSize:10,
          currentPage:1
        },
        rules: {
          yardName: [
            {  required: true,message: '园区名称不能为空'}
          ],
          provinceName: [
            {  required: true,message: '省不能为空'}
          ],
          cityName: [
            {  required: true,message: '市不能为空'}
          ],
          areaName: [
            {  required: true, message: '区域不能为空' }
          ],
          detailAddress: [
            {  required: true,message: '地址不能为空'}
          ]
        },
        
        openid:0,
        formLabelWidth: '100px',
        formSearch: {//搜索参数
          action:1,
          yardName:null,
          userName:null,
        },
        yardsList: [],//园区数据列表
        createOperator:''
      }
    },
    mounted(){
       this.$store.commit('saveIndex',"1-1")       
        this.createOperator=this.$store.state.userinfo.userMobile
        this.getlist() 
    },
    methods: {
      //  获取园区列表
      getlist(){
        var that=this  
        that.axios.post('/SmartHomeTrade/garden/selectGdCount',that.params).then(function (res) {
            if(res.data.code==0){
              if(res.data.data!=null){
                  that.total=res.data.data.count
                that.yardsList=res.data.data.yardsList
              }else{
                that.yardsList=[]
              }
                 that.loading=false             
            }else{
              that.$message.error(res.data.message)
            }         
        })
      },
      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.params.pageSize=val;
        that.params.currentPage=1;
        that.getlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.params.currentPage=val;
        that. getlist()
      },
        // 添加园区
      addpark(){


       
         this.$refs.myaddchild.addgarden();
      },

        // 刷新组件
       reloadcom(){
        this.hackReset = false
      this.$nextTick(() => {
      this.hackReset = true
      })
       },
       //选中
       getTemplateRow(index,row){                
        this.templateSelection = row;
      
       },
      //查询
      onSubmit() {
        var that=this;       
        if(that.formSearch.yardName==""){
          that.formSearch.yardName=null
        }
        if(that.formSearch.userName==''){
          that.formSearch.userName=null
        }
        if(that.formSearch.yardName==null&&that.formSearch.userName==null){
          that.getlist()
           that.startSearch=false;          
          return;
        }
        that.loading=true
       that.axios.post('/SmartHomeTrade/garden/selectGdCount',that.formSearch).then(function (res) {
        if(res.data.code==0){
          that.startSearch=true;
           that.loading=false;
           if(res.data.data!=null){
            that.yardsList=res.data.data.yardsList;
            that.total=res.data.data.yardsList.length;
           }
        }
          
         
        })
      },
      //清空查询框
      resetForm() {
        var that=this;
         that.params.pageSize=10;
        that.params.currentPage=1; 
        that. startSearch=false; 
        that.formSearch={
          action:1,
          gardenNum:null,
          yardName:null,
          userName:null,
        }

        that.getlist()
      },
      // 取消选中
      clear(){
         this.templateRadio="";      
       },   
      //修改园区
      change(){
        var that=this;
        if(that.templateRadio==''){
          that.$message({
            type: 'info',
            message: '请选择要修改的园区'
          });
        }else {
          var changparam={
              yardType:2,
              detailAddress:that.templateSelection.detailAddress,
              yardId:that.templateSelection.yardId
              }
          this.$refs.mychild.parentHandleclick(changparam);
        }
      },
      //  设置管理员
      administratored(){
        var that=this;
        if(that.templateRadio==''){
          that.$message({
            type: 'info',
            message: '请选择要设置管理员的园区'
          });
        }else {
          if(that.templateSelection.userName!=null){
              that.$message({
              type: 'info',
              message: '该园区已有管理员不能重复设置'
            });
            return;
          }
          var manageScopeId=[];
          manageScopeId.push(that.templateSelection.yardId)
          var param={
            action:2,
            manageScopeIdList: manageScopeId,
            userLevel:2
          }
          var uuid=that.templateSelection.userUuid       
          that.$refs.mysetchild.getAdminList(param,uuid);
        }
      },


    },
  }
</script>

<style scoped>
  .add{
    padding-right: 0.53rem;
     height: 350px;
    overflow:hidden;
    overflow-y:auto;
  }
  /*.addB{
    height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }*/
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
  .ulList li{
    height:30px;
    background: #fff;
    color:#000;
  }
  .getinfo{
     position: absolute;
     width:100%;
     
     border:1px solid #ccc;
     top:38px;
     left:0 ;
     z-index:1000;
     background: #fff; 
      height: 150px;
    overflow:hidden;
    overflow-y:auto;
   

  }
</style>
