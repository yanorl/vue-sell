<template>
  <div id="app">
    <my-header :seller = seller></my-header>
  </div>
</template>

<script>
import MyHeader from 'components/header/Header'
import { getSeller } from 'api'

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  components: {
    MyHeader
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then((res) => {
        this.seller = res
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
</style>
