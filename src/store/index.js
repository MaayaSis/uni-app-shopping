// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import user from './user'

Vue.use(Vuex) // 2. 将Vuex安装为Vue 的插件

const store = new Vuex.Store({ // 3. 创建 Store 的实例对象
  modules: { cart, user }// 挂载store模块
})

export default store // 4. 向外共享 Store 的实例对象
