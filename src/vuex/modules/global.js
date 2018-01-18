import { deepCopy } from '../../utils/modules/utils'

const state = {
  sidebar: {
    list: [], // 数据集合
    open: 1 // 1：展开 0：折叠
  },
  tagbar: {
    list: []
  } // tab标签导航
}
const defaultValue = deepCopy(state)
const getters = {
  sidebar: state => {
    return state.sidebar
  },
  tagbar: state => {
    return state.tagbar
  }
}
const mutations = {
  // 数据初始化
  service_init (state) {
    window.$globalHub.$store.state.global = defaultValue
  },
  // 展开/折叠菜单栏
  SET_SIDEBAR_TOGGLE (state, val) {
    state.sidebar.open = val === true ? 1 : 0
  },
  // 赋用户权限
  INIT_SIDEBAR_DATA (state, val) {
    state.sidebar.list = val
  },
  // 追加tag标签
  ADD_TAGBAR_LIST (state, val) {
    state.tagbar.list.push(val)
  },
  // 删除tag标签
  DEL_TAGBAR_FROM_LIST (state, val) {
    state.tagbar.list.splice(val, 1)
  },
  // 清空tag标签
  EMPTY_TAG_LIST (state) {
    state.tagbar.list.length = 0 // 清空数组最好的方法
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
  },
  // 追加tag标签
  add_tagbar ({commit, state}, val) {
    try {
      if (state.tagbar.list.length <= 0) {
        commit('ADD_TAGBAR_LIST', val)
      } else {
        // 判断列表中是否存在当前tag标签
        if (!state.tagbar.list.find(_x => _x.path === val.path)) {
          commit('ADD_TAGBAR_LIST', val)
        }
      }
    } catch (e) {
      this.$notify.error('tag标签添加失败！')
    }
  },
  // 删除 当前tag标签
  del_tagbar_item ({commit, state}, val) {
    try {
      // 判断列表中是否存在当前tag标签
      for (let [_i, _x] of state.tagbar.list.entries()) {
        if (_x.path === val.path) {
          commit('DEL_TAGBAR_FROM_LIST', _i)
        }
      }
    } catch (e) {
      this.$notify.error('tag标签关闭失败')
    }
  },
  // 删除其他的tag标签
  del_other_tags ({commit, state}, val) {
    return new Promise((resolve) => {
      // 清除所有的标签，只保留当前标签
      commit('EMPTY_TAG_LIST')
      commit('ADD_TAGBAR_LIST', val)
      resolve(val)
    })
  },
  // 清空tag标签
  del_all_tags ({commit}) {
    return new Promise((resolve) => {
      // 清空tag集合，只保留首页
      let index = {name: '首页', path: '/dashboard'}
      commit('EMPTY_TAG_LIST')
      commit('ADD_TAGBAR_LIST', index)
      resolve(index)
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
