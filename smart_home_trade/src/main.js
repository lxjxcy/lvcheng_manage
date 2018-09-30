// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'


import store from './store/index.js'

import 'babel-polyfill'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'

import myHeader from './view/home/myHeader';
import myFooter from './view/home/myFooter';
import goback from './view/home/goback/goback'
import gobackequim from './view/home/goback/gobackequim'
import gobackroom from './view/home/goback/gobackroom'
import setUser from './components/setUser'
import single from './components/single'

import addAppuser from './components/addAppuser'

import createDepartment from './components/createDepartment'
import addAuthrization from "./components/addAuthrization"
import authorizationEq from "./components/authorizationEq"

import multi from './components/multi'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import axios from "./axiosconfig/axiosconfig.js"
import router from './router'
import Blob from './vendor/Blob.js'
import Export2Excel from './vendor/Export2Excel.js'

// import axios from 'axios'

axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.use(iView);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component(myHeader.name, myHeader)
Vue.component(myFooter.name, myFooter)
Vue.component(goback.name, goback)
Vue.component(gobackroom.name, gobackroom)
Vue.component(gobackequim.name, gobackequim)

Vue.component(setUser.name, setUser)
Vue.component(single.name, single)
Vue.component(multi.name, multi)
Vue.component(addAuthrization.name, addAuthrization)
Vue.component(createDepartment.name, createDepartment)
Vue.component(authorizationEq.name, authorizationEq)
Vue.component(addAppuser.name, addAppuser)



