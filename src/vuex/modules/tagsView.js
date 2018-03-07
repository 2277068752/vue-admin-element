const tagsView = {
  state: {
    show: 1,
    tagbar: [] // tab标签导航
  },
  mutations: {
    // 追加tag标签
    ADD_TAGBAR_LIST (state, val) {
      state.tagbar.push(val)
    },
    // 删除tag标签
    DEL_TAGBAR_FROM_LIST (state, val) {
      state.tagbar.splice(val, 1)
    },
    // 清空tag标签
    EMPTY_TAG_LIST (state) {
      state.tagbar.length = 0 // 清空数组最好的方法
    },
    // 显示/关闭 多标签
    SET_TAG_STATE (state, val) {
      state.show = val
    }
  },
  actions: {
    // 追加tag标签
    add_tagbar ({ commit, state }, val) {
      try {
        if (state.tagbar.length <= 0) {
          commit('ADD_TAGBAR_LIST', val)
        } else {
          // 判断列表中是否存在当前tag标签
          if (!state.tagbar.find(_x => _x.path === val.path)) {
            commit('ADD_TAGBAR_LIST', val)
          }
        }
      } catch (e) {
        this.$notify.error('tag标签添加失败！')
      }
    },
    // 删除 当前tag标签
    del_tagbar_item ({ commit, state }, val) {
      try {
        // 判断列表中是否存在当前tag标签
        for (let [_i, _x] of state.tagbar.entries()) {
          if (_x.path === val.path) {
            commit('DEL_TAGBAR_FROM_LIST', _i)
          }
        }
      } catch (e) {
        this.$notify.error('tag标签关闭失败')
      }
    },
    // 删除其他的tag标签
    del_other_tags ({ commit, state }, val) {
      return new Promise((resolve) => {
        // 清除所有的标签，只保留当前标签
        commit('EMPTY_TAG_LIST')
        commit('ADD_TAGBAR_LIST', val)
        resolve(val)
      })
    },
    // 清空tag标签
    del_all_tags ({ commit }) {
      return new Promise((resolve) => {
        // 清空tag集合，只保留首页
        let index = { name: '首页', path: '/dashboard' }
        commit('EMPTY_TAG_LIST')
        commit('ADD_TAGBAR_LIST', index)
        resolve(index)
      })
    },
    // 显示/关闭 多标签
    set_tag_state ({ commit }, val) {
      commit('SET_TAG_STATE', val)
    }
  }
}
export default tagsView
