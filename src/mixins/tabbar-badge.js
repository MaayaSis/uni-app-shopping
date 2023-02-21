import { mapGetters } from 'vuex'

export default { // 暴露一个mixin对象
  computed: { ...mapGetters('m_cart', ['total']) },
  onShow() {
    this.setBadge() // 在页面刚展示的时候，设置数字徽标
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({ index: 2, text: this.total + '' }) // 只有购物车要角标,因此index始终为2; text必须为string
    }
  }
}
