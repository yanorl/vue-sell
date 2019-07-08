<template>
  <section class="cart-Control-box">
    <transition name="move">
      <section class="cart-decrease" v-show="food.count > 0" @click.stop="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </section>
    </transition>
    <section class="cart-count" v-show="food.count > 0">{{food.count}}</section>
    <section class="cart-add" @click.stop="addCart">
      <span class="inner icon-add_circle"></span>
    </section>
  </section>
</template>

<script>
import Bus from 'common/js/bus'
export default {
  name: 'cart-Control-box',
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
        // this.food.count = 1
      } else {
        this.food.count++
      }
      Bus.$emit('addEl', event.target)
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--
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
