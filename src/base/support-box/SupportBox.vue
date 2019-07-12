<template>
  <section class="supports-box">
    <ul>
      <li class="support-item" v-for="(items, index) in supports" :key="index" :class="{'active': active}">
        <span class="icon" :class="classMap[items.type]"></span>
        <span class="text">{{items.description}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import classMapMixin from 'common/mixins/classMapMixin'

export default {
  name: 'supports-box',
  props: {
    supports: {
      type: Array,
      default: () => []
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  mixins: [ classMapMixin ],
  data() {
    return {}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .supports-box
    ul li
      margin-bottom: px2rem(24)
      font-size: 0
      line-height: px2rem(24)
      &.padding
        padding: px2rem(32) px2rem(24)
        margin-bottom: 0
        border-1px(rgba(7, 17, 27, 0.1))
      &:laste-child
        margin-bottom: 0
      .icon
        display: inline-block
        width: px2rem(32)
        height: px2rem(32)
        vertical-align: top
        margin-right: px2rem(12)
        background-size: px2rem(32) px2rem(32)
        background-repeat: no-repeat
        &.decrease
          bg-image('images/decrease_2')
        &.discount
          bg-image('images/discount_2')
        &.guarantee
          bg-image('images/guarantee_2')
        &.invoice
          bg-image('images/invoice_2')
        &.special
          bg-image('images/special_2')
      .text
        font-size: px2rem(24)
        line-height: px2rem(32)
</style>
