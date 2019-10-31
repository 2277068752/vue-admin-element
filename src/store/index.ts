import Vue from 'vue';
import Vuex from 'vuex';
import CreatePersistedState from 'vuex-persistedstate';
import LocalStorage from '@/utils/modules/local-storage';

const Config = require('../config/index.js');
// 持久化资源目录
import global from './modules/global';
import menus from './modules/menu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    menus
  },
  plugins: [CreatePersistedState({
    key: Config.ProjectName + '_vuex',
    paths: ['menus'], // 只缓存service里的state
    getState: (key: string) => LocalStorage.get(key),
    setState: (key: string, state: any) => LocalStorage.set(key, state)
  })]
});
