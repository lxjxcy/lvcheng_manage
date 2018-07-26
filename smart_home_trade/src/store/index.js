import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userInfo: {
    //   name: 'xxxxx',
    //   isLogin: false,
    //   num: 0,
    //   add: 0
    // },
    // count: 0,
    // // 新增waiting  状态
    // waiting: false,
    // // 额外需要增加的数字
    // anotherIncrement: 5
  },
  mutations: {
    // setName: function(state, name) {
    //   state.userInfo.name = name
    // },
    // jia: function(state) {
    //   // 加1
    //   state.userInfo.num += 0.5
    // },
    // INCREMENT: function(state) {
    //   state.count++;
    // },
    // // // 减1
    // DECREMENT: function(state) {
    //   state.count--
    // },
    // INCREMENT_WITH_VALUE(state, value) {
    //   state.count = state.count + value.intValue + value.anotherValue;
    // },
    // // // 显示和隐藏waiting
    // SHOW_WAITING_MESSAGE(state) {
    //   state.waiting = true;
    // },
    // HIDE_WAITING_MESSAGE(state) {
    //   state.waiting = false;
    // }
  },

  actions: {
    // increment({
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
