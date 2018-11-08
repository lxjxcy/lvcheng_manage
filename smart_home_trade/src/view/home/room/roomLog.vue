<template>
  <div class="roomLog">
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline"  label-width="70px">
        <el-form-item label="关键词">
          <el-input v-model="formSearch.keyword" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="操作人" style="margin-right: 20%">
          <el-input v-model="formSearch.operatep" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="操作时间">
             <el-date-picker
              v-model="formSearch.date1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
               :picker-options="pickerOptions0"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
         <el-form-item>
           <el-button @click="resetForm('formSearch')">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="main-table">
      <el-table
        :data="logList"
         v-loading="loading"
        height="400"
        border
        style="width: 100%">
         <el-table-column label="" width="50">
          <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
         <el-table-column
          label="序号"
          width="55"
           align="center" >
          <template  slot-scope="scope">
            <span v-if="!startSearch">{{scope.$index+(logParam.currentPage - 1) * logParam.pageSize + 1}} </span>
             <span v-if="startSearch">{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="logContent"
          label="操作名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="executeUser"
          label="操作人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="操作时间"
           align="center">
        </el-table-column>
         <el-table-column
          prop="createUserMobile"
          label="操作人电话"
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
  export default {
    name: "roomLog",
    data() {
      return {

        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },  
          templateRadio:'',
          total:10,
        templateSelection:{},
        loading:true,
        startSearch:false,

         logParam:{
          pageSize:10,
          currentPage:1,
          createUserMobile:null
        },

        formSearch: {
          logContent: null,
          executeUser:null,
          date1:'',
          startTime:null,
          endTime:null,

          
        },
        
        logList: []
      }
    },
     mounted(){
      this.logParam.createUserMobile=this.$store.state.userinfo.createUser;
      this.getLogdate()

     },
    methods: {
      getLogdate(){
        var that=this;
        that.axios.post("/SmartHomeTrade/log/selectLogRecordList",that.logParam).then(res=>{
          if(res.data.code=="0"){
            that.loading=false;
            if(res.data.data!=null){
              that.logList=res.data.data.logList;
              that.total=res.data.data.count;

            }else{
              that.logList=[]

            }
          }

        })
       

      },
          //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.logParam.pageSize=val;
        that.logParam.currentPage=1;
        that.getLogdate()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.logParam.currentPage=val;
        that.getLogdate()
      },
      // 单选
      getTemplateRow(index,row){                
        this.templateSelection = row;
       },
      //查询
      onSubmit() {
           var that=this;
       
           
           
          
           if(that.formSearch.logContent==''){
            that.formSearch.logContent=null
           }
            if(that.formSearch.executeUser==''){
            that.formSearch.executeUser=null
           }
            if(that.formSearch.date1==''){
            that.formSearch.date1=null
           }
          if(that.formSearch.keyword==null&&that.formSearch.operatep==null&&that.formSearch.date1==null){
              that.getLogdate()
            return;
          }
          var data0=that.formSearch.date1[0]
          var startTime=data0.getFullYear()+'-'+that.gettime((data0.getMonth() + 1)) + '-' + that.gettime(data0.getDate())+ ' ' + that.gettime(data0.getHours())+ ':' + that.gettime(data0.getMinutes()) + ':' + that.gettime(data0.getSeconds())
          var data1=that.formSearch.date1[1]
          var endTime=data1.getFullYear()+'-'+that.gettime((data1.getMonth() + 1)) + '-' + that.gettime(data1.getDate())+ ' ' + that.gettime(data1.getHours())+ ':' + that.gettime(data1.getMinutes()) + ':' + that.gettime(data1.getSeconds())
           var logSearch={
             logContent:that.formSearch.logContent,
             startTime:startTime,
              endTime:endTime,
             executeUser:that.formSearch.executeUser,
             createUserMobile:that.logParam.createUserMobile,
              pageSize:that.logParam.pageSize,
            currentPage:that.logParam.currentPage,
           }
            console.log(logSearch)
             that.loading=true;
            that.axios.post("/SmartHomeTrade/log/selectLogContentKeyWord",logSearch).then(res=>{
              if(res.data.code=="0"){
                that.loading=false;
                if(res.data.data!=null){
                  that.logList=res.data.data.logList;
                  that.total=res.data.data.logList.length;

                }else{
                  that.logList=[]

                }
              }

            })

          


      },
      gettime(date){
      
        return parseInt(date)<10?"0"+date:date

      
      },
      //清空查询
      resetForm() {
        var that=this;
            that.formSearch.logContent= null;
            that.formSearch.executeUser=null;
             that.formSearch.date1=null;
            that.logParam.pageSize=10;
            that.logParam.currentPage=1;
            that.getLogdate()
      },

    },
  }
</script>

<style scoped>

</style>
