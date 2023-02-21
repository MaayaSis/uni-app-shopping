<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in data.pics" :key="i">
        <!-- 把当前点击的图片的索引，传递到 preview() 处理函数中 -->
        <image :src="item.pics_big" @click="handlerPreview(index)" />
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <view class="price">￥{{ data.goods_price }}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{ data.goods_name }}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray" />
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
      <!-- 商品详情信息 -->
      <rich-text :nodes="data.goods_introduce" />
      <view class="goods_nav">
        <uni-goods-nav :fill="true" :options="options" :button-group="buttons" @click="handlerClick" @buttonClick="buttonClick" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'GoodsDetail',
  data() {
    return {
      data: {}, // 商品数据对象
      options: [ // 左侧按钮的配置对象
        { icon: 'shop', text: '店铺' },
        { icon: 'cart', text: '购物车', info: 2 }
      ],
      buttons: [
        { text: '加入购物车', backgroundColor: '#ff0000', color: '#fff' },
        { text: '立即购买', backgroundColor: '#ffa200', color: '#fff' }
      ]
    }
  },
  // 监听页面加载
  onLoad(options) {
    this.handlerDetail(options.goods_id) // 调用请求商品详情数据的方法
  },
  methods: {
  // 定义请求商品详情数据的方法
    async handlerDetail(value) {
      const { data: res } = await uni.$api.get('/api/public/v1/goods/detail', { goods_id: value })
      if (res.meta.status !== 200) return uni.$showMsg()
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ') // 添加样式解决空白间隙的问题
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg') // 解决 .webp格式图片在ios设备上无法正常显示
      this.data = res.message
    },
    // 实现轮播图的预览效果
    handlerPreview(index) {
      uni.previewImage({ // 调用 uni.previewImage() 方法预览图片
        current: index, // 预览时，默认显示图片的索引
        urls: this.data.pics.map(x => x.pics_big) // 所有图片 url 地址的数组
      })
    },
    // 点击导航组件左侧的按钮
    handlerClick(value) {
      if (value.content.text) uni.switchTab({ url: '/pages/cart/index' })
    }
  }
}
</script>

<style lang="scss" scoped>
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    margin: 10px 0;
    color: #c00000;
    font-size: 18px;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      padding-right: 10px;
      font-size: 13px;
    }
    // 收藏区域
    .favi {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 120px;
      color: gray;
      font-size: 12px;
      border-left: 1px solid #efefef;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    color: gray;
    font-size: 12px;
  }
}

.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}

.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
