<template>
    <div class="EquipmentAuthorization">
      <div class="goback" style="padding-left: 20px">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/room/equipment">首页</BreadcrumbItem>
          <BreadcrumbItem>设备授权</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="set-title" style="padding-left: 20px" >
        设备授权
      </div>
      <div class="equipmentA-main active" style="padding-left: 20px">
        <el-radio-group v-model="radio" @change="checke">
          <div class="single">
            <el-radio :label="1">授权单用户</el-radio>
              <div class="sigle-user">
                <el-autocomplete
                  v-model="state4"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  clearable
                ></el-autocomplete>
              </div>
          </div>
          <el-radio :label="2">授权多用户</el-radio>
        </el-radio-group>
        <div class="multiple">
          <div class="setup">
            <span>部门名称</span>
            <input type="text" v-model="depart" clearable>
            <!--<el-input-->
              <!--placeholder="请输入部门名称"-->
              <!--v-model="depart"-->
              <!--clearable>-->
            <!--</el-input>-->
            <button @click="create()">创建部门</button>
          </div>
          <div class="multiple-user">
            <ul v-model="department">
              <li v-for="item in department">{{item.departmentName}}
                <span class="point"><i class="iconfont">&#xe503;</i></span><span class="point"><i class="iconfont">&#xe609;</i></span>
                  <ul class="employee">
                    <li v-for="child in item.children">
                      <span>{{ child.name }}</span>
                      <span>{{ child.tel }}</span>
                      <span class="point"><i class="iconfont">&#xe609;</i></span>
                    </li>

                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
    export default {
        name: "EquipmentAuthorization",
      data () {
        return {
          radio: '',
          depart:'',//部门
          restaurants: [],
          state4: '',
          timeout:  null,
          department:[
            {departmentName:'技术部',
              children:[
                {name:"员工1",tel:"12345667889"},
                {name:"员工2",tel:"12345667889"},
              ]},
            {departmentName:'运维部',
              children:[
                {name:"员工3",tel:"12345667889"},
                {name:"员工1",tel:"12345667889"},
              ]},
          ]
        };
      },
      mounted() {
        this.restaurants = this.loadAll();
      },
      methods:{
        checke(value){

        },
        querySearchAsync(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
          return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        handleSelect(item) {
          console.log(item);
        },
        loadAll() {
          return [
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
            { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          ];
        },
        create(){
          var addlist={
            departmentName:this.depart,
              children:[ ]}
              this.department.push(addlist)
        }
      }
    }
</script>

<style scoped>
  .single{
    margin-bottom: 100px;
  }
  .setup{
    margin:10px 20px;
  }
  .sigle-user{
    margin-left: 20px;
    margin-top: 10px;
  }
.employee{
  padding-left: 20px;
}
  .point{
    cursor: pointer;
  }
</style>
