import Vuex from 'vuex'
import LocalStorage from '../utils/modules/localStorage'
import config from '../../config'
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'

import global from './modules/global'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    global
  },
  // 插件
  plugins: [createPersistedState({
    key: config.build.assetsPublicPath + 'vuex',
    paths: ['global'],
    getState: (key) => LocalStorage.get(key),
    setState: (key, state) => LocalStorage.set(key, state)
  })]
})
