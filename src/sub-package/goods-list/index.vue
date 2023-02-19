<template>
  <view class="goods-list">
    <view v-for="(item, i) in goodsList" :key="i" @click="handlerDetail(item)">
      <my-goods :goods="item" />
    </view>
  </view>
</template>

<script>
import MyGoods from '@/components/my-goods.vue'
export default {
  name: 'GoodsList',
  components: { MyGoods },
  data() {
    return {
      isLoading: false, // 节流阀
      // 请求参数对象
      data: {
        cid: '5', // 商品分类Id,教程默认设置为5
        query: '', // 查询关键词
        pagenum: 1, // 页码值
        pagesize: 10, // 每页显示多少条数据
        total: 0 // 分页总数量
      },
      goodsList: [] // 商品列表
    }
  },
  // 页面载入周期函数
  onLoad(options) {
    console.log(options)
    // 将页面参数转存到this.data 对象中
    this.data.query = options.query || ''
    this.data.cid = options.cid || ''
    this.handlerGoodsList() // 获取商品列表数据
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    // 重置数据
    this.data.pagenum = 1
    this.total = 0
    this.isLoading = false
    this.goodsList = []
    // 重新发起请求
    this.handlerGoodsList(() => uni.stopPullDownRefresh())
  },
  // 触底的事件
  onReachBottom() {
    if (this.data.pagenum * this.data.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
    if (this.isLoading) return // 判断用户是否已经发起请求,如果发起请求了;就需要等当前请求完毕才能继续发送
    this.data.pagenum += 1 // 让页码值自增 +1
    // 重新获取列表数据
    this.handlerGoodsList()
  },
  methods: {
    // 获取商品列表数据的方法
    async handlerGoodsList(callback) {
      this.isLoading = true // 开启节流
      const { data: res } = await uni.$api.get('/api/public/v1/goods/search', this.data) // 发起请求
      this.isLoading = false
      callback && callback() // 如果是下拉刷新事件触发的获取请求就需要关闭
      if (res.meta.status !== 200) return uni.$showMsg()
      this.goodsList = [...this.goodsList, ...res.message.goods] // 进行数据的拼接操作
      this.total = res.message.total
    },
    // 跳转到商品详情页
    handlerDetail(value) {
      uni.navigateTo({ url: '/sub-package/goods-detail/index?goods_id=' + value.goods_id })
    }
  }
}
</script>

<style scoped></style>
