<template>
  <section class="star-box" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </section>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'star-box',
  props: {
    size: {
      type: Number,
      default: 36
    },
    score: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    starType() {
      return `star-${this.size}`
    },
    itemClasses() {
      let result = []
      const score = Math.floor(this.score * 2) / 2
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.star-box
    display: flex
    align-items: center
    justify-content: center
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: px2rem(40)
        height: px2rem(40)
        margin-right: px2rem(44)
        background-size: px2rem(40) px2rem(40)
        &:last-child
          margin-right: 0
        &.on
          bg-image('images/star48_on')
        &.half
          bg-image('images/star48_half')
        &.off
          bg-image('images/star48_off')
    &.star-36
      .star-item
        width: px2rem(30)
        height: px2rem(30)
        margin-right: px2rem(12)
        background-size: px2rem(30) px2rem(30)
        &:last-child
          margin-right: 0
        &.on
          bg-image('images/star36_on')
        &.half
          bg-image('images/star36_half')
        &.off
          bg-image('images/star36_off')
    &.star-24
      .star-item
        width: px2rem(20)
        height: px2rem(20)
        margin-right: px2rem(6)
        background-size: px2rem(20) px2rem(20)
        &:last-child
          margin-right: 0
        &.on
          bg-image('images/star24_on')
        &.half
          bg-image('images/star24_half')
        &.off
          bg-image('images/star24_off')
</style>
