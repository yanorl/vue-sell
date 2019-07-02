import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Goods = (resolve) => {
  import('components/goods/Goods').then((module) => {
    resolve(module)
  })
}

const Ratings = (resolve) => {
  import('components/ratings/Ratings').then((module) => {
    resolve(module)
  })
}

const Seller = (resolve) => {
  import('components/seller/Seller').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
