<template>
  <scroll class="rantings-box" :data="ratings">
    <section class="ratings-content">
      <section class="over-view">
        <section class="over-view-left">
          <h1 class="score">{{seller.score}}</h1>
          <section class="title">综合评分</section>
          <section class="rank">高于周边商家{{seller.rankRate}}</section>
        </section>
        <section class="over-view-right">
          <section class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="star-wrapp">
              <star :size="36" :score="seller.serviceScore"></star>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </section>
          <section class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="star-wrapp">
              <star :size="36" :score="seller.foodScore"></star>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </section>
          <section class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </section>
        </section>
      </section>
      <split></split>
      <rating-select @controlContent="controlContent" @controlType="controlType" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></rating-select>
      <section class="rating-wrapper">
        <ul>
          <li v-for="(item, index) in ratings" :key="index" class="rating-item" v-show="needShow(item.rateType, item.text)">
            <figure class="avatar">
              <img :src="item.avatar" alt="">
            </figure>
            <section class="content">
              <h1 class="name">{{item.username}}</h1>
              <section class="star-wrapper">
                <star :size="24" :score="item.score"></star>
                <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}</span>
              </section>
              <p class="text">{{item.text}}</p>
              <section class="recommend" v-show="item.recommend && item.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(list, k) in item.recommend" :key="k">{{list}}</span>
              </section>
              <section class="time">{{item.rateTime |formatDate}}</section>
            </section>
          </li>
        </ul>
      </section>
    </section>
  </scroll>
</template>

<script>
import { getRatings } from 'api'
import Star from 'base/star/Star'
import Split from 'base/split/Split'
import RatingSelect from 'base/rating-select/RatingSelect'
import Scroll from 'base/scroll/Scroll'
import ratingMixin from 'common/mixins/ratingMixin'

export default {
  name: 'rantings-box',
  mixins: [ratingMixin],
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ratings: []
    }
  },
  created() {
    this._getRatings()
  },
  methods: {
    _getRatings() {
      getRatings().then((res) => {
        this.ratings = res
      })
    }
  },
  components: {
    Star,
    Split,
    RatingSelect,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.rantings-box
  position: absolute
  top: px2rem(348)
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .ratings-content
    .over-view
      display: flex
      padding: px2rem(36) 0
      .over-view-left
        flex: 0 0  px2rem(275)
        padding: px2rem(12) 0
        width: px2rem(275)
        border-right: px2rem(1) solid rgba(7,17,27,0.1)
        text-align: center
        .score
          margin-bottom: px2rem(12)
          line-height: px2rem(56)
          font-size: px2rem(48)
          color: rgb(255,153,0)
        .title
          margin-bottom: px2rem(16)
          line-height: px2rem(24)
          font-size: px2rem(24)
          clolr: rgb(7,17,27)
        .rank
          line-height: px2rem(20)
          font-size: px2rem(20)
          color: rgb(147,153,159)
      .over-view-right
        flex: 1
        padding: px2rem(12) 0 px2rem(12) px2rem(48)
        .score-wrapper
          margin-bottom: px2rem(16)
          line-height: px2rem(36)
          font-size: 0
          span
            display: inline-block
            vertical-align: top
          .title
            font-size: px2rem(24)
            color: rgb(7,17,27)
          .star-wrapp
            margin: 0 px2rem(24)
          .score
            font-size: px2rem(24)
            color: rgb(255,133, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: px2rem(36)
            font-size: px2rem(24)
            color: rgb(7,17,27)
          .delivery
            margin-left: px2rem(24)
            font-size:  px2rem(24)
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 px2rem(36)
      .rating-item
        display: flex
        padding: px2rem(36) 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 px2rem(72)
          width: px2rem(72)
          margin-right: px2rem(24)
          img
            border-radius: 50%
            width: px2rem(56)
            height:  px2rem(56)
        .content
          position: relative
          flex: 1
          .name
            margin-bottom:  px2rem(8)
            line-height: px2rem(24)
            font-size:  px2rem(20)
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: px2rem(12)
            font-size: 0
            .star-box
              margin-right: px2rem(12)
              display: inline-block
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: px2rem(24)
              font-size:  px2rem(20)
              color: rgb(147, 153, 159)
          .text
            margin-bottom: px2rem(16)
            line-height: px2rem(36)
            color: rgb(7, 17, 27)
            font-size: px2rem(24)
          .recommend
            line-height:  px2rem(32)
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 px2rem(16)  px2rem(8) 0
              font-size: px2rem(18)
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0  px2rem(12)
              border: px2rem(1) solid rgba(7, 17, 27, 0.1)
              border-radius: px2rem(1)
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: px2rem(24)
            font-size:  px2rem(20)
            color: rgb(147, 153, 159)
</style>
