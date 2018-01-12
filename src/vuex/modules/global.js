const app = {
  state: {
    sidebar: {
      list: [], // 数据集合
      open: 1 // 1：展开 0：折叠
    }
  },
  getters: {
    sidebar: state => {
      return state.sidebar
    }
  },
  mutations: {
    // 展开/折叠菜单栏
    SET_SIDEBAR_TOGGLE (state, val) {
      state.sidebar.open = val === true ? 1 : 0
    },
    // 赋用户权限
    INIT_SIDEBAR_DATA (state, val) {
      state.sidebar.list = val
    }
  },
  actions: {
    // 展开/折叠菜单栏
    set_sidebar_toggle ({commit}, val) {
      commit('SET_SIDEBAR_TOGGLE', val)
    },
    // 登录成功之后，取用户的权限信息
    init_sidebar_data ({commit}, val) {
      try {
        commit('INIT_SIDEBAR_DATA', val)
      } catch (e) {
        this.$notify.error('没有取到该用户的权限信息')
      }
    }
  }
}
export default app
