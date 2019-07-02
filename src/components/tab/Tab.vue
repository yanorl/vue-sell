<template>
  <section class="tab-box">
    <router-link tag="div" class="tab-item" to="/goods">
      <span class="tab-link">商品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/ratings">
      <span class="tab-link">评论</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/seller">
      <span class="tab-link">商家</span>
    </router-link>
  </section>
</template>

<script>

export default {
  name: 'tab-box',
  data() {
    return {}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tab-box
    display: flex
    height: px2rem(80)
    line-height: px2rem(80)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      font-size: px2rem(28)
      color: rgb(77,85,93)
      text-align: center
      &.router-link-active
        color: $color-red
</style>
