import Vue from 'vue'
import App from './App'
import * as utils from '@/utils'
import $api from '@/utils/request'

// 将utils中的方法挂载到全局中
Object.keys(utils).forEach(key => {
  uni[`$${key}`] = utils[key]
})

uni.$api = $api
uni.$api.baseUrl = 'https://www.uinav.com' // 全局挂载api请求方法
// 请求拦截器
uni.$api.beforeRequest = function(options) {
  // console.log('request:', options)
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截器
uni.$api.afterRequest = function(res) {
  console.log('response:', res)
  uni.hideLoading()
}

Vue.config.productionTip = false // 开发者工具

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
