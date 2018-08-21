export default {
  // 时间戳转换日期格式过滤器
  date (input) {
    if (input) {
      let oDate = new Date(input)
      // 获取年份
      let yy = oDate.getFullYear()
      // 获取月份
      let Month = oDate.getMonth() + 1
      Month = Month < 10 ? '0' + Month : Month
      // 获取天
      let getDate = oDate.getDate()
      getDate = getDate < 10 ? '0' + getDate : getDate
      // 获取小时
      let getHours = oDate.getHours()
      getHours = getHours < 10 ? '0' + getHours : getHours
      // 获取分钟数
      let getMinutes = oDate.getMinutes()
      getMinutes = getMinutes < 10 ? '0' + getMinutes : getMinutes
      // 获取秒数
      let getSeconds = oDate.getSeconds()
      getSeconds = getSeconds < 10 ? '0' + getSeconds : getSeconds

      return yy + '-' + Month + '-' + getDate + ' ' + getHours + ':' + getMinutes + ':' + getSeconds
    } else {
      return ''
    }
  }
}
