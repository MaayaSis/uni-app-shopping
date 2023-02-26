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
    <view class="btn-settle">结算{{ checkedCount }}</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']), // 获取被勾选的商品数量
    isFullCheck() {
      return this.total === this.checkedCount
    }
  },
  methods: {
    ...mapMutations('cart', ['updateAllGoodsState']),
    handlerUpdateAllGoodsState() {
      this.updateAllGoodsState(!this.isFullCheck)
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
