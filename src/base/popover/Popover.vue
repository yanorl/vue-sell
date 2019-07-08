<template>
  <transition name="slide">
    <section class="popover-box" v-show="showFlag">
      <section class="popover-wrapper clearfix">
        <section class="popover-content">
          <h1>{{seller.name}}</h1>
          <section class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </section>
          <section class="title">
            <section class="line"></section>
            <section class="text">优惠信息</section>
            <section class="line"></section>
          </section>
          <section class="supports-wrapper" v-if="seller.supports">
            <ul>
              <li class="support-item" v-for="(items, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[items.type]"></span>
                <span class="text">{{items.description}}</span>
              </li>
            </ul>
          </section>
          <section class="title">
            <section class="line"></section>
            <section class="text">商家公告</section>
            <section class="line"></section>
          </section>
          <section class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </section>
        </section>
      </section>
      <section class="popover-close" @click="hide">
        <i class="icon-close"></i>
      </section>
    </section>
  </transition>
</template>

<script>
import Star from 'base/star/Star'
import classMapMixin from 'common/mixins/classMapMixin'

export default {
  name: 'popover-box',
  mixins: [ classMapMixin ],
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  },
  components: {
    Star
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.popover-box
  position: fixed
  top: 0
  bottom: 0
  z-index: 100
  width: 100%
  height: 100%
  overflow: auto
  background-color: $color-background-s
  backdrop-filter: blur(px2rem(10))
  &.slide-enter-active, &.slide-leave-active
    transition: all 1s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .popover-wrapper
    width: 100%
    min-height: 100%
    .popover-content
      padding: px2rem(128) px2rem(72)
      h1
        font-size: px2rem(32)
        font-weight: 700
        line-height: px2rem(32)
        text-align: center
        margin-bottom: px2rem(32)
      .star-wrapper
        text-align: center
        margin-bottom: px2rem(56)
      .title
        display: flex
        margin-bottom: px2rem(48)
        .line
          flex: 1
          top: 50%;
          transform: translate(0, -50%);
          border-bottom: px2rem(2) solid rgba(255,255,255,0.2)
        .text
          padding: 0 px2rem(24)
          font-size: px2rem(28)
          font-weight: 700
          line-height: px2rem(28)
      .supports-wrapper
        margin-bottom: px2rem(56)
        padding: 0 px2rem(24)
        ul li
          margin-bottom: px2rem(24)
          font-size: 0
          line-height: px2rem(24)
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
      .bulletin
        padding: 0 px2rem(24)
        p
          font-size: px2rem(24)
          line-height: px2rem(48)
  .popover-close
    margin-top: px2rem(-128)
    font-size: px2rem(64)
    text-align: center
</style>
