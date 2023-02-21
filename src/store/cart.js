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
    // 持久化存储
    saveToStorge(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
  // 模块的 getters 属性
  getters: {
    total(state) {
      let res = 0
      state.cart.forEach(item => { res += item.goods_count })
      return res
    }
  }
}
