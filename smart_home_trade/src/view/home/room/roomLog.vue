<template>
  <div class="roomLog">
    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formSearch.keyword" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="formSearch.operatep" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
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
        :data="logdate"
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
          prop="operateName"
          label="操作名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operater"
          label="操作人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operateTime"
          label="操作时间">
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
          :page-size="10"
          layout="total, prev, pager, next"
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
        loading:false,
        startSearch:false,

         logParam:{
          pageSize:10,
          currentPage:1,
        },

        formSearch: {
          keyword: '',
          operatep:"",
          date1:'',
        },
        
        logdate: []
      }
    },
     mounted(){
      this.getLogdate()

     },
    methods: {
      getLogdate(){
        this.logdate= [{
          id:1,
          operateName: '逸夫楼',
          operater:"卢雪姣",
          operateTime: '杭州市滨江区锦绣国际202'
        }, {
           id:2,
          operateName: '逸夫楼',
          operater:"卢雪姣",
          operateTime: '杭州市滨江区锦绣国际202'
        },
          {
             id:3,
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
             id:4,
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
             id:5,
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
             id:6,
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },
          {
             id:7,
            operateName: '逸夫楼',
            operater:"卢雪姣",
            operateTime: '杭州市滨江区锦绣国际202'
          },]


      },
      //每页条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //总条数
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 单选
      getTemplateRow(index,row){                
        this.templateSelection = row;
       },
      //查询
      onSubmit() {
           var that=this;
           that.loading=false;
           if(that.formSearch.keyword==''){
            that.formSearch.keyword=null
           }
            if(that.formSearch.operatep==''){
            that.formSearch.operatep=null
           }
            if(that.formSearch.date1==''){
            that.formSearch.date1=null
           }
          if(that.formSearch.keyword==null&&that.formSearch.operatep==null&&that.formSearch.date1==null){
              that.startSearch=false;
              that.getLogdate()
            return;
          }
           that.startSearch=true;

      },
      //清空查询
      resetForm() {
        var that=this;
            that.formSearch.keyword= null;
            that.formSearch.operatep=null;
            that.startSearch=false;
           
          that.logParam.pageSize=10;
          that.logParam.currentPage=1;
         
       
         that.getLogdate()
      },

    },
  }
</script>

<style scoped>

</style>
