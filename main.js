// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import {
	$http
} from "@escook/request-miniprogram"
uni.$http = $http

$http.baseUrl = "https://api-hmugo-web.itheima.net"

//请求拦截器
$http.beforeRequest = function(o) {
	uni.showLoading({
		title: '数据加载中'
	})
}

// 响应拦截器
$http.afterRequest = function(o) {
	uni.hideLoading()
}

uni.$showMsg = function(title = '数据请求失败！',duration=1500) {
		return uni.showToast({
			title,
			duration,
			icon: "none"
		})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
