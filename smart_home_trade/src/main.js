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
  if (to.meta.Auth) {
    if (token) {
      next();
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

// new Vue({
//   //el: '#app',
//   //template: '<App/>',
//   router,
//   store,
//   //components: { App }
//   render: h => h(App)
// }).$mount('#app')