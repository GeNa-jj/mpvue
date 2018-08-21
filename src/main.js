import Vue from 'vue'
import App from './App'
import request from './config/ajax'

// 导入过滤器
import filters from '@/filters'
Vue.use(request)
Object.keys(filters).forEach(key => {
  Vue.use(filters[key])
})
Vue.use(filters)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
