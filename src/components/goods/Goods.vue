<template>
  <section class="goods-section clearfix">
    <goods-list :goods="goods" ref="goodsList"></goods-list>
  </section>
</template>

<script>
import GoodsList from 'components/goods-list/GoodsList'
import { getGoods } from 'api'

export default {
  name: 'goods-section',
  data() {
    return {
      goods: []
    }
  },
  created() {
    this._getGoods()
  },
  methods: {
    _getGoods() {
      getGoods().then((res) => {
        this.goods = res
      })
    }
  },
  components: {
    GoodsList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
</style>
