<template>
  <section class="goods-wrapper">
    <aside>
      <scroll ref="menuWrapper" class="menu-wrapper" :data="goods" :listenScroll="listenScroll" :probeType="probeType">
        <ul>
          <li v-for="(item, index) in goods" :key="index" ref="listItem" class="menu-item" :class="{'current':currentIndex === index}" @click="selectItem(index,$event)" >
            <div class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              <span class="title">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </scroll>
    </aside>
    <main>
      <scroll ref="goodsBox" class="goods-box" :data="goods" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
        <ul>
          <li class="list-group" v-for="(group, index) in goods" :key="index" ref="listGroup">
            <h1 class="list-group-title" ref="listTitle">{{group.name}}</h1>
            <ul>
              <li @click="selectFood(item)" v-for="item in group.foods" :key="item.name" class="list-group-item">
                <figure class="picture">
                  <img :src="item.icon" :alt="item.name">
                </figure>
                <section class="content-wrapper">
                  <h2 class="name">{{item.name}}</h2>
                  <div class="desc" v-show='item.description'>{{item.description}}</div>
                  <section class="extra">
                    <span class="count">月售{{item.sellCount}}</span><span>好评率:{{item.rating}}%</span>
                  </section>
                  <section class="price">
                    <span class="now">￥<span>{{item.price}}</span></span><span class="old" v-show='item.oldPrice'>
                      ￥<span>{{item.oldPrice}}</span>
                    </span>
                  </section>
                  <section class="cart-control-wrapper">
                    <cart-control :food="item"></cart-control>
                  </section>
                </section>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
      <section class="list-fixed" v-show="fixedTittle" ref="fixed">
        <h1 class="fixed-title">{{fixedTittle}}</h1>
      </section>
    </main>
    <food :food="selectedFood" ref="food"></food>
  </section>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import CartControl from 'base/cart-control/CartControl'
import Food from 'components/food/Food'
import { classMap } from 'common/js/mixin'

export default {
  name: 'goods-box',
  mixins: [classMap],
  props: {
    goods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1,
      selectedFood: {}
    }
  },
  watch: {
    goods() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20) // 数据变化到dom变化渲染大概17s
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      //  当滚动到顶部， newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      //  在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (-newY >= height1 && -newY < height2)) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      //  当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
      console.log(this.currentIndex)
    },
    diff(newVal) {
      const TITLE_HEIGHT = this.$refs.listTitle[0].clientHeight
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0`
    }
  },
  computed: {
    fixedTittle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.goods[this.currentIndex] ? this.goods[this.currentIndex].name : ''
    }
  },
  created() {
    this.listenScroll = true
    this.listHeight = 0
    this.probeType = 3
  },
  components: {
    Scroll,
    CartControl,
    Food
  },
  methods: {
    selectItem(index, event) {
      // 自己开发的event._constructed是为true,pc浏览器没有此事件
      if (!event._constructed) {
        return
      }
      this.$refs.goodsBox.scrollToElement(this.$refs.listGroup[index], 300)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        this.listHeight.push(height)
      }
    },
    selectFood(item) {
      this.selectedFood = item
      this.$refs.food.show()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.goods-wrapper
  display: flex
  position: fixed
  top: px2rem(348)
  bottom: px2rem(96)
  width: 100%
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
          &.current
            background: #fff
            margin-top: px2rem(-2)
            position: relative
            z-index: 10
            .title
              font-weight: 700
            .text
              border-none()
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
  main
    flex: 1
    position: relative
    overflow: hidden
    width: 100%
    .goods-box
      height: 100%;
      overflow: hidden;
      ul
        width: 100%
        .list-group
          .list-group-title
            padding-left: px2rem(28)
            border-left: px2rem(4) solid #d9dde1
            height: px2rem(52)
            line-height: px2rem(52)
            font-size: px2rem(24)
            color: rgb(147,153,159)
            background: $color-background-ssss
      .list-group-item
        display: flex
        padding: px2rem(36)
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .picture
          flex: 0 0 px2rem(114)
          margin-right: px2rem(20)
          img
            width: px2rem(114)
            height: px2rem(114)
        .content-wrapper
          padding-top: px2rem(4)
          color: rgb(147,153,159)
          width: 100%
          position: relative
          .name
            font-size: px2rem(28)
            color: $color-background
            padding-bottom: px2rem(16)
          .desc
            padding-bottom: px2rem(16)
            font-size: px2rem(20)
            line-height: 1.3
          .extra
            font-size: px2rem(20)
            .count
              margin-right: px2rem(24)
          .price
            font-size: px2rem(20)
            font-weight: 700
            line-height: px2rem(48)
            .now
              color: $color-red
              span
                font-size: px2rem(28)
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: px2rem(-15)
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        padding-left: px2rem(28)
        border-left: px2rem(4) solid #d9dde1
        height: px2rem(52)
        line-height: px2rem(52)
        font-size: px2rem(24)
        color: rgb(147,153,159)
        background: $color-background-ssss
</style>
