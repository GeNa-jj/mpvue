import ModMutations from './mutations'
import ModActions from './actions'
import ModGetters from './getters'
import * as modActionType from './mutation-types'

const ModModules = {}

// 定义状态管理
const modState = {
  // 名称
  systemName: 'mpvue',

  // --用户信息 start --
  userInfo: {
    uums_code: '', // 用户密码
    uums_username: '' // 用户名
  },
  // --用户信息 end --

  // --用户权限数据 start --
  permsInfo: {
    uumsPermissions: [], // 用户权限
    uumsSystems: [] // 涉及系统
  }
  // --用户权限数据 end --

}

export {modState, ModMutations, ModActions, ModGetters, modActionType, ModModules}
