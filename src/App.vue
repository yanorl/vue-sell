<template>
  <div id="app">
    <my-header :seller="seller"></my-header>
    <tab></tab>
    <keep-alive>
      <!-- 切换页面不重新获取ajax -->
       <router-view :seller="seller"></router-view>
     </keep-alive>
  </div>
</template>

<script>
import { getSeller } from 'api'
import MyHeader from 'components/header/Header'
import Tab from 'components/tab/Tab'

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  components: {
    MyHeader,
    Tab
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
