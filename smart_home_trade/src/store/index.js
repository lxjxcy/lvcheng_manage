import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parame: {
      garden_buildNmae: '',
      garden_buildId: '',
      build_floorName: '',
      build_floorId: '',
      floor_roomName: '',
      floor_roomId: '',
    },
    userinfo: {},
    setDAta: [],
    set: [{
      id: 121,
      label: '添加'
    }, {
      id: 122,
      label: '修改'
    }, {
      id: 123,
      label: '设置管理员'
    }, {
      id: 124,
      label: '主机清单'
    }],
    // islogin: false,
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token)
    },
    exitUser(state) {
      state.token = null;
      sessionStorage.removeItem('token')
    },
    setStroge(state, stedate) {
      state.setDAta = stedate;
      localStorage.setItem('setD', JSON.stringify(stedate))
      // sessionStorage.setItem('setD', stedate)
    },
    setRouterid(state, Routerid) {
      state.parame = Routerid;
      sessionStorage.setItem('Routerid', JSON.stringify(Routerid))
    },


    //用户信息
    saveUserinfo(state, userinfo) {
      state.userinfo = userinfo;
      sessionStorage.setItem('userinfo', JSON.stringify(userinfo))

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