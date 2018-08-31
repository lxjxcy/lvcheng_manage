<template>
    <div class="EquipmentAuthorization">
      <div class="goback" style="padding-left: 20px">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/room/equipment">首页</BreadcrumbItem>
          <BreadcrumbItem>设备授权</BreadcrumbItem>
        </Breadcrumb>
      </div>


      <div class="equipmentA-main active" style="padding-left: 20px;margin-top:40px;">
         <el-radio-group v-model="radio" @change="getvalue">
            <el-radio :label="1" class="single">授权单用户</el-radio>

            <el-radio :label="2" class="single">授权多用户</el-radio>
          </el-radio-group>

           <single></single>



        
      </div>
    


    </div>
</template>

<script>
    export default {
        name: "EquipmentAuthorization",
      data () {
        return {
          radio: '',
        };
      },
      mounted() {
        
      },
      methods:{
        getvalue(value){
          // alert(value)

        }
        
      }
    }
</script>
<style scoped>
.single{
  margin-right:150px;
  margin-bottom: 20px;
}

</style>
