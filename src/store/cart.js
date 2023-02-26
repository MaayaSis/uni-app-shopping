export default {
  namespaced: true, // 为当前模块开启命名空间
  // 模块的 state 属性
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]') // 购物车的数组，用来存储购物车中每个商品的信息对象
  }),
  // 模块的 mutations 方法
  mutations: {
    addGoods(state, goods) {
      // 根据提交的商品的Id，查询购物车中是否存在这件商品,有则更新数量,没有则push添加此商品
      const res = state.cart.find((x) => x.goods_id === goods.goods_id)
      if (res) {
        res.goods_count++
        console.log(res, res.goods_count)
      } else {
        state.cart.push(goods)
      }
      this.commit('cart/saveToStorage')
    },
    // 更新商品的状态
    updateRadioStatus(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      if (res) res.goods_state = goods.goods_state
      this.commit('cart/saveToStorage')
    },
    // / 更新商品数量
    updateGoodsCount(state, goods) {
      const res = state.cart.find(item => item.goods_id === goods.goods_id)
      if (res) res.goods_count = goods.goods_count
      this.commit('cart/saveToStorage')
    },
    // 删除购物车中的商品
    removeGoods(state, goods) {
      state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
      this.commit('cart/saveToStorage')
    },
    // 全选/全不选所有商品
    updateAllGoodsState(state, allState) {
      console.log(allState)
      state.cart.forEach(item => { item.goods_state = allState })
    },
    // 持久化存储
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
  // 模块的 getters 属性
  getters: {
    // 购物车中的商品总数量
    total(state) {
      let res = 0
      state.cart.forEach(item => { res += item.goods_count })
      return res
    },
    // 当前被勾选的商品的总数量
    checkedCount(state) {
      console.log(state.cart.filter(item => item.goods_state))
      return state.cart.filter(item => item.goods_state).reduce((total, item) => total + item.goods_count, 0)
    },
    // 已勾选商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(item => item.goods_state).reduce((total, item) => total + (item.goods_count * item.goods_price), 0).toFixed(2)
    }
  }
}
