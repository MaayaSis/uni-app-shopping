<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18" />
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
      <!-- 商品列表区域 -->
    </view>
    <uni-swipe-action>
      <block v-for="(goods, index) in cart" :key="index">
        <uni-swipe-action-item :left-options="options" @click="handlerSwipeActionClick(goods)">
          <my-goods
            :goods="goods"
            :visible-radio="true"
            :visible-num="true"
            @handler-radio-change="handlerRadioChange"
            @handler-num-change="handlerNumChange"
          />
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
import TabbarBadge from '@/mixins/tabbar-badge'
import MyGoods from '@/components/my-goods.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Cart',
  components: { MyGoods },
  mixins: [TabbarBadge],
  data() {
    return {
      options: [{
        text: '删除',
        style: { backgroundColor: '#C00000' }
      }]
    }
  },
  computed: {
    ...mapState('cart', ['cart'])
  },
  methods: {
    ...mapMutations('cart', ['updateRadioStatus', 'updateGoodsCount', 'removeGoods']),
    handlerRadioChange(value) {
      this.updateRadioStatus(value)
    },
    handlerNumChange(value) {
      this.updateGoodsCount(value)
    },
    handlerSwipeActionClick(value) {
      this.removeGoods(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-title {
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 5px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;

  .cart-title-text {
    margin-left: 10px;
  }
}
</style>
