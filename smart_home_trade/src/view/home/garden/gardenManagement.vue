<template>
  <div class="gardenManagement">

    <div class="top-nav">
      <el-form :inline="true" :model="formSearch" ref="formSearch" class="demo-form-inline">
        <el-form-item label="编号"  prop="gardenId">
          <el-input v-model="formSearch.gardenId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="名称"  prop="roomId">
          <el-input v-model="formSearch.gardenName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="管理员"  prop="management">
          <el-input v-model="formSearch.adminName" placeholder=""></el-input>
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
        <li class="l"  @click="addgarden()"><i class="iconfont">&#xe612;</i>添加</li>
        <el-dialog
          title="添加园区"
          :visible.sync="addGarden"
          width="30%"
          :before-close="handleClose">
          <div class="add">
            <el-form label-width="100px" :model="addG" ref="addG" :rules="rules">
              <el-form-item
                label="园区名称"
                prop="gardenName"
              >
                <el-input v-model="addG.gardenName"></el-input>
              </el-form-item>
              <el-form-item label="省"  prop="province">
                <el-select v-model="addG.province" placeholder="请选择省" @change="getCity">
                  <el-option
                    v-for="item in provincelist"
                    :key="item.provinceId"
                    :label="item.province"
                    :value="item.provinceId">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="市"  prop="city">
                <el-select v-model="addG.city" placeholder="请选择市" @change="getRegion">
                  <el-option
                    v-for="item in citylist"
                    :key="item.cityId"
                    :label="item.city"
                    :value="item.cityId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="区"  prop="region">
                <el-select v-model="addG.region" placeholder="请选择区域" @change="getAddress">
                  <el-option
                    v-for="item in regionlist"
                    :key="item.areaId"
                    :label="item.area"
                    :value="item.areaId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="园区地址" prop="address">
                <el-input v-model="addG.address"></el-input>
              </el-form-item>
              <el-form-item label="添加大楼" prop="addbuild">
                <el-switch v-model="addG.addbuild"></el-switch>
              </el-form-item>
            </el-form>
          </div>
          <el-dialog
            width="30%"
            title="添加大楼"
            :visible.sync="addBuild"
            append-to-body>
            <div class="addB">
              <el-form :model="addbuildList" ref="addbuildList" label-width="100px" class="demo-dynamic">
                <el-form-item
                  v-for="(addbuildName, index) in addbuildList.addbuildName"
                  :label="'大楼' + (index+1)"
                  :key="addbuildName.key"
                >
                  <el-input v-model="addbuildName.blockName" class="roominput"></el-input>
                  <el-button @click.prevent="remove_buildName(addbuildName)">删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button @click="add_buildName">新增大楼</el-button>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addGb()">确 定</el-button>
          </span>
          </el-dialog>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add_build('addG')">确 定</el-button>
          </span>
        </el-dialog>

      <!--修改园区-->
        <li class="l" @click="change()"><i class="iconfont" >&#xe645;</i>修改</li>
        <el-dialog
          title="修改园区"
          :visible.sync="changeGarden"
          width="30%"
          :before-close="handleClose">
          <div class="add">
            <el-form label-width="100px" :model="changeG" ref="changeG" :rules="changrules">
              <el-form-item label="园区名称" prop="gardenName">
                <el-input v-model="changeG.gardenName"></el-input>
              </el-form-item>
              <el-form-item label="园区地址" prop="gdAddress">
                <el-input v-model="changeG.gdAddress"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="change_Garden('changeG')">确 定</el-button>
          </span>
        </el-dialog>



        <li class="l" @click="deleted()"><i class="iconfont">&#xe504;</i>删除</li>
        <li class="l" @click=" administratored()">设置管理员</li>

        <el-dialog
          title="设置管理员"
          :visible.sync="administrator"
          width="40%"
          :before-close="sethandleClose"
          @open="onOpen">
          <el-table
            :data="listUser"
            height="300"
            ref="listUser"
            style="width: 100%"
            row-key="id"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="账号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="130">
            </el-table-column>
            <el-table-column
              label="管理员类型">
              <template slot-scope="scope">
                  {{scope.row.userLevel | userlevelStop}}
              </template>
            </el-table-column>
          </el-table>

          <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="admin_istrator()">确 定</el-button>
                </span>
        </el-dialog>

      </ul>

    </div>
    <div class="main-table">

      <el-table
        :data="listGardenCount"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        height="410"
        v-loading="loading"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="gardenId"
          label="园区编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gardenName"
          label="园区名称"
          width="100">
          <template slot-scope="scope">
            <el-button @click="goBuildinglist(scope.row.gardenName,scope.row.gardenId)" type="text" size="small">{{scope.row.gardenName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="bCount"
          label="大楼数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dCount"
          label="设备数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="管理员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminMobile"
          label="联系电话">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage3"
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
  import axios from 'axios'
  export default {
    name: "gardenManagement",

    data() {
      return {
        total:10,
        params:{
          pageSize:10,
          currentPage:1
        },
        provincelist: [],//省
        citylist:[],//市
        regionlist:[],//区域
        addbuildList: {
          addbuildName: [{
            blockName: ''
          }],
        },
        addG:{
          gardenName:"",
          province:"",
          city:"",
          region:"",
          address:'',
          addbuild: false,
        },
        addaddressid:'',//地址合并

        rules: {
          gardenName: [
            {  required: true,message: '园区名称不能为空', trigger: 'blur' }
          ],
          province: [
            {  required: true,message: '省不能为空', trigger: 'blur' }
          ],
          city: [
            {  required: true,message: '市不能为空', trigger: 'blur' }
          ],
          region: [
            {  required: true, message: '区域不能为空',trigger: 'blur' }
          ],
          address: [
            {  required: true,message: '地址不能为空', trigger: 'blur' }
          ]
        },
        changeG:{
          gardenName:"",
          gdAddress:'',
          id:''
        },
        changrules:{
          gardenName: [
            {  required: true,message: '园区名称不能为空', trigger: 'blur' }
          ],
          gdAddress: [
            {  required: true,message: '园区地址不能为空', trigger: 'blur' }
          ],
        },
        openid:0,
        // loading:true,
        multipleSelection: [],
        multipleSelection2:[],
        formLabelWidth: '100px',
        addGarden:false,
        addBuild:false,
        changeGarden:false,
        administrator:false,
        formSearch: {//搜索
          gardenId:null,
          gardenName:null,
          adminName:null,
        },
        currentPage3: 1,
        setadmin:{
          id:'',
          userId:''
        },
        listUser: [],
        listGardenCount: [
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          },
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          },
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          },
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          },
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          },
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          }, {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          },
          {
            gardenId:1,
            gardenName:'122园区',
            bCount:'555',
            dCount:'34',
            adminName:'addd',
            adminMobile:'13017084567'
          }
        ],
      }
    },
    mounted(){
    // this.getlist()
    },

    filters: {
      userlevelStop: function (val) {
        return val== 1 ? 'admin' : val == 2? '园区管理员' :val == 3? '大楼管理员' : val == 4? '楼层管理员' : val == 5? '房间管理员':""
      },
    },
    methods: {
      //  获取列表
      getlist(){
        var that=this
        axios.post('/garden/selectGdCount',that.params).then(function (res) {
          if(res.data.message=='查询园区统计成功'){
            that.loading=false
          }
          that.total=res.data.data.Count
          that.listGardenCount=res.data.data.listGardenCount
        })
      },
      //每页显示多少条
      handleSizeChange(val) {
        var that=this;
        that.params.pageSize=val;
        that.params.currentPage=1;
        // that.getlist()
      },
      //当前页
      handleCurrentChange(val) {
        var that=this;
        that.params.currentPage=val;
        // that. getlist()
      },
      //选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },

      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
        console.log(val)
      },


      //添加园区时获取省接口
      addgarden(){
        var that=this;
        that.addGarden=true;
        axios.post("/garden/queryPro",{ }).then(function (res) {
          that.provincelist=res.data.data
          console.log(res)
        })
      },


      //查询
      onSubmit() {
        var that=this;
        that.loading=true
        axios.post('/garden/selectGardenByNmIdAdmin',this.formSearch).then(function (res) {
          that.listGardenCount=res.data.data;
          that.loading=false
        })
      },
      //清空查询
      resetForm() {
        var that=this;
        that.formSearch={
          gardenId:null,
          gardenName:null,
          adminName:null,
        }
        that.getlist()
      },
      //关闭弹框
      handleClose(done) {
        done()
      },
      sethandleClose(done){
        this.$refs.listUser.clearSelection()
        done()
      },

      //添加园区和大楼
      addGb(){
        var that=this;
        console.log(that.addbuildList.addbuildName);
        var list=[]
        for(var i=0;i<that.addbuildList.addbuildName.length;i++){
          list.push(that.addbuildList.addbuildName[i].value)
        }
        alert(list)
        var addparamGb={
          addressId:that.addaddressid,
          gardenName:that.addG.gardenName,
          gdAddress:that.addG.address,
          blockList:that.addbuildList.addbuildName
        }
        axios.post('/garden/insertGarden',addparamGb).then(function (res) {
          console.log(res)
          that.$message({
            type: 'success',
            message: res.data.message
          });
          that.addGarden=false;
          that.addBuild=false;

        });
      },

      //获取市
      getCity : function(value){
        var that=this;
        axios.post("/garden/queryPro",{
          provinceId:value
        }).then(function (res) {
          that.citylist=res.data.data;
          that.addG.city='';
          that.addG.region=''
        })
      },
      // 获取区域
      getRegion : function(value){
        var that=this;
        axios.post("/garden/queryPro",{
          cityId:value
        }).then(function (res) {
          that.regionlist=res.data.data;
          that.addG.region=''
        })
      },
     // 获取地址合并id
      getAddress(value){
        this.addaddressid=value
      },


 //提交添加园区信息
  add_build(addG){

        var that=this;
    that.$refs[addG].validate((valid) => {
          if (valid) {
            if(that.addG.addbuild==true){
              that.addBuild=true
            }else {
              var addparamG={
                addressId:that.addaddressid,
                gardenName:that.addG.gardenName,
                gdAddress:that.addG.address,
              }
              axios.post('/garden/insertGarden',addparamG).then(function (res) {
                console.log(res)
                    that.$message({
                      type: 'success',
                      message: res.data.message
                    });
              })
              that.addGarden=false;
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //修改园区框显示
      change(){
        var that=this;
        if(that.multipleSelection==''){
          that.$message({
            type: 'info',
            message: '请选择要修改的大楼删除'
          });
        }else {
          that.changeGarden=true;
          that.changeG={
            gardenName:that.multipleSelection[0].gardenName,
            gdAddress:that.multipleSelection[0].gdAddress,
            id:that.multipleSelection[0].gardenId
          }
          // this.form.buildingname=this.multipleSelection[0].buildingName;
        }
      },
      //确认修改园区
      change_Garden(changeG){
        var that=this;
        this.$refs[changeG].validate((valid) => {
          if (valid) {
            axios.post("/garden/updateGarden" ,that.changeG).then(function (res) {
              that.$message({
                type: 'success',
                message: res.data.message
              });
              that.getlist()
              that.changeGarden=false;

            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //  设置管理员
      administratored(){

        var that=this;
        if(that.multipleSelection==''){
          that.$message({
            type: 'info',
            message: '请选择大楼要设置的园区'
          });
        }else {
          axios.post('/garden/selectAdmin',{
            userLevel:2
          }).then(function (res) {
            that.listUser=res.data.data
            for(var i=0;i<res.data.data.length;i++){
              if(res.data.data[i].id==that.multipleSelection[0].adminId){
                console.log(i)
                that.openid=i;
              }
            }
          })
          that.administrator=true;
          that.onOpen()
        }
      },
      admin_istrator(){
        var that=this;
        that.setadmin={
          id:that.multipleSelection[0].gardenId,
          userId:that.multipleSelection2[0].id
        }

       axios.post('/garden/updateUser',that.setadmin).then(function (res) {
         console.log(res)
         that.$message({
           type: 'success',
           message: res.data.message
         });
         that.getlist()
         that.administrator=false;
         this.$refs.listUser.clearSelection()
       })
      },

      //  管理员转换状态
      userLevel: function (row, column) {
        return row.userLevel == 1 ? 'admin' : row.userLevel == 2? '园区管理员' : row.userLevel == 3? '大楼管理员' : row.userLevel == 4? '楼层管理员' : row.userLevel == 5? '房间管理员':""
      },
      //默认选中
      onOpen () {
        setTimeout(() => {
          this.toggleSelection([this.listUser[this.openid]])
        }, 500)
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.listUser.toggleRowSelection(row, true)
          })
        } else {
          this.$refs.listUser.clearSelection()
        }
      },

      // 跳转到指定园区的大楼列表页
      goBuildinglist(parkName,gardenId){
        this.$set(this.$store.state.parame,'garden_buildNmae',parkName)
        this.$set(this.$store.state.parame,'garden_buildId',gardenId)
        this.$router.push({name:'buildingList'})
      },


    //删除大楼input框
      remove_buildName(item) {
        var index = this.addbuildList.addbuildName.indexOf(item)
        if (index !== -1) {
          this.addbuildList.addbuildName.splice(index, 1)
        }
      },
      //新增大楼input框
      add_buildName() {
        this.addbuildList.addbuildName.push({
          value: '',
          key: Date.now()
        });
      },
      //  删除
      deleted() {
        var that=this;
        if(that.multipleSelection!=''){
          that.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //发送ajax
            axios.post('/garden/deleteGarden',{
              id:that.multipleSelection[0].gardenId
            }).then(function (res) {
              that.getlist()
              that.$message({
                type: 'success',
                message: res.data.message
              });
            })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else {
          this.$message({
            type: 'info',
            message: '请选择要删除的大楼删除'
          });
        }
      },
    },
  }
</script>

<style scoped>
  .add{
    padding-right: 0.53rem;
  }
  .addB{
    height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }
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
</style>
