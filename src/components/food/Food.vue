<template>
  <transition name="move">
    <scroll class="food-box" v-show="showFlag" :data="[...food]">
      <section class="food-content">
        <section class="image-header">
          <figure class="image">
            <img :src="food.image" alt="">
          </figure>
          <section class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </section>
        </section>
        <section class="content">
          <h1 class="title">{{food.name}}</h1>
          <section class="detail">
            <span class="sell-count">月销售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </section>
          <section class="price">
            <span class="now">￥<span>{{food.price}}</span></span><span class="old" v-show='food.oldPrice'>
              ￥<span>{{food.oldPrice}}</span>
            </span>
          </section>
          <section class="cart-control-wrapper">
            <cart-control :food="food"></cart-control>
          </section>
          <transition name="fade">
            <section class="buy" v-show="!food.count || food.count === 0" @click="addFirst">
              加入购物车
            </section>
          </transition>
        </section>
        <split v-show="food.info"></split>
        <section class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </section>
        <split v-show="food.info"></split>
        <section class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select @controlContent="controlContent" @controlType="controlType" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
          <section class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="(item, index) in food.ratings" :key="index" v-show="needShow(item.rateType, item.text)" class="rating-item">
                <section class="user">
                  <span class="name">{{item.username}}</span>
                  <img :src="item.avatar" alt="" class="avatar">
                </section>
                <section class="time">{{item.rateTime |formatDate}}</section>
                <p class="text">
                  <span :class="{'icon-thumb_up': item.rateType == 0, 'icon-thumb_down': item.rateType === 1}"></span>
                  {{item.text}}
                </p>
              </li>
            </ul>
            <section class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </section>
          </section>
        </section>
      </section>
    </scroll>
  </transition>
</template>

<script>
import moment from 'moment'
import CartControl from 'base/cart-control/CartControl'
import Split from 'base/split/Split'
import RatingSelect from 'base/rating-select/RatingSelect'
import Bus from 'common/js/bus'
// import { formatDates } from 'common/js/date'
import Scroll from 'base/scroll/Scroll'

const ALL = 2

export default {
  name: 'food-box',
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      this.$set(this.food, 'count', 1)
      Bus.$emit('addEl', event.target)
    },
    controlType(type) {
      this.selectType = type
    },
    controlContent() {
      this.onlyContent = !this.onlyContent
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  components: {
    CartControl,
    Split,
    Scroll,
    RatingSelect
  },
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
      // let date = new Date(time)
      // return formatDates(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .food-box
    position: fixed
    left: 0
    top: 0
    bottom: px2rem(96)
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
     .image-header
       position: relative
       width: 100%
       height: 0
       padding-top: 100%
       .image
         img
           position: absolute
           top: 0
           left: 0
           width: 100%
           height: 100%
        .back
          position: absolute
          top: px2rem(20)
          left: 0
          .icon-arrow_lift
            display: block
            padding: px2rem(20)
            font-size: px2rem(40)
            color: #999
     .content
       position: relative
       padding: px2rem(36)
       .title
         line-height: px2rem(28)
         margin-bottom: px2rem(16)
         font-size: px2rem(28)
         font-weight: 700
         color: rgb(7, 17, 27)
       .detail
         margin-bottom: px2rem(36)
         line-height: px2rem(20)
         height: px2rem(20)
         font-size: 0
         .sell-count, .rating
           font-size: px2rem(20)
           color: rgb(147, 153, 159)
         .sell-count
           margin-right: px2rem(24)
       .price
         font-weight: 700
         line-height: px2rem(48)
         .now
           margin-right: px2rem(16)
           font-size: px2rem(20)
           color: rgb(240, 20, 20)
           span
             font-size: px2rem(28)
         .old
           text-decoration: line-through
           font-size: px2rem(20)
           color: rgb(147, 153, 159)
      .cart-control-wrapper
        position: absolute
        right: px2rem(24)
        bottom: px2rem(24)
      .buy
        position: absolute
        right: px2rem(36)
        bottom: px2rem(36)
        z-index: 10
        height: px2rem(48)
        line-height: px2rem(48)
        padding: 0 px2rem(24)
        box-sizing: border-box
        border-radius: px2rem(24)
        font-size: px2rem(20)
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-enter-active,  &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
      .info
        padding: px2rem(36)
        .title
          line-height: px2rem(28)
          margin-bottom: px2rem(12)
          font-size: px2rem(28)
          color: rgb(7, 17, 27)
        .text
          line-height: px2rem(48)
          padding: 0 px2rem(16)
          font-size: px2rem(24)
          color: rgb(77, 85, 93)
      .rating
        padding-top: px2rem(36)
        .title
          line-height: px2rem(28)
          margin-left: px2rem(36)
          font-size: px2rem(28)
          color: rgb(7, 17, 27)
        .rating-wrapper
          padding: 0 px2rem(36)
          height: auto
          .rating-item
            position: relative
            padding: px2rem(36) 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user
              position: absolute
              right: 0
              top: px2rem(36)
              line-height: px2rem(24)
              font-size: 0
              .name
                display: inline-block
                margin-right: px2rem(12)
                vertical-align: top
                font-size: px2rem(20)
                color: rgb(147, 153, 159)
              .avatar
                border-radius: 50%
                width: px2rem(24)
                height: px2rem(24)
            .time
              margin-bottom: px2rem(12)
              line-height: px2rem(24)
              font-size: px2rem(20)
              color: rgb(147, 153, 159)
            .text
              line-height: px2rem(36)
              font-size: px2rem(24)
              color: rgb(7, 17, 27)
              .icon-thumb_up, .icon-thumb_down
                margin-right: px2rem(8)
                line-height: px2rem(36)
                font-size: px2rem(24)
              .icon-thumb_up
                color: rgb(0, 160, 220)
              .icon-thumb_down
                color: rgb(147, 153, 159)

          .no-rating
            padding: px2rem(36) 0
            font-size: px2rem(24)
            color: rgb(147, 153, 159)
</style>
