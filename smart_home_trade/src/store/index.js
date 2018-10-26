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
    token: null,
    typeList: [{
        typeid: 1,
        typeName: "灯",
      }, {
        typeid: 2,
        typeName: "插座面板",
      }, {
        typeid: 3,
        typeName: "智能门锁",
      }, {
        typeid: 4,
        typeName: "窗帘电机",
      }, {
        typeid: 5,
        typeName: "布尔传感器",
      }, {
        typeid: 6,
        typeName: "数值传感器",
      }, {
        typeid: 7,
        typeName: "零火线灯控面板",
      }, {
        typeid: 8,
        typeName: "智能插座面板",
      }, {
        typeid: 9,
        typeName: "16A智能插座面板",
      }, {
        typeid: 10,
        typeName: "智能指纹锁（臻享款）",
      }, {
        typeid: 11,
        typeName: "普通窗帘",
      }, {
        typeid: 12,
        typeName: "人体传感器",
      }, {
        typeid: 13,
        typeName: "烟感传感器",
      }, {
        typeid: 14,
        typeName: "燃气传感器",
      }, {
        typeid: 15,
        typeName: "水浸传感器",
      }, {
        typeid: 16,
        typeName: "温度传感器",
      }, {
        typeid: 17,
        typeName: "湿度传感器",
      }, {
        typeid: 18,
        typeName: "光线传感器",
      }, {
        typeid: 19,
        typeName: "杜亚电机",
      }, {
        typeid: 20,
        typeName: "报警器",
      }, {
        typeid: 21,
        typeName: "红外设备",
      }, {
        typeid: 22,
        typeName: "数值传感器",
      }, {
        typeid: 23,
        typeName: "声光报警器",
      }, {
        typeid: 24,
        typeName: "红外设备",
      }, {
        typeid: 25,
        typeName: "红外收发器",
      }, {
        typeid: 26,
        typeName: "呼叫面板",
      }, {
        typeid: 27,
        typeName: "SOS紧急呼叫面板",
      }, {
        typeid: 28,
        typeName: "中央空调",
      }, {
        typeid: 29,
        typeName: "中央空调室内机",
      },

      {
        typeid: 30,
        typeName: "情景面板",
      }, {
        typeid: 31,
        typeName: "快捷面板",
      }, {
        typeid: 32,
        typeName: "摄像头",
      }, {
        typeid: 33,
        typeName: "萤石摄像头",
      }, {
        typeid: 34,
        typeName: "常供电快捷面板",
      }, {
        typeid: 35,
        typeName: "耶鲁智能门锁",
      }, {
        typeid: 36,
        typeName: "公寓密码锁",
      },

      {
        typeid: 37,
        typeName: "门磁",
      }, {
        typeid: 38,
        typeName: "乐橙摄像头",
      }, {
        typeid: 39,
        typeName: "小K智能插座",
      }, {
        typeid: 40,
        typeName: "空气监测仪",
      }, {
        typeid: 41,
        typeName: "知空气",
      }, {
        typeid: 42,
        typeName: "蓝熙健康",
      }, {
        typeid: 43,
        typeName: "血糖仪",
      }, {
        typeid: 44,
        typeName: "血压计",
      }, {
        typeid: 45,
        typeName: "体脂秤",
      },


    ]
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