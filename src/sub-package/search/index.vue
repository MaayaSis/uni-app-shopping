<template>
  <view class="search-box">
    <!-- uni-ui提供的搜索组件 -->
    <uni-search-bar :radius="100" cancel-button="none" @input="input" />
  </view>
</template>

<script>
export default {
  name: 'Search',
  components: {},
  props: {},
  data() {
    return {
      show: true,
      showSync: true,
      searchVal: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    input(e) {
    // e.value 是最新的搜索内容
      console.log(e.value)
    }
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {}
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style lang="scss" scoped>
// 覆盖search组件默认样式
.uni-searchbar {
  position: relative;
  display: flex;   /* #ifndef APP-NVUE */
  flex-direction: row; /* #endif */
  padding: 16rpx;
  background-color: #c00000;   /* 将默认的 #FFFFFF 改为 #C00000 */
}

// 搜索框吸顶效果
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
