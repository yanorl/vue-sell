<template>
  <section class="goods-section clearfix">
    <goods-list :goods="goods" ref="goodsList"></goods-list>
    <shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-goods="selectGoods"></shop-cart>
  </section>
</template>

<script>
import GoodsList from 'components/goods-list/GoodsList'
import ShopCart from 'components/shop-cart/ShopCart'
import { getGoods } from 'api'

export default {
  name: 'goods-section',
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this._getGoods()
  },
  computed: {
    selectGoods() {
      let good = []
      console.log(this.goods)
      this.goods.forEach((item) => {
        item.foods.forEach((list) => {
          if (list.count) {
            good.push(list)
          }
        })
      })
      return good
    }
  },
  methods: {
    _getGoods() {
      getGoods().then((res) => {
        this.goods = res
      })
    }
  },
  components: {
    GoodsList,
    ShopCart
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
</style>
