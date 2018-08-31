
<template>
  <div id="app" class="img1 note" :style ="note">
     <!--  -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      iflook:"",
        note: {
          backgroundImage: "url(" + require("./assets/timg.jpg") + ") ",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
         backgroundColor:"#fff"
        },
    }
  },
  methods:{

  }
}
</script>

<style>
  *{
    padding:0;
    margin:0;
  }

  /*弹框内容width*/
   .dialogwidth{
    padding-right: 0.53rem;
     height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  height:100%;
}
  .l{
    float: left;

  }
  i{
    padding-right:5px;
  }
  .r{
    float: right;
  }
  ul{
    list-style: none;
  }

  @font-face {
    font-family: 'iconfont';
    src: url('./font/iconfont.eot');
    src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./font/iconfont.woff') format('woff'),
    url('./font/iconfont.ttf') format('truetype'),
    url('./font/iconfont.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    padding-right:5px;
  }
  header{
    height:0.45rem;
    background: #2bc999;
  }

  /*按钮颜色*/
  .el-button--primary{
    background-color:#14ac86;
    border-color: #14ac86;
  }
  .el-button:focus, .el-button:hover{
    background-color:#2bc999;
    color:#fff;

  }
  /*左侧*/
 
  .el-col-12{
    width:100% !important;
  }
  /*多选*/
  .el-checkbox+.el-checkbox{
    margin-left:0;
  }



  .all{
    display: flex;
    height: 100%;
    width:100%;
    flex-direction:row;
  }
  .footerall{
    height:0.4rem;
    width:100%;
    text-align: center;
    line-height: 0.4rem;
  }
  aside{
    width:12%;
    font-size: 20px;
    background: #525c64;
  }
  aside a{
    text-align: center;
    font-size: 18px;
  }
  aside i{
    color: #fff;
    font-size: 26px;
  }
  main{
    flex: 1;
    padding-left: 7px;
    width:60%;
    overflow: hidden;
  }
  .nowuser{
    height:140px;
    padding:10px 0;
    margin-top:150px;
    text-align: center;
  }
  .nowuser i{
    font-size: 0.8rem;
  }



  /*表格*/
  .top-nav{
    height:.5rem;
    font-size: 16px;
    /*line-height: 0.6rem;*/
    border-bottom: 2px solid #2fc0fb ;
    margin-bottom: 0.1rem;
    /*background: #f0f0f0;*/
    padding-top:8px;
    padding-bottom: 0.47rem;
  }

  .el-button--small, .el-button--small.is-round{
    padding:4.5px 15px;
  }
  .el-table--border th, .el-table__fixed-right-patch{
    background:#f9f8f8;
    color:#000;
  }
  .el-table td, .el-table th{
    padding:8px 0;
  }
  .top-nav input{
    margin-left: 10px;
    height:0.3rem;
    width:1rem;
    birder:1px solid #eceef4
  }
  .top-nav button{
padding:8px 26px;
  }
  .el-pagination{
    height:30px;
  }
  .main-table{
    overflow: hidden;
  }

  /*表格操作栏*/
  .nav-middle{
    /*height:0.5rem;*/
    /*line-height: 0.5rem;*/
    font-size: 14px;
    width:100%;
    height:30px;
    margin-bottom: 8px;
  }
  .nav-middle li{
    padding:0  5px;
    background:#00af82;
    color: #fff;
    height:30px;
    line-height: 30px;
    margin:0 10px;
    cursor: pointer;
    border-radius: 6px;
  }
  .nav-middle li:hover{
    background:#2bc999 ;
  }
  /*弹框*/
  .el-dialog__header{
    /*border-bottom: 1px solid #ccc;*/
    /*color:#fff;*/
    /*background: #109dfd !important;*/
padding:10px 20px;
  }

  /*弹框尾部*/
  .el-dialog__footer{
    padding-top:5px;
  }
  .el-dialog__title{
    /*color:#fff;*/
  }
  .el-dialog__headerbtn .el-dialog__close{
    /*color:#fff;*/
    font-size: 20px;
    position: relative;
    top:-5px;
  }
  .el-dialog__body{
    padding:10px 20px;
  }
  .el-message-box{

  }
  .el-message{
    height:40px;
    font-size: 20px;
  }
  .titles{
    font-size: 20px;
    background:  #109dfd;
    position: relative;
    top:-48px;
    color:#fff;
  }
  .ivu-icon-ios-arrow-down:before{
    content: "";
  }

  .el-input--prefix .el-input__inner{
    width:1.5rem



  }
  .el-input__prefix{
    left:0.18rem
  }

  /*设置权限*/
  .active{
    height:500px;
    /*overflow: scroll;*/

    overflow:hidden;
    overflow-y:auto;
  }
  .set-title{
    height:40px;
    background: #f9f8f8;
    line-height: 40px;
    font-size: 20px;
    margin:5px 0;
  }
   .scope{
     overflow: hidden;
   }
  .scope li{
    list-style: none;
    margin:0 10px;
    min-height:200px;
    min-width:200px;
    border:1px solid #ccc
  }
  .list-s2{
    width:100px !important;
    text-align: center;
    line-height: 30px;
    border:none !important
  }
  .sured,.closed{
    background: #109dfe;
    color: #fff;
    padding:5px 10px;
    margin:20px 0;
  }
  .set{
    margin-top:20px;
  }
  .goback{
    background: #faf8f7;
    line-height: 30px;
  }
  /*.goback{*/
    /*height:25px;*/
    /*line-height: 25px;*/
    /*padding-top:5px;*/
    /*border-bottom:2px solid #2fc0fb ;*/
    /*background: #a2deea;*/
  /*}*/

  /*登录*/
  .el-form-item__content{
    line-height: 40px;
  }

/*404*/
.ifshow4{
  font-size: 100px;
}


</style>
