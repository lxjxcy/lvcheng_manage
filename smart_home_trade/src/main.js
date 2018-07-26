// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myHeader from './view/home/myHeader';
// import myFooter from './view/home/myFooter';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// Vue.prototype.$axios = axios;
Vue.use(iView);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component(myHeader.name, myHeader)
// Vue.component(myFooter.name, myFooter)
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