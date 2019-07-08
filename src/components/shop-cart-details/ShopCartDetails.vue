<template>
    <div>
      <transition name="fold">
        <section class="shop-cart-details-box" v-show="listShow">
          <section class="shop-cart-list">
            <section class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
            </section>
            <scroll class="list-content" :data="selectGoods">
              <ul>
                <li class="food" v-for="(food, index) in selectGoods" :key="index">
                  <span class="name">{{food.name}}</span>
                  <section class="price">
                    <span>¥{{food.price * food.count}}</span>
                  </section>
                  <section class="cart-control-wrapper">
                    <cart-control :food="food"></cart-control>
                  </section>
                </li>
              </ul>
            </scroll>
          </section>
        </section>
      </transition>
      <transition name="bgFold">
        <div class="list-mask" @click="hideList" v-show="listShow"></div>
      </transition>
    </div>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import CartControl from 'base/cart-control/CartControl'
export default {
  name: 'shop-cart-details-box',
  props: {
    selectGoods: {
      tyep: Object,
      default: () => {}
    },
    totalCount: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    listShow() {
      let that = this
      if (!this.totalCount) {
        this.$emit('parentFold')
        return false
      }
      let show = !that.fold
      return show
    }
  },
  methods: {
    empty() {
      this.selectGoods.forEach((food) => {
        food.count = 0
      })
      this.$emit('parentFold')
    },
    hideList() {
      this.$emit('parentFold')
    }
  },
  components: {
    CartControl,
    Scroll
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .shop-cart-details-box
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform: translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.5s
    &.fold-enter, &.fold-leave-active
      transform: translate3d(0, 0, 0)
    .list-header
      height: px2rem(80)
      line-height: px2rem(80)
      padding: 0 px2rem(36)
      background: #f3f5f7
      border-bottom: 1px solid $color-row-line
      .title
        float: left
        font-size: px2rem(28)
        color: $color-background
      .empty
        float: right
        font-size: px2rem(24)
        color: $color-blue
    .list-content
      padding: 0 px2rem(36)
      max-height: px2rem(434)
      overflow: hidden
      background: #fff
      .food
        position: relative
        padding: px2rem(24) 0
        box-sizing: border-box
        border-1px($color-row-line)
        .name
          line-height:  px2rem(48)
          font-size:  px2rem(28)
          color: $color-background
        .price
          position: absolute
          right: px2rem(180)
          bottom: px2rem(24)
          line-height: px2rem(48)
          font-size: px2rem(28)
          font-weight: 700
          color: rgb(240, 20, 20)
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: px2rem(10)
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -2
    backdrop-filter: blur(px2rem(20))
    background: rgba(7, 17, 27, 0.6)
    &.bgFold-enter-active, &.bgFold-leave-active
      transition: all 0.5s
    &.bgFold-enter, &.bgFold-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
