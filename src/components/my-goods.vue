<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio v-if="visibleRadio" :checked="goods.goods_state" color="#C00000" @click="handlerRadio" />
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic" />
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{ goods.goods_price | money }}</view>
        <!-- 商品数量 -->
        <uni-number-box v-if="visibleNum" :min="1" :value="goods.goods_count" @change="handlerNum" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  filters: { // 价格过滤器
    money(value) {
      return Number(value).toFixed(2)
    }
  },
  props: {
    // 商品的信息对象
    goods: {
      type: Object,
      default: () => {}
    },
    visibleRadio: {
      type: Boolean,
      default: false
    },
    visibleNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png' // 默认的空图片
    }
  },
  methods: {
    handlerRadio() {
      this.$emit('handlerRadioChange', {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state
      })
    },
    handlerNum(val) {
      this.$emit('handlerNumChange', {
        goods_id: this.goods.goods_id,
        goods_count: val
      })
    }
  }
}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  // 设置盒模型为 border-box
  box-sizing: border-box;
  // 让 goods-item 项占满整个屏幕的宽度
  width: 750rpx;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;

    .goods-pic {
      display: block;
      width: 100px;
      height: 100px;
    }
  }

  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .goods-price {
      color: #c00000;
      font-size: 16px;
    }
  }
}
</style>
