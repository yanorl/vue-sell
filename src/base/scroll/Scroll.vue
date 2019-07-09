<template>
  <div class="scroll-box" ref="scrollBox">
    <slot>
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll-box',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll() {
      if (!this.$refs.scrollBox) {
        return
      }
      this.scroll = new BScroll(this.$refs.scrollBox, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      console.log(this.scroll)
      if (this.listenScroll) {
        let that = this
        this.scroll.on('scroll', (pos) => {
          that.$emit('scroll', pos)
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      console.log(1)
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.refresh()
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
</style>
