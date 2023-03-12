<template>
  <view class="my-container">
    <!-- 用户未登录时，显示登录组件 -->
    <my-login v-if="!token" />

    <!-- 用户登录后，显示用户信息组件 -->
    <my-user-info v-else />
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import MyLogin from '@/components/my-login'
import MyUserInfo from '@/components/my-userInfo'
import { mapState } from 'vuex'
export default {
  name: 'My',
  components: { MyLogin, MyUserInfo },
  mixins: [badgeMix],
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['token'])
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.my-container {
  height: 100%;
}
</style>
