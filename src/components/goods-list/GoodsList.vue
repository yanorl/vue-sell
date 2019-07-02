<template>
  <main>
    <scroll ref="scroll" class="goods-box" :data="goods" :listenScroll="listenScroll" :probeType="probeType">
      <ul>
        <li class="list-group" v-for="(group, index) in goods" :key="index">
          <h1 class="list-group-title">{{group.name}}</h1>
          <ul>
            <li v-for="item in group.foods" :key="item.name" class="list-group-item">
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
              </section>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
  </main>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
export default {
  name: 'goods-box',
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
main
  flex: 1
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
</style>
