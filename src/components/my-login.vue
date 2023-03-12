<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF" />
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'MyLogin',
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['redirectUrl'])
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectUrl']), // updateUserInfo 映射到当前组件中使用

    // 获取微信用户的基本信息
    getUserInfo(value) {
      if (value.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！') // 判断是否获取用户信息成功
      this.updateUserInfo(value.detail.userInfo) // 存储到vuex
      this.getToken(value.detail)
    },

    // 获取登录成功的token字符串
    async getToken(value) {
      const [err, res] = await uni.login().catch(err => err) // 调用微信登录接口拿到当前微信用户的唯一身份标识
      if (err || res.errMsg !== 'login:ok') return uni.$showError('微信登录失败！') // 判断是否 uni.login() 调用失败
      // 准备请求参数对象
      const params = {
        code: res.code,
        encryptedData: value.encryptedData,
        iv: value.iv,
        rawData: value.rawData,
        signature: value.signature
      }
      // 用当前微信用户的唯一身份标识换取黑马的 token
      const { data: loginResult } = await uni.$api.get('/api/public/v1/users/wxlogin', params)
      loginResult.meta.status = 200 //! 黑马此接口无返回值
      loginResult.message = { token: 'MaayaSis' } //! 同上
      if (loginResult.meta.status !== 200) return uni.$showMsg('黑马登录失败！')
      this.updateToken(loginResult.message.token)
      this.navigateBack() // 登录成功后执行重定向至登录前页面
    },

    // 返回登录之前的页面
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') { // redirectInfo 不为 null，并且导航方式为 switchTab
        uni.switchTab({ // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          url: this.redirectInfo.from, // 要导航到的页面地址
          complete: () => { // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            this.updateRedirectInfo(null)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // 登录盒子的样式
    height: 750rpx;
    overflow: hidden;
    background-color: #f8f8f8;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
      content: " ";
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      margin: 15px 0;
      background-color: #c00000;
      border-radius: 100px;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      color: gray;
      font-size: 12px;
    }
  }
</style>
