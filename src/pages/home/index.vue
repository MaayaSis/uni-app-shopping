<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch" />
    </view>
    <view class="swiper-list">
      <!-- 轮播图 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <navigator class="swiper-item" :url="'/sub-package/goods-detail/index?goods_id=' + item.goods_id">
            <image :src="item.image_src" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 分类 -->
    <view class="nav-list">
      <view v-for="(item, index) in navList" :key="index" class="nav-item" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img" />
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <view v-for="(titleItem, index) in floorList" :key="index" class="floor-item">
        <!-- 标题图片 -->
        <image :src="titleItem.floor_title.image_src" class="floor-title" />
        <!-- 内容图片 -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="titleItem.product_list[0].url">
            <image :src="titleItem.product_list[0].image_src" :style="{width: titleItem.product_list[0].image_width + 'rpx'}" mode="widthFix" />
          </navigator>
          <view class="right-img-box">
            <view v-for="(contentItem, _index) in titleItem.product_list" v-show="_index !== 0" :key="_index" class="right-img-item">
              <image :src="contentItem.image_src" mode="widthFix" :style="{width: contentItem.image_width + 'rpx'}" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MySearch from '@/components/my-search.vue'
export default {
  name: 'Home',
  components: { MySearch },
  props: {},
  data() {
    return {
      swiperList: [], // 轮播图数据
      navList: [], // 分类数据
      floorList: [] // 楼层数据
    }
  },
  methods: {
    // 获取轮播图数据
    async getSwiperList() {
      const { data: res } = await uni.$api.get('/api/public/v1/home/swiperdata')
      res.meta.status === 200 ? this.swiperList = res.message : uni.$showMsg('test')
    },
    // 获取分类数据
    async getNavList() {
      const { data: res } = await uni.$api.get('/api/public/v1/home/catitems')
      res.meta.status === 200 ? this.navList = res.message : uni.$showMsg()
    },
    // 获取楼层数据
    async getFloorList() {
      const { data: res } = await uni.$api.get('/api/public/v1/home/floordata')
      res.meta.status === 200 ? this.floorList = res.message : uni.$showMsg()
      res.message.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.url = '/sub-package/goods-list/index?' + prod.navigator_url.split('?')[1]
        })
      })
    },
    // 搜索事件
    gotoSearch() {
      uni.navigateTo({
        url: '/sub-package/search/index'
      })
    },
    // 点击分类区域的分类图片,则跳转到分类
    navClickHandler(item) {
      if (item.name === '分类') {
        console.log(item)
        uni.switchTab({ url: '/pages/cate/index' })
      }
    }
  },
  // 页面周期函数--监听页面加载D
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  }
}
</script>

<style lang="scss">
// 搜索组件吸顶
.search-box {
  position: sticky;   // 设置定位效果为“吸顶”
  // 吸顶的“位置”
  top: 0;
  z-index: 999;   // 提高层级，防止被轮播图覆盖
}
// 轮播图
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
// 分类
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
// 楼层
.floor-list {
  .floor-title {
    display: flex;
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
}
</style>
