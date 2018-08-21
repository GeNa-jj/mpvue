export default types => ({
  /**
   * 设置用户登录信息
   */
  [types.UPDATE_USER_INFO](state, payload) {
    state.userInfo = { ...state.userInfo,
      ...payload
    }
  },
  /**
   * 设置用户的权限信息
   */
  [types.UPDATE_PERMS_INFO](state, payload) {
    state.permsInfo = { ...state.permsInfo,
      ...payload
    }
  }

})
