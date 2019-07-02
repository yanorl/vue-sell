<template>
  <section class="goods-box clearfix">
    <goods-menu-list :goods="goods" ref="goodsMenuList"></goods-menu-list>
    <goods-list :goods="goods" ref="goodsList"></goods-list>
  </section>
</template>

<script>
import GoodsMenuList from 'components/goods-menu-list/GoodsMenuList'
import GoodsList from 'components/goods-list/GoodsList'
import { getGoods } from 'api'

export default {
  name: 'goods-box',
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
    GoodsMenuList,
    GoodsList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.goods-box
  display: flex
  position: fixed
  top: px2rem(348)
  bottom: px2rem(96)
  width: 100%
</style>
