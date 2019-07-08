import moment from 'moment'
// import { formatDates } from 'common/js/date'

const ALL = 2

export default{
  data() {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  methods: {
    controlType(type) {
      this.selectType = type
    },
    controlContent() {
      this.onlyContent = !this.onlyContent
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
      // let date = new Date(time)
      // return formatDates(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
