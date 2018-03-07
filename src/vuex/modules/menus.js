import {deepCopy} from '../../assets/utils/util'
// initial state
const state = {
  sidebar: [],
  open: 1 // 1：展开 0：折叠
}
const defaultValue = deepCopy(state)
// getters
const getters = {}
// mutations
const mutations = {
  // 数据初始化
  service_init (state) {
    window.$globalHub.$store.state.global = defaultValue
  },
  // 展开/折叠菜单栏
  SET_SIDEBAR_TOGGLE (state, val) {
    state.open = val
  },
  // 赋用户权限
  INIT_SIDEBAR_DATA (state, val) {
    state.sidebar = val
  }
}
const actions = {
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
export default {
  state,
  getters,
  actions,
  mutations
}
