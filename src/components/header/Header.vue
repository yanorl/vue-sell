<template>
  <header class="header-box">
    <section class="content-wrapper clearfix">
      <figure class="avatar">
        <img :src="seller.avatar" alt="seller.name" width="100%">
      </figure>
      <section class="content">
        <section class="title">
          <div class="brand"></div>
          <h1>{{seller.name}}</h1>
        </section>
        <section class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </section>
        <section v-if="seller.supports" class="support">
          <span class="icon decrease"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </section>
      </section>
      <section v-if="seller.supports" class="support-count" @click="showPop">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </section>
    </section>
    <section class="bulletin-wrapper" @click="showPop">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </section>
    <section class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </section>
    <popover ref="popover" :seller = seller></popover>
  </header>
</template>

<script>
import Popover from 'base/popover/Popover'
export default {
  name: 'header-box',
  data() {
    return {
    }
  },
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Popover
  },
  methods: {
    showPop() {
      this.$refs.popover.show()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.header-box
  position: relative;
  background-color: $color-background-ss
  color: #fff
  .content-wrapper
    position: relative
    box-sizing: border-box;
    width: 100%
    padding: px2rem(48) px2rem(24) px2rem(36) px2rem(48)
    .avatar
      float: left
      width: px2rem(128)
      height: px2rem(128)
      border-radius: px2rem(4)
      overflow: hidden
    .content
      float: left
      margin: px2rem(4) 0 px2rem(4) px2rem(32)
      .title
        margin-bottom: px2rem(16)
        font-size: 0
        .brand
          display: inline-block
          width: px2rem(60)
          height: px2rem(36)
          margin-right: px2rem(12)
          bg-image('images/brand')
          background-repeat: no-repeat
          background-size: px2rem(60) px2rem(36)
          vertical-align: top;
         h1
          display: inline-block
          font-size: px2rem(32)
          font-weight: bold
          line-height: px2rem(36)
      .description
        margin-bottom: px2rem(20)
        font-size: px2rem(24)
      .support
        font-size: 0
        .icon
          display: inline-block
          width: px2rem(24)
          height: px2rem(24)
          margin-right: px2rem(8)
          vertical-align: top
          background-size: px2rem(24) px2rem(24)
          &.decrease
            bg-image('images/decrease_1')
          &.discount
            bg-image('images/discount_1')
          &.guarantee
            bg-image('images/guarantee_1')
          &.invoice
            bg-image('images/invoice_1')
          &.special
            bg-image('images/special_1')
        .text
          font-size: px2rem(20)
          line-height: px2rem(24)
     .support-count
       position: absolute
       right: px2rem(24)
       bottom: px2rem(28)
       padding: px2rem(14) px2rem(16)
       border-radius: px2rem(48)
       background: rgba(0,0,0,0.2)
       font-size: 0
       .count
         vertical-align: top
         margin-right: px2rem(4)
         font-size: px2rem(20)
       .icon-keyboard_arrow_right
         font-size: px2rem(20)
  .bulletin-wrapper
    position: relative
    height: px2rem(56)
    line-height: px2rem(56)
    padding: 0 px2rem(24)
    font-size: px2rem(20)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: rgba(7,17,27,0.2)
    .bulletin-title
      display: inline-block
      width: px2rem(44)
      height: px2rem(24)
      vertical-align: middle
      bg-image('images/bulletin')
      background-size: px2rem(44) px2rem(24)
      background-repeat: no-repeat
    .bulletin-text
      margin: 0 px2rem(8)
      vertical-align: middle
      font-size: px2rem(20)
    .icon-keyboard_arrow_right
      position: absolute
      right: px2rem(4)
      font-size: px2rem(20)
      top: 50%
      transform:translate(0, -50%)
  .background
    position: absolute
    top: 0
    left:0
    width: 100%
    height: 100%
    overflow: hidden
    z-index: -1
    filter: blur(px2rem(10))
</style>
