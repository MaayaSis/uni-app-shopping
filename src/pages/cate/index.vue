<template>
  <view>
    <my-search @click="search" />
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item, index) in cateList" :key="index">
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(index)">{{ item.cat_name }}</view>
        </block>
      </scroll-view>
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <!-- 二级分类 -->
        <view v-for="(item, index) in cateLevel2" :key="index" class="cate-lv2">
          <view class="cate-lv2-title">/ {{ item.cat_name }} /</view>
          <!-- 三级分类 -->
          <view class="cate-lv3-list">
            <view v-for="(_item, _index) in item.children" :key="_index" class="cate-lv3-item" @click="gotoGoodsList(_item)">
              <image :src="_item.cat_icon" />
              <text>{{ _item.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import MySearch from '@/components/my-search.vue'
export default {
  name: 'Cate',
  components: { MySearch },
  data() {
    return {
      wh: 0, // 窗口可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
      active: 0, // 默认选中第一项
      scrollTop: 0, // 滚动条距离顶部的距离
      cateList: [], // 分类数据列表
      cateLevel2: [] // 二级分类列表
    }
  },
  methods: {
    // 获取分类数据
    async getCateList() {
      const { data: res } = await uni.$api.get('/api/public/v1/categories')
      res.meta.status === 200 ? this.cateList = res.message : uni.$showMsg()
      this.cateLevel2 = res.message[0].children
      this.cateLevel2.forEach(item => {
        item.children.forEach(_item => {
          _item.cat_icon = '../../static/miku.jpg'
        })
      })
    },
    // 选中一级分类
    activeChanged(index) {
      this.active = index
      // 为二级分类列表重新赋值
      this.cateList[index].children.forEach(item => {
        item.children.forEach(_item => {
          _item.cat_icon = '../../static/miku.jpg'
        })
      })
      this.cateLevel2 = this.cateList[index].children
      this.scrollTop = this.scrollTop === 0 ? 1 : 0 // 让scrollTop的值在0与1之间切换
    },
    // 点击三级分类项跳转到商品列表页面
    gotoGoodsList(value) {
      uni.navigateTo({
        url: '/sub-package/goods-list/index?cid=' + value.cat_id
      })
    },
    // 点击搜索组件
    search() {
      uni.navigateTo({
        url: '/sub-package/search/index'
      })
    }
  },
  onLoad() {
    this.wh = uni.getSystemInfoSync().windowHeight - 50
    this.getCateList()
  }
}
</script>

<style lang="scss" scoped>
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      font-size: 12px;
      line-height: 60px;
      text-align: center;
      background-color: #f7f7f7;

      // 激活项的样式
      &.active {
        position: relative;
        background-color: #fff;

        // 渲染激活项左侧的红色指示边线
        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          transform: translateY(-50%);
          content: " ";
        }
      }
    }
  }

  .cate-lv2-title {
    padding: 15px 0;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.33%;
      margin-bottom: 10px;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
}
</style>
