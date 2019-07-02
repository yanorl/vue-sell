<template>
  <aside>
    <scroll ref="menuWrapper" class="menu-wrapper" :data="goods" :listenScroll="listenScroll" :probeType="probeType">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item">
          <div class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            <span class="title">{{item.name}}</span>
          </div>
        </li>
      </ul>
    </scroll>
  </aside>
</template>

<script>
import { classMap } from 'common/js/mixin'
import Scroll from 'base/scroll/Scroll'

export default {
  name: 'menu-wrapper',
  mixins: [ classMap ],
  props: {
    goods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  aside
    flex: 0 0 px2rem(160)
    width: px2rem(160)
    background-color: $color-background-ssss
    .menu-wrapper
      height: 100%
      overflow: hidden
      .menu-item
        padding: 0 px2rem(24)
        width: px2rem(160)
        height: px2rem(108)
        box-sizing: border-box;
        display: table
        .text
          font-size: 0
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: top
            width: px2rem(24)
            height: px2rem(24)
            margin-right: px2rem(4)
            background-size: px2rem(24) px2rem(24)
            background-repeat: no-repeat
            &.decrease
              bg-image('images/decrease_3')
            &.discount
              bg-image('images/discount_3')
            &.guarantee
              bg-image('images/guarantee_3')
            &.invoice
              bg-image('images/invoice_3')
            &.special
              bg-image('images/special_3')
          .title
            font-size: px2rem(24)
            line-height: px2rem(28)
</style>