router.beforeEach((to, from, next) => {
  let token = store.state.token;
  let extendList = store.state.extendList
  if (to.meta.Auth) {
    if (token) {
      // 系统管理员
      if (store.state.userinfo.userLevel == 1) {
        if (to.path != '/garden/gardenManagement' && to.path != '/garden/gardenUser' && to.path != '/garden/masterplate' && to.path != '/garden/gardenLog') {
          next({
            path: '/404',
          });
        } else {
          next();
        }
      }
      // 园区管理员
      if (store.state.userinfo.userLevel == 2) {
        if (
          to.path != '/park/MyPark' &&
          to.path != '/park/myEquipment' &&
          to.path != '/park/buildingManagement' &&
          to.path != '/park/parkUser' &&
          to.path != '/park/parkAppuser' &&
          to.path != '/park/HostListing' &&
          to.path != '/park/parkLog' &&
          to.path != '/park/authorManagement' &&
          to.path != '/park/authorManagement/user' &&
          to.path != '/park/authorManagement/equipment' &&
          to.path != '/park/authorizationInfo' &&
          to.path != '/park/floorList/roomList/equimentList' &&
          to.path != '/park/floorList' &&
          to.path != '/park/floorList/roomList' ||
          (
            // (extendList.mypark == 0 && to.path == '/park/MyPark') ||
            (extendList.buildingManagement == 0 && to.path == '/park/buildingManagement') ||
            (extendList.parkuser == 0 && to.path == '/park/parkUser') ||
            (extendList.parkAppuser == 0 && to.path == '/park/parkAppuser') ||
            (extendList.parlog == 0 && to.path == '/park/parkLog') ||
            (extendList.floorManagment == 0 && to.path == '/park/floorList') ||
            (extendList.roomManagement == 0 && to.path == '/park/floorList/roomList') ||
            (extendList.equipment == 0 && to.path == '/park/floorList/roomList/equimentList'))
        ) {
          next({
            path: '/404',
          });

        } else {
          next();
        }
      }
      // 大楼管理
      if (store.state.userinfo.userLevel == 3) {
        if (
          to.path != '/building/MyBuilding' &&
          to.path != '/building/myEquipment' &&
          to.path != '/building/floorManagment' &&
          to.path != '/building/buildingUser' &&
          to.path != '/building/buildingAppuser' &&
          to.path != '/building/buildingLog' &&
          to.path != '/building/authorManagement' &&
          to.path != '/building/authorManagement/user' &&
          to.path != '/building/authorizationInfo' &&
          to.path != '/building/authorManagement/equipment' &&
          to.path != '/building/roomList' &&
          to.path != '/building/roomList/equimentList' ||
          (
            // (extendList.mybuild == 0 && to.path == '/building/MyBuilding') ||
            (extendList.floorManagment == 0 && to.path == '/building/floorManagment') ||
            (extendList.buildingUser == 0 && to.path == '/building/buildingUser') ||
            (extendList.buildingAppuser == 0 && to.path == '/building/buildingAppuser') ||
            (extendList.buildingLog == 0 && to.path == '/building/buildingLog') ||
            (extendList.roomManagement == 0 && to.path == '/building/roomList') ||
            (extendList.equipment == 0 && to.path == '/building/roomList/equimentList'))
        ) {
          next({
            path: '/404',
          });

        } else {
          next();
        }
      }
      // 楼层管理
      if (store.state.userinfo.userLevel == 4) {
        if (
          to.path != '/floor/myFloor' &&
          to.path != '/floor/myEquipment' &&
          to.path != '/floor/roomManagement' &&
          to.path != '/floor/floorUser' &&
          to.path != '/floor/floorAppuser' &&
          to.path != '/floor/floorLog' &&
          to.path != '/floor/authorManagement' &&
          to.path != '/floor/authorizationInfo' &&
          to.path != '/floor/authorManagement/user' &&
          to.path != '/floor/authorManagement/equipment' &&
          to.path != '/floor/equimentList' ||
          (
            // (extendList.myFloor == 0 && to.path == '/floor/myFloor') ||
            (extendList.roomManagement == 0 && to.path == '/floor/roomManagement') ||
            (extendList.floorUser == 0 && to.path == '/floor/floorUser') ||
            (extendList.floorAppuser == 0 && to.path == '/floor/floorAppuser') ||
            (extendList.floorLog == 0 && to.path == '/floor/floorLog') ||
            (extendList.equipment == 0 && to.path == '/floor/equimentList'))
        ) {
          next({
            path: '/404',
          });

        } else {
          next();
        }
      }
      // 房间管理
      if (store.state.userinfo.userLevel == 5) {
        if (
          to.path != '/room/myRoom' &&
          to.path != '/room/equipment' &&
          to.path != '/room/authorizationInfo' &&
          to.path != '/room/roomAppuser' &&
          to.path != '/room/authorManagement' &&
          to.path != '/room/authorManagement/user' &&
          to.path != '/room/authorManagement/equipment' &&
          to.path != '/room/roomLog' ||
          (
            // (extendList.myRoom == 0 && to.path == '/room/myRoom') ||
            (extendList.equipment == 0 && to.path == '/room/equipment') ||
            (extendList.authorization == 0 && to.path == '/room/authorManagement') ||
            (extendList.authorization == 0 && to.path == '/room/authorManagement/user') ||
            (extendList.authorization == 0 && to.path == '/room/authorManagement/equipment') ||
            (extendList.roomAppuser == 0 && to.path == '/room/roomAppuser') ||
            (extendList.roomLog == 0 && to.path == '/room/roomLog'))
        ) {
          next({
            path: '/404',
          });

        } else {
          next();
        }
      }



    } else {
      next({
        path: '/',
        // query: { redirect: to.fullPath } 
      });
    }
  } else {
    next();
  }
});


if (window.sessionStorage.getItem('token')) {
  store.commit('setToken', window.sessionStorage.getItem('token'))
}
if (window.sessionStorage.getItem('activeIndex')) {
  store.commit('saveIndex', window.sessionStorage.getItem('activeIndex'))
}

if (window.sessionStorage.getItem('switchName')) {
  store.commit('switchname', window.sessionStorage.getItem('switchName'))
}
if (JSON.parse(window.sessionStorage.getItem('exTend'))) {
  store.commit('saveExtend', JSON.parse(window.sessionStorage.getItem('exTend')))
}
if (JSON.parse(window.sessionStorage.getItem('setD'))) {
  store.commit('setStroge', JSON.parse(window.sessionStorage.getItem('setD')))
}
if (JSON.parse(window.sessionStorage.getItem('userinfo'))) {
  store.commit('saveUserinfo', JSON.parse(window.sessionStorage.getItem('userinfo')))
}
if (JSON.parse(window.sessionStorage.getItem('Routerid'))) {
  store.commit('setRouterid', JSON.parse(window.sessionStorage.getItem('Routerid')))
}
// this.queryParams = JSON.parse(sessionStorage.getItem('queryParam'));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

// new Vue({
//   //el: '#app',
//   //template: '<App/>',
//   router,
//   store,
//   //components: { App }
//   render: h => h(App)
// }).$mount('#app')