import request from './fly'
import * as apis from './apis'
import ipConfig from './ipConfig'

const Apis = Object.assign(apis, ipConfig)

export default {
  install (Vue, name = ['$ajax', 'apis']) {
    Object.defineProperty(Vue.prototype, name[0], { value: request })
    Object.defineProperty(Vue.prototype, name[1], { value: Apis })
  }
}
