import Vue from 'vue'
import App from './App'
import * as utils from '@/utils'
import $api from '@/utils/request'
import store from '@/store/index'

// 将utils中的方法挂载到全局中
Object.keys(utils).forEach(key => {
  uni[`$${key}`] = utils[key]
})

uni.$api = $api
uni.$api.baseUrl = 'https://www.uinav.com' // 全局挂载api请求方法
// 请求拦截器
uni.$api.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    options.header = { // 为请求头添加身份认证字段
      Authorization: store.state.user.token // 字段的值可以直接从 vuex 中进行获取
    }
  }
}
// 响应拦截器
uni.$api.afterRequest = function(api, res) {
  console.log(`response-${api}:`, res)
  uni.hideLoading()
}

Vue.config.productionTip = false // 开发者工具

App.mpType = 'app'
const app = new Vue({
  ...App,
  store // 挂载vuex实例
})
app.$mount()
