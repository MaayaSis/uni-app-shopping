<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="handlerUpdateAllGoodsState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="handlerSettle">结算{{ checkedCount }}</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {

  data() {
    return {
      seconds: 3,
      timer: null
    }
  },

  computed: {
    ...mapState('cart', ['cart']), // 获取购物车中的商品信息
    ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']), // 获取被勾选的商品数量
    ...mapState('user', ['token']),
    ...mapGetters('user', ['addstr']), // 获取用户的地址
    isFullCheck() {
      return this.total === this.checkedCount
    }
  },

  methods: {
    ...mapMutations('cart', ['updateAllGoodsState']), // 获取购物车store中的更新商品状态方法
    ...mapMutations('user', ['updateRedirectUrl']), // 获取更新重定向url的方法

    // 点击全选后更新商品状态
    handlerUpdateAllGoodsState() {
      this.updateAllGoodsState(!this.isFullCheck)
    },

    // 展示倒计时的提示消息
    showTips(n) {
      uni.showToast({ // 调用 uni.showToast() 方法，展示提示消息
        icon: 'none', // 不展示任何图标
        title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页', // 提示的消息
        mask: true, // 为页面添加透明遮罩，防止点击穿透
        duration: 1500 // 1.5 秒后自动消失
      })
    },

    // 延迟导航到 my 页面
    delayNavigate() {
      this.seconds = 3
      this.showTips(this.seconds)
      //  创建定时器，每隔 1 秒执行一次
      this.timer = setInterval(() => {
        if (this.seconds <= 0) {
          clearInterval(this.timer)
          uni.switchTab({
            url: '/pages/my/index',
            success: () => {
              this.updateRedirectUrl({
                openType: 'switchTab', // 跳转的方式
                from: '/pages/cart/index' // 跳转的路径
              })
            }
          })
          return
        }
        this.seconds--
        this.showTips(this.seconds)
      }, 1000)
    },

    // 微信支付
    async payOrder() {
      // 1. 创建订单
      const orderInfo = { // 1.1 组织订单的信息对象
        // order_price: this.checkedGoodsAmount, //! 开发期间，注释掉真实的订单价格，
        order_price: 0.01, // 写死订单总价为 1 分钱
        consignee_addr: this.addstr,
        goods: this.cart.filter(item => item.goods_state).map(item => ({ goods_id: item.goods_id, goods_number: item.goods_count, goods_price: item.goods_price }))
      }
      const { data: res } = await uni.$api.post('/api/public/v1/my/orders/create', orderInfo) // 1.2 发起请求创建订单
      if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
      const orderNumber = res.message.order_number // 1.3 得到服务器响应的“订单编号”

      // 2. 订单预支付
      const { data: res2 } = await uni.$api.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber }) // 2.1 发起请求获取订单的支付信息
      if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！') // 2.2 预付订单生成失败
      const payInfo = res2.message.pay // 2.3 得到订单支付相关的必要参数

      // 3. 发起微信支付
      const [err, succ] = await uni.requestPayment(payInfo)
      if (err) return uni.$showMsg('订单未支付！') // 3.2 未完成支付
      const { data: res3 } = await uni.$api.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber }) // 3.3 完成了支付，进一步查询支付的结果
      if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！') // 3.4 检测到订单未支付
      uni.showToast({ title: '支付完成！', icon: 'success' }) // 3.5 检测到订单支付完成
    },

    // 点击结算
    handlerSettle() {
      if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！') // 判断购物车是否有商品
      if (!this.addstr) return uni.$showMsg('请选择收货地址！') // 判断用户是否选择了收货地址
      if (!this.token) return this.delayNavigate() // 判断用户是否登录了
      this.payOrder() // 实现微信支付
    }
  }
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding-left: 5px;
  font-size: 14px;
  // 将背景色从 cyan 改为 white
  background-color: white;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    min-width: 100px;
    height: 50px;
    padding: 0 10px;
    color: white;
    line-height: 50px;
    text-align: center;
    background-color: #c00000;
  }
}
</style>
