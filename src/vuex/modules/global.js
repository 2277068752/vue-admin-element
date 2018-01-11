const app = {
  state: {
    sidebar: {
      list: [], // 数据集合
      open: 1 // 1：展开 0：折叠
    }
  },
  getters: {
    sidebar: state => {
      return state.slidebar
    }
  },
  mutations: {
    // 展开/折叠菜单栏
    SET_SIDEBAR_TOGGLE (state, val) {
      state.slidebar = val === true ? 1 : 0
    }
  },
  actions: {
    // 展开/折叠菜单栏
    set_sidebar_toggle ({commit}, val) {
      commit('SET_SIDEBAR_TOGGLE', val)
    }
  }
}
export default app
