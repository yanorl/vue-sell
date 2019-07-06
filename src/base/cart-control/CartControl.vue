<template>
  <section class="cart-Control-box">
    <transition name="move">
      <section class="cart-decrease" v-show="good.count > 0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </section>
    </transition>
    <section class="cart-count" v-show="good.count > 0">{{good.count}}</section>
    <section class="cart-add" @click="addCart">
      <span class="inner icon-add_circle"></span>
    </section>
  </section>
</template>

<script>
import Bus from 'common/js/bus'
export default {
  name: 'cart-Control-box',
  props: {
    good: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    addCart(event) {
      if (!this.good.count) {
        this.$set(this.good, 'count', 1)
        // this.good.count = 1
      } else {
        this.good.count++
      }
      Bus.$emit('addEl', event.target)
    },
    decreaseCart() {
      if (this.good.count) {
        this.good.count--
      }
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .cart-Control-box
    font-size: 0
    .cart-decrease,.cart-add
      display: inline-block
      padding: px2rem(16)
      .inner
        display: inline-block
        line-height: px2rem(48)
        font-size: px2rem(48)
        color: $color-blue
        transition: all 0.4s linear
      &.move-enter-active,&.move-leave-active
        transition: all 0.4s linear
      &.move-enter,&.move-leave-to
        opacity: 0
        transform: translate3d(px2rem(48), 0 , 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: px2rem(24)
      padding-top: px2rem(16)
      line-height: px2rem(48)
      text-align: center
      font-size: px2rem(20)
      color: rgb(147,153,159)
</style>
