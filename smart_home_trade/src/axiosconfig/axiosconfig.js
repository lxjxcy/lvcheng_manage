// import Vue from 'vue'
// import axios from 'axios'
// import qs from 'qs'
// import {
// 	Message,
// 	Loading
// } from 'element-ui'
// // 响应时间
// axios.defaults.timeout = 5 * 1000
// // 配置cookie
// // axios.defaults.withCredentials = true
// // 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// // 静态资源
// Vue.prototype.$static = ''
// // 配置接口地址
// axios.defaults.baseURL = 'http://192.168.1.205:8009'
// var loadingInstance
// // POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use(
// 	config => {
// 		loadingInstance = Loading.service({
// 			lock: true,
// 			text: '数据加载中，请稍后...',
// 			spinner: 'el-icon-loading',
// 			background: 'rgba(0, 0, 0, 0.7)'
// 		})
// 		if (config.method === 'post') {
// 			config.data = qs.stringify(config.data)
// 		}
// 		return config
// 	},
// 	err => {
// 		loadingInstance.close()
// 		Message.error('请求错误')
// 		return Promise.reject(err)
// 	}
// )
// // 返回状态判断(添加响应拦截器)
// axios.interceptors.response.use(
// 	res => {
// 		if (res.data.code === 200) {
// 			loadingInstance.close()
// 			return res
// 		} else {
// 			loadingInstance.close()
// 			Message.error(res.data.msg)
// 		}
// 	},
// 	err => {
// 		loadingInstance.close()
// 		Message.error('请求失败，请稍后再试')
// 		return Promise.reject(err)
// 	}
// )
// // 发送请求
// export function post(url, params) {
// 	return new Promise((resolve, reject) => {
// 		axios
// 			.post(url, params)
// 			.then(
// 				res => {
// 					resolve(res.data)
// 				},
// 				err => {
// 					reject(err.data)
// 				}
// 			)
// 			.catch(err => {
// 				reject(err.data)
// 			})
// 	})
// }
// export function get(url, params) {
// 	return new Promise((resolve, reject) => {
// 		axios
// 			.get(url, {
// 				params: params
// 			})
// 			.then(res => {
// 				resolve(res.data)
// 			})
// 			.catch(err => {
// 				reject(err.data)
// 			})
// 	})
// }



import axios from 'axios'
import router from '../router/index.js'
import store from '../store/index.js'

// import global from '@/global.js'
import Vue from 'vue'
import {
	Message,
	Loading
} from 'element-ui'

var vueInstance = new Vue()

var instance = axios.create({
	timeout: 1000000,
	// baseURL: 'http://192.168.1.205:8009',
	// axios.defaults.baseURL = 'http://192.168.1.205:8009'
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-With': 'XMLHttpRequest'
	}
})

instance.interceptors.request.use(
	config => {
		if (store.state.token) {
			// debugger
			config.headers.accessToken = store.state.token
			// debugger
			// config.headers.accessToken = "1111"
			// store.commit('showLoading');
			//config.headers.accessToken = window.sessionStorage.getItem('token');
			// config.headers.accessToken = window.localStorage.getItem('token')
		}
		return config
	},
	err => {
		// store.commit('hideLoading');
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(

	response => {
		// store.commit('hideLoading');
		return response
	},
	error => {
		// store.commit('hideLoading');
		vueInstance.$Message.destroy()
		console.log(error.message)
		if (error.response.data.code == 1) {
			store.commit('exitUser')
			// Cookie.delete('userNameHead')
			router.push({
				path: "/login"
			});
		}
		// else if (isError(error.response.data)) {
		// 	vueInstance.$Message.error(error.response.data.message)
		// }
		else {
			vueInstance.$Message.error('请求失败')
		}

		return Promise.reject(error)
	}
)

function isError(data) {
	let code = data.code
	return code === '500'
}

function isNotLogin(data) {
	let code = data.code
	return code === '401'
}

export default instance