import Axios from 'axios'
const ERR_OK = 0

export default function getDate(url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios(url, params).then((response) => {
      const { errno, data } = response.data
      if (errno === ERR_OK) {
        resolve(data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
