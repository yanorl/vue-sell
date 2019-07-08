<template>
  <section class="split-box"></section>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'split-box',
  data() {
    return {}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .split-box
    width: 100%
    height: px2rem(32)
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
</style>
