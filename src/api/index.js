import getDate from 'common/js/axios'

export function getSeller() {
  return getDate('api/seller')
}

export function getGoods() {
  return getDate('api/goods')
}

export function getRatings() {
  return getDate('api/ratings')
}
