<template>
  <view>
    <view class="search-box">
      <!-- uni-ui提供的搜索组件 -->
      <uni-search-bar :radius="100" cancel-button="none" @input="input" />
    </view>
    <!-- 搜索建议列表 -->
    <view v-if="keyWordList.length" class="sugg-list">
      <view v-for="(item, index) in keyWordList" :key="index" class="sugg-item" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16" />
      </view>
    </view>
    <view v-else class="history-box">
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="handlerClean" />
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag v-for="(item, index) in historyList" :key="index" :text="item" @click="handlerGoodsList(item)" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      timer: null, // 延时器
      keyWord: '', // 关键词
      keyWordList: [], // 搜索得到的关键词列表
      historyList: [] // 搜索列表
    }
  },
  methods: {
    // 搜索框输入事件
    input(value) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.keyWord = value
        this.getKeyWordList()
      }, 500)
    },
    // 获取关键词
    async getKeyWordList() {
      if (this.keyWord === '') {
        this.keyWordList = []
        return
      }
      console.log(this.keyWord)
      const { data: res } = await uni.$api.get('/api/public/v1/goods/qsearch', { query: this.keyWord })
      if (res.meta.status !== 200) return uni.$showMsg()
      this.keyWordList = res.message
      if (this.historyList.includes(this.keyWord)) return // 搜索历史去重
      this.historyList.unshift(this.keyWord) // 最新搜索历史出现在第一位
      uni.setStorageSync('kw', JSON.stringify(this.historyList)) // 持久化存储
    },
    // 点击交易的item项
    gotoDetail(value) {
      uni.navigateTo({ url: '/sub-package/goods-detail/index?goods_id=' + value })
    },
    // 清空历史纪录
    handlerClean() {
      this.historyList = []
      this.setStorageSync('kw', '[]')
    },
    // 点击历史纪录跳转到商品列表页面
    handlerGoodsList(value) {
      uni.navigateTo({ url: '/sub-package/goods-list/index?query=' + value })
    }
  },
  onLoad() {
    console.log(uni.getStorageSync('kw'))
    this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]') // 页面载入时加载本地存储的数据
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

// 搜索选项
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    font-size: 12px;
    border-bottom: 1px solid #efefef;

    .goods-name {
      margin-right: 3px;
      overflow: hidden; // 溢出部分隐藏
      white-space: nowrap; // 文字不允许换行（单行文本）
      text-overflow: ellipsis; // 文本溢出后，使用 ... 代替
    }
  }
}

// 搜索历史
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
