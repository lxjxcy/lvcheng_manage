import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parame:{
      garden_buildNmae:'',
      garden_buildId:'',
      build_floorName:'',
      build_floorId:'',
    },
    userInfo:{
      loginName:'',
      userLevel:'',
      status:''
    },
    islogin:false,
    token:null
  },
  mutations: {
      setToken(state,token){
        state.token=token;
        sessionStorage.setItem('token',token)
      },
    getUser(state,loginname){
      state.userInfo.loginName=loginname;
      sessionStorage.setItem('loginName',loginname)
    },
    exitUser(state){
        state.token=null;
        sessionStorage.removeItem('token')
    }
  },

  actions: {
    // increment(
    //             commit
    //           }) {
    //   commit("INCREMENT")
    // },
    // decrement({
    //             commit
    //           }) {
    //   commit("DECREMENT")
    // },
    // incrementWithValue({
    //                      commit
    //                    }, value) {
    //   commit("SHOW_WAITING_MESSAGE");
    //   let intValue = parseInt(value.value)
    //   let anotherValue = value.anotherValue
    //   setTimeout(function() {
    //     if (isNaN(intValue)) {
    //       alert("Not an Interger")
    //     } else {
    //       commit("HIDE_WAITING_MESSAGE");
    //       commit("INCREMENT_WITH_VALUE", {
    //         intValue,
    //         anotherValue
    //       })
    //     }
    //   }, 2000)
    // }
  },
  getters: {
    // getnum: function(state) {
    //   // return state.num.filter(item => item.slice(0, 3));
    //   return state.userInfo.num += 100
    // },
    // getadd: function(state) {
    //   return state.userInfo.add += 200
    // },
    // countAnother: function(state) {
    //   return state.anotherIncrement
    // }
  }
})
