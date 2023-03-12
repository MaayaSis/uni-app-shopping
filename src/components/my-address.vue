<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view v-if="JSON.stringify(address) === '{}'" class="address-choose-box">
      <button type="primary" size="mini" class="btnChooseAddress" @click="handlerAddress">请选择收货地址+</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view v-else class="address-info-box" @click="handlerAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{ address.userName }}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{ address.telNumber }}</text></view>
          <uni-icons type="arrowright" size="16" />
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ addstr }}</view>
      </view>
    </view>

    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border" />
  </view>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['address']),
    // 收货详细地址的计算属性
    ...mapGetters('user', ['addstr'])
  },
  methods: {
    ...mapMutations('user', ['updateAddress']),
    // 选择收货地址
    async handlerAddress() {
    //  1.调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
    //  返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
      await uni.chooseAddress({
        success: res => this.updateAddress(res),
        fail: res => console.log('失败', res),
        complete: res => console.log('完成', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 底部边框线的样式
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}

// 选择收货地址的盒子
.address-choose-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
}

// 渲染收货信息的盒子
.address-info-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  padding: 0 5px;
  font-size: 12px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
