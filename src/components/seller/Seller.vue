<template>
  <scroll class="seller-box" :data="[...seller]">
    <section class="seller-content">
      <section class="over-view">
        <h1 class="title">{{seller.name}}</h1>
        <section class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </section>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <section class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </section>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <section class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </section>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <section class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </section>
          </li>
        </ul>
        <section class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </section>
      </section>
      <split></split>
      <section class="bulletin">
        <h1 class="title">公告与活动</h1>
        <section class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </section>
        <section class="supports">
          <supports-box :supports="seller.supports" :active="true"></supports-box>
        </section>
      </section>
      <split></split>
      <section class="pics">
        <h1 class="title">商家实景</h1>
        <scroll class="pic-wrapper" ref="picWiapper" :data="seller.pics" :scrollX="true">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index" ref="picItem">
              <img :src="pic" alt="" ref="picImg">
            </li>
          </ul>
        </scroll>
      </section>
      <split></split>
      <section class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </section>
    </section>
  </scroll>
</template>

<script>
import Star from 'base/star/Star'
import Split from 'base/split/Split'
import SupportsBox from 'base/supports-box/SupportsBox'
import Scroll from 'base/scroll/Scroll'
export default {
  name: 'seller-box',
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    'seller'() {
      this.$nextTick(() => {
        this._initPics()
        console.log(2)
      })
    }
  },
  data() {
    return {
      favorite: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initPics()
    })
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '未收藏'
    }
  },
  components: {
    Star,
    Split,
    SupportsBox,
    Scroll
  },
  methods: {
    _initPics() {
      if (this.seller.pics) {
        let picWidth = this.$refs.picItem[0].clientWidth
        let padding = picWidth - this.$refs.picImg[0].clientWidth
        let width = picWidth * this.seller.pics.length - padding
        this.$refs.picList.style.width = `${width}px`
        this.$nextTick(() => {
          this.$refs.picWiapper.refresh()
        })
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.seller-box
  position: absolute
  top: px2rem(348)
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .over-view
    position: relative
    padding: px2rem(36)
    .title
      margin-bottom: px2rem(16)
      line-height: px2rem(28)
      color: rgb(7, 17, 27)
      font-size: px2rem(28)
    .desc
      padding-bottom: px2rem(36)
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .star-box
        display: inline-block
        margin-right: px2rem(16)
        vertical-align: top
      .text
        display: inline-block
        margin-right: px2rem(24)
        line-height: px2rem(36)
        vertical-align: top
        font-size: px2rem(20)
        color: rgb(77, 85, 93)
    .remark
      display: flex
      padding-top: px2rem(36)
      .block
        flex: 1
        text-align: center
        border-right: px2rem(1) solid rgba(7, 17, 27, 0.1)
        &:last-child
          border: none
        h2
          margin-bottom: px2rem(8)
          line-height: px2rem(20)
          font-size: px2rem(20)
          color: rgb(147, 153, 159)
        .content
          line-height: px2rem(48)
          font-size: px2rem(20)
          color: rgb(7, 17, 27)
          .stress
            font-size: px2rem(48)
    .favorite
      position: absolute
      width: px2rem(100)
      right: px2rem(22)
      top: px2rem(36)
      text-align: center
      font-size: 0
      .icon-favorite
        display: block
        margin-bottom: px2rem(8)
        line-height: px2rem(48)
        font-size: px2rem(48)
        color: #d4d6d9
        &.active
          color: rgb(240, 20, 20)
      .text
        line-height: px2rem(20)
        font-size: px2rem(20)
        color: rgb(77, 85, 93)
  .bulletin
    padding: px2rem(36) px2rem(36) 0 px2rem(36)
    .title
      margin-bottom: px2rem(16)
      line-height: px2rem(28)
      color: rgb(7, 17, 27)
      font-size: px2rem(28)
    .content-wrapper
      padding: 0 px2rem(24) px2rem(32) px2rem(24)
      border-1px(rgba(7, 17, 27, 0.1))
      .content
        line-height: px2rem(48)
        font-size: px2rem(24)
        color: rgb(240, 20, 20)
  .pics
    padding: px2rem(36)
    .title
      margin-bottom: px2rem(24)
      line-height: px2rem(28)
      color: rgb(7, 17, 27)
      font-size: px2rem(28)
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          padding-right: px2rem(12)
          img
            width: px2rem(240)
            height: px2rem(180)
          &:last-child
            padding: 0
  .info
    padding: px2rem(36) px2rem(36) 0 px2rem(36)
    color: rgb(7, 17, 27)
    .title
      padding-bottom: px2rem(24)
      line-height: px2rem(28)
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: px2rem(28)
    .info-item
      padding: px2rem(32) px2rem(24)
      line-height: px2rem(32)
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: px2rem(24)
      &:last-child
        border-none()
</style>
