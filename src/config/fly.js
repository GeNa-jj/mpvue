const Fly = require('flyio/dist/npm/wx')
// import wxEngine from 'flyio/../engine-wrapper'
const request = new Fly()

// 配置请求基地址
// fly.config.baseURL = "https://cnodejs.org/api/v1/"

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  wx.showLoading({ title: '心急吃不了热豆腐' })
  // 可以通过promise.reject／resolve直接中止请求
  // promise.resolve('fake data')
  return config
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    // 只将请求结果的data字段返回
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none',
      duration: 1000
    })
    // 发生网络错误后会走到这里
    return promise.resolve()
  }
)
export default request
