export default {
  namespaced: true, // 开启命名空间

  // state 数据
  state: () => ({
    token: uni.getStorageSync('token') || '', // 用户的 token
    address: JSON.parse(uni.getStorageSync('address') || '{}'), // 收货地址
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'), // 用户的基本信息
    redirectUrl: null // 重定向的 object 对象 { openType, from }
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('user/saveAddressToStorage') // address 对象持久化存储到本地
    },

    // 更新用户的基本信息
    updateUserInfo(state, userInfo) {
      state.userinfo = userInfo
      this.commit('user/saveUserInfoToStorage') // userinfo 对象持久化存储到本地
    },

    // 更新 token 字符串
    updateToken(state, token) {
      state.token = token
      this.commit('user/saveTokenToStorage') // token 字符串持久化存储到本地
      uni.$showMsg('登录成功')
    },

    // 更新重定向的url
    updateRedirectUrl(state, url) {
      state.redirectUrl = url
    },

    // address 持久化存储到本地
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },

    // userinfo 持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },

    // token 字符串持久化存储到本地
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    }
  },

  // 数据包装器
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
