<template>
  <view class="my-userinfo-container">

    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar" />
      <view class="nickname">{{ userinfo.nickName }}</view>
    </view>
    <!-- 面板的列表区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <!-- panel 的主体区域 -->
        <view class="panel-body">
          <!-- panel 的 item 项 -->
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>

      <!-- 第二个面板 -->
      <view class="panel">
        <!-- 面板的标题 -->
        <view class="panel-title">我的订单</view>
        <!-- 面板的主体 -->
        <view class="panel-body">
          <!-- 面板主体中的 item 项 -->
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon" />
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon" />
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" class="icon" />
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon" />
            <text>全部订单</text>
          </view>
        </view>
      </view>

      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15" />
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15" />
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MyLogin',
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['userinfo'])
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateAddress']),

    // 退出登录
    async logout() {
      // 询问用户是否退出登录
      const [err, succ] = await uni.showModal({
        title: '提示',
        content: '确认退出登录吗？'
      }).catch(err => err)
      // 需要清空 vuex 中的 userinfo、token 和 address
      if (succ && succ.confirm) {
        this.updateUserInfo({})
        this.updateToken('')
        this.updateAddress({})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-userinfo-container {
  height: 100%;
  // 为整个组件的结构添加浅灰色的背景
  background-color: #f4f4f4;

  .top-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400rpx;
    background-color: #c00000;

    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border: 2px solid white;
      border-radius: 45px;
      box-shadow: 0 1px 5px black;
    }

    .nickname {
      margin-top: 10px;
      color: white;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

.panel-list {
  position: relative;
  top: -10px;
  padding: 0 10px;

  .panel {
    margin-bottom: 8px;
    background-color: white;
    border-radius: 3px;

    .panel-body {
      display: flex;
      justify-content: space-around;

      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        font-size: 13px;
      }
    }
  }
}

.panel-list {
  position: relative;
  top: -10px;
  padding: 0 10px;

  .panel {
    margin-bottom: 8px;
    background-color: white;
    border-radius: 3px;

    .panel-title {
      padding-left: 10px;
      font-size: 15px;
      line-height: 45px;
      border-bottom: 1px solid #f4f4f4;
    }

    .panel-body {
      display: flex;
      justify-content: space-around;

      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        font-size: 13px;

        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}

.panel-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  padding: 0 10px;
  font-size: 15px;
}
</style>
