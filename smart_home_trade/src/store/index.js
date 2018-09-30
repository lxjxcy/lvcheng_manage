import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parame: {
      parkname: null,
      parkid: null,
      buildname: null,
      buildid: null,
      allAddress: null,
      building_floorName: null,
      floorname: null,
      inAddress: null,
      floorid: null,
      flooraddressId: null,
      roomname: null,
      roomid: null,
      roomaddressId: null,

    },
    switchName: "",
    isgoback: false,
    ifswitch: true,
    userinfo: {},
    setDAta: [],
    activeIndex: "",
    extendList: {},

    // islogin: false,
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token)
    },
    saveIndex(state, index) {
      state.activeIndex = index;
      sessionStorage.setItem('activeIndex', index)
    },
    exitUser(state) {
      state.token = null;
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userinfo')

      state.userinfo = {};
      state.setDAta = [];
      sessionStorage.removeItem('exTend')
      sessionStorage.removeItem('setD')
      state.switchName = "";
      sessionStorage.removeItem('switchName')
      sessionStorage.removeItem('activeIndex')
      sessionStorage.removeItem('Routerid')
      state.parame = {
        parkname: null,
        parkid: null,
        buildname: null,
        buildid: null,
        floorname: null,
        floorid: null,
        flooraddressId: null,
        allAddress: null,
        building_floorName: null,
        inAddress: null,
        roomname: null,
        roomid: null,
        roomaddressId: null
      };
    },
    setStroge(state, stedate) {
      state.setDAta = stedate;
      sessionStorage.setItem('setD', JSON.stringify(stedate))
      // sessionStorage.setItem('setD', stedate)
    },
    saveExtend(state, extend) {
      state.extendList = extend;
      sessionStorage.setItem('exTend', JSON.stringify(extend))
    },
    setRouterid(state, parames) {
      state.parame = parames;
      sessionStorage.setItem('Routerid', JSON.stringify(parames))
    },

    switchname(state, Name) {
      state.switchName = Name;
      sessionStorage.setItem('switchName', Name)
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