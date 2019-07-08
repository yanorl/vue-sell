<template>
  <section class="ball-box" ref="ballBox">
    <section v-for="(ball, index) in balls" :key="index">
      <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <section class="ball" v-show="ball.show">
          <section class="inner inner-hook"></section>
        </section>
      </transition>
    </section>
  </section>
</template>

<script>
import Bus from 'common/js/bus'
export default {
  name: 'ball-box',
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: []
    }
  },
  created() {
    this.drop()
  },
  methods: {
    drop() {
      let that = this
      Bus.$on('addEl', function (el) {
        that._normalizeDrop(el)
      })
    },
    _normalizeDrop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const ballLeft = this.$refs.ballBox.offsetLeft
      const ballTop = this.$refs.ballBox.offsetTop
      const x = rect.left - ballLeft
      const y = -(ballTop - rect.top)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      this._reflow = document.body.offsetHeight
      // 触发浏览器重绘
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.ball-box
  position: fixed
  left: px2rem(75)
  bottom: px2rem(45)
  width: px2rem(32)
  height: px2rem(32)
  z-index: -1
  .ball
    position: fixed
    left: px2rem(75)
    bottom: px2rem(45)
    z-index: 200
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .inner
      width: px2rem(32)
      height: px2rem(32)
      border-radius: 50%
      background: $color-blue
      transition: all 0.4s linear
</style>
