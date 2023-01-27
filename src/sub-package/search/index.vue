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
      searchVal: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    input(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
// 覆盖search组件默认样式
.uni-searchbar {
  position: relative;
  display: flex;
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
