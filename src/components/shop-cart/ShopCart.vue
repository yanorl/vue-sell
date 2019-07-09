<template>
  <section class="shop-cart-box">
    <section class="content-wrapper" @click.stop="toggleList">
      <section class="content-left">
        <section class="logo-wrapper">
          <section class="logo" :class="{'highlight': totalCount > 0}">
            <span class="icon-shopping_cart"></span>
          </section>
          <section class="num" v-show="totalCount > 0">{{totalCount}}</section>
        </section>
        <section class="price" :class="{'highlight': totalPrice > 0}">¥{{totalPrice}}</section>
        <section class="desc">另需配送费¥{{deliveryPrice}}元</section>
      </section>
      <section class="content-right" @click.stop.prevent="pay">
        <section class="pay" :class="payClass">
          {{payDesc}}
        </section>
      </section>
    </section>
    <ball></ball>
    <shop-cart-details ref="shopCartDetails" @parentFold="changeFold" :fold="fold" :selectGoods="selectGoods" :totalCount="totalCount"></shop-cart-details>
  </section>
</template>

<script>
import Ball from 'base/ball/Ball'
import ShopCartDetails from 'components/shop-cart-details/ShopCartDetails'

export default {
  name: 'shop-cart-box',
  props: {
    selectGoods: {
      type: Array,
      default: () => []
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fold: true // 购物车详情页折叠状态,true表示折叠
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectGoods.forEach((item) => {
        total += item.price * item.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectGoods.forEach((item) => {
        count += item.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  components: {
    Ball,
    ShopCartDetails
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    changeFold() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}元`)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .shop-cart-box
    position: fixed
    left: 0
    bottom: 0
    z-index: 10
    width: 100%
    height: px2rem(96)
    background: #000
    .content-wrapper
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: px2rem(-20)
          margin: 0 px2rem(36)
          padding: px2rem(12)
          width: px2rem(88)
          height: px2rem(88)
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background-color: $color-blue
              .icon-shopping_cart
                color: #fff
            .icon-shopping_cart
              font-size: px2rem(48)
              line-height: px2rem(88)
              color: #80858a
          .num
            position: absolute
            top: 0
            right: 0
            width: px2rem(48)
            height: px2rem(32)
            line-height: px2rem(32)
            text-align: center
            border-radius: px2rem(32)
            font-size: px2rem(18)
            font-weight: 700
            color: #fff
            background: $color-red
            box-shadow: 0 px2rem(4) px2rem(8) 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          margin-top: px2rem(24)
          line-height: px2rem(48)
          padding-right: px2rem(24)
          border-right: px2rem(1) solid rgba(255,255,255,0.1)
          font-size: px2rem(32)
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          margin-left: px2rem(24)
          font-size: px2rem(20)
          line-height: px2rem(48)
      .content-right
        flex: 0 0 px2rem(210)
        width: px2rem(210)
        .pay
          font-size: px2rem(24)
          font-weight: 700
          line-height: px2rem(96)
          padding: 0 px2rem(16)
          text-align: center
          &.not-enough
            background-color: #2b343c
          &.enough
            background-color: #00b43c
            color: #fff
</style>
