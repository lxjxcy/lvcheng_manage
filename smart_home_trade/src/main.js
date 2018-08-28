// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myHeader from './view/home/myHeader';
import myFooter from './view/home/myFooter';
import goback from './view/home/goback/goback'
import gobackequim from './view/home/goback/gobackequim'
import gobackroom from './view/home/goback/gobackroom'
import changeFloor from './components/changeFloor'
import changebuild from './components/changebuild'
import changePark from './components/changePark'
import changeRoom from './components/changeRoom'
import addPark from './components/addPark'
import addroom from './components/addroom'
import addBuild from './components/addBuild'
import addFloor from './components/addFloor'
import adduser from './components/adduser'
import setUser from './components/setUser'

import changeuser from './components/changeuser'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Mock from './mock/mock'

// Mock.getMock()

import axios from "./axiosconfig/axiosconfig.js"

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
Vue.component(changebuild.name, changebuild)
Vue.component(changeFloor.name, changeFloor)
Vue.component(changePark.name, changePark)
Vue.component(changeRoom.name, changeRoom)
Vue.component(addPark.name, addPark)
Vue.component(addBuild.name, addBuild)
Vue.component(addFloor.name, addFloor)
Vue.component(addroom.name, addroom)
Vue.component(setUser.name, setUser)
Vue.component(adduser.name, adduser)
Vue.component(changeuser.name, changeuser)

router.beforeEach((to, from, next) => {
  let token = store.state.token;
  if (to.meta.Auth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
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
if (JSON.parse(window.localStorage.getItem('setD'))) {
  store.commit('setStroge', JSON.parse(window.localStorage.getItem('setD')))
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