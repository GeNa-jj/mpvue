// 自适应布局

export default class Responsive {
  constructor (callback) {
    this.timer = null
    this.callback = callback
  }
  init () {
    this.refreshRem()
    window.addEventListener('resize', () => {
      if (this.timer) {
        window.clearTimeout(this.timer)
      }
      this.timer = window.setTimeout(() => this.refreshRem(), 300)
    }, false)
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        if (this.timer) {
          window.clearTimeout(this.timer)
        }
        this.timer = window.setTimeout(() => this.refreshRem(), 300)
      }
    }, false)
  }
  /**
   * 刷新像素
   */
  refreshRem () {
    let docEl = window.document.documentElement
    let width = docEl.getBoundingClientRect().width
    if (width > 768) { // 最大宽度
      width = 768
    }
    let rem = width / 3.75
    docEl.style.fontSize = rem + 'px'

    // 如果有回调函数，则执行回调
    if (this.callback) {
      this.callback(rem)
    }
  }
}
