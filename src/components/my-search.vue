<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17" />
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Search',
  props: {
  // 背景颜色
    bgcolor: {
      type: String,
      default: '#C00000'
    },
    // 圆角尺寸
    radius: {
      type: Number,
      default: 18 // 单位是 px
    }
  },
  methods: {
    // 点击模拟的input输入框
    searchBoxHandler() {
      this.$emit('click') // 触发外界绑定的click事件处理函数
    }
  }
}
</script>

<style lang="scss" scoped>
.my-search-container {
  // 移除背景颜色，改由 props 属性控制
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
}
// 移除圆角尺寸，改由 props 属性控制
.my-search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36px;
  background-color: #fff;

  .placeholder {
    margin-left: 5px;
    font-size: 15px;
  }
}
</style>
